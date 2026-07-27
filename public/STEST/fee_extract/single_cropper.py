import fitz
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import sys

def init_firebase():
    if not firebase_admin._apps:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        key_path = os.path.join(base_dir, 'firebase_service_key.json')
        if not os.path.exists(key_path):
            raise FileNotFoundError(f"키 파일 없음: {key_path}")
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
    return firestore.client()

def fetch_coords_from_db(db, exam_id):
    doc_ref = db.collection('artifacts').document('godtonggwa_v1') \
                .collection('public').document('data') \
                .collection('archive_coords').document(exam_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict().get('coords', {})
    else:
        raise Exception("좌표 데이터를 찾을 수 없습니다.")

def build_single_item(pdf_path, exam_id, coords_data, target_q_num, output_dir="question_bank"):
    save_dir = os.path.join(output_dir, exam_id)
    os.makedirs(save_dir, exist_ok=True)
    
    target_q_str = str(target_q_num)
    if target_q_str not in coords_data:
        raise Exception(f"{target_q_num}번 문항의 좌표 데이터가 없습니다.")
        
    data = coords_data[target_q_str]
    
    doc = fitz.open(pdf_path)
    matrix = fitz.Matrix(3.0, 3.0) 
    
    page = doc[data.get('p', 1) - 1]
    rx, ry, rw, rh = data['rect']
    clip_rect = fitz.Rect(rx * page.rect.width, ry * page.rect.height, (rx + rw) * page.rect.width, (ry + rh) * page.rect.height)
    pix = page.get_pixmap(matrix=matrix, clip=clip_rect)
    img_filename = f"{exam_id}_q{str(target_q_num).zfill(2)}.png"
    pix.save(os.path.join(save_dir, img_filename))
    print(f"✅ {img_filename} 자르기 완료!")
    doc.close()
    
    q_id = f"q_{exam_id}_{str(target_q_num).zfill(2)}"
    q_data = {
        "id": q_id,
        "sourceExamId": exam_id,
        "examQNum": target_q_num,
        "imageFile": img_filename,
        "correctAnswer": str(data.get('ans', '3')),
        "score": float(data.get('score', 2.0)),
        "difficulty": int(data.get('difficulty', 3)), 
        "taxonomy": {"subject": "통합과학", "domain": "통합과학1", "topic": data.get('topic', '미분류')},
        "behavioralDomain": data.get('behavior', '자료 변환 및 해석'), 
        "qType": data.get('type', '합답형(ㄱ,ㄴ,ㄷ)'),             
        "tags": data.get('tags', []),                              
        "stats": { "total": 0, "correct": 0 },
        "updatedAt": datetime.utcnow().isoformat() + "Z"
    }
    return { q_id: q_data }

if __name__ == "__main__":
    TARGET_EXAM_ID = "2028_s0_01"
    TARGET_PDF_FILE = "2028_s0_01.pdf"
    
    # 💡 여기서 원하는 문항 번호 하나만 설정하세요!
    TARGET_Q_NUM = 7  
    
    try:
        db = init_firebase()
        coords = fetch_coords_from_db(db, TARGET_EXAM_ID)
        
        print(f"✂️ {TARGET_Q_NUM}번 문항만 단독으로 추출합니다...")
        metadata = build_single_item(TARGET_PDF_FILE, TARGET_EXAM_ID, coords, TARGET_Q_NUM)
        
        print("🚀 Firebase에 해당 1개 문항 데이터를 덮어쓰기 업데이트 중입니다...")
        batch = db.batch()
        for q_id, q_data in metadata.items():
            doc_ref = db.collection("questions").document(q_id)
            batch.set(doc_ref, q_data, merge=True)
        batch.commit()
        
        print("\n🎉 단일 문항 작업 완료!")
    except Exception as e:
        print(f"❌ 오류: {e}")

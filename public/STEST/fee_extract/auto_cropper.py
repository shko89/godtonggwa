import fitz  # PyMuPDF 라이브러리
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# 1. Firebase 초기화
def init_firebase():
    if not firebase_admin._apps:
        # 파일이 위치한 루트 디렉토리를 기준으로 경로를 고정합니다.
        # __file__은 현재 스크립트의 절대 경로를 가리킵니다.
        base_dir = os.path.dirname(os.path.abspath(__file__))
        key_path = os.path.join(base_dir, 'firebase_service_key.json')
        
        if not os.path.exists(key_path):
            raise FileNotFoundError(f"❌ 키 파일을 찾을 수 없습니다: {key_path}\n루트 디렉토리에 'firebase_service_key.json'이 있는지 확인하세요.")
            
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
        print("✅ 파이어베이스 인증 완료 (루트 키 파일 사용)")
    return firestore.client()

# 2. 업로드 함수 (외부로 뺌)
def upload_to_firestore(master_data):
    db = firestore.client()
    print("🚀 Firebase에 문항 데이터를 업로드 중입니다...")
    batch = db.batch()
    for q_id, q_data in master_data.items():
        doc_ref = db.collection("questions").document(q_id)
        batch.set(doc_ref, q_data, merge=True)
    batch.commit()
    print(f"✅ 총 {len(master_data)}개의 문항이 questions 컬렉션에 등록되었습니다!")

def fetch_coords_from_db(db, exam_id):
    print(f"☁️ Firebase에서 [{exam_id}] 좌표 및 메타데이터 다운로드 중...")
    doc_ref = db.collection('artifacts').document('godtonggwa_v1') \
                .collection('public').document('data') \
                .collection('archive_coords').document(exam_id)
    doc = doc_ref.get()
    if doc.exists:
        print("✅ 데이터 연동 성공!")
        return doc.to_dict().get('coords', {})
    else:
        raise Exception(f"❌ '{exam_id}' 좌표 데이터를 찾을 수 없습니다.")

def build_item_bank(pdf_path, exam_id, coords_data, output_dir="question_bank"):
    save_dir = os.path.join(output_dir, exam_id)
    os.makedirs(save_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    matrix = fitz.Matrix(3.0, 3.0) 
    bank_metadata = {}

    for q_num_str, data in sorted(coords_data.items(), key=lambda x: int(x[0])):
        q_num = int(q_num_str)
        page = doc[data.get('p', 1) - 1]
        rx, ry, rw, rh = data['rect']
        clip_rect = fitz.Rect(rx * page.rect.width, ry * page.rect.height, (rx + rw) * page.rect.width, (ry + rh) * page.rect.height)
        pix = page.get_pixmap(matrix=matrix, clip=clip_rect)
        img_filename = f"{exam_id}_q{str(q_num).zfill(2)}.png"
        pix.save(os.path.join(save_dir, img_filename))
        
        q_id = f"q_{exam_id}_{str(q_num).zfill(2)}"
        bank_metadata[q_id] = {
            "id": q_id,
            "sourceExamId": exam_id,
            "examQNum": q_num,
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
    doc.close()
    
    with open(os.path.join(save_dir, f"{exam_id}_master_db.json"), 'w', encoding='utf-8') as f:
        json.dump(bank_metadata, f, ensure_ascii=False, indent=4)
        
    return bank_metadata # 중요: 데이터를 반환해야 함!

if __name__ == "__main__":
    TARGET_EXAM_ID = "2028_s0_01"
    TARGET_PDF_FILE = "2028_s0_01.pdf"
    
    try:
        db = init_firebase()
        coords = fetch_coords_from_db(db, TARGET_EXAM_ID)
        
        # 1. 이미지 자르기 & JSON 만들기
        metadata = build_item_bank(TARGET_PDF_FILE, TARGET_EXAM_ID, coords)
        
        # 2. Firebase 업로드 실행!
        upload_to_firestore(metadata)
        
        print("\n🎉 모든 작업 완료!")
    except Exception as e:
        print(f"❌ 오류: {e}")
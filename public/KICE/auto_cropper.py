import fitz  # PyMuPDF 라이브러리
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# 파이어베이스 초기화 함수
def init_firebase():
    if not firebase_admin._apps:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        key_path = os.path.join(base_dir, '..', 'firebase_service_key.json')
        if not os.path.exists(key_path):
            raise FileNotFoundError(f"❌ 키 파일을 찾을 수 없습니다: {key_path}")
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
    return firestore.client()

# 2. 파이어베이스에서 좌표 다운로드 함수
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

def build_item_bank(pdf_path, exam_id, coords_data, output_dir="2028_pretest"):
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
        
        # 이미지 이름 형식
        img_filename = f"{exam_id}_q{str(q_num).zfill(2)}.png"
        pix.save(os.path.join(save_dir, img_filename))
        
        # 새로운 ID 공식: kice_{exam_id}_q{q_num}
        q_id = f"kice_{exam_id}_q{str(q_num).zfill(2)}"
        
        bank_metadata[q_id] = {
            "id": q_id,
            "sourceExamId": exam_id,
            "examQNum": q_num,
            "imageFile": img_filename,
            "correctAnswer": str(data.get('ans', '3')),
            "score": float(data.get('score', 2.0)),
            "difficulty": int(data.get('difficulty', 3)), 
            "behavioralDomain": data.get('behavior', '자료 변환 및 해석'), 
            "qType": data.get('type', '선택형(ㄱ,ㄴ,ㄷ)'),             
            "tags": data.get('tags', []),                              
        }
        
        # Taxonomy Inference
        topic = data.get('topic', '미분류')
        chapter = ""
        domain = "통합과학1" # Default
        
        TOPIC_MAP = {
            "과학의 기초": [],
            "물질과 규칙성": ["우주 초기의 원소", "지구와 생명체를 구성하는 원소", "별의 진화와 원소의 생성", "원소들의 주기성", "알칼리 금속과 할로젠", "원소들의 화학 결합", "공유 결합 물질과 이온 결합 물질", "신소재"],
            "시스템과 상호작용": ["역학적 시스템과 중력", "자유 낙하와 수평으로 던진 물체의 운동", "운동량과 충격량", "역학적 시스템과 안전", "지구 시스템의 구성 요소", "지구 시스템의 에너지원과 물질 순환", "지구 시스템과 상호 작용", "생명 시스템의 기본 단위", "세포막을 통한 물질 이동", "생명 시스템의 화학 반응", "생명 시스템 속 정보의 흐름"],
            "변화와 다양성": ["산화 환원 반응", "산화 환원 반응과 우리 생활", "산과 염기", "중화 반응", "중화 반응과 우리 생활", "지질 시대의 환경과 생물", "자연 선택과 생물의 진화", "생물 다양성", "생물 다양성 보전"],
            "환경과 에너지": ["생태계 구성 요소와 환경", "생태계 평형", "지구 환경 변화와 인간 생활", "에너지의 전환과 보존", "전기 에너지의 생산", "전력 수송", "태양 에너지의 생성과 전환", "발전과 신재생 에너지", "지속 가능한 발전을 위한 노력"],
            "과학과 미래 사회": ["인공지능과 과학 탐구", "로봇", "미래 사회"]
        }
        DOMAIN_MAP = {
            "과학의 기초": "통합과학1", "물질과 규칙성": "통합과학1", "시스템과 상호작용": "통합과학1",
            "변화와 다양성": "통합과학2", "환경과 에너지": "통합과학2", "과학과 미래 사회": "통합과학2"
        }
        for chap, topics in TOPIC_MAP.items():
            if topic in topics:
                chapter = chap
                domain = DOMAIN_MAP.get(chap, "통합과학1")
                break
                
        doc_data["taxonomy"] = {"subject": "통합과학", "domain": domain, "chapter": chapter, "topic": topic}
        doc_data["stats"] = { "total": 0, "correct": 0 }
        doc_data["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        
        bank_metadata[q_id] = doc_data
        
    doc.close()
    
    with open(os.path.join(save_dir, f"{exam_id}_master_db.json"), 'w', encoding='utf-8') as f:
        json.dump(bank_metadata, f, ensure_ascii=False, indent=4)
        
    return bank_metadata

if __name__ == "__main__":
    TARGET_EXAM_ID = "2028_pretest"
    TARGET_PDF_FILE = "2028_pretest.pdf"
    
    try:
        db = init_firebase()
        coords = fetch_coords_from_db(db, TARGET_EXAM_ID)
        
        # 1. 이미지 자르기 & JSON 만들기
        metadata = build_item_bank(TARGET_PDF_FILE, TARGET_EXAM_ID, coords)
        
        # 2. Firebase 업로드 실행! (현재는 로컬 저장만)
        # upload_to_firestore(metadata)
        print("✅ 로컬 이미지 자르기 및 메타데이터 JSON 저장이 완료되었습니다.")
        print("\n🎉 모든 작업 완료!")
    except Exception as e:
        print(f"❌ 오류: {e}")
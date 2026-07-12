import fitz  # PyMuPDF 라이브러리
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# 파이어베이스 초기화 함수
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

# 2. 파이어베이스에서 좌표 다운로드 함수
def fetch_coords_from_db(db, exam_id):
    print(f"☁️ Firebase에서 [{exam_id}] 좌표 및 메타데이터 다운로드 중...")
    # 주의: 규칙에 따라 경로를 명확히 정의합니다.
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
    
    # 이하 기존 로직 유지...
    bank_metadata = {}
    # ... (생략된 로직은 기존과 동일하게 유지)
    
    with open(os.path.join(save_dir, f"{exam_id}_master_db.json"), 'w', encoding='utf-8') as f:
        json.dump(bank_metadata, f, ensure_ascii=False, indent=4)
        
    return bank_metadata

if __name__ == "__main__":
    TARGET_EXAM_ID = "2028_pretest"
    TARGET_PDF_FILE = "2028_pretest.pdf"
    
    try:
        db = init_firebase()
        # 이하 실행 로직...
    except Exception as e:
        print(f"오류 발생: {e}")
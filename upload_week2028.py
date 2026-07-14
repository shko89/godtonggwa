import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import math

# 파이어베이스 서비스 계정 키
SERVICE_KEY_PATH = r"C:\Users\user\godtonggwa\firebase_service_key.json"
JSON_DB_PATH = r"g:\내 드라이브\주간지\2주차\week_2028_02\week_2028_02_master_db.json"

# Firebase 앱 초기화
cred = credentials.Certificate(SERVICE_KEY_PATH)
firebase_admin.initialize_app(cred)

db = firestore.client()

def clean_data(d):
    """Firestore에 업로드할 때 NaN 값이 있으면 오류가 나므로 변환"""
    for key, value in d.items():
        if isinstance(value, float) and math.isnan(value):
            d[key] = 0.0  # 기본값으로 0.0 설정
        elif isinstance(value, dict):
            clean_data(value)
    return d

def upload_data():
    if not os.path.exists(JSON_DB_PATH):
        print(f"Error: JSON 파일을 찾을 수 없습니다: {JSON_DB_PATH}")
        return
        
    with open(JSON_DB_PATH, 'r', encoding='utf-8') as f:
        master_db = json.load(f)

    batch = db.batch()
    count = 0
    
    for q_id, q_data in master_db.items():
        # 데이터 정리 (NaN 처리)
        clean_data(q_data)
        
        # 이미지 경로 연동을 위한 storagePrefix 설정
        q_data["storagePrefix"] = "week/2028"
        
        doc_ref = db.collection('questions').document(q_id)
        batch.set(doc_ref, q_data)
        count += 1
        print(f"[{count}] Added {q_id} to batch")

    # 한번에 커밋
    batch.commit()
    print(f"\n총 {count}개의 문항 데이터가 성공적으로 Firestore에 업로드 되었습니다!")

if __name__ == '__main__':
    upload_data()

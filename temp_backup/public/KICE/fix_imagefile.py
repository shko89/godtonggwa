import firebase_admin
from firebase_admin import credentials, firestore
import os

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key_path = os.path.join(base_dir, '..', 'firebase_service_key.json')
    if not os.path.exists(key_path):
        print(f"키 파일 없음: {key_path}")
        return
        
    if not firebase_admin._apps:
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
    db = firestore.client()

    print("DB 연동 완료. imageFile 메타데이터 일치 작업 시작...")
    docs = db.collection('questions').where('sourceExamId', '==', '2028_pretest').stream()
    
    count = 0
    for doc in docs:
        actual_id = doc.id
        data = doc.to_dict()
        expected_image = f"{actual_id}.png"
        
        if data.get('imageFile') != expected_image:
            doc.reference.update({'imageFile': expected_image})
            count += 1
            print(f"업데이트 완료: {data.get('imageFile')} -> {expected_image}")

    print(f"총 {count}개 문항의 imageFile 메타데이터를 실제 파일명으로 수정 완료!")

if __name__ == "__main__":
    main()

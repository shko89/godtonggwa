import firebase_admin
from firebase_admin import credentials, firestore
import os

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key_path = os.path.join(base_dir, '..', 'firebase_service_key.json')
    if not os.path.exists(key_path):
        print(f"키 파일 없음: {key_path}")
        return
        
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    print("DB 연동 완료. 질문 데이터 수정 시작...")
    # sourceExamId가 2028_pretest인 문항만 가져오기
    docs = db.collection('questions').where('sourceExamId', '==', '2028_pretest').stream()
    
    count = 0
    for doc in docs:
        actual_id = doc.id
        data = doc.to_dict()
        
        # 문서 이름과 내부 id가 다르면, 내부 id를 문서 이름으로 덮어씀
        if data.get('id') != actual_id:
            doc.reference.update({'id': actual_id})
            count += 1
            print(f"업데이트 완료: {data.get('id')} -> {actual_id}")

    print(f"🎉 총 {count}개 문항의 내부 id를 문서 이름과 일치하도록 복구 완료!")

if __name__ == "__main__":
    main()

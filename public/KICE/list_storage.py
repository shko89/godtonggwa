import firebase_admin
from firebase_admin import credentials, storage
import os

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key_path = os.path.join(base_dir, '..', 'firebase_service_key.json')
    if not os.path.exists(key_path):
        print(f"키 파일 없음: {key_path}")
        return
        
    if not firebase_admin._apps:
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'godtonggwa.firebasestorage.app'
        })
    
    bucket = storage.bucket()
    blobs = bucket.list_blobs()
    count = 0
    print("스토리지 파일 목록 검색 (kice_2028_pretest 관련):")
    for blob in blobs:
        if "2028" in blob.name or "kice" in blob.name:
            print(blob.name)
            count += 1
            if count > 50:
                break

if __name__ == "__main__":
    main()

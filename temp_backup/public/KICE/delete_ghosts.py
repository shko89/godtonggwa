import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

SERVICE_KEY_PATH = r"C:\Users\user\godtonggwa\firebase_service_key.json"

try:
    firebase_admin.initialize_app(credentials.Certificate(SERVICE_KEY_PATH))
except ValueError:
    pass

db = firestore.client()

# 삭제할 문서 ID 목록
ghost_ids = [
    "week_2028_02_mock_q21", "week_2028_02_mock_q22", "week_2028_02_mock_q23", 
    "week_2028_02_mock_q24", "week_2028_02_mock_q25", "week_2028_02_mock_q26", 
    "week_2028_02_mock_q27", "week_2028_02_mock_q28", "week_2028_02_mock_q29",
    "week_2028_02_prac_q09"
]

count = 0
batch = db.batch()

for q_id in ghost_ids:
    doc_ref = db.collection('questions').document(q_id)
    batch.delete(doc_ref)
    count += 1
    print(f"Deleted {q_id}")

batch.commit()
print(f"Total {count} ghost documents deleted successfully.")

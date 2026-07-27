import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

SERVICE_KEY_PATH = r"C:\Users\user\godtonggwa\firebase_service_key.json"

try:
    firebase_admin.initialize_app(credentials.Certificate(SERVICE_KEY_PATH))
except ValueError:
    pass

db = firestore.client()

docs = db.collection('questions').where('sourceExamId', '==', 'week_2028_02').get()
print(f"Found {len(docs)} documents for week_2028_02")

for doc in docs:
    d = doc.to_dict()
    print(f"ID: {doc.id}, storagePrefix: {d.get('storagePrefix')}, imageFile: {d.get('imageFile')}")

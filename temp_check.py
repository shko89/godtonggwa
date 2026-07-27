import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

cred = credentials.Certificate('C:\\Users\\shko8\\godtonggwa\\firebase_service_key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
doc = db.collection('exams').document('week_2028_01').get()
data = doc.to_dict()
print(json.dumps(data['questions'][0], ensure_ascii=False, indent=2))

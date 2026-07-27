import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

SERVICE_KEY_PATH = r"C:\Users\user\godtonggwa\firebase_service_key.json"

try:
    firebase_admin.initialize_app(credentials.Certificate(SERVICE_KEY_PATH), {
        'storageBucket': 'godtonggwa.firebasestorage.app'
    })
except ValueError:
    pass

bucket = storage.bucket()
blobs = bucket.list_blobs(prefix="questions/week/2028/week_2028_02/")

print("Files in Firebase Storage (questions/week/2028/week_2028_02/):")
for blob in blobs:
    print(f"{blob.name}: {blob.size} bytes, content_type: {blob.content_type}")

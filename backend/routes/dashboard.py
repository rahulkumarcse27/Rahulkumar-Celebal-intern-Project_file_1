from fastapi import APIRouter
import os

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.get("/dashboard")
def dashboard():

    total_documents = 0
    storage = 0

    if os.path.exists(UPLOAD_DIR):
        files = os.listdir(UPLOAD_DIR)

        total_documents = len(files)

        for file in files:
            path = os.path.join(UPLOAD_DIR, file)

            if os.path.isfile(path):
                storage += os.path.getsize(path)

    return {
        "documents": total_documents,
        "questions": 0,
        "accuracy": 100,
        "response_time": 0.3,
        "storage_mb": round(storage / 1024 / 1024, 2)
    }

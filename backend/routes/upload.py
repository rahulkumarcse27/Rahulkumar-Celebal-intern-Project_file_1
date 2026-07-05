from fastapi import APIRouter, UploadFile, File
from services.vector_store import index_pdf
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    print("UPLOAD API CALLED")

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    index_pdf(file_path)
    return {
        "success": True,
        "filename": file.filename,
        "path": file_path
    }
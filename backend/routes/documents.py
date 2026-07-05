from fastapi import APIRouter, HTTPException
from services.pdf_reader import read_pdf
from pypdf import PdfReader
from datetime import datetime
import os
from fastapi.responses import FileResponse
router = APIRouter()

UPLOAD_DIR = "uploads"

@router.get("/documents")
def get_documents():

    docs = []

    if os.path.exists(UPLOAD_DIR):

        for file in os.listdir(UPLOAD_DIR):

            path = os.path.join(UPLOAD_DIR, file)

            if os.path.isfile(path):

                ext = file.split(".")[-1].upper()

                size = round(os.path.getsize(path) / 1024 / 1024, 2)

                pages = 0

                if ext == "PDF":
                    try:
                        reader = PdfReader(path)
                        pages = len(reader.pages)
                    except:
                        pages = 0

                dt = datetime.fromtimestamp(os.path.getmtime(path))

                uploaded_at = dt.strftime("%d %b %Y %I:%M %p")

                uploaded_at_iso = dt.isoformat()
                docs.append({
                    "id": file,
                    "name": file,
                    "type": ext,
                    "size": f"{size} MB",
                    "status": "processed",
                    "pages": pages,
                    "uploaded_at": uploaded_at,
                    "uploaded_at_iso": uploaded_at_iso,
                })

    return docs

@router.delete("/documents/{filename}")
def delete_document(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    if os.path.exists(path):
        os.remove(path)
        return {
            "success": True,
            "message": "Document deleted"
        }

    return {
        "success": False,
        "message": "File not found"
    }
    
@router.get("/documents/download/{filename}")
def download_document(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    if os.path.exists(path):
        return FileResponse(
            path,
            filename=filename,
            media_type="application/octet-stream"
        )

    return {"success": False}  

@router.get("/documents/view/{filename}")
def view_document(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    if os.path.exists(path):
        return FileResponse(
            path,
            media_type="application/pdf"
        )

    raise HTTPException(
        status_code=404,
        detail="Document not found"
    )  
    
@router.get("/documents/details/{filename}")
def document_details(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Document not found")

    text = ""

    if filename.lower().endswith(".pdf"):
        try:
            text = read_pdf(path)
        except:
            text = ""

    preview = text[:1000]

    words = text.split()

    summary = " ".join(words[:120])
    word_count = len(words)

    reading_time = max(1, word_count // 200)

    language = "English"

    keywords = list(dict.fromkeys(words[:30]))[:8]

    return {
    "preview": preview,
    "summary": summary,
    "words": word_count,
    "characters": len(text),
    "reading_time": reading_time,
    "language": language,
    "keywords": keywords,
}
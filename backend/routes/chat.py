from fastapi import APIRouter
from pydantic import BaseModel
from services.ollama_service import ask_llama
from services.rag import retrieve_context
router = APIRouter()


class ChatRequest(BaseModel):
    question: str
    filename: str | None = None

@router.post("/chat")
def chat(req: ChatRequest):

    import os
    from services.pdf_reader import read_pdf

    upload_dir = "uploads"
    import os

    files = [
    f for f in os.listdir(upload_dir)
    if f.lower().endswith(".pdf")
]

    if len(files) == 0:
        return {
        "answer": "No PDF uploaded.",
        "source": ""
    }

    files.sort(
        key=lambda f: os.path.getmtime(
        os.path.join(upload_dir, f)
    ),
    reverse=True
    )
    print("REQ FILENAME =", req.filename)

    if req.filename:
        filename = req.filename
    else:
        filename = files[0]

    print("USING FILE =", filename)

    print("Current Document:", filename)
    path = os.path.join(upload_dir, filename)

    if not os.path.exists(path):
        return {
        "answer": "Selected document not found.",
        "source": filename
    }
    text = read_pdf(path)

    context, citations = retrieve_context(
    filename,
    req.question
)

    if context == "":
        return {
        "answer": "No relevant information found in this document.",
        "source": filename
    }

    answer = ask_llama(context, req.question)

    return {
    "answer": answer,
    "source": filename,
    "citations": citations
}

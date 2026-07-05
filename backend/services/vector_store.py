import os
import chromadb
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader

client = chromadb.PersistentClient(path="database")

collection = client.get_or_create_collection(
    name="documents"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150
)


def index_pdf(file_path: str):

    reader = PdfReader(file_path)

    documents = []
    metadatas = []

    for page_no, page in enumerate(reader.pages, start=1):

        page_text = page.extract_text()
        print("=" * 80)
        print(f"PAGE {page_no}")
        print(page_text)
        print("=" * 80)

        if not page_text:
            continue

        chunks = text_splitter.split_text(page_text)

        for chunk in chunks:

            documents.append(chunk)

            metadatas.append({
                "source": os.path.basename(file_path),
                "page": page_no
            })

    embeddings = embedding_model.encode(documents).tolist()

    ids = [
        f"{os.path.basename(file_path)}_{i}"
        for i in range(len(documents))
    ]

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    print("TOTAL CHUNKS =", collection.count())
    print(f"Indexed {len(documents)} chunks")
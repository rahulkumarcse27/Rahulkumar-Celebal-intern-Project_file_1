# 🚀 Lumen – AI Document Intelligence Platform

An enterprise-grade AI-powered Document Intelligence Platform that enables users to upload PDFs, build a vector database, perform semantic search, and chat with documents using Retrieval-Augmented Generation (RAG).

Built with **Next.js**, **FastAPI**, **Ollama (Llama 3.2)**, **ChromaDB**, and **Sentence Transformers**.

---

# ✨ Features

## 📄 Smart Document Upload
- Upload PDF documents
- Automatic text extraction
- Page-wise indexing
- Chunk generation
- Metadata storage

---

## 🧠 AI Document Chat

- Ask questions in natural language
- Context-aware responses
- Semantic search
- Retrieval-Augmented Generation (RAG)
- Local LLM using Ollama

Example:

> What projects has Rahul Kumar built?

> List all internships.

> What are the technical skills?

---

## 🔍 Vector Search

- ChromaDB Vector Database
- Sentence Transformers
- Semantic Similarity Search
- Fast Retrieval
- Metadata Filtering

---

## 📚 Document Library

- View uploaded documents
- Delete documents
- Automatic indexing
- File management

---

## 📑 Source Citations

Every answer includes

- Source document
- Page number
- Context references

Example

```
Rahul Kumar Resume.pdf
Page 2
```

---

## 📊 Analytics Dashboard

- Total Documents
- Total Queries
- AI Responses
- Storage Statistics

---

## 🕘 Search History

- Previous AI conversations
- Question history
- Response history
- Delete history
- Clear history

---

## ⚡ Enterprise UI

- Modern Dashboard
- Dark Theme
- Responsive Design
- Glassmorphism
- Sidebar Navigation
- Premium Components

---

# 🏗 Tech Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## Backend

- FastAPI
- Python
- Uvicorn

## AI

- Ollama
- Llama 3.2
- Sentence Transformers
- all-MiniLM-L6-v2

## Vector Database

- ChromaDB

## PDF Processing

- PyPDF

## RAG Pipeline

- Chunking
- Embedding Generation
- Vector Search
- Context Retrieval
- LLM Generation

---

# 📂 Project Structure

```
AI-Chat-Project/

│
├── app/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── database/
│   ├── vector_db/
│   ├── models/
│   └── app.py
│
├── public/
├── components/
├── lib/
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/lumen-ai-document-intelligence.git

cd lumen-ai-document-intelligence
```

---

## Frontend

```bash
npm install

npm run dev
```

---

## Backend

Create Virtual Environment

```bash
python -m venv rag_env
```

Activate

Windows

```bash
rag_env\Scripts\activate
```

Install Packages

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn app:app --reload
```

---

## Install Ollama

Download

https://ollama.com/download

Run

```bash
ollama pull llama3.2
```

Start

```bash
ollama serve
```

---

# 🧠 AI Workflow

```
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Chunk Text
      │
      ▼
Generate Embeddings
      │
      ▼
Store in ChromaDB
      │
      ▼
User Question
      │
      ▼
Semantic Search
      │
      ▼
Retrieve Context
      │
      ▼
Llama 3.2
      │
      ▼
Answer + Citations
```

---

# 📸 Screenshots

## Dashboard

(Add Screenshot)

---

## AI Chat

(Add Screenshot)

---

## Upload Documents

(Add Screenshot)

---

## Analytics

(Add Screenshot)

---

# 🎯 Future Improvements

- Multi-document reasoning
- OCR Support
- DOCX Support
- Excel Support
- PowerPoint Support
- Hybrid Search
- Cross-Encoder Re-ranking
- User Authentication
- Multi-user Workspace
- Cloud Storage
- Streaming Responses
- Voice Assistant
- AI Agent Mode

---

# 📈 Performance

- FastAPI Backend
- Local LLM
- Low Latency
- Vector Search
- Enterprise Architecture
- Scalable Design

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository

2. Create Feature Branch

```bash
git checkout -b feature/new-feature
```

3. Commit Changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Rahul Kumar**

B.Tech Computer Science (AI/ML)

- GitHub: https://github.com/rahulkumarcse27
- LinkedIn: https://linkedin.com/in/rahulkumarcse27



import requests

def ask_llama(context, question):

    prompt = f"""
You are a RAG assistant.

Rules:
1. Answer ONLY from the provided context.
2. If the answer is not in the context, reply exactly:
   "The requested information is not present in this document."
3. Never use outside knowledge.
4. If the context contains a list (such as projects, skills, education), extract it completely.
5. Be concise.

Context:
{context}

Question:
{question}

Answer:
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "temperature": 0,
            "stream": False,
        },
        timeout=120,
    )

    return response.json()["response"]
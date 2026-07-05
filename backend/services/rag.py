from services.vector_store import collection, embedding_model


def retrieve_context(filename: str, question: str):

    query_embedding = embedding_model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=10,
        where={"source": filename},
    )

    print("=" * 80)
    print(results)
    print("=" * 80)

    if len(results["documents"]) == 0:
        return "", []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    filtered_docs = []
    citations = []

    lower_question = question.lower()

    for doc, meta, dist in zip(documents, metadatas, distances):

        lower_doc = doc.lower()

        # Projects
        if "project" in lower_question:
            if "project" not in lower_doc:
                continue

        # Skills
        if "skill" in lower_question:
            if "skill" not in lower_doc:
                continue

        # Education
        if "education" in lower_question:
            if "education" not in lower_doc:
                continue

        if dist < 1.8:
            filtered_docs.append(doc)

            citations.append({
                "page": meta.get("page", 1),
                "source": meta.get("source", filename),
            })

    if len(filtered_docs) == 0:

        filtered_docs = documents[:2]

        citations = [
            {
                "page": m.get("page", 1),
                "source": m.get("source", filename),
            }
            for m in metadatas[:2]
        ]

    context = "\n\n".join(filtered_docs)

    print("=" * 80)
    print("QUESTION:", question)
    print("=" * 80)
    print(context)
    print("=" * 80)

    return context, citations
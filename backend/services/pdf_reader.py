import os
from PyPDF2 import PdfReader


def read_pdf(file_path: str):

    if not os.path.exists(file_path):
        return ""

    text = ""

    reader = PdfReader(file_path)

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text
from PyPDF2 import PdfReader
import io

def extract_text_from_pdf(file_content):
    # Using PyPDF2 to read the byte stream of the uploaded file
    reader = PdfReader(io.BytesIO(file_content))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text
from fastapi import APIRouter, UploadFile, File
from app.services.resume_parser import extract_text_from_pdf
from app.services.gemini_service import analyze_resume_with_gemini

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Read the file content
    content = await file.read()
    
    # 1. Extract text from the PDF content
    text = extract_text_from_pdf(content)
    
    # 2. Perform Gemini analysis
    analysis = analyze_resume_with_gemini(text)
    
    return {"analysis": analysis}
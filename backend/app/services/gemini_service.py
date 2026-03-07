import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_resume_with_gemini(text):
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Analyze this resume for GATE 2026 preparation and suggest improvements: {text}"
    response = model.generate_content(prompt)
    return response.text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# 1. Import routers - Ensure these names match your filenames exactly
from app.routers import resume, roadmap, youtube_recomendation as youtube

load_dotenv()

app = FastAPI(title="VidyaGuide AI Agent - Gemini Edition", version="2.0.0")

# 3. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Router Registration
app.include_router(resume.router, prefix="/resume", tags=["Resume Analysis"])
app.include_router(roadmap.router, prefix="/roadmap", tags=["Gemini Career Agent"])
app.include_router(youtube.router, prefix="/videos", tags=["YouTube Recommendations"])

@app.get("/")
async def root():
    return {"message": "VidyaGuide Gemini Engine is Online"}
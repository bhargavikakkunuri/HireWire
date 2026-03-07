from fastapi import APIRouter, HTTPException, Query
import os
import requests
from dotenv import load_dotenv

# Load environment variables for the API Key
load_dotenv()

router = APIRouter()

# YouTube API Configuration
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

@router.get("/")
async def get_recommendations(q: str = Query(..., description="The study topic or skill gap identified by Gemini")):
    """
    Searches YouTube for GATE 2026 study materials based on skill gaps.
    """
    if not YOUTUBE_API_KEY:
        raise HTTPException(status_code=500, detail="YouTube API Key is missing from .env")

    # Search parameters
    params = {
        'part': 'snippet',
        'q': f"{q} GATE 2026 preparation", # Appending GATE context for accuracy
        'key': YOUTUBE_API_KEY,
        'maxResults': 5,
        'type': 'video',
        'videoEmbeddable': 'true'
    }

    try:
        response = requests.get(YOUTUBE_SEARCH_URL, params=params)
        response.raise_for_status()
        data = response.json()

        videos = []
        for item in data.get('items', []):
            videos.append({
                "title": item['snippet']['title'],
                "videoId": item['id']['videoId'],
                "thumbnail": item['snippet']['thumbnails']['high']['url'],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
            })

        return {
            "query": q,
            "videos": videos
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"YouTube API Error: {str(e)}")
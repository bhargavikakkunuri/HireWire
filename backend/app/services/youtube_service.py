import os
import requests
from dotenv import load_dotenv

load_dotenv()

def get_study_videos(query):
    """Fetches YouTube videos relevant to the user's skill gaps."""
    api_key = os.getenv("YOUTUBE_API_KEY")
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&key={api_key}&type=video&maxResults=3"
    
    response = requests.get(url)
    return response.json()
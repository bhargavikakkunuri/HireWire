from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.career_agent import CareerAgent

router = APIRouter()

# 1. Initialize the Agent
# We do this outside the function so it only initializes once
career_ai = CareerAgent()

# 2. Define the Request Model
class RoadmapRequest(BaseModel):
    skills: str
    goal: str = "GATE 2026"

@router.post("/generate")
async def create_roadmap(data: RoadmapRequest):
    """
    Endpoint to trigger the Gemini Career Agent for a personalized roadmap.
    """
    try:
        # 3. Call the CareerAgent's Gemini logic
        roadmap_content = career_ai.generate_roadmap(
            skills=data.skills, 
            goal=data.goal
        )
        
        return {
            "success": True,
            "goal": data.goal,
            "roadmap": roadmap_content
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Career Agent Error: {str(e)}"
        )
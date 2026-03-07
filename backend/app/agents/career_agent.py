import os
from google import genai
from dotenv import load_dotenv

# Load API Key from your .env
load_dotenv()

class CareerAgent:
    def __init__(self):
        # Initialize the Gemini Client
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-1.5-flash" # High-speed model for career roadmaps

    def generate_roadmap(self, skills, goal="GATE 2026"):
        """
        Agentic Prompting: Telling the AI to act as a structured mentor
        """
        prompt = f"As a Career AI Agent, analyze these skills: {skills}. Create a high-yield study plan for {goal}."
        
        # Use the Gemini client to generate content
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt
        )
        return response.text
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])

# In-memory mock DB state for rapid local testing with PostgreSQL fallback
_db_progress = {
    "user_knowledge_score": 72.0,
    "overall_roadmap_progress": 32.0,
    "completed_stages": [1],
    "python_topics": {
        "Python Basics": {"completed": True, "score": 100},
        "Functions": {"completed": True, "score": 100},
        "OOP (Object-Oriented Programming)": {"completed": False, "score": 70},
        "Exception Handling": {"completed": True, "score": 100},
        "APIs (FastAPI / REST)": {"completed": False, "score": 40},
        "Git & GitHub": {"completed": True, "score": 100},
        "DSA (Data Structures)": {"completed": True, "score": 100},
        "Testing & pytest": {"completed": False, "score": 20}
    }
}

class ProgressUpdateRequest(BaseModel):
    stage_id: str
    topic_name: str
    score: float

class AssessmentSubmissionRequest(BaseModel):
    stage_id: str
    score: float

@router.get("/")
async def get_roadmap():
    return {
        "overall_progress": _db_progress["overall_roadmap_progress"],
        "knowledge_score": _db_progress["user_knowledge_score"],
        "completed_stages_count": len(_db_progress["completed_stages"]),
        "recommendation": "Based on your 80% Python score, focus today on FastAPI API integration and PyTorch Tensors."
    }

@router.get("/{stage_id}")
async def get_stage_details(stage_id: str):
    if stage_id.lower() == "python":
        return {
            "stage_code": "01",
            "title": "Python & Programming",
            "overall_score": 80.0,
            "topics": _db_progress["python_topics"],
            "project": "Build an ML Data Processing API using FastAPI"
        }
    return {
        "stage_code": "02",
        "title": stage_id.capitalize(),
        "overall_score": 60.0,
        "topics": {},
        "project": "Standard Stage Project"
    }

@router.post("/progress")
async def update_progress(req: ProgressUpdateRequest):
    if req.stage_id.lower() == "python" and req.topic_name in _db_progress["python_topics"]:
        _db_progress["python_topics"][req.topic_name] = {
            "completed": req.score >= 90,
            "score": req.score
        }
        
    return {
        "status": "success",
        "message": f"Updated progress for {req.topic_name} to {req.score}%",
        "new_knowledge_score": _db_progress["user_knowledge_score"]
    }

@router.post("/assessment")
async def submit_assessment(req: AssessmentSubmissionRequest):
    # Dynamically update Knowledge Twin score
    boost = (req.score / 100.0) * 5.0
    _db_progress["user_knowledge_score"] = min(100.0, _db_progress["user_knowledge_score"] + boost)
    
    return {
        "status": "success",
        "submitted_score": req.score,
        "updated_knowledge_score": round(_db_progress["user_knowledge_score"], 1)
    }

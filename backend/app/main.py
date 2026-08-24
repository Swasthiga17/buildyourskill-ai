from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.roadmap import router as roadmap_router
from app.api.personalization import router as personalization_router

app = FastAPI(
    title="GrowSkill AI Backend API",
    description="PostgreSQL + pgvector + LangGraph powered AI/ML Mentor & Knowledge Twin platform.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap_router)
app.include_router(personalization_router)

@app.get("/")
async def root():
    return {
        "product": "GrowSkill AI",
        "tagline": "Learn Smarter. Grow Faster.",
        "status": "online",
        "database": "PostgreSQL + pgvector",
        "graph": "Neo4j"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

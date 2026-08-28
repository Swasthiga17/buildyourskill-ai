from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

# --- Auth Schemas ---
class UserRegister(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    target_role: Optional[str] = "AI/ML Engineer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    email: str
    full_name: str

class UserProfileOut(BaseModel):
    target_role: str
    experience_level: str
    knowledge_score: float
    readiness_score: float
    streak_days: int
    total_hours: float
    domain_scores: Dict[str, float]

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    profile: Optional[UserProfileOut] = None

# --- Knowledge Twin & Skill Schemas ---
class SkillEvidenceOut(BaseModel):
    id: int
    evidence_type: str
    title: str
    detail: Optional[str] = None
    confidence: str
    created_at: datetime

class SkillNodeOut(BaseModel):
    id: str
    name: str
    category: str
    status: str
    currentScore: float
    requiredScore: float
    confidence: float
    description: Optional[str] = None
    prerequisites: List[str] = []
    practiceTask: Optional[str] = None
    projectIdea: Optional[str] = None
    evidence: List[SkillEvidenceOut] = []

class KnowledgeTwinSummary(BaseModel):
    knowledge_score: float
    readiness_score: float
    streak_days: int
    total_hours: float
    target_role: str
    verified_skills_count: int
    critical_gaps_count: int
    domain_scores: Dict[str, float]
    skills: List[SkillNodeOut]

class AddEvidenceRequest(BaseModel):
    skill_code: str
    evidence_type: str # quiz, assessment, github, project, interview, document
    title: str
    detail: str
    score: float
    confidence: str = "high"

# --- Skill Gap Schemas ---
class SkillGapItem(BaseModel):
    skill_code: str
    name: str
    category: str
    current_score: float
    required_score: float
    gap: float
    priority: str # critical, high, medium, low
    importance_weight: float
    confidence: float
    is_critical: bool
    recommended_action: str
    estimated_hours_to_close: int

class SkillGapsResponse(BaseModel):
    target_role: str
    overall_readiness: float
    total_gaps: int
    critical_gaps_count: int
    priority_gaps: List[SkillGapItem]
    industry_benchmark_match: float

# --- Roadmap Schemas ---
class RoadmapTopicOut(BaseModel):
    id: int
    name: str
    difficulty: str
    completed: bool = False
    score: float = 0.0

class RoadmapStepOut(BaseModel):
    id: int
    stage_code: str
    stage_number: int
    title: str
    icon: Optional[str] = None
    description: Optional[str] = None
    estimated_hours: int
    progress: float
    status: str # locked, unlocked, active, completed, skipped
    prerequisites: List[str] = []
    topics: List[RoadmapTopicOut] = []

class RoadmapResponse(BaseModel):
    roadmap_id: int
    target_role: str
    overall_progress: float
    knowledge_score: float
    completed_stages_count: int
    active_stage: Optional[str] = None
    recommendation: str
    steps: List[RoadmapStepOut]

class PersonalizeRoadmapRequest(BaseModel):
    target_role: Optional[str] = "AI/ML Engineer"
    existing_skills: Optional[Dict[str, float]] = None

# --- AI Mentor Schemas ---
class MentorChatRequest(BaseModel):
    message: str
    stage_id: Optional[str] = None
    conversation_id: Optional[int] = None

class MentorChatResponse(BaseModel):
    conversation_id: int
    reply: str
    code_example: Optional[str] = None
    diagram: Optional[str] = None
    suggested_actions: List[str] = []
    knowledge_gap_highlighted: Optional[str] = None

# --- AI Project Generator Schemas ---
class ProjectGenerateRequest(BaseModel):
    goal: Optional[str] = None
    target_role: Optional[str] = "AI/ML Engineer"
    difficulty: Optional[str] = "Advanced"
    focused_skills: Optional[List[str]] = None

class ProjectOut(BaseModel):
    id: int
    title: str
    category: str
    difficulty: str
    target_role: str
    problem_statement: str
    objective: str
    architecture: str
    tech_stack: List[str]
    milestones: List[Dict[str, Any]]
    starter_code: Optional[str] = None
    evaluation_criteria: List[str]
    interview_talking_points: List[str]
    created_at: datetime

# --- AI Interview Schemas ---
class InterviewEvaluateRequest(BaseModel):
    question_title: str
    category: str
    user_answer: str
    expected_keywords: Optional[List[str]] = None

class InterviewEvaluationResponse(BaseModel):
    overall_score: float
    depth_score: float
    accuracy_score: float
    clarity_score: float
    feedback: str
    missing_concepts: List[str]
    strengths: List[str]
    updated_knowledge_score: float

# --- Ingestion / Learn From Anything Schemas ---
class KnowledgeIngestRequest(BaseModel):
    title: str
    content: str
    doc_type: str = "text" # url, text, note, pdf
    source_url: Optional[str] = None

class KnowledgeIngestResponse(BaseModel):
    document_id: int
    title: str
    summary: str
    key_concepts: List[str]
    quiz_questions: List[Dict[str, Any]]
    evidence_recorded: bool

# --- Code Execution Sandbox Schemas ---
class CodeRunRequest(BaseModel):
    code: str
    language: str = "python"
    test_cases: Optional[List[Dict[str, Any]]] = None

class CodeRunResponse(BaseModel):
    status: str # success, error, timeout
    output: str
    passed: int
    failed: int
    total: int
    execution_time_ms: float
    memory_used_kb: float

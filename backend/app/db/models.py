from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="user") # "user", "admin"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    skills = relationship("UserSkill", back_populates="user", cascade="all, delete-orphan")
    evidence = relationship("SkillEvidence", back_populates="user", cascade="all, delete-orphan")
    learning_progress = relationship("LearningProgress", back_populates="user", cascade="all, delete-orphan")
    assessments = relationship("AssessmentSubmission", back_populates="user", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    documents = relationship("KnowledgeDocument", back_populates="user", cascade="all, delete-orphan")
    conversations = relationship("MentorConversation", back_populates="user", cascade="all, delete-orphan")
    interview_results = relationship("InterviewResult", back_populates="user", cascade="all, delete-orphan")
    beta_membership = relationship("BetaMembership", back_populates="user", uselist=False, cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    target_role = Column(String(255), default="AI/ML Engineer")
    experience_level = Column(String(50), default="Intermediate")
    knowledge_score = Column(Float, default=72.0)
    readiness_score = Column(Float, default=68.0)
    streak_days = Column(Integer, default=12)
    total_hours = Column(Float, default=47.0)
    domain_scores = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True) # e.g. "python", "pytorch", "rag"
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # programming, math, ml, dl, genai, mlops, system_design
    description = Column(Text)
    prerequisites = Column(JSON, default=list) # list of skill codes
    practice_task = Column(Text)
    project_idea = Column(Text)
    resources = Column(JSON, default=list)

    user_skills = relationship("UserSkill", back_populates="skill")
    evidence = relationship("SkillEvidence", back_populates="skill")

class UserSkill(Base):
    __tablename__ = "user_skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)
    current_score = Column(Float, default=0.0)
    target_score = Column(Float, default=85.0)
    confidence = Column(Float, default=0.8) # 0.0 - 1.0
    status = Column(String(50), default="in_progress") # mastered, in_progress, locked, review
    evidence_count = Column(Integer, default=0)
    last_assessed = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="skills")
    skill = relationship("Skill", back_populates="user_skills")

class SkillEvidence(Base):
    __tablename__ = "skill_evidence"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)
    evidence_type = Column(String(50), nullable=False) # quiz, assessment, github, project, interview, document, coding_challenge
    source_id = Column(String(100), nullable=True) # ID of assessment/doc/project
    title = Column(String(255), nullable=False)
    detail = Column(Text)
    score_delta = Column(Float, default=0.0) # Submitted score (0-100)
    confidence = Column(String(50), default="medium") # low, medium, high
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="evidence")
    skill = relationship("Skill", back_populates="evidence")

class RoleBenchmark(Base):
    __tablename__ = "role_benchmarks"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(255), unique=True, nullable=False, index=True) # e.g. "AI/ML Engineer"
    required_skills = Column(JSON, default=dict) # {"python": 90, "pytorch": 85, "rag": 80, ...}
    importance_weights = Column(JSON, default=dict) # {"python": 1.2, "pytorch": 1.5, ...}
    description = Column(Text)

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    stage_code = Column(String(10), nullable=False) # 01, 02, ... 12
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    question_type = Column(String(50), default="coding") # coding, multiple_choice, open_question
    prompt = Column(Text, nullable=False)
    starter_code = Column(Text)
    test_cases = Column(JSON, default=list)
    rubric = Column(JSON, default=dict)

    submissions = relationship("AssessmentSubmission", back_populates="assessment")

class AssessmentSubmission(Base):
    __tablename__ = "assessment_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    assessment_id = Column(Integer, ForeignKey("assessments.id", ondelete="CASCADE"), nullable=True)
    stage_id = Column(String(50), nullable=False)
    submitted_answer = Column(Text)
    score = Column(Float, default=0.0)
    depth_score = Column(Float, default=0.0)
    accuracy_score = Column(Float, default=0.0)
    clarity_score = Column(Float, default=0.0)
    feedback = Column(Text)
    missing_concepts = Column(JSON, default=list)
    test_results = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="assessments")
    assessment = relationship("Assessment", back_populates="submissions")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Generative AI & LLMs")
    difficulty = Column(String(50), default="Advanced")
    target_role = Column(String(255), default="AI/ML Engineer")
    problem_statement = Column(Text)
    objective = Column(Text)
    architecture = Column(Text)
    tech_stack = Column(JSON, default=list)
    milestones = Column(JSON, default=list)
    starter_code = Column(Text)
    evaluation_criteria = Column(JSON, default=list)
    interview_talking_points = Column(JSON, default=list)
    status = Column(String(50), default="active") # active, completed, in_progress
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="projects")

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    doc_type = Column(String(50), default="pdf") # pdf, url, note, text
    source_url = Column(String(500))
    raw_text = Column(Text)
    summary = Column(Text)
    key_concepts = Column(JSON, default=list)
    quiz_questions = Column(JSON, default=list)
    chunk_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="documents")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("knowledge_documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, default=0)
    content = Column(Text, nullable=False)
    page_number = Column(Integer, default=1)
    metadata_json = Column(JSON, default=dict)
    # Stored embedding as JSON float array for universal compatibility (SQLite/PostgreSQL)
    embedding_vector = Column(JSON, default=list)

    document = relationship("KnowledgeDocument", back_populates="chunks")

class MentorConversation(Base):
    __tablename__ = "mentor_conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), default="Mentor Session")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="conversations")
    messages = relationship("MentorMessage", back_populates="conversation", cascade="all, delete-orphan")

class MentorMessage(Base):
    __tablename__ = "mentor_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("mentor_conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(20), nullable=False) # 'user' or 'ai'
    text = Column(Text, nullable=False)
    code = Column(Text)
    diagram = Column(Text)
    suggested_actions = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    conversation = relationship("MentorConversation", back_populates="messages")

class InterviewResult(Base):
    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    question_title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    user_answer = Column(Text, nullable=False)
    overall_score = Column(Float, default=0.0)
    depth_score = Column(Float, default=0.0)
    accuracy_score = Column(Float, default=0.0)
    clarity_score = Column(Float, default=0.0)
    feedback_text = Column(Text)
    missing_concepts = Column(JSON, default=list)
    strengths = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="interview_results")

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    target_role = Column(String(255), default="AI/ML Engineer")
    description = Column(Text)

    steps = relationship("RoadmapStep", back_populates="roadmap", cascade="all, delete-orphan")

class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False)
    stage_code = Column(String(10), nullable=False) # "01", "02", ... "12"
    stage_number = Column(Integer, default=1)
    title = Column(String(255), nullable=False)
    icon = Column(String(50))
    description = Column(Text)
    prerequisites = Column(JSON, default=list) # e.g. ["01", "02"]
    estimated_hours = Column(Integer, default=15)
    progress = Column(Float, default=0.0)
    status = Column(String(50), default="locked") # locked, unlocked, active, completed, skipped

    roadmap = relationship("Roadmap", back_populates="steps")
    topics = relationship("LearningTopic", back_populates="step", cascade="all, delete-orphan")

class LearningTopic(Base):
    __tablename__ = "learning_topics"

    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("roadmap_steps.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    difficulty = Column(String(50), default="Intermediate")
    summary = Column(Text)
    code_example = Column(Text)

    step = relationship("RoadmapStep", back_populates="topics")
    progress_records = relationship("LearningProgress", back_populates="topic", cascade="all, delete-orphan")

class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    topic_id = Column(Integer, ForeignKey("learning_topics.id", ondelete="CASCADE"), nullable=False)
    completed = Column(Boolean, default=False)
    score = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="learning_progress")
    topic = relationship("LearningTopic", back_populates="progress_records")

class AIUsage(Base):
    __tablename__ = "ai_usage"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    endpoint = Column(String(100), nullable=False)
    provider = Column(String(50), nullable=False) # "gemini", "openai"
    model = Column(String(100), nullable=False)
    request_count = Column(Integer, default=1)
    estimated_tokens = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    feature = Column(String(50), default="general") # mentor, interview, project, roadmap, rag, assessment, general, bug
    entity_id = Column(String(100), nullable=True)
    rating = Column(Integer, default=5) # 1 to 5 stars
    sentiment = Column(String(20), default="positive") # positive, neutral, negative
    feedback_text = Column(Text, nullable=False)
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="feedbacks")

class BetaInvite(Base):
    __tablename__ = "beta_invites"

    id = Column(Integer, primary_key=True, index=True)
    code_hash = Column(String(255), unique=True, nullable=False, index=True)
    code_prefix = Column(String(30), nullable=False) # e.g. "BS-AI-7KQ9"
    max_uses = Column(Integer, default=1)
    used_count = Column(Integer, default=0)
    cohort = Column(String(50), default="aug-2026")
    expires_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    memberships = relationship("BetaMembership", back_populates="invite")

class BetaMembership(Base):
    __tablename__ = "beta_memberships"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    invite_id = Column(Integer, ForeignKey("beta_invites.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(50), default="active") # invited, active, paused, removed
    cohort = Column(String(50), default="aug-2026")
    initial_knowledge_score = Column(Float, default=72.0)
    onboarding_completed = Column(Boolean, default=False)
    current_onboarding_step = Column(Integer, default=1)
    completed_onboarding_steps = Column(JSON, default=list) # e.g. [1, 2]
    joined_at = Column(DateTime, default=datetime.utcnow)
    last_active_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="beta_membership")
    invite = relationship("BetaInvite", back_populates="memberships")

import os
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.future import select
from app.core.config import settings

# Engine setup with connection pooling for PostgreSQL and local fallback for SQLite
engine_kwargs = {
    "echo": False,
    "future": True,
    "pool_pre_ping": True
}

if "postgresql" in settings.DATABASE_URL.lower():
    engine_kwargs.update({
        "pool_size": settings.DB_POOL_SIZE,
        "max_overflow": settings.DB_MAX_OVERFLOW,
        "pool_timeout": settings.DB_POOL_TIMEOUT
    })

engine = create_async_engine(
    settings.DATABASE_URL,
    **engine_kwargs
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    """Create all database tables and seed baseline curriculum, skills, and default benchmarks."""
    from app.db.models import Base, Skill, RoleBenchmark, Roadmap, RoadmapStep, LearningTopic, User, UserProfile, UserSkill, SkillEvidence
    from app.core.security import get_password_hash

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        # SQLite schema migrations for existing databases
        try:
            from sqlalchemy import text
            await conn.execute(text("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user'"))
        except Exception:
            pass
        try:
            from sqlalchemy import text
            await conn.execute(text("ALTER TABLE feedback ADD COLUMN feature VARCHAR(50) DEFAULT 'general'"))
            await conn.execute(text("ALTER TABLE feedback ADD COLUMN entity_id VARCHAR(100)"))
            await conn.execute(text("ALTER TABLE feedback ADD COLUMN sentiment VARCHAR(20) DEFAULT 'positive'"))
            await conn.execute(text("ALTER TABLE feedback ADD COLUMN feedback_text TEXT"))
        except Exception:
            pass

    async with AsyncSessionLocal() as session:
        # Check if skills seeded
        res = await session.execute(select(Skill))
        existing_skills = res.scalars().all()
        
        if not existing_skills:
            initial_skills_data = [
                {
                    "code": "python",
                    "name": "Python & AsyncIO",
                    "category": "programming",
                    "description": "Core programming, async syntax, type hinting, generators, OOP, memory optimization, and performance profiling.",
                    "prerequisites": [],
                    "practice_task": "Build a custom thread-pool executor and benchmark against Python asyncio loop.",
                    "project_idea": "FastAPI High-Concurrency Microservice",
                    "resources": [{"title": "Fluent Python", "type": "Book", "url": "https://docs.python.org/3/"}]
                },
                {
                    "code": "sql",
                    "name": "SQL & Relational DBs",
                    "category": "programming",
                    "description": "PostgreSQL indexing, CTE queries, transaction isolation, window functions, and query optimization.",
                    "prerequisites": ["python"],
                    "practice_task": "Optimize a 10M row table using B-Tree and BRIN indexes.",
                    "project_idea": "Analytical Dashboard Backend",
                    "resources": [{"title": "PostgreSQL Manual", "type": "Docs", "url": "https://postgresql.org/docs"}]
                },
                {
                    "code": "math",
                    "name": "Linear Algebra & Calculus",
                    "category": "math",
                    "description": "Matrix operations, eigenvalues, eigenvectors, gradients, Jacobians, and Hessians for optimization.",
                    "prerequisites": [],
                    "practice_task": "Implement singular value decomposition (SVD) from scratch in pure NumPy.",
                    "project_idea": "Dimensionality Reduction Engine",
                    "resources": [{"title": "3Blue1Brown Linear Algebra", "type": "Video", "url": "https://3blue1brown.com"}]
                },
                {
                    "code": "statistics",
                    "name": "Statistics & Probability",
                    "category": "math",
                    "description": "Hypothesis testing, Bayes Theorem, probability distributions, variance, covariance, and confidence intervals.",
                    "prerequisites": [],
                    "practice_task": "Perform A/B test hypothesis testing using SciPy stats module.",
                    "project_idea": "Statistical Model Evaluator",
                    "resources": [{"title": "StatQuest ML Statistics", "type": "Video", "url": "https://statquest.org"}]
                },
                {
                    "code": "ml",
                    "name": "Machine Learning Foundations",
                    "category": "ml",
                    "description": "Supervised/unsupervised algorithms, regularization, bias-variance tradeoff, and cross-validation.",
                    "prerequisites": ["python", "math", "statistics"],
                    "practice_task": "Implement Gradient Boosting Trees from scratch and compare with XGBoost.",
                    "project_idea": "Customer Churn Prediction Engine",
                    "resources": [{"title": "Hands-On ML with Scikit-Learn", "type": "Book", "url": "https://oreilly.com"}]
                },
                {
                    "code": "pytorch",
                    "name": "Deep Learning & PyTorch",
                    "category": "dl",
                    "description": "Tensors, autograd, custom neural network modules, loss functions, optimizers, and GPU acceleration.",
                    "prerequisites": ["python", "ml"],
                    "practice_task": "Train a multi-layer perceptron from scratch with dynamic autograd backprop.",
                    "project_idea": "Custom Image Classifier with Transfer Learning",
                    "resources": [{"title": "Deep Learning with PyTorch", "type": "Book", "url": "https://pytorch.org"}]
                },
                {
                    "code": "transformers",
                    "name": "Transformer Architecture & Attention",
                    "category": "genai",
                    "description": "Self-attention mechanism, multi-head attention, positional encoding, encoder-decoder networks.",
                    "prerequisites": ["pytorch"],
                    "practice_task": "Implement Scaled Dot-Product Attention in 50 lines of PyTorch.",
                    "project_idea": "Mini GPT Character Generator",
                    "resources": [{"title": "Attention Is All You Need", "type": "Paper", "url": "https://arxiv.org/abs/1706.03762"}]
                },
                {
                    "code": "nlp_cv",
                    "name": "NLP & Computer Vision",
                    "category": "ml",
                    "description": "Tokenization, embeddings, BERT, Vision Transformers (ViT), and CNN architectures.",
                    "prerequisites": ["transformers"],
                    "practice_task": "Fine-tune BERT for multi-class sentiment analysis with PyTorch Lightning.",
                    "project_idea": "Document Classification & OCR Pipeline",
                    "resources": [{"title": "HuggingFace NLP Course", "type": "Course", "url": "https://huggingface.co/course"}]
                },
                {
                    "code": "llm",
                    "name": "LLM Fine-Tuning & Quantization",
                    "category": "genai",
                    "description": "LoRA, QLoRA, PEFT, quantization (AWQ, GGUF), instruction fine-tuning, and alignment (DPO).",
                    "prerequisites": ["transformers"],
                    "practice_task": "Fine-tune Mistral-7B using QLoRA on a custom medical QA dataset.",
                    "project_idea": "Domain-Specific Assistant LLM",
                    "resources": [{"title": "PEFT Documentation", "type": "Docs", "url": "https://huggingface.co/docs/peft"}]
                },
                {
                    "code": "rag",
                    "name": "RAG & Vector Databases",
                    "category": "genai",
                    "description": "Hierarchical chunking, embeddings, dense retrieval, reranking, hybrid search, and vector databases (pgvector/Qdrant).",
                    "prerequisites": ["python", "llm"],
                    "practice_task": "Build a hybrid BM25 + dense vector retriever with Cohere reranking.",
                    "project_idea": "Enterprise Documentation Q&A Engine",
                    "resources": [{"title": "LangChain RAG Handbook", "type": "Guide", "url": "https://langchain.com"}]
                },
                {
                    "code": "agents",
                    "name": "AI Agents & Tool Calling",
                    "category": "genai",
                    "description": "ReAct prompting, multi-agent coordination, LangGraph, tool invocation, and state machines.",
                    "prerequisites": ["rag"],
                    "practice_task": "Build a 3-agent research system that writes and fact-checks technical reports.",
                    "project_idea": "Autonomous Code Review Agent",
                    "resources": [{"title": "LangGraph Docs", "type": "Docs", "url": "https://langchain-ai.github.io/langgraph"}]
                },
                {
                    "code": "mlops",
                    "name": "MLOps & LLMOps Pipeline",
                    "category": "mlops",
                    "description": "vLLM serving, model monitoring, MLflow tracking, Docker containerization, CI/CD for ML, and Prometheus metrics.",
                    "prerequisites": ["python", "pytorch"],
                    "practice_task": "Deploy a model with vLLM behind a FastAPI load balancer with p99 latency alerts.",
                    "project_idea": "Production AI Model Gateway",
                    "resources": [{"title": "Full Stack LLM Bootcamp", "type": "Course", "url": "https://fullstackdeeplearning.com"}]
                },
                {
                    "code": "system_design",
                    "name": "AI System Design",
                    "category": "system_design",
                    "description": "High-throughput inference architecture, caching, streaming token delivery, and distributed training.",
                    "prerequisites": ["mlops", "rag"],
                    "practice_task": "Design a scalable multimodal search engine capable of 10,000 QPS.",
                    "project_idea": "High-Availability Vector Search Cluster",
                    "resources": [{"title": "Designing Machine Learning Systems", "type": "Book", "url": "https://oreilly.com"}]
                }
            ]
            
            for s_data in initial_skills_data:
                session.add(Skill(**s_data))
            await session.commit()

        # Seed Role Benchmarks
        res = await session.execute(select(RoleBenchmark))
        if not res.scalars().first():
            benchmarks = [
                RoleBenchmark(
                    role_name="AI/ML Engineer",
                    required_skills={
                        "python": 90.0,
                        "math": 75.0,
                        "statistics": 80.0,
                        "ml": 85.0,
                        "pytorch": 85.0,
                        "transformers": 80.0,
                        "llm": 80.0,
                        "rag": 85.0,
                        "agents": 75.0,
                        "mlops": 75.0,
                        "system_design": 75.0
                    },
                    importance_weights={
                        "pytorch": 1.4,
                        "rag": 1.3,
                        "mlops": 1.3,
                        "system_design": 1.2,
                        "transformers": 1.2,
                        "python": 1.1,
                        "ml": 1.1
                    },
                    description="Standard production-grade AI/ML Engineer building enterprise models, RAG systems, and scalable inference pipelines."
                ),
                RoleBenchmark(
                    role_name="Generative AI & LLM Engineer",
                    required_skills={
                        "python": 90.0,
                        "transformers": 90.0,
                        "llm": 90.0,
                        "rag": 90.0,
                        "agents": 85.0,
                        "pytorch": 80.0,
                        "mlops": 75.0,
                        "system_design": 80.0
                    },
                    importance_weights={
                        "rag": 1.5,
                        "agents": 1.4,
                        "llm": 1.4,
                        "transformers": 1.3,
                        "system_design": 1.2
                    },
                    description="Specialist in Large Language Models, fine-tuning, autonomous agents, and enterprise RAG architecture."
                ),
                RoleBenchmark(
                    role_name="MLOps Specialist",
                    required_skills={
                        "python": 90.0,
                        "mlops": 95.0,
                        "system_design": 90.0,
                        "ml": 75.0,
                        "pytorch": 75.0,
                        "rag": 70.0
                    },
                    importance_weights={
                        "mlops": 1.6,
                        "system_design": 1.5,
                        "python": 1.2
                    },
                    description="Specialist in model serving, containerization, GPU cluster orchestration, CI/CD, and real-time observability."
                )
            ]
            for b in benchmarks:
                session.add(b)
            await session.commit()

        # Seed Roadmap & 12 Stages
        res = await session.execute(select(Roadmap))
        if not res.scalars().first():
            roadmap = Roadmap(
                title="AI/ML Engineer Accelerated Roadmap",
                target_role="AI/ML Engineer",
                description="Comprehensive 12-stage mastery roadmap covering foundational Python all the way to production LLMOps & AI System Design."
            )
            session.add(roadmap)
            await session.flush()

            stages_data = [
                {"code": "01", "num": 1, "title": "Python & AsyncIO", "icon": "Code", "hours": 15, "desc": "Advanced Python, Generators, AsyncIO, and FastAPI.", "prereqs": []},
                {"code": "02", "num": 2, "title": "Mathematics & Statistics", "icon": "BarChart3", "hours": 20, "desc": "Linear algebra, multivariable calculus, probability and hypothesis testing.", "prereqs": ["01"]},
                {"code": "03", "num": 3, "title": "Machine Learning Foundations", "icon": "Brain", "hours": 25, "desc": "Scikit-Learn, algorithms, gradient descent, bias-variance trade-off.", "prereqs": ["01", "02"]},
                {"code": "04", "num": 4, "title": "Deep Learning & PyTorch", "icon": "Layers", "hours": 30, "desc": "Tensors, autograd, backpropagation, and custom neural architectures.", "prereqs": ["03"]},
                {"code": "05", "num": 5, "title": "Transformers & Attention", "icon": "Zap", "hours": 25, "desc": "Multi-head attention, self-attention, encoder-decoder, and ViT.", "prereqs": ["04"]},
                {"code": "06", "num": 6, "title": "NLP & Computer Vision", "icon": "Sparkles", "hours": 20, "desc": "Tokenizers, embeddings, sentiment classification, and object detection.", "prereqs": ["05"]},
                {"code": "07", "num": 7, "title": "LLMs & Fine-Tuning", "icon": "Flame", "hours": 30, "desc": "PEFT, LoRA, QLoRA, instruction tuning, DPO, and quantization.", "prereqs": ["05"]},
                {"code": "08", "num": 8, "title": "RAG & Vector Search", "icon": "Database", "hours": 25, "desc": "Document chunking, dense retrieval, hybrid search, pgvector, and reranking.", "prereqs": ["01", "07"]},
                {"code": "09", "num": 9, "title": "AI Agents & LangGraph", "icon": "Rocket", "hours": 25, "desc": "ReAct framework, LangGraph state machines, multi-agent orchestration.", "prereqs": ["08"]},
                {"code": "10", "num": 10, "title": "MLOps & LLMOps", "icon": "FolderGit2", "hours": 20, "desc": "vLLM, Docker, model serving, Prometheus monitoring, and CI/CD.", "prereqs": ["04", "08"]},
                {"code": "11", "num": 11, "title": "AI System Design", "icon": "Award", "hours": 25, "desc": "High-scale inference architectures, caching, latency optimization.", "prereqs": ["09", "10"]},
                {"code": "12", "num": 12, "title": "Career & Portfolio", "icon": "CheckCircle2", "hours": 15, "desc": "Staff-level interview preparation, production portfolio projects, and technical writing.", "prereqs": ["11"]}
            ]

            for s in stages_data:
                step = RoadmapStep(
                    roadmap_id=roadmap.id,
                    stage_code=s["code"],
                    stage_number=s["num"],
                    title=s["title"],
                    icon=s["icon"],
                    estimated_hours=s["hours"],
                    description=s["desc"],
                    prerequisites=s["prereqs"],
                    status="unlocked" if s["num"] <= 3 else "locked"
                )
                session.add(step)
                await session.flush()

                # Add topics
                sample_topics = [
                    f"{s['title']} Core Concepts",
                    f"{s['title']} Practical Implementation",
                    f"{s['title']} Production Optimization"
                ]
                for t in sample_topics:
                    topic = LearningTopic(
                        step_id=step.id,
                        name=t,
                        difficulty="Intermediate"
                    )
                    session.add(topic)

            await session.commit()

        # Seed Default Demo User (Alex Rivera)
        res = await session.execute(select(User).where(User.email == "alex.rivera@example.com"))
        user = res.scalar_one_or_none()
        if not user:
            user = User(
                email="alex.rivera@example.com",
                full_name="Alex Rivera",
                hashed_password=get_password_hash("password123"),
                is_active=True
            )
            session.add(user)
            await session.flush()

            profile = UserProfile(
                user_id=user.id,
                target_role="AI/ML Engineer",
                experience_level="Intermediate",
                knowledge_score=72.0,
                readiness_score=68.0,
                streak_days=12,
                total_hours=47.0,
                domain_scores={
                    "Programming": 85,
                    "Mathematics": 62,
                    "MachineLearning": 65,
                    "DeepLearning": 48,
                    "GenerativeAI": 78,
                    "AIEngineering": 75,
                    "MLOps": 35,
                    "SystemDesign": 40
                }
            )
            session.add(profile)
            await session.flush()

            # Seed user initial skills
            res_skills = await session.execute(select(Skill))
            all_skills = res_skills.scalars().all()
            
            initial_scores = {
                "python": 88.0,
                "sql": 82.0,
                "math": 62.0,
                "statistics": 62.0,
                "ml": 65.0,
                "pytorch": 48.0,
                "transformers": 60.0,
                "nlp_cv": 55.0,
                "llm": 72.0,
                "rag": 82.0,
                "agents": 50.0,
                "mlops": 35.0,
                "system_design": 40.0
            }

            for s in all_skills:
                sc = initial_scores.get(s.code, 50.0)
                status = "mastered" if sc >= 80 else ("in_progress" if sc >= 40 else "locked")
                u_skill = UserSkill(
                    user_id=user.id,
                    skill_id=s.id,
                    current_score=sc,
                    target_score=85.0,
                    confidence=0.85 if sc >= 70 else 0.65,
                    status=status,
                    evidence_count=2
                )
                session.add(u_skill)
                await session.flush()

                # Add initial evidence
                ev1 = SkillEvidence(
                    user_id=user.id,
                    skill_id=s.id,
                    evidence_type="quiz",
                    title=f"{s.name} Diagnostic Assessment",
                    detail=f"Scored {int(sc)}% on initial assessment.",
                    score_delta=sc,
                    confidence="high" if sc >= 80 else "medium"
                )
                session.add(ev1)

            await session.commit()
            print("Database initialized and default curriculum seeded successfully.")

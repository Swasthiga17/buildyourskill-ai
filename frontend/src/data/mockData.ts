import { SkillNode, UserTwinProfile, RoadmapPhase, DailyPlan, ProjectBlueprint, MockQuestion } from '../types';

export const initialProfile: UserTwinProfile = {
  name: 'Buddy',
  role: 'Full Stack Engineer',
  targetRole: 'Generative AI / ML Engineer',
  knowledgeScore: 72,
  readinessScore: 68,
  streakDays: 12,
  totalHours: 47,
  projectsCount: 4,
  domainScores: {
    Programming: 85,
    Mathematics: 62,
    MachineLearning: 65,
    DeepLearning: 48,
    GenerativeAI: 78,
    AIEngineering: 75,
    MLOps: 35,
    SystemDesign: 40
  }
};

export const initialSkills: SkillNode[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    status: 'learned',
    currentScore: 88,
    requiredScore: 90,
    description: 'Core programming, async syntax, type hinting, generators, object-oriented concepts, and performance profiling.',
    prerequisites: [],
    resources: [
      { title: 'Fluent Python 2nd Edition', url: 'https://docs.python.org/3/', type: 'Book' },
      { title: 'Python Async Deep Dive', url: 'https://realpython.com', type: 'Article' }
    ],
    practiceTask: 'Build a custom thread-pool executor and benchmark against Python asyncio loop.',
    projectIdea: 'FastAPI High-Concurrency Microservice',
    evidence: [
      { id: 'ev-1', type: 'github', title: 'Repository: fast-rag-api', detail: 'Demonstrated proficiency in Python 3.11, Pydantic v2, and AsyncIO.', confidence: 'high', date: '2 days ago' },
      { id: 'ev-2', type: 'quiz', title: 'Python Advanced Assessment', detail: 'Scored 92% on memory optimization and GIL concurrency.', confidence: 'high', date: '1 week ago' }
    ]
  },
  {
    id: 'sql',
    name: 'SQL & Relational DBs',
    category: 'programming',
    status: 'learned',
    currentScore: 82,
    requiredScore: 85,
    description: 'PostgreSQL indexing, CTE queries, transaction isolation, window functions, and query optimization.',
    prerequisites: ['python'],
    resources: [
      { title: 'PostgreSQL High Performance Manual', url: 'https://postgresql.org/docs', type: 'Docs' }
    ],
    practiceTask: 'Optimize a 10M row table using B-Tree and BRIN indexes.',
    projectIdea: 'Analytical Dashboard Backend',
    evidence: [
      { id: 'ev-3', type: 'github', title: 'Repository: ecommerce-analytics', detail: 'Complex SQL joins, CTEs, and window functions used.', confidence: 'high', date: '3 weeks ago' }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics & Probability',
    category: 'math',
    status: 'learning',
    currentScore: 62,
    requiredScore: 80,
    description: 'Hypothesis testing, Bayes Theorem, probability distributions, variance, covariance, and confidence intervals.',
    prerequisites: [],
    resources: [
      { title: 'StatQuest: Probability & ML Statistics', url: 'https://statquest.org', type: 'Video' }
    ],
    practiceTask: 'Perform A/B test hypothesis testing using SciPy stats module.',
    projectIdea: 'Statistical Model Evaluator',
    evidence: [
      { id: 'ev-4', type: 'quiz', title: 'Probability Basics Quiz', detail: 'Scored 65% on Gaussian distribution parameters.', confidence: 'medium', date: '5 days ago' }
    ]
  },
  {
    id: 'numpy',
    name: 'NumPy & Vectorization',
    category: 'programming',
    status: 'learned',
    currentScore: 80,
    requiredScore: 85,
    description: 'Multidimensional array operations, broadcasting rules, matrix multiplication, and memory layout.',
    prerequisites: ['python'],
    resources: [{ title: 'NumPy Docs', url: 'https://numpy.org', type: 'Docs' }],
    practiceTask: 'Implement matrix multiplication from scratch using vectorized NumPy ops.',
    projectIdea: 'Vector Operations Engine',
    evidence: [{ id: 'ev-5', type: 'github', title: 'Repository: numpy-scratch-nn', detail: 'Vectorized forward pass implemented.', confidence: 'high', date: '2 weeks ago' }]
  },
  {
    id: 'pandas',
    name: 'Pandas Data Analysis',
    category: 'programming',
    status: 'learned',
    currentScore: 78,
    requiredScore: 80,
    description: 'Dataframe manipulation, data cleaning, aggregation, merging, and feature engineering.',
    prerequisites: ['python', 'numpy'],
    resources: [{ title: 'Pandas Cookbook', url: 'https://pandas.pydata.org', type: 'Book' }],
    practiceTask: 'Clean and aggregate a 5GB CSV dataset using chunking and parquet conversion.',
    projectIdea: 'Automated EDA Tool',
    evidence: [{ id: 'ev-6', type: 'github', title: 'Repository: eda-notebooks', detail: 'Demonstrated clean data wrangling pipelines.', confidence: 'high', date: '1 month ago' }]
  },
  {
    id: 'ml_core',
    name: 'Machine Learning Fundamentals',
    category: 'ml',
    status: 'learning',
    currentScore: 65,
    requiredScore: 85,
    description: 'Supervised vs Unsupervised learning, linear regression, logistic regression, decision trees, random forests, XGBoost, cross-validation.',
    prerequisites: ['python', 'statistics', 'numpy'],
    resources: [{ title: 'ISLP - Introduction to Statistical Learning', url: 'https://statlearning.com', type: 'Book' }],
    practiceTask: 'Build a gradient boosting decision tree algorithm from mathematical equations.',
    projectIdea: 'Churn Prediction Model API',
    evidence: [{ id: 'ev-7', type: 'github', title: 'Repository: ml-experiments', detail: 'Scikit-learn model training pipeline committed.', confidence: 'medium', date: '10 days ago' }]
  },
  {
    id: 'pytorch',
    name: 'PyTorch & Tensors',
    category: 'dl',
    status: 'weak',
    currentScore: 48,
    requiredScore: 85,
    description: 'Autograd engine, nn.Module lifecycle, custom datasets, DataLoader, CUDA tensor management, loss functions, and optimization algorithms.',
    prerequisites: ['python', 'numpy', 'ml_core'],
    resources: [
      { title: 'PyTorch Deep Learning in 60 Minutes', url: 'https://pytorch.org/tutorials', type: 'Course' },
      { title: 'Deep Learning with PyTorch', url: 'https://pytorch.org/assets/deep-learning-with-pytorch.pdf', type: 'Book' }
    ],
    practiceTask: 'Implement custom Autograd Function and training loop with gradient clipping.',
    projectIdea: 'PyTorch Vision Classifier Service',
    evidence: [{ id: 'ev-8', type: 'quiz', title: 'PyTorch Basics Quiz', detail: 'Scored 48% on autograd backprop mechanics.', confidence: 'low', date: '3 days ago' }]
  },
  {
    id: 'deep_learning',
    name: 'Deep Learning Architecture',
    category: 'dl',
    status: 'weak',
    currentScore: 45,
    requiredScore: 80,
    description: 'Multilayer Perceptrons, Convolutional Networks, Recurrent Neural Networks, activation functions (ReLU, GELU), batch normalization, dropout.',
    prerequisites: ['pytorch', 'statistics'],
    resources: [{ title: 'Deep Learning by Ian Goodfellow', url: 'https://deeplearningbook.org', type: 'Book' }],
    practiceTask: 'Implement ResNet skip-connections and evaluate gradient flow.',
    projectIdea: 'Custom Image Classification Network',
    evidence: []
  },
  {
    id: 'transformers',
    name: 'Transformers & Attention',
    category: 'genai',
    status: 'learning',
    currentScore: 70,
    requiredScore: 85,
    description: 'Self-attention, Multi-Head Attention, Scaled Dot-Product, Positional Encoding, Encoder-Decoder architectures, BERT, GPT tokenization.',
    prerequisites: ['pytorch', 'deep_learning'],
    resources: [
      { title: 'Attention Is All You Need (Paper)', url: 'https://arxiv.org/abs/1706.03762', type: 'Paper' },
      { title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Article' }
    ],
    practiceTask: 'Write MultiHeadAttention module in PyTorch with mask support.',
    projectIdea: 'Mini-GPT Model from Scratch',
    evidence: [{ id: 'ev-9', type: 'github', title: 'Repository: mini-gpt-scratch', detail: 'Basic single-head attention implemented in PyTorch.', confidence: 'high', date: '1 week ago' }]
  },
  {
    id: 'llms',
    name: 'LLM Fine-Tuning & Prompting',
    category: 'genai',
    status: 'learned',
    currentScore: 78,
    requiredScore: 85,
    description: 'Prompt engineering techniques, Chain-of-Thought, Few-Shot prompting, LoRA, QLoRA, PEFT, HuggingFace Transformers, instruction tuning.',
    prerequisites: ['transformers'],
    resources: [{ title: 'HuggingFace Deep Learning Course', url: 'https://huggingface.co/learn', type: 'Course' }],
    practiceTask: 'Fine-tune Llama-3-8B using QLoRA on a domain-specific dataset.',
    projectIdea: 'Domain Specific LLM Assistant',
    evidence: [{ id: 'ev-10', type: 'github', title: 'Repository: llm-finetune-lora', detail: 'LoRA fine-tuning script for Mistral-7B committed.', confidence: 'high', date: '4 days ago' }]
  },
  {
    id: 'rag',
    name: 'Advanced RAG & Vector Search',
    category: 'ai_eng',
    status: 'learned',
    currentScore: 82,
    requiredScore: 85,
    description: 'Document parsing, semantic chunking strategies, vector embeddings, cosine similarity, pgvector, hybrid search (dense + BM25), reranking models.',
    prerequisites: ['llms', 'sql'],
    resources: [
      { title: 'RAG Architecture Guide 2026', url: 'https://langchain.com', type: 'Guide' }
    ],
    practiceTask: 'Build hybrid retrieval engine using PostgreSQL pgvector + Cohere Rerank API.',
    projectIdea: 'Enterprise Knowledge Twin RAG Pipeline',
    evidence: [{ id: 'ev-11', type: 'github', title: 'Repository: rag-pdf-assistant', detail: 'Production hybrid RAG implemented with pgvector & reranker.', confidence: 'high', date: 'Yesterday' }]
  },
  {
    id: 'agents',
    name: 'AI Agents & LangGraph',
    category: 'ai_eng',
    status: 'learning',
    currentScore: 72,
    requiredScore: 85,
    description: 'ReAct framework, Tool Calling, Multi-Agent Coordination, LangGraph stateful graphs, plan-and-execute agents, memory management.',
    prerequisites: ['rag', 'llms'],
    resources: [{ title: 'LangGraph Official Documentation', url: 'https://langchain-ai.github.io/langgraph/', type: 'Docs' }],
    practiceTask: 'Build a multi-agent system with Router, Coder, and Reviewer nodes.',
    projectIdea: 'Autonomous Research & Coding Agent',
    evidence: [{ id: 'ev-12', type: 'upload', title: 'Uploaded: Agentic_Design_Notes.md', detail: 'Extensive notes on stateful agent loops parsed.', confidence: 'high', date: '6 days ago' }]
  },
  {
    id: 'fastapi',
    name: 'FastAPI & Async Backends',
    category: 'ai_eng',
    status: 'learned',
    currentScore: 85,
    requiredScore: 85,
    description: 'FastAPI routing, dependency injection, Pydantic validation, streaming responses (SSE), background tasks, CORS, OAuth2 JWT auth.',
    prerequisites: ['python'],
    resources: [{ title: 'FastAPI Web Framework', url: 'https://fastapi.tiangolo.com', type: 'Docs' }],
    practiceTask: 'Build streaming response API for LLM tokens using Server-Sent Events.',
    projectIdea: 'Production AI Inference API',
    evidence: [{ id: 'ev-13', type: 'github', title: 'Repository: fast-rag-api', detail: 'Production FastAPI service with JWT auth built.', confidence: 'high', date: '1 week ago' }]
  },
  {
    id: 'mlops',
    name: 'MLOps & Model Deployment',
    category: 'mlops',
    status: 'missing',
    currentScore: 35,
    requiredScore: 75,
    description: 'Docker containerization, MLflow experiment tracking, Model registry, CI/CD pipelines, Triton inference server, Kubernetes basics, Prometheus monitoring.',
    prerequisites: ['fastapi', 'pytorch'],
    resources: [
      { title: 'MLOps Specialization by Andrew Ng', url: 'https://coursera.org', type: 'Course' },
      { title: 'Full Stack Deep Learning MLOps', url: 'https://fullstackdeeplearning.com', type: 'Course' }
    ],
    practiceTask: 'Dockerize a PyTorch model endpoint and serve with Gunicorn + Uvicorn workers.',
    projectIdea: 'Automated Model CI/CD Pipeline',
    evidence: [{ id: 'ev-14', type: 'quiz', title: 'MLOps Diagnostics Quiz', detail: 'Scored 35% on Docker multi-stage builds & Kubernetes pods.', confidence: 'low', date: '2 days ago' }]
  },
  {
    id: 'system_design',
    name: 'AI System Design & Scalability',
    category: 'system_design',
    status: 'missing',
    currentScore: 40,
    requiredScore: 80,
    description: 'High-throughput RAG systems, KV Cache management, vLLM / Ollama serving, load balancing, rate limiting, vector database indexing (HNSW, IVFFlat), cost optimization.',
    prerequisites: ['mlops', 'rag'],
    resources: [{ title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net', type: 'Book' }],
    practiceTask: 'Design a system architecture capable of serving 10,000 concurrent LLM RAG queries.',
    projectIdea: 'Distributed AI Inference Gateway',
    evidence: []
  }
];

export const initialRoadmap: RoadmapPhase[] = [
  {
    id: 1,
    phaseNumber: 1,
    stageCode: 'STAGE_01',
    title: '🐍 Python & Software Engineering',
    category: 'Foundations',
    duration: '2 Weeks',
    readiness: 90,
    status: 'completed',
    icon: 'Code',
    skills: ['Python', 'Git', 'FastAPI', 'DSA'],
    tools: ['Python 3.11', 'Git', 'GitHub', 'FastAPI', 'pytest'],
    learnTopics: [
      'Python Fundamentals & Type Hinting',
      'Object-Oriented Programming (OOP) & Design Patterns',
      'Functions, Generators & Iterators',
      'Exception Handling & Context Managers',
      'Virtual Environments & Dependency Management',
      'REST API Design & AsyncIO Concurrency',
      'Automated Testing with pytest',
      'Git Workflow & GitHub Actions CI',
      'Core Data Structures & Algorithms'
    ],
    description: 'Master production Python code quality, async APIs, and modular software engineering principles required for scalable ML microservices.',
    objectives: [
      'Write clean, typed Python 3.11+ code with pydantic v2',
      'Build async FastAPI REST microservice with dependency injection',
      'Set up automated unit testing pipelines with pytest'
    ],
    practice: 'Build a custom async thread-pool executor with benchmark testing.',
    project: 'Production-Style REST API for ML Model Inference',
    projectLevel: 'Beginner',
    masteryTest: 'Build, test, and deploy a typed Python app without relying heavily on tutorials.',
    interviewQuestions: ['Explain Python GIL and AsyncIO concurrency vs Multiprocessing.'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/fEUdeu-_mvx55nKjwalW1E4gaT9Fabis62JGRtNCz9UlEyhI4K3nmh_0FigMP5rpqZ-8UosryMbdQDTWh3gjfJAmzAHmNYkNA_tcJmE2QgPTnO1VWQD7nJL-EVH5wdCmLiCbTeI5OjTjxioFwLYa9AdtZWVXHZZdEkVoOMFHsgt2azBbhmDryB2FZqDQ676t?purpose=fullsize',
    personaStatuses: {
      userA: 'skipped',
      userB: 'skipped',
      userC: 'skipped',
      alex: 'completed'
    }
  },
  {
    id: 2,
    phaseNumber: 2,
    stageCode: 'STAGE_02',
    title: '📊 Mathematics & Statistics for ML',
    category: 'Foundations',
    duration: '2 Weeks',
    readiness: 75,
    status: 'completed',
    icon: 'Binary',
    skills: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics'],
    tools: ['NumPy', 'SciPy', 'SymPy', 'Matplotlib'],
    learnTopics: [
      'Linear Algebra: Vectors, Matrices & Matrix Multiplication',
      'Dot Product, Cosine Similarity & Vector Projections',
      'Eigenvalues & Eigenvectors in Dimensionality Reduction',
      'Statistics: Mean, Variance, Covariance & Standard Deviation',
      'Probability Distributions (Gaussian, Bernoulli, Poisson)',
      'Bayes Theorem & Maximum Likelihood Estimation (MLE)',
      'Hypothesis Testing, p-values & Confidence Intervals',
      'Calculus: Derivatives, Partial Derivatives & Gradients',
      'Gradient Descent Optimization & Learning Rate Decay'
    ],
    description: 'Practical mathematics needed for ML. Focus strictly on vector algebra, gradient descent mechanics, and hypothesis testing.',
    objectives: [
      'Derive gradient descent update rule for Loss functions',
      'Perform hypothesis testing and A/B test analysis using SciPy',
      'Understand matrix transformations for embedding spaces'
    ],
    practice: 'Implement vector dot product, cosine similarity, and matrix multiplication from scratch.',
    project: 'Statistical Analysis & Hypothesis Testing Suite for ML Features',
    projectLevel: 'Beginner',
    masteryTest: 'Mathematical derivation of Gradient Descent and SciPy hypothesis test challenge.',
    interviewQuestions: ['Explain Bayes Theorem and how MLE differs from MAP estimation.'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/h7jq2dKyEC79Mky3_fr3JFLkZCOpnjsMmx1P_zbBcDEC-EHOjo6XEvMthP0FTfSbQa0ZXr2zNoH_cuDiFz2qeJCXBJJMXGkf0H5RqL1yLDaY4K7cfo47UA9413NIrsic6SsOq4-gNrku42VNzNz6rwOaBObieajrRznKcdyr-IVhKdd_yoY3rrCQ8bwIo2wX?purpose=fullsize',
    personaStatuses: {
      userA: 'completed',
      userB: 'skipped',
      userC: 'skipped',
      alex: 'completed'
    }
  },
  {
    id: 3,
    phaseNumber: 3,
    stageCode: 'STAGE_03',
    title: '🗃️ Data Engineering & EDA for ML',
    category: 'Foundations',
    duration: '2 Weeks',
    readiness: 82,
    status: 'completed',
    icon: 'Database',
    skills: ['NumPy', 'Pandas', 'SQL', 'Feature Engineering'],
    tools: ['NumPy', 'Pandas', 'PostgreSQL', 'Seaborn', 'DuckDB'],
    learnTopics: [
      'NumPy Vectorization & Memory Layout',
      'Pandas Dataframe Manipulation & Aggregation',
      'Data Cleaning: Missing Values & Outlier Detection',
      'Categorical Encoding (One-Hot, Target, Ordinal)',
      'Feature Scaling (MinMax, Standard, Robust Scaling)',
      'Exploratory Data Analysis (EDA) & Data Visualization',
      'Advanced SQL: Window Functions, CTEs & Query Optimization'
    ],
    description: 'Transform raw data into clean ML feature pipelines using vectorized NumPy, Pandas dataframes, and analytical SQL.',
    objectives: [
      'Build scalable data cleaning & feature engineering pipelines',
      'Execute analytical SQL queries with CTEs and windowing',
      'Perform automated EDA with statistical visual reporting'
    ],
    practice: 'Clean and aggregate 5GB dataset using chunking and parquet format.',
    project: 'End-to-End Customer Analytics Data Pipeline (SQL → Pandas → EDA)',
    projectLevel: 'Beginner',
    masteryTest: 'Pandas & SQL data wrangling benchmark challenge.',
    interviewQuestions: ['How do you handle severe data imbalance and target leakage?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/L1iD5RLrq5NPycjXGWazI_xqY5RFg56fPjZ9TnxL9ugO9j48u5ESSeXhZTc7VbEaUXGd495nFL55Et5Bxz7h2I5JXxqtI7d5vDmvuJI3x_GdO4V7X7gVM2uAu4isXaaovwoRmclRSj_NYy_E3Ma9U3RPRzUdu1lL9ZGdJxkh9-ED9i_3cvUEylap6ml-5Fnj?purpose=fullsize',
    personaStatuses: {
      userA: 'skipped',
      userB: 'skipped',
      userC: 'skipped',
      alex: 'completed'
    }
  },
  {
    id: 4,
    phaseNumber: 4,
    stageCode: 'STAGE_04',
    title: '🤖 Core Machine Learning',
    category: 'Core ML',
    duration: '3 Weeks',
    readiness: 68,
    status: 'in_progress',
    icon: 'Cpu',
    skills: ['Scikit-Learn', 'XGBoost', 'Supervised ML', 'Evaluation'],
    tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'Optuna', 'Joblib'],
    learnTopics: [
      'Supervised Learning: Linear & Logistic Regression',
      'Decision Trees, Random Forests & Ensemble Methods',
      'Gradient Boosting & XGBoost Hyperparameter Tuning',
      'Unsupervised Learning: K-Means, Hierarchical Clustering & PCA',
      'Train/Val/Test Splits & K-Fold Cross-Validation',
      'Bias-Variance Tradeoff, Overfitting & Regularization (L1/L2)',
      'Evaluation Metrics: Accuracy, Precision, Recall, F1, ROC-AUC, MAE, RMSE'
    ],
    description: 'Master classical machine learning algorithms, ensemble trees, hyperparameter tuning with Optuna, and evaluation metrics.',
    objectives: [
      'Implement Linear Regression and Logistic Regression from mathematical equations',
      'Train XGBoost classifier with cross-validation',
      'Evaluate model performance using ROC-AUC and Precision-Recall curves'
    ],
    practice: 'Write Decision Tree node splitting algorithm in Python.',
    project: 'Customer Churn Prediction Engine with Model Evaluation',
    projectLevel: 'Intermediate',
    masteryTest: 'Scikit-learn model training and hyperparameter optimization challenge.',
    interviewQuestions: ['Explain the Bias-Variance Tradeoff and when to use L1 vs L2 regularization.'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/i27xhpjXX2PvNGc3D1PJgiB1OfVdBZ8gMI_VM3mGWMF5So4xJoauZxrhuCz-uhWbI7T87KcEIYInOC0XXvSBQHITgHuZ9hbmntgo9ExQ4pndZzzZrfZoKNglnOX6eO-T-bavJmSfiup3xgKdyyRgIgew84TrTVhvV4rC6jYFOJ40uXMv_Df75Dg3nIDmWJmc?purpose=fullsize',
    personaStatuses: {
      userA: 'in_progress',
      userB: 'in_progress',
      userC: 'skipped',
      alex: 'in_progress'
    }
  },
  {
    id: 5,
    phaseNumber: 5,
    stageCode: 'STAGE_05',
    title: '🧠 Deep Learning & PyTorch Mastery',
    category: 'Deep Learning',
    duration: '3 Weeks',
    readiness: 48,
    status: 'in_progress',
    icon: 'Brain',
    skills: ['PyTorch', 'Neural Networks', 'Autograd', 'CNN', 'RNN'],
    tools: ['PyTorch 2.4', 'CUDA', 'TensorBoard', 'Torchvision'],
    learnTopics: [
      'Perceptrons & Multilayer Neural Networks',
      'Activation Functions: ReLU, GELU, Sigmoid, Softmax',
      'Forward Pass & Autograd Computation Graph',
      'Backpropagation & Loss Functions (MSE, Cross-Entropy)',
      'Optimizers: SGD, AdamW & Learning Rate Schedulers',
      'Regularization: Dropout & Batch Normalization',
      'PyTorch Core: Tensors, Datasets, DataLoaders & Training Loops',
      'Convolutional Neural Networks (CNN) & Transfer Learning',
      'Recurrent Neural Networks (RNN), LSTM & GRU'
    ],
    description: 'Bridge your primary skill gap by building custom neural network architectures in PyTorch, managing CUDA tensors, and writing custom training loops.',
    objectives: [
      'Write custom PyTorch nn.Module with forward pass & backward graph',
      'Manage CUDA GPU tensor allocation and zero-grad optimizer loops',
      'Build custom ResNet CNN and Sentiment LSTM classifiers'
    ],
    practice: 'Implement custom PyTorch Autograd function and gradient clipping.',
    project: 'PyTorch Vision & Sentiment Classification REST Microservice',
    projectLevel: 'Intermediate',
    masteryTest: 'PyTorch Coding Assessment: Build custom ResNet residual block from scratch.',
    interviewQuestions: ['Explain the difference between model.eval() and torch.no_grad().'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/CsFhNYopvyb627jZ2FbHbuLAChks6ZFcXJJuGjluFqB5tMuaer6VxKnz9bq3eZsPQhJqSP4mAqd9nES7I1RVSMYXUYyHyHonlUvQ9_NenKGUEa7k3AbrGpto6593ruKRsXv3c0JtF_EMWs10KlO2dxuG6CwhmFTnEDNCd2_C7BpJ_S4YqPJTNFdJOT20dNe8?purpose=fullsize',
    personaStatuses: {
      userA: 'in_progress',
      userB: 'in_progress',
      userC: 'completed',
      alex: 'in_progress'
    }
  },
  {
    id: 6,
    phaseNumber: 6,
    stageCode: 'STAGE_06',
    title: '📝 NLP & Computer Vision Foundations',
    category: 'Specialization',
    duration: '2 Weeks',
    readiness: 65,
    status: 'upcoming',
    icon: 'Layers',
    skills: ['NLP', 'Computer Vision', 'Embeddings', 'Transfer Learning'],
    tools: ['HuggingFace Datasets', 'NLTK', 'OpenCV', 'TIMM'],
    learnTopics: [
      'NLP Track: Tokenization, Stopwords & TF-IDF',
      'Word Embeddings: Word2Vec, GloVe & FastText',
      'Sequence Models & Attention Mechanics in NLP',
      'CV Track: Image Preprocessing, Data Augmentation & OpenCV',
      'CNN Architectures: ResNet, EfficientNet & Vision Transformers',
      'Object Detection (YOLO) & Image Segmentation (U-Net)',
      'Specialization Selection: NLP / LLM Track vs CV Track'
    ],
    description: 'Explore both Natural Language Processing and Computer Vision foundations, allowing you to choose your primary specialization track.',
    objectives: [
      'Preprocess text and build TF-IDF + Word2Vec embedding models',
      'Fine-tune pre-trained Vision model (ResNet/TIMM) on custom images',
      'Select specialization track: GenAI/LLM or Vision'
    ],
    practice: 'Build image data augmentation pipeline using OpenCV and Albumentations.',
    project: 'Multimodal Image & Text Classification Pipeline',
    projectLevel: 'Intermediate',
    masteryTest: 'Build text tokenizer & image feature extractor.',
    interviewQuestions: ['How does Transfer Learning accelerate model convergence?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/J2PL-jfQ41E-_vWCSb4Ph4Cy6loeWWXmeDhq5yh4zrnuGvqM81wCfy4JiZ-qXTswcY6KvPe_dwPg1YdAwzkkvBuv3F4lywb43pTUAilvjB5x5ZbBeRQYH5yExFEstxE9U94ySJOTFM0QmUGdYdu1F-YdoWzUhlo3-O6lPS2Ho6LtRB2Y8G2dRJfxq4PJ8E7w?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'completed',
      alex: 'upcoming'
    }
  },
  {
    id: 7,
    phaseNumber: 7,
    stageCode: 'STAGE_07',
    title: '⚡ Transformers & Self-Attention Architecture',
    category: 'GenAI & LLMs',
    duration: '2 Weeks',
    readiness: 70,
    status: 'upcoming',
    icon: 'Zap',
    skills: ['Transformers', 'Self-Attention', 'BERT', 'GPT'],
    tools: ['PyTorch', 'HuggingFace Transformers', 'Tiktoken'],
    learnTopics: [
      'Mathematical Foundation of Scaled Dot-Product Attention',
      'Query (Q), Key (K) & Value (V) Matrix Projections',
      'Multi-Head Attention (MHA) & Masked Self-Attention',
      'Positional Encodings (Absolute Sinusoidal & RoPE)',
      'Encoder Architecture (BERT, RoBERTa) vs Decoder (GPT)',
      'Subword Tokenization (BPE, WordPiece, SentencePiece)',
      'Transformer Block Implementation from Scratch'
    ],
    description: 'The critical bridge to modern AI. Understand self-attention mathematics and build a Transformer block from scratch in PyTorch.',
    objectives: [
      'Derive Q, K, V attention matrices mathematically',
      'Implement MultiHeadAttention PyTorch module with causal mask',
      'Train a mini-Transformer language model on custom text'
    ],
    practice: 'Write scaled dot-product attention function and verify attention weights.',
    project: 'Mini-Transformer Text Generation Model from Scratch',
    projectLevel: 'Intermediate',
    masteryTest: 'Transformer architecture code review and attention matrix verification.',
    interviewQuestions: ['Why do we divide by sqrt(d_k) in Scaled Dot-Product Attention?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/0DJTxRi9-jyXYslN1QCFhF6-0uNoGvPZkRXi2S1zYj5V3TTGn_uP9KcZuhW8NDL77uiejp_eKf-6lb6Bzvxj-IrD0fhE8ebmepuDW9jXSPodmG6o9YdEM9HV9SYXuc-BEmQ6L1caN76MM03iRGLmz7uktIjlIrTCrhS0mzCGOVq_vQ8O3FQS_eIjFAHlsGiq?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'in_progress',
      userC: 'in_progress',
      alex: 'upcoming'
    }
  },
  {
    id: 8,
    phaseNumber: 8,
    stageCode: 'STAGE_08',
    title: '🧠 LLM Engineering & Fine-Tuning',
    category: 'GenAI & LLMs',
    duration: '3 Weeks',
    readiness: 78,
    status: 'upcoming',
    icon: 'Sparkles',
    skills: ['LLMs', 'Prompt Engineering', 'LoRA', 'QLoRA', 'PEFT'],
    tools: ['HuggingFace Transformers', 'PEFT', 'Unsloth', 'TRL', 'Ollama'],
    learnTopics: [
      'LLM Fundamentals: Context Windows, Tokens & Sampling Parameters',
      'Advanced Prompt Engineering: Chain-of-Thought & Few-Shot',
      'Structured Outputs (JSON Mode) & Tool Function Calling',
      'Model APIs (OpenAI, Gemini, Anthropic) & Local LLMs (Ollama)',
      'Fine-Tuning Concepts: Full Fine-Tuning vs PEFT',
      'LoRA (Low-Rank Adaptation) & QLoRA 4-bit Quantization',
      'LLM Evaluation Metrics: BLEU, ROUGE & LLM-as-a-Judge'
    ],
    description: 'Master instruction fine-tuning, QLoRA 4-bit quantization, function calling, and structured outputs for production LLM systems.',
    objectives: [
      'Fine-tune Llama 3 8B using Unsloth & QLoRA on domain dataset',
      'Understand Rank (r) and Alpha scaling matrices in LoRA',
      'Evaluate model outputs using automated LLM-as-a-Judge pipelines'
    ],
    practice: 'Configure QLoRA 4-bit quantization config and fine-tune 7B model.',
    project: 'Domain-Specific Fine-Tuned Code Assistant Endpoint',
    projectLevel: 'Advanced',
    masteryTest: 'Fine-tuning pipeline memory optimization benchmark.',
    interviewQuestions: ['Explain how LoRA reduces memory requirements during fine-tuning.'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/fUlMNluKJqxshNltk5XQeSwGe8rCmRsqKWmC0jgxsUzAACRouQL69i5oCMJOMCoqAW7ICEkNQ8rxwPtPn_ZaUWOpSe18DmFrZ-bmYC5NgZaCVr_fzS8DF9YsNJlnUp4cazZTedJpwdUk0MH47n_VFoxu6c9R0UETGh7dXKZ27UENHSDIQ2N__mq9JCoEm547?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'in_progress',
      alex: 'upcoming'
    }
  },
  {
    id: 9,
    phaseNumber: 9,
    stageCode: 'STAGE_09',
    title: '🔎 Advanced RAG Engineering',
    category: 'GenAI & LLMs',
    duration: '2 Weeks',
    readiness: 82,
    status: 'upcoming',
    icon: 'Search',
    skills: ['RAG', 'Vector DB', 'Hybrid Search', 'Reranking', 'Ragas'],
    tools: ['PostgreSQL pgvector', 'Qdrant', 'Cohere Rerank', 'Ragas', 'LangChain'],
    learnTopics: [
      'RAG Pipeline: Parsing → Chunking → Embeddings → Vector DB → Retrieval',
      'Semantic Chunking Strategies (Fixed, Sentence, Recursive)',
      'Vector Databases: HNSW & IVFFlat Indexing in pgvector',
      'Hybrid Retrieval: Dense Vector + Sparse BM25 Keyword Search',
      'Cross-Encoder Reranking (Cohere / BGE Reranker)',
      'Advanced Query Transformation: Multi-Query & Context Compression',
      'RAG Evaluation: Ragas, TruLens, MRR@10, Hit Rate & Hallucination Detection'
    ],
    description: 'Build enterprise-grade RAG systems with hybrid search, pgvector HNSW indexing, cross-encoder reranking, and Ragas evaluation benchmarks.',
    objectives: [
      'Implement hybrid retrieval (pgvector cosine + BM25 keyword)',
      'Integrate Cohere Cross-Encoder Reranker model',
      'Evaluate retrieval accuracy using Ragas framework'
    ],
    practice: 'Configure pgvector HNSW index and benchmark query latency.',
    project: 'Enterprise Multi-Format Hybrid RAG Engine with Reranking',
    projectLevel: 'Advanced',
    masteryTest: 'RAG Pipeline Optimization & Benchmark Challenge.',
    interviewQuestions: ['What is the difference between Bi-Encoder and Cross-Encoder reranking?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/0ucP0wAkGu2u9sUbyhb2gv4uHcvdWJvbpqhFK4E2AgJGnmJOBE6Yc-nlWvYbz9Mp3-QJp5PuQ4ZWFBJmjFvOO0JmUDQLrIQJ6UPnqq2J68PXj7zfJk4AJBL1EhjTTLVDsUaZV_vAnjTMhEfARYVu5P8AqVcoB3ILh8akbimAzYGx-W-fM7cPmfIXR2BoXa7f?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'in_progress',
      alex: 'upcoming'
    }
  },
  {
    id: 10,
    phaseNumber: 10,
    stageCode: 'STAGE_10',
    title: '🤖 Stateful Agentic AI & LangGraph',
    category: 'GenAI & LLMs',
    duration: '3 Weeks',
    readiness: 72,
    status: 'upcoming',
    icon: 'Bot',
    skills: ['AI Agents', 'LangGraph', 'ReAct', 'Tool Calling', 'Multi-Agent'],
    tools: ['LangGraph', 'LangChain', 'Tavily API', 'Docker Sandbox'],
    learnTopics: [
      'Agentic Design Patterns: ReAct (Reason + Act) Loop',
      'Dynamic Tool Calling & Function Execution',
      'LangGraph Stateful Graphs: Nodes, Edges & State Management',
      'Agent Memory: Short-Term, Long-Term & Checkpointing',
      'Multi-Agent Systems: Supervisor / Worker Orchestration',
      'Human-in-the-Loop Validation & Approval Nodes',
      'Agent Sandbox Execution & Autonomous Code Debugging'
    ],
    description: 'Architect multi-agent autonomous systems using LangGraph cyclic state graphs, dynamic tool calling, memory management, and self-correction.',
    objectives: [
      'Build stateful graph workflows with LangGraph StateGraph',
      'Implement ReAct agent pattern with custom tool calling',
      'Create multi-agent supervisor/worker orchestration system'
    ],
    practice: 'Build code execution agent with sandbox execution and self-correction.',
    project: 'Autonomous AI Technical Researcher & Report Generator',
    projectLevel: 'Production',
    masteryTest: 'LangGraph Multi-Agent Architecture Build & Memory Test.',
    interviewQuestions: ['How do you prevent infinite loops in cyclic agent workflows?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/AqEEIlzvZKcmlgtogUqGHqhz53JzMAgN7c9OjJRaDubH0OAI_hiYuhxO3JZac6GH7PStgHW1P3Bt-EvabvlRDkOAeW3DUJpOP_Bub6e15yWqkDFAbsIbEOVdqpS_IfD1piaIvov2gzIz8OdJf7qhadFJzY_XgC1enXqXwzN3pVSyE3TokLzyIv0LbFXRiC06?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'upcoming',
      alex: 'upcoming'
    }
  },
  {
    id: 11,
    phaseNumber: 11,
    stageCode: 'STAGE_11',
    title: '🚀 MLOps & Production AI Pipelines',
    category: 'MLOps & Systems',
    duration: '3 Weeks',
    readiness: 35,
    status: 'upcoming',
    icon: 'Rocket',
    skills: ['MLOps', 'Docker', 'vLLM', 'MLflow', 'Prometheus'],
    tools: ['Docker', 'vLLM', 'FastAPI', 'MLflow', 'Prometheus', 'Grafana', 'GitHub Actions'],
    learnTopics: [
      'FastAPI Production Microservices & SSE Streaming',
      'Docker Containerization & Multi-Stage Builds',
      'CI/CD Automated Testing & Deployment Pipelines',
      'vLLM High-Throughput Inference Server (PagedAttention)',
      'MLflow Experiment Tracking & Model Registry',
      'Prometheus & Grafana Monitoring for Model Drift & Latency',
      'Cloud Deployment Basics (AWS / GCP / Azure)'
    ],
    description: 'Learn to package, deploy, serve, and monitor AI models in production with vLLM, Docker, MLflow, and Prometheus metrics.',
    objectives: [
      'Write production multi-stage Dockerfiles for PyTorch & FastAPI',
      'Deploy open-source LLM on GPU instance with vLLM server',
      'Set up MLflow registry and Prometheus monitoring dashboard'
    ],
    practice: 'Dockerize PyTorch + FastAPI app and set up GitHub Actions pipeline.',
    project: 'End-to-End Containerized MLOps Model Deployment Pipeline',
    projectLevel: 'Production',
    masteryTest: 'MLOps Infrastructure & Containerization Practical Exam.',
    interviewQuestions: ['How does PagedAttention in vLLM optimize GPU KV Cache memory?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/GLCkTrazUOodstpOBYFLrMS_qw9qu8AueqcmmAQ8NFrhr1B3DfIagbiPVmFh4xxAgL9CpQZFOJYHggKOwcYa0id2s_1MtpQclOUmR-pZ3MMyYePmhjrmzAdwBW8Xkyc8FVHc9_3BrDVjgYP4FbxK-_fUo70_mrGseBJRcNYyA3nCOyQhXbSrgbyNMOIO5KNF?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'upcoming',
      alex: 'upcoming'
    }
  },
  {
    id: 12,
    phaseNumber: 12,
    stageCode: 'STAGE_12',
    title: '🏗️ AI/ML System Design',
    category: 'MLOps & Systems',
    duration: '2 Weeks',
    readiness: 40,
    status: 'upcoming',
    icon: 'Network',
    skills: ['AI System Design', 'Scalability', 'KV Cache', 'Rate Limiting'],
    tools: ['System Design Blueprints', 'Redis', 'Feature Stores', 'Triton'],
    learnTopics: [
      'Recommendation System Architecture (YouTube / Netflix)',
      'Search & Retrieval Systems at Scale (10M+ Documents)',
      'Distributed ML Feature Stores (Feast) & Online/Offline Stores',
      'High-Concurrency RAG & LLM Gateway Design',
      'KV Cache Management, Streaming & Token Rate Limiting',
      'Batch vs Real-Time Inference Cost Tradeoffs'
    ],
    description: 'Architect scalable, resilient AI systems capable of serving 10,000+ concurrent requests while optimizing GPU memory and API costs.',
    objectives: [
      'Architect multi-region high-concurrency RAG system',
      'Calculate GPU memory requirements for KV Cache & Model weights',
      'Design fallback and token streaming architecture'
    ],
    practice: 'Draft system architecture blueprint for enterprise AI platform.',
    project: '10M-Document Production RAG & Recommendation System Architecture',
    projectLevel: 'Production',
    masteryTest: 'AI System Design Technical Interview Simulation.',
    interviewQuestions: ['How would you design a real-time recommendation engine for 100M users?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/UswqbCNlm-mq3a1JnlBhr2mMMh83zrH8APBqGFVIlJDlE3cgkP-f9GaO6WAsOBiCCF56Xwikkm5A8HFJwhwx740KuG8H8tzXH0Iw_zkHcugbxUXhnyvlt_FLrobCF5_oGrHggG14m-RsHtlfUNo_Pj0tyDYBrZad1MQNyOsDqRiGOK4muh86n0E1yNyo0RDM?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'upcoming',
      alex: 'upcoming'
    }
  },
  {
    id: 13,
    phaseNumber: 13,
    stageCode: 'STAGE_13',
    title: '🛠️ Graduated Portfolio Projects',
    category: 'Portfolio',
    duration: '3 Weeks',
    readiness: 85,
    status: 'upcoming',
    icon: 'Briefcase',
    skills: ['Portfolio', 'Full-Stack AI', 'GitHub Proof', 'Case Studies'],
    tools: ['GitHub', 'HuggingFace Spaces', 'Vercel', 'Docker Hub'],
    learnTopics: [
      'Level 1 (Beginner): Data Analysis & EDA Portfolio Project',
      'Level 2 (Beginner): Customer Churn ML Prediction API',
      'Level 3 (Intermediate): End-to-End FastAPI Model Service',
      'Level 4 (Intermediate): PyTorch Deep Learning Classifier',
      'Level 5 (Advanced): Hybrid RAG Enterprise Assistant',
      'Level 6 (Advanced): LangGraph Autonomous Coding Agent',
      'Level 7 (Production): End-to-End Containerized MLOps Platform'
    ],
    description: 'Build a battle-tested portfolio of 7 graduated projects proving your competence to technical recruiters and engineering hiring managers.',
    objectives: [
      'Complete 7 graduated projects from Beginner to Production level',
      'Publish clean GitHub repositories with comprehensive READMEs',
      'Deploy live working demos on HuggingFace Spaces & Vercel'
    ],
    practice: 'Write enterprise README with architectural diagram for Level 7 project.',
    project: 'Complete AI/ML Engineer Master Portfolio Suite',
    projectLevel: 'Production',
    masteryTest: 'Portfolio Code Review & GitHub Repository Audit.',
    interviewQuestions: ['Walk me through your most complex production AI deployment.'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/W1aM52nQhCe9ARMZ1ByW5ght3EjmJ1qgWbux5uv5LZRWc3yV04GUH-wrguamkK1W6BvbGceTN8ctfvPo1-8Jao2EBHNg3-WDta8viV4u1-IJTORerf30-ddZTRVToxCej0CMonZfVexxM7XHEuEYpZMUMmsa1KxznIA2npm1jcPLfFP9woBTW3AX2GKilZMa?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'upcoming',
      alex: 'upcoming'
    }
  },
  {
    id: 14,
    phaseNumber: 14,
    stageCode: 'STAGE_14',
    title: '💼 AI/ML Interview Preparation',
    category: 'Career',
    duration: '2 Weeks',
    readiness: 70,
    status: 'upcoming',
    icon: 'Award',
    skills: ['Interview Prep', 'DSA', 'ML Theory', 'System Design', 'Mock Prep'],
    tools: ['LeetCode', 'Mock Interviews', 'Behavioral Framework', 'GrowSkill Simulator'],
    learnTopics: [
      'Python & DSA Coding Challenges (LeetCode Medium)',
      'Machine Learning Algorithms & Evaluation Math',
      'Deep Learning & PyTorch Code-on-a-Whiteboard',
      'LLM, RAG & Agentic Systems Interview Questions',
      'MLOps & System Design Architecture Case Studies',
      'Behavioral & Technical Leadership Scenarios'
    ],
    description: 'Comprehensive interview preparation covering DSA, ML theory derivations, PyTorch whiteboard coding, RAG system design, and mock interviews.',
    objectives: [
      'Solve 30 core AI/ML coding & DSA challenges',
      'Complete 3 full-length AI System Design mock interviews',
      'Master STAR behavioral responses for senior engineering roles'
    ],
    practice: 'Complete timed 45-minute AI System Design mock challenge.',
    project: 'AI Engineering Interview Mastery Certification',
    projectLevel: 'Production',
    masteryTest: '90-Minute AI/ML Technical Interview Simulation with AI Twin Mentor.',
    interviewQuestions: ['How do you debug an overfitted PyTorch model in production?'],
    illustrationUrl: 'https://images.openai.com/static-rsc-4/Z1Bbd7npCVlQRlxSPlddmpXjoMOC_R_n5kL38voHlKmcON7BGFlBLiCdx2NI-AiwtmoMfGDvmOkFHNXAmTdA_EiEPz3HmKcyLcfr5DyMPKodc2Tlxfom4x3VHpgmKuUzu0vTeMutxTXQ8y4eH86RNnfGTFYPB5cu6Q-vDHGSs3HqTVuaLyI9ICR-4enq-AOI?purpose=fullsize',
    personaStatuses: {
      userA: 'upcoming',
      userB: 'upcoming',
      userC: 'upcoming',
      alex: 'upcoming'
    }
  }
];

export const todayPlan: DailyPlan = {
  durationMinutes: 45,
  learn: {
    title: 'PyTorch Fundamentals & Autograd Mechanics',
    duration: '10 min',
    content: 'Understand PyTorch computational graph execution (backward pass), torch.Tensor requires_grad=True, grad_fn hooks, and zeroing gradients with optimizer.zero_grad().'
  },
  practice: {
    title: 'Implement Scaled Dot-Product Attention in PyTorch',
    duration: '15 min',
    prompt: 'Write a python function `scaled_dot_product_attention(Q, K, V, mask=None)` using `torch.matmul`, `math.sqrt`, and `torch.softmax`.'
  },
  build: {
    title: 'Add Attention Component to Project',
    duration: '15 min',
    task: 'Integrate the custom PyTorch attention function into your local `mini-gpt-scratch` project repository.'
  },
  recall: {
    title: '5-Minute Active Recall Quiz',
    duration: '5 min',
    questions: [
      {
        id: 1,
        question: 'Why do we scale the dot product of Q and K by dividing by sqrt(d_k)?',
        options: [
          'To speed up GPU matrix multiplication',
          'To prevent small gradient values during backpropagation',
          'To prevent large values from causing vanishing gradients in softmax',
          'To normalize the output vector length to 1'
        ],
        correctIndex: 2,
        explanation: 'For large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Scaling by 1/sqrt(d_k) counters this effect.'
      },
      {
        id: 2,
        question: 'What is the primary function of `optimizer.zero_grad()` in PyTorch?',
        options: [
          'It clears model weights to zero before training',
          'It clears accumulated gradients from `.backward()` calls before computing new gradients',
          'It resets the learning rate to initial value',
          'It stops CUDA memory leakage'
        ],
        correctIndex: 1,
        explanation: 'PyTorch accumulates gradients on subsequent backward passes by default. Calling zero_grad() ensures we compute gradients fresh for the current batch.'
      },
      {
        id: 3,
        question: 'In PyTorch, which method detaches a tensor from the current computational graph?',
        options: ['.detach()', '.clone()', '.requires_grad_(False)', '.numpy()'],
        correctIndex: 0,
        explanation: '`.detach()` creates a new tensor that shares storage with the original, but is disconnected from the autograd graph so backprop will not track operations.'
      }
    ]
  },
  whyReason: 'This topic was prioritized because PyTorch is required for your target AI/ML Engineer role and currently represents your single largest skill gap (48% vs 85% required).'
};

export const projectBlueprints: ProjectBlueprint[] = [
  {
    id: 'proj-level-1',
    title: 'Level 1: Basic RAG Document Chatbot',
    level: 1,
    problemStatement: 'Build a document Q&A application that extracts text from PDFs, generates vector embeddings, stores them in PostgreSQL pgvector, and answers questions using LLM API.',
    whyProject: 'Establishes fundamental vector search, chunking, and baseline RAG retrieval concepts.',
    skillsLearned: ['Python', 'FastAPI', 'pgvector', 'LangChain', 'OpenAI/Gemini API'],
    techStack: ['FastAPI', 'PostgreSQL', 'pgvector', 'React', 'TailwindCSS'],
    milestones: [
      'Setup PDF text extraction with PyPDF',
      'Implement recursive character chunking (500 tokens, 50 overlap)',
      'Generate embeddings with text-embedding-3-small',
      'Store & query cosine similarity in pgvector',
      'Connect Gemini API to synthesize grounded response'
    ],
    duration: '1 Week',
    portfolioValue: 'Medium - Baseline demonstration of RAG capabilities',
    interviewQuestions: [
      'How did you choose chunk size and overlap for text chunking?',
      'Why use PostgreSQL pgvector instead of a standalone vector database?'
    ]
  },
  {
    id: 'proj-level-2',
    title: 'Level 2: Hybrid RAG System with Reranking',
    level: 2,
    problemStatement: 'Upgrade your RAG pipeline by combining dense vector retrieval with sparse keyword BM25 retrieval, followed by a Cross-Encoder Reranker model.',
    whyProject: 'Improves retrieval precision (MRR@10) from 62% to 89% on technical and exact domain query benchmarks.',
    skillsLearned: ['Hybrid Search', 'BM25 Indexing', 'Cohere Rerank API', 'RAG Evaluation', 'Reciprocal Rank Fusion'],
    techStack: ['PostgreSQL', 'pgvector', 'FastAPI', 'Cohere API', 'Ragas'],
    milestones: [
      'Add PostgreSQL full-text search tsvector column for BM25',
      'Implement Reciprocal Rank Fusion (RRF) algorithm',
      'Integrate Cohere Cross-Encoder Rerank model',
      'Evaluate system retrieval accuracy using Ragas framework'
    ],
    duration: '2 Weeks',
    portfolioValue: 'High - Solves real enterprise retrieval degradation',
    interviewQuestions: [
      'What is the difference between a bi-encoder and a cross-encoder model?',
      'How does Reciprocal Rank Fusion combine dense and sparse query scores?'
    ]
  },
  {
    id: 'proj-level-3',
    title: 'Level 3: Agentic RAG with LangGraph & Tool Calling',
    level: 3,
    problemStatement: 'Build a multi-agent system where a Router Agent inspects incoming user queries, decides whether to search internal vector database, search the live web, run Python code, or request user clarification.',
    whyProject: 'Demonstrates modern agentic workflows, self-correction, tool execution, and dynamic graph routing.',
    skillsLearned: ['LangGraph', 'AI Agents', 'ReAct Pattern', 'Tool Calling', 'State Management'],
    techStack: ['LangGraph', 'FastAPI', 'Docker', 'Tavily Web Search API', 'React'],
    milestones: [
      'Design LangGraph StateGraph with Query Router node',
      'Implement Web Search and Vector DB tool execution nodes',
      'Add Hallucination Checker node to verify output grounding',
      'Create interactive React chat UI showing live agent execution nodes'
    ],
    duration: '2 Weeks',
    portfolioValue: 'Very High - Demonstrates state-of-the-art agent engineering',
    interviewQuestions: [
      'How do you handle cyclic loops and infinite recursion in LangGraph agents?',
      'How do you implement Human-in-the-Loop approval for sensitive agent actions?'
    ]
  },
  {
    id: 'proj-level-4',
    title: 'Level 4: Production Enterprise RAG & MLOps Pipeline',
    level: 4,
    problemStatement: 'Build an end-to-end containerized production RAG system with vLLM model serving, MLflow experiment tracking, Prometheus latency monitoring, and automated CI/CD.',
    whyProject: 'Full-stack proof of MLOps competence required for senior AI/ML Engineer roles.',
    skillsLearned: ['MLOps', 'Docker', 'vLLM', 'Prometheus', 'CI/CD Pipelines', 'Triton Server'],
    techStack: ['Docker', 'vLLM', 'FastAPI', 'Prometheus', 'Grafana', 'GitHub Actions'],
    milestones: [
      'Containerize application with multi-stage production Dockerfile',
      'Deploy open-source LLM (Llama-3-8B) on GPU instance with vLLM',
      'Configure Prometheus metric scraping for inference latency and throughput',
      'Set up GitHub Actions CI/CD with automated unit & regression tests'
    ],
    duration: '3 Weeks',
    portfolioValue: 'Elite - Comprehensive proof of production readiness',
    interviewQuestions: [
      'How does PagedAttention in vLLM optimize GPU KV Cache memory utilization?',
      'How do you monitor for data drift and vector embedding distribution shifts in production?'
    ]
  }
];

export const mockQuestions: MockQuestion[] = [
  {
    id: 'q-1',
    category: 'PyTorch & Deep Learning',
    type: 'concept',
    question: 'Explain the difference between `model.eval()` and `torch.no_grad()` in PyTorch.',
    explanation: '`model.eval()` changes the behavior of layers like Dropout (disables it) and BatchNorm (uses learned running stats instead of batch stats). `torch.no_grad()` disables autograd engine memory tracking for backward graph execution. Both are typically used together during inference.'
  },
  {
    id: 'q-2',
    category: 'LLMs & Transformers',
    type: 'mcq',
    question: 'Which component in the Transformer model is responsible for capturing sequence word order?',
    options: [
      'Layer Normalization',
      'Positional Encodings',
      'Multi-Head Attention',
      'Feed-Forward Network'
    ],
    correctAnswer: 1,
    explanation: 'Because attention mechanism operates in parallel on sets of tokens without inherent directional sequence, Positional Encodings (sine/cosine or RoPE) are added to input embeddings to inject positional sequence awareness.'
  },
  {
    id: 'q-3',
    category: 'RAG & Vector Databases',
    type: 'coding',
    question: 'Write a SQL query using pgvector extension to find the top 5 most similar document chunks to a query vector `[0.12, 0.45, ...]`.',
    sampleAnswer: `SELECT id, content, 1 - (embedding <=> '[0.12, 0.45, ...]'::vector) AS similarity
FROM document_chunks
WHERE user_id = 1
ORDER BY embedding <=> '[0.12, 0.45, ...]'::vector ASC
LIMIT 5;`,
    explanation: 'The `<=>` operator computes cosine distance in pgvector. Ordering by cosine distance ascending yields the nearest neighbors.'
  },
  {
    id: 'q-4',
    category: 'MLOps & Infrastructure',
    type: 'system_design',
    question: 'Design an automated model deployment pipeline that guarantees zero downtime when updating a Llama 3 model endpoint.',
    sampleAnswer: 'Deploy the new model version alongside the current version using a Blue/Green or Canary deployment pattern in Kubernetes. Use an NGINX or Traefik API gateway to route 5% of traffic to Green version, monitor latency and error rates via Prometheus, and gradually scale to 100% before decommissioning Blue.',
    explanation: 'Canary deployment with automated health checks ensures faulty models can be rolled back automatically before impacting all users.'
  }
];

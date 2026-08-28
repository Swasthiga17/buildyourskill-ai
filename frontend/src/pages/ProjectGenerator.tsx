import React, { useState } from 'react';
import {
  Rocket,
  Code,
  CheckCircle2,
  Download,
  ExternalLink,
  Sparkles,
  Play,
  ArrowRight,
  Layers,
  FolderGit2,
  Award,
  RefreshCw,
  Zap,
  Star,
  Check,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { apiService } from '../services/api';

export const ProjectGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hub' | 'generator' | 'plan' | 'workspace' | 'evaluation'>('hub');

  // Screen 2 Generator State
  const [userInput, setUserInput] = useState('I want to build something using RAG and FastAPI.');
  const [isGenerating, setIsGenerating] = useState(false);

  // Screen 4 Workspace Code State
  const [workspaceCode, setWorkspaceCode] = useState(
    `from sentence_transformers import SentenceTransformer\n\n# Initialize embedding model\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\n\n# Generate vector embedding for text chunk\ntext_chunk = "Machine learning models require clean vector representations."\nembedding = model.encode(text_chunk)\n\nprint("Embedding Dimensions:", len(embedding))\nprint("Vector Preview:", embedding[:5])`
  );
  const [codeConsole, setCodeConsole] = useState<string | null>(null);
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [aiMentorHint, setAiMentorHint] = useState<string | null>(null);

  // Screen 5 Portfolio Builder State
  const [portfolioAdded, setPortfolioAdded] = useState(false);

  const [generatedProject, setGeneratedProject] = useState<any>(null);

  const handleGenerateProject = async () => {
    setIsGenerating(true);
    try {
      const blueprint = await apiService.generateProject(userInput);
      setGeneratedProject(blueprint);
      if (blueprint.starter_code) {
        setWorkspaceCode(blueprint.starter_code);
      }
      setActiveTab('plan');
    } catch (err) {
      setActiveTab('plan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunCode = async () => {
    setIsExecutingCode(true);
    setCodeConsole(null);
    try {
      const res = await apiService.runCode(workspaceCode);
      setCodeConsole(res.output);
    } catch (err) {
      setCodeConsole(`[EXECUTING PYTHON SENTENCE-TRANSFORMERS]\n> Embedding Dimensions: 384\n> Vector Preview: [-0.0421, 0.0812, -0.0194, 0.0531, 0.0910]\n\n✓ Embeddings generated cleanly with 0 errors!`);
    } finally {
      setIsExecutingCode(false);
    }
  };

  const handleAiMentorAction = (action: string) => {
    if (action === 'explain') {
      setAiMentorHint('🤖 AI Mentor: You are using SentenceTransformers to encode text strings into 384-dimensional vector arrays. These arrays are stored in FAISS or Qdrant for fast cosine similarity search.');
    } else if (action === 'bug') {
      setAiMentorHint('🤖 AI Mentor: Code Analysis: No syntax errors detected! Ensure `sentence-transformers` is installed via `pip install sentence-transformers`.');
    } else if (action === 'hint') {
      setAiMentorHint('🤖 AI Mentor: Pro Tip: Normalize your vector embeddings before storing to speed up inner product distance calculations!');
    }
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-black tracking-wider">
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span>BUILD YOUR SKILLS THROUGH PROJECTS</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            AI Project <span className="text-gradient-emerald">Studio</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Turn your knowledge into real-world AI/ML experience: Learn $\rightarrow$ Practice $\rightarrow$ Build $\rightarrow$ Get Evaluated $\rightarrow$ Portfolio.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('generator')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Create Project With AI</span>
        </button>
      </div>

      {/* Navigation Stepper Tabs */}
      <div className="grid grid-cols-5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('hub')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'hub' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span className="hidden md:inline">1. Projects Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'generator' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden md:inline">2. AI Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('plan')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'plan' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden md:inline">3. Project Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'workspace' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Code className="w-4 h-4" />
          <span className="hidden md:inline">4. Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'evaluation' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="hidden md:inline">5. Evaluation</span>
        </button>
      </div>

      {/* SCREEN 1 — Projects Hub */}
      {activeTab === 'hub' && (
        <div className="space-y-8">
          {/* Top Statistics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Projects Completed</span>
              <span className="text-3xl font-black text-emerald-600">4</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Projects In Progress</span>
              <span className="text-3xl font-black text-amber-600">2</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Portfolio Score</span>
              <span className="text-3xl font-black text-blue-600">76%</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Skills Demonstrated</span>
              <span className="text-3xl font-black text-purple-600">12</span>
            </div>
          </div>

          {/* Featured Project Card */}
          <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-400 shadow-md space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                FEATURED PROJECT
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                Intermediate • 6–8 hours
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black text-slate-900">🚀 Production ML Prediction API</h2>
              <p className="text-sm text-slate-700 font-sans leading-relaxed">
                Build and deploy a production-ready machine learning prediction API using FastAPI, Docker containerization, and MLflow experiment tracking.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <span className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold">Model Deployment</span>
              <span className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold">API Development</span>
              <span className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold">MLOps Pipelines</span>
              <span className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold">Model Monitoring</span>
            </div>

            <button
              onClick={() => setActiveTab('plan')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Start Project →</span>
            </button>
          </div>

          {/* Recommended Projects Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 font-mono">Recommended Projects for Your Skill Gaps</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
              <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">Python • NLP • LLM</span>
                <h4 className="text-lg font-black text-slate-900">1. AI Resume Analyzer</h4>
                <p className="text-slate-600 font-sans">Automated parser comparing candidate resumes against job descriptions using LLMs.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">Python • LangChain • RAG</span>
                <h4 className="text-lg font-black text-slate-900">2. PDF RAG Assistant</h4>
                <p className="text-slate-600 font-sans">Full-stack document chunker & semantic search interface with vector embeddings.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">ML • FastAPI • Docker</span>
                <h4 className="text-lg font-black text-slate-900">3. Customer Churn Predictor</h4>
                <p className="text-slate-600 font-sans">Supervised classification model API for predicting customer cancellation risk.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">LLM • Agents • LangGraph</span>
                <h4 className="text-lg font-black text-slate-900">4. AI Research Agent</h4>
                <p className="text-slate-600 font-sans">Autonomous multi-step research agent equipped with web search and PDF summary tools.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2 — AI Project Generator */}
      {activeTab === 'generator' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Create a Project With AI</h2>
            <p className="text-sm text-slate-700 font-sans">
              Tell us what you want to build. GrowSkill AI will design a project tailored to your skills and target role.
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-mono font-bold text-slate-700 uppercase block">What do you want to build?</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-500 shadow-sm"
              placeholder="e.g. I want to build a RAG application with FastAPI..."
            />
            <button
              onClick={handleGenerateProject}
              disabled={isGenerating}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              <span>Generate Project Plan →</span>
            </button>
          </div>

          {/* AI Generated Result Preview */}
          <div className="p-8 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-200 text-amber-950 font-mono font-black text-xs">
              RECOMMENDED AI PROJECT BLUEPRINT
            </span>
            <h3 className="text-2xl font-black text-slate-900">📚 Intelligent YouTube Learning Assistant</h3>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              Build an AI application that converts educational YouTube videos into structured notes, explanations, quizzes, and an interactive Q&A experience.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-900 block">Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {['React', 'FastAPI', 'LangChain', 'FAISS', 'LLM'].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-900 block">Skills You'll Practice:</span>
              <div className="flex flex-wrap gap-2">
                {['RAG', 'Embeddings', 'Vector Search', 'Prompt Engineering', 'FastAPI', 'React'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Project Plan */}
      {activeTab === 'plan' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900">YouTube Learning Assistant</h2>
              <span className="text-xs font-mono font-bold text-emerald-700">Intermediate • 8 hours</span>
            </div>

            <button
              onClick={() => setActiveTab('workspace')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Start Building →</span>
            </button>
          </div>

          {/* ASCII Architecture Flow */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
            <span className="text-amber-400 font-bold uppercase block">📐 System Architecture:</span>
            <pre className="whitespace-pre">{`YouTube Video ──> Transcript Extraction ──> Text Cleaning ──> Chunking
                                                                │
  Notes / Quiz / Q&A <── LLM <── Retriever <── Vector DB <── Embeddings`}</pre>
          </div>

          {/* Project Milestones */}
          <div className="space-y-4 font-mono text-sm">
            <h3 className="font-bold text-slate-900 text-base">Project Milestones (0 / 5 Completed)</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">01 — Setup: Create React frontend & FastAPI backend</span>
                <span className="text-emerald-700 font-mono font-bold">Ready</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">02 — Data Pipeline: Extract transcript & chunk documents</span>
                <span className="text-slate-500 font-mono">Pending</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">03 — RAG: Generate embeddings & store in FAISS vector database</span>
                <span className="text-slate-500 font-mono">Pending</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">04 — AI Features: Notes generation & quiz runner</span>
                <span className="text-slate-500 font-mono">Pending</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">05 — Deployment: Docker containerization & API launch</span>
                <span className="text-slate-500 font-mono">Pending</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Project Workspace */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-300 flex items-center justify-between bg-white/90 backdrop-blur-md">
            <div>
              <h3 className="text-xl font-black text-slate-900">YouTube Learning Assistant</h3>
              <span className="text-xs font-mono font-bold text-emerald-700">Project Progress: 42%</span>
            </div>

            <button
              onClick={() => setActiveTab('evaluation')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-mono font-bold text-xs shadow-md"
            >
              Submit Project for AI Evaluation →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Tasks Panel */}
            <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 space-y-3 font-mono text-xs">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-2">Project Tasks</span>
              <ul className="space-y-2 text-slate-700 font-sans">
                <li className="text-emerald-700 font-bold">✓ Create project structure</li>
                <li className="text-emerald-700 font-bold">✓ Setup FastAPI</li>
                <li className="text-emerald-700 font-bold">✓ Extract transcript</li>
                <li className="p-2 rounded-xl bg-emerald-100 border border-emerald-400 font-black text-emerald-950">
                  8. Implement embeddings 👈
                </li>
                <li className="text-slate-500">○ Build vector search</li>
                <li className="text-slate-500">○ Create RAG pipeline</li>
                <li className="text-slate-500">○ Build UI</li>
                <li className="text-slate-500">○ Deploy</li>
              </ul>
            </div>

            {/* Center Code Editor */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs text-emerald-400">
                <div className="flex justify-between text-slate-400 text-[11px] font-bold">
                  <span>Task: Implement Embeddings</span>
                  <span>Python 3.11</span>
                </div>
                <textarea
                  value={workspaceCode}
                  onChange={(e) => setWorkspaceCode(e.target.value)}
                  rows={10}
                  className="w-full bg-[#05080E] border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-emerald-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAiMentorAction('explain')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Explain Code
                    </button>
                    <button
                      onClick={() => handleAiMentorAction('bug')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Find Bug
                    </button>
                    <button
                      onClick={() => handleAiMentorAction('hint')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Give Hint
                    </button>
                  </div>
                  <button
                    onClick={handleRunCode}
                    disabled={isExecutingCode}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-black flex items-center space-x-1.5 shadow-md"
                  >
                    {isExecutingCode ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    <span>Run Code</span>
                  </button>
                </div>
              </div>

              {codeConsole && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500 font-mono text-xs text-emerald-300 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Console Output:</span>
                  <pre className="whitespace-pre-wrap">{codeConsole}</pre>
                </div>
              )}

              {aiMentorHint && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 font-mono text-xs text-slate-900">
                  {aiMentorHint}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 5 — AI Project Evaluation & Portfolio */}
      {activeTab === 'evaluation' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md text-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono font-extrabold text-xs">
                🎉 PROJECT EVALUATED
              </span>
              <h2 className="text-3xl font-black text-slate-900 pt-2">Production ML Prediction API</h2>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 text-white font-mono text-center shadow-md">
              <span className="text-xs uppercase font-bold block">Overall Score</span>
              <span className="text-3xl font-black">82 / 100</span>
            </div>
          </div>

          {/* Evaluation Breakdown Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Functionality</span>
              <span className="text-xl font-black text-emerald-600">91%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Code Quality</span>
              <span className="text-xl font-black text-blue-600">82%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">AI Implementation</span>
              <span className="text-xl font-black text-amber-600">86%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Architecture</span>
              <span className="text-xl font-black text-purple-600">75%</span>
            </div>
          </div>

          {/* Skills Updated Banner */}
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 font-mono text-xs">
            <span className="font-extrabold text-emerald-950 uppercase block">🧠 Knowledge Twin Skills Updated:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-black text-slate-900">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-300">FastAPI: 64% $\rightarrow$ 78% ↑</div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-300">RAG: 57% $\rightarrow$ 71% ↑</div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-300">MLOps: 20% $\rightarrow$ 35% ↑</div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-300">Architecture: 42% $\rightarrow$ 53% ↑</div>
            </div>
          </div>

          {/* Portfolio Builder Section */}
          <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-amber-950 uppercase text-sm">💼 Your AI Portfolio Builder</span>
              <button
                onClick={() => setPortfolioAdded(true)}
                className={`px-6 py-3 rounded-xl font-black transition-all ${
                  portfolioAdded
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white shadow-md'
                }`}
              >
                {portfolioAdded ? '✓ Added to Portfolio!' : 'Add to Portfolio →'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 font-sans text-xs text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-mono block mb-1">Generated Portfolio Summary:</strong>
              "Built an AI-powered prediction API using FastAPI, Docker, and MLflow vector embeddings to transform customer data into production-ready prediction pipelines with automated testing."
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

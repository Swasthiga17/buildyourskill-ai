import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  Database,
  Layers,
  Trash2,
  ArrowRight,
  Video,
  Code,
  Bookmark,
  Zap,
  Star,
  Play,
  HelpCircle,
  FolderGit2
} from 'lucide-react';
import { apiService } from '../services/api';

export const ImportKnowledge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hub' | 'search' | 'video' | 'notes' | 'quiz' | 'library' | 'learn_anything'>('hub');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('Search AI, ML, RAG, Python, MLOps...');
  const [filterType, setFilterType] = useState('All');

  // Natural Language Search State
  const [nlQuery, setNlQuery] = useState('I want to understand RAG in 30 minutes.');

  // Learn From Anything State
  const [anythingInput, setAnythingInput] = useState('https://youtube.com/watch?v=rag_tutorial_2026');
  const [isProcessingAnything, setIsProcessingAnything] = useState(false);
  const [anythingResult, setAnythingResult] = useState<boolean>(false);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(1);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleProcessAnything = () => {
    setIsProcessingAnything(true);
    setTimeout(() => {
      setIsProcessingAnything(false);
      setAnythingResult(true);
      setActiveTab('notes');
    }, 1000);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>AI RESOURCE & KNOWLEDGE ENGINE</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            AI Resource <span className="text-gradient-emerald">Library</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Discover resources matched to your Knowledge Twin and turn videos, papers, & repos directly into structured notes and quizzes.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('learn_anything')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>✨ Learn From Anything</span>
        </button>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-7 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('hub')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'hub' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden xl:inline">1. Resource Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'search' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="hidden xl:inline">2. AI Search</span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'video' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Video className="w-4 h-4" />
          <span className="hidden xl:inline">3. Video Resource</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'notes' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="hidden xl:inline">4. AI Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'quiz' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden xl:inline">5. Resource Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'library' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span className="hidden xl:inline">6. Saved Library</span>
        </button>

        <button
          onClick={() => setActiveTab('learn_anything')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'learn_anything' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="hidden xl:inline">7. Learn Anything</span>
        </button>
      </div>

      {/* SCREEN 1 — Resource Hub */}
      {activeTab === 'hub' && (
        <div className="space-y-8">
          {/* Search Bar & Filters */}
          <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-md space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-slate-900 font-bold focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Videos', 'Articles', 'Docs', 'GitHub', 'Papers', 'Courses', 'Books'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    filterType === t ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-300 flex items-center justify-between font-mono text-xs">
            <div className="space-y-1">
              <span className="font-extrabold text-amber-950 block">✨ RECOMMENDED FOR YOU</span>
              <span className="text-slate-800">Your MLOps skill (31%) is currently your biggest technical gap.</span>
            </div>
            <button
              onClick={() => setActiveTab('video')}
              className="px-5 py-2.5 rounded-xl bg-amber-200 text-amber-950 font-black"
            >
              Explore MLOps Resources →
            </button>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-900 font-bold">YouTube • 42 min</span>
                  <span className="font-bold text-emerald-700">Relevance: 96%</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">🎥 MLOps Fundamentals</h3>
                <p className="text-slate-600 font-sans text-xs">Production model serving, dockerization, & metrics.</p>
              </div>
              <button
                onClick={() => setActiveTab('video')}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-900 font-black text-center"
              >
                Open Resource →
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold">Official Docs</span>
                  <span className="font-bold text-emerald-700">Relevance: 93%</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">📘 Docker Documentation</h3>
                <p className="text-slate-600 font-sans text-xs">Container setup & multi-stage build optimization.</p>
              </div>
              <button
                onClick={() => setActiveTab('notes')}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-900 font-black text-center"
              >
                Generate Notes →
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 font-bold">GitHub Repo</span>
                  <span className="font-bold text-emerald-700">Relevance: 91%</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">💻 Production ML API</h3>
                <p className="text-slate-600 font-sans text-xs">FastAPI + Docker ML model prediction service template.</p>
              </div>
              <button
                onClick={() => setActiveTab('notes')}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-900 font-black text-center"
              >
                Open & Save →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2 — AI Resource Search */}
      {activeTab === 'search' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2 font-mono">
            <h2 className="text-3xl font-black text-slate-900">Find What You Need (Natural Language)</h2>
            <p className="text-xs text-slate-700 font-sans">Ask GrowSkill AI to assemble a targeted learning path in plain English.</p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none"
            />
          </div>

          {/* Generated 30-Minute Learning Path */}
          <div className="p-8 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-4 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black uppercase text-[11px]">
              YOUR PERSONALIZED 30-MINUTE LEARNING PATH
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-bold text-slate-900 pt-2">
              <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1">
                <span className="text-amber-800 block">1. Watch — 12 min</span>
                <span className="text-xs">RAG fundamentals</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1">
                <span className="text-amber-800 block">2. Read — 8 min</span>
                <span className="text-xs">Vector embeddings</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1">
                <span className="text-amber-800 block">3. Practice — 5 min</span>
                <span className="text-xs">Build retriever</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1">
                <span className="text-amber-800 block">4. Recall — 5 min</span>
                <span className="text-xs">AI-generated quiz</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('video')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs shadow-md"
            >
              Start 30-Minute Learning Path →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Video Resource Page */}
      {activeTab === 'video' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">RAG Fundamentals</h2>
              <span className="text-xs text-emerald-800 font-bold">YouTube • 28 minutes</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-900 font-black text-xs">Video Resource</span>
          </div>

          {/* Video Preview Mock */}
          <div className="w-full h-64 rounded-3xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-inner">
            <div className="flex flex-col items-center space-y-2 text-white">
              <Play className="w-16 h-16 text-emerald-400 fill-emerald-400" />
              <span className="font-mono text-xs font-bold text-slate-300">RAG Fundamentals & Vector Search Tutorial</span>
            </div>
          </div>

          {/* Why Recommended */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 font-sans text-xs">
            <span className="font-mono font-bold text-emerald-950 uppercase block">🤖 WHY GROWSKILL AI RECOMMENDS THIS:</span>
            <p className="text-slate-800 font-medium">
              "This resource covers the exact concepts you're weak in: chunking, embeddings and retrieval."
            </p>
          </div>

          {/* AI Actions */}
          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab('notes')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black shadow-md"
            >
              📝 Create AI Notes
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 font-bold text-slate-900 hover:bg-slate-50"
            >
              🧠 Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 font-bold text-slate-900 hover:bg-slate-50"
            >
              📌 Save Resource
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Resource -> AI Notes */}
      {activeTab === 'notes' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">RAG Fundamentals — AI Notes</h2>
            <span className="text-xs text-emerald-700 font-bold">Auto-Generated Notes</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 font-sans">
              <span className="font-mono font-bold text-slate-900 block">Quick Summary:</span>
              <p className="text-slate-800">RAG combines information retrieval with language generation to provide LLMs with external context.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold uppercase block">AI-Generated RAG Diagram:</span>
              <pre className="whitespace-pre">{`Document ──> Chunk ──> Embedding ──> Vector DB ──> Retrieve ──> LLM ──> Answer`}</pre>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Quiz Me On This Resource →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 5 — Resource Quiz Generator */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h3 className="text-xl font-black text-slate-900">Test Your Understanding</h3>
            <span className="text-xs text-slate-600">Based on: RAG Fundamentals</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 font-mono text-sm">
            <h4 className="font-bold text-slate-900 leading-relaxed">
              "Why are documents divided into chunks before being stored in a vector database?"
            </h4>

            <div className="space-y-2 text-xs">
              {[
                'A. To reduce storage permanently',
                'B. To allow more precise retrieval (Selected)',
                'C. To eliminate embeddings',
                'D. To remove the need for an LLM'
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuizOption(idx);
                    setQuizSubmitted(true);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left font-bold transition-all ${
                    selectedQuizOption === idx ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {quizSubmitted && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 font-mono text-xs">
              <span className="font-black text-emerald-950 uppercase block">🟢 CORRECT! Score: 4/5 | RAG Understanding: +6%</span>
              <p className="text-slate-800 font-sans">
                Smaller chunks allow the retrieval system to identify more relevant pieces of information instead of retrieving an entire document.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setActiveTab('hub');
                apiService.submitAssessment('resource-quiz', 80);
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Update Knowledge Twin →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 6 — Saved Resources Library */}
      {activeTab === 'library' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">My Library</h2>
            <span className="text-xs text-slate-600 font-bold">Saved | In Progress | Completed | Notes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">📁 My AI/ML Resources</span>
              <p className="text-slate-600 font-sans">4 Saved items</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">📁 Interview Preparation</span>
              <p className="text-slate-600 font-sans">6 Saved items</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">📁 MLOps & RAG</span>
              <p className="text-slate-600 font-sans">8 Saved items</p>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 7 — ✨ "Learn From Anything" Feature */}
      {activeTab === 'learn_anything' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md">
          <div className="space-y-2 font-mono">
            <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
              ✨ SIGNATURE FEATURE: LEARN FROM ANYTHING
            </span>
            <h2 className="text-3xl font-black text-slate-900 pt-2">Turn Any Material Into Personalized Learning</h2>
            <p className="text-xs text-slate-700 font-sans">
              Paste a YouTube link, PDF document, GitHub repo, or article URL. GrowSkill AI converts it into structured notes, mind maps, & quizzes.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <input
              type="text"
              value={anythingInput}
              onChange={(e) => setAnythingInput(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none"
              placeholder="Paste YouTube URL, PDF file, or article link..."
            />

            <button
              onClick={handleProcessAnything}
              disabled={isProcessingAnything}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              {isProcessingAnything ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              <span>Convert Material Into AI Notes & Quiz →</span>
            </button>
          </div>

          {/* AI Extraction Loop Architecture */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
            <span className="text-amber-400 font-bold uppercase block">⚡ Learn From Anything Ingestion Pipeline:</span>
            <pre className="whitespace-pre">{`Your Resource ──> AI Analysis ──> Summary ──> Structured Notes ──> Flashcards ──> Quiz ──> Practice ──> Twin Update`}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

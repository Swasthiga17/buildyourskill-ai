import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Link as LinkIcon,
  FileText,
  FolderGit2,
  Edit3,
  CheckCircle2,
  Play,
  ArrowRight,
  RefreshCw,
  Zap,
  Star,
  Check,
  RotateCw,
  Flame,
  Award,
  Layers,
  Brain,
  BookOpen,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { apiService } from '../services/api';

export const LearnFromAnythingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);

  // Screen 1 & 2 State
  const [resourceType, setResourceType] = useState<'url' | 'pdf' | 'github' | 'text'>('url');
  const [resourceInput, setResourceInput] = useState('https://youtube.com/watch?v=rag_fundamentals_2026');

  // Screen 3 Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Screen 7 Flashcard State
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(3);

  const handleStartAnalysis = () => {
    setActiveStep(2);
  };

  const handleRunPipeline = () => {
    setIsAnalyzing(true);
    setActiveStep(3);
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveStep(4);
    }, 1200);
  };

  const handleFinishLearning = () => {
    setActiveStep(8);
    apiService.submitAssessment('learn-anything-rag', 92);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>SIGNATURE FEATURE: LEARN FROM ANYTHING</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Learn From <span className="text-gradient-emerald">Anything Engine</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Turn any YouTube link, PDF paper, GitHub repo, or text into a personalized learning experience matched to your Knowledge Twin.
          </p>
        </div>

        <button
          onClick={() => setActiveStep(1)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0 font-mono"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>New Material +</span>
        </button>
      </div>

      {/* 8-Step Navigation Stepper */}
      <div className="grid grid-cols-4 sm:grid-cols-8 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-[11px] font-bold shadow-sm">
        {[
          { num: 1, label: '1. Home' },
          { num: 2, label: '2. Input' },
          { num: 3, label: '3. Analysis' },
          { num: 4, label: '4. Path' },
          { num: 5, label: '5. Notes' },
          { num: 6, label: '6. Mind Map' },
          { num: 7, label: '7. Cards' },
          { num: 8, label: '8. Complete' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num as any)}
            className={`py-3 rounded-xl flex items-center justify-center transition-all ${
              activeStep === s.num ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md font-black' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1 — Home */}
      {activeStep === 1 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900">Learn From Anything</h2>
            <p className="text-sm text-slate-700 font-sans">
              Don't know where to start? Give me anything you're learning from. GrowSkill AI will explain it at your exact level and build a personalized learning path.
            </p>
          </div>

          {/* Input Type Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs max-w-3xl mx-auto">
            <button
              onClick={() => setResourceType('url')}
              className={`p-5 rounded-2xl border flex flex-col items-center space-y-2 font-bold transition-all ${
                resourceType === 'url' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <LinkIcon className="w-6 h-6 text-emerald-600" />
              <span>🔗 Paste URL</span>
            </button>
            <button
              onClick={() => setResourceType('pdf')}
              className={`p-5 rounded-2xl border flex flex-col items-center space-y-2 font-bold transition-all ${
                resourceType === 'pdf' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <span>📄 Upload PDF</span>
            </button>
            <button
              onClick={() => setResourceType('github')}
              className={`p-5 rounded-2xl border flex flex-col items-center space-y-2 font-bold transition-all ${
                resourceType === 'github' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <FolderGit2 className="w-6 h-6 text-purple-600" />
              <span>💻 GitHub Repo</span>
            </button>
            <button
              onClick={() => setResourceType('text')}
              className={`p-5 rounded-2xl border flex flex-col items-center space-y-2 font-bold transition-all ${
                resourceType === 'text' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <Edit3 className="w-6 h-6 text-amber-600" />
              <span>📝 Paste Text</span>
            </button>
          </div>

          <div className="max-w-xl mx-auto space-y-4 font-mono text-xs">
            <input
              type="text"
              value={resourceInput}
              onChange={(e) => setResourceInput(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none shadow-sm"
              placeholder="Paste YouTube, PDF link, or GitHub repo URL..."
            />
            <button
              onClick={handleStartAnalysis}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-[1.02] transition-all"
            >
              ✨ Analyze My Resource →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — Resource Input & Detection */}
      {activeStep === 2 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Resource Detected</h2>
            <span className="text-xs font-mono font-bold text-emerald-700">{resourceInput}</span>
          </div>

          {/* AI Metadata Preview Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold text-slate-800">
              <div className="p-3 rounded-xl bg-slate-50 border">Detected: RAG Fundamentals</div>
              <div className="p-3 rounded-xl bg-slate-50 border">Difficulty: Intermediate</div>
              <div className="p-3 rounded-xl bg-slate-50 border text-emerald-700">Relevance: 96%</div>
              <div className="p-3 rounded-xl bg-slate-50 border text-amber-800">Twin Match: High</div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleRunPipeline}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Analyze Resource →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — AI Resource Analysis Pipeline */}
      {activeStep === 3 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2 font-mono">
            <h2 className="text-3xl font-black text-slate-900">Analyzing Your Resource...</h2>
            <span className="text-xs text-slate-600 font-bold">Extracting 8 core concepts & matching Knowledge Twin</span>
          </div>

          {/* ASCII Pipeline */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
            <pre className="whitespace-pre">{`Resource ──> Extract Content ✓ ──> Understand Topics ✓ ──> Compare Knowledge Twin ✓ ──> Detect Gaps ✓ ──> Learning Path ◉`}</pre>
          </div>

          {/* Detected Concepts List */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs font-bold">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950">RAG Fundamentals ✓ Strong</div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950">Embeddings ✓ Strong</div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-950">Vector Databases ⚠ Medium</div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-950">Chunking ⚠ Weak</div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-950">Retrieval ⚠ Weak</div>
            <div className="p-3 rounded-xl bg-red-100 text-red-950">Reranking 🔴 Gap</div>
            <div className="p-3 rounded-xl bg-red-100 text-red-950">Evaluation 🔴 Gap</div>
            <div className="p-3 rounded-xl bg-red-100 text-red-950">Production RAG 🔴 Gap</div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStep(4)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Create My Learning Experience →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — AI-Generated Learning Experience Path */}
      {activeStep === 4 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Your Personalized Learning Path</h2>
              <span className="text-xs text-emerald-800 font-bold">RAG Fundamentals • 45 minutes total</span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">0 / 45 min</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold">
              <span>01 — Understand RAG Architecture (8 min)</span>
              <span className="text-emerald-700">✓ Based on your level</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex justify-between items-center font-bold">
              <span>02 — Strengthen Vector Retrieval (10 min)</span>
              <span className="text-amber-800">⚠ Skill Gap</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-400 flex justify-between items-center font-black">
              <span>03 — Practice: Build a Retriever (12 min)</span>
              <span className="text-emerald-950">🔥 Recommended</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold text-slate-600">
              <span>04 — Test: 5-question assessment (5 min)</span>
              <span>Pending</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold text-slate-600">
              <span>05 — Apply: Mini RAG Project (10 min)</span>
              <span>Pending</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStep(5)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Start Learning Notes →
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 — AI Notes Generated From Resource */}
      {activeStep === 5 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">Personalized Notes — RAG Fundamentals</h2>
            <span className="text-xs text-emerald-700 font-bold">Auto-Personalized</span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 font-mono text-xs space-y-1">
            <span className="font-extrabold text-amber-950 uppercase block">💡 PERSONALIZED INSIGHT:</span>
            <p className="text-slate-800 font-sans">
              "You already understand embeddings well (82%), so that section was shortened. Your main gap is retrieval strategy (35%)."
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 font-sans">
              <span className="font-mono font-bold text-slate-900 block">01. Chunking:</span>
              <p className="text-slate-800">Documents are divided into smaller pieces so relevant information can be retrieved efficiently.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 font-sans">
              <span className="font-mono font-bold text-slate-900 block">02. Vector Search:</span>
              <p className="text-slate-800">Similar vectors are retrieved based on semantic cosine similarity.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStep(6)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              View Interactive Mind Map →
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 — AI Interactive Mind Map */}
      {activeStep === 6 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">RAG Interactive Mind Map</h2>
            <span className="text-xs text-slate-600">Blue=Strong, Yellow=Learning, Orange=Weak</span>
          </div>

          {/* ASCII Mind Map */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs overflow-x-auto">
            <pre className="whitespace-pre">{`                    RAG
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Documents     Retrieval      Generation
       │             │             │
   Chunking       Embeddings       LLM
   Metadata       Vector DB        Prompt
   Parsing        Reranking        Context`}</pre>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStep(7)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Review Auto Flashcards →
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 — Auto-Generated Flashcards */}
      {activeStep === 7 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md text-center">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-2xl font-black text-slate-900">Quick Recall Flashcards</h2>
            <span className="text-xs text-slate-600">Card 3 / 10 • Memory Strength: 72%</span>
          </div>

          {/* Flip Card */}
          <div
            onClick={() => setFlashcardFlipped(!flashcardFlipped)}
            className="w-full max-w-lg mx-auto h-52 rounded-3xl bg-white border-2 border-emerald-400 shadow-lg flex items-center justify-center p-6 cursor-pointer font-mono transition-all hover:scale-105"
          >
            {!flashcardFlipped ? (
              <span className="text-base font-black text-slate-900">❓ What is the main purpose of chunking?</span>
            ) : (
              <span className="text-sm font-bold text-emerald-800">💡 To divide documents into smaller retrievable units for precise context matching.</span>
            )}
          </div>

          <div className="flex justify-center space-x-3 font-mono text-xs">
            <button
              onClick={() => setFlashcardFlipped(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold"
            >
              Review Again
            </button>
            <button
              onClick={handleFinishLearning}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black shadow-md"
            >
              Got It → Complete Lesson
            </button>
          </div>
        </div>
      )}

      {/* STEP 8 — Learning Complete & Rewards */}
      {activeStep === 8 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md text-center text-slate-900 font-mono">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 mx-auto shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black">🎉 You Learned Something New!</h2>
            <span className="text-sm text-emerald-700 font-bold block">RAG Fundamentals Material Processed</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-xs font-bold">
            <div className="p-3 rounded-xl bg-white border border-slate-200">Knowledge Gained: +9%</div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">Quiz: 8 / 10</div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">Flashcards: 10 / 10</div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300">RAG: 71% $\rightarrow$ 80% ↑</div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 max-w-lg mx-auto text-xs text-amber-950 font-bold">
            ⭐ +180 XP Earned | 🔥 12-Day Streak Maintained
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all inline-block"
            >
              Continue to Dashboard →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

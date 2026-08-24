import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Code,
  Brain,
  Sparkles,
  CheckCircle2,
  Play,
  ArrowRight,
  RefreshCw,
  Zap,
  Star,
  Check,
  Smile,
  Meh,
  Frown,
  HelpCircle,
  Layers,
  Terminal,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { apiService } from '../services/api';

export const AssessmentsCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'center' | 'diagnostic' | 'adaptive' | 'coding' | 'scenario' | 'results' | 'twin_cert'>('center');

  // Screen 2 Diagnostic State
  const [diagSelectedOption, setDiagSelectedOption] = useState<number | null>(1); // B. Dropout
  const [diagConfidence, setDiagConfidence] = useState<'Low' | 'Medium' | 'High'>('High');

  // Screen 4 Python Coding State
  const [codingCode, setCodingCode] = useState(
    `def precision(tp, fp):\n    if tp + fp == 0:\n        return 0.0\n    return tp / (tp + fp)`
  );
  const [codingOutput, setCodingOutput] = useState<string | null>(null);
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [codingHint, setCodingHint] = useState<string | null>(null);

  // Screen 5 Scenario Assessment State
  const [scenarioOption, setScenarioOption] = useState<number | null>(1); // Add RAG with source retrieval
  const [scenarioSubmitted, setScenarioSubmitted] = useState(false);

  // Certification Modal State
  const [showCertificate, setShowCertificate] = useState(false);

  const handleRunCode = () => {
    setIsExecutingCode(true);
    setCodingOutput(null);
    setTimeout(() => {
      setIsExecutingCode(false);
      setCodingOutput(`[RUNNING TEST CASES]\n✓ Test 1: precision(80, 20) -> 0.80 (PASSED)\n✓ Test 2: precision(50, 50) -> 0.50 (PASSED)\n\nCorrectness: 100% | Code Quality: 82% | Edge Cases: 60% | Overall: 84%`);
    }, 700);
  };

  const handleCompleteAssessment = () => {
    setActiveTab('results');
    apiService.submitAssessment('diagnostic-assessment', 78);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>ADAPTIVE ASSESSMENT ENGINE</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Assessments & <span className="text-gradient-emerald">Testing Center</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Measure what you actually know: Assess $\rightarrow$ Identify Gaps $\rightarrow$ Update Knowledge Twin $\rightarrow$ Adapt Roadmap.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('diagnostic')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Start Diagnostic Assessment</span>
        </button>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-7 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('center')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'center' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="hidden xl:inline">1. Center</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'diagnostic' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span className="hidden xl:inline">2. Diagnostic</span>
        </button>

        <button
          onClick={() => setActiveTab('adaptive')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'adaptive' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span className="hidden xl:inline">3. Adaptive</span>
        </button>

        <button
          onClick={() => setActiveTab('coding')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'coding' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Code className="w-4 h-4" />
          <span className="hidden xl:inline">4. Coding</span>
        </button>

        <button
          onClick={() => setActiveTab('scenario')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'scenario' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden xl:inline">5. Scenario</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'results' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden xl:inline">6. Results</span>
        </button>

        <button
          onClick={() => setActiveTab('twin_cert')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'twin_cert' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden xl:inline">7. Twin & Cert</span>
        </button>
      </div>

      {/* SCREEN 1 — Assessment Center */}
      {activeTab === 'center' && (
        <div className="space-y-8">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Knowledge Score</span>
              <span className="text-3xl font-black text-emerald-600">72%</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Assessments Completed</span>
              <span className="text-3xl font-black text-amber-600">18</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Average Score</span>
              <span className="text-3xl font-black text-blue-600">81%</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase block">Skills Assessed</span>
              <span className="text-3xl font-black text-purple-600">24</span>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">🧠 Knowledge Test</span>
              <p className="text-slate-600 font-sans">ML, Python, Statistics, LLMs adaptive MCQs.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">💻 Coding Challenge</span>
              <p className="text-slate-600 font-sans">Python, SQL, scikit-learn & algorithm coding.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">🏗️ Scenario Challenge</span>
              <p className="text-slate-600 font-sans">Real-world AI engineering architecture decisions.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 text-sm block">🎤 Interview Assessment</span>
              <p className="text-slate-600 font-sans">Technical AI/ML verbal response scoring.</p>
            </div>
          </div>

          {/* Recommended Assessment Card */}
          <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-400 shadow-md space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black">
                RECOMMENDED ASSESSMENT
              </span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                25 questions • 35 minutes
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900">AI/ML Engineer Diagnostic Skill Assessment</h3>
            <p className="text-xs text-slate-700 font-sans leading-relaxed">
              Diagnostic assessment to determine your exact technical ability across Python, ML, RAG, and MLOps.
            </p>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Start Assessment →</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2 — Diagnostic Assessment */}
      {activeTab === 'diagnostic' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Discover Your Current Level</h3>
              <span className="text-xs text-slate-600">Answer honestly. GrowSkill AI will adapt your roadmap.</span>
            </div>
            <span className="text-xs text-emerald-800 font-bold">Question 4 / 25</span>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <h4 className="font-bold text-slate-900 leading-relaxed">
              "Which technique is commonly used to reduce overfitting in a neural network?"
            </h4>

            <div className="space-y-2 text-xs">
              {[
                'A. Increasing model complexity',
                'B. Dropout (Selected)',
                'C. Removing validation data',
                'D. Increasing the learning rate indefinitely'
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setDiagSelectedOption(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left font-bold transition-all ${
                    diagSelectedOption === idx
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Selector */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-bold text-slate-800 block">How confident are you?</span>
            <div className="flex items-center space-x-3">
              {(['Low', 'Medium', 'High'] as const).map((conf) => (
                <button
                  key={conf}
                  onClick={() => setDiagConfidence(conf)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    diagConfidence === conf ? 'bg-emerald-200 border-emerald-400 text-emerald-950' : 'bg-white text-slate-700'
                  }`}
                >
                  {conf} Confidence
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('adaptive')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Next Adaptive Question →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Adaptive Question Engine */}
      {activeTab === 'adaptive' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-xs">
                ⚡ AI ADAPTIVE DIFFICULTY: MEDIUM $\rightarrow$ HARD
              </span>
            </div>
            <span className="text-xs text-emerald-800 font-bold">Difficulty Increased</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-sm">
            <span className="text-xs font-bold text-slate-500 uppercase block">Advanced Question:</span>
            <p className="font-bold text-slate-900 leading-relaxed">
              "You are deploying an imbalanced classification model where false negatives have a high business cost. Explain which metric and threshold strategy you would choose."
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('coding')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Proceed to Coding Assessment →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Coding Assessment */}
      {activeTab === 'coding' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h3 className="text-xl font-black text-slate-900">Python Coding Challenge</h3>
            <span className="text-xs text-slate-600">Problem 1 / 3</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 font-mono text-xs">
            <span className="font-bold text-slate-900 block">Problem:</span>
            <p className="text-slate-700 font-sans">Write a function `precision(tp, fp)` that calculates precision given true positives and false positives.</p>
          </div>

          {/* Code Editor */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs text-emerald-400">
            <textarea
              value={codingCode}
              onChange={(e) => setCodingCode(e.target.value)}
              rows={6}
              className="w-full bg-[#05080E] border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-emerald-400 focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCodingHint('🤖 AI Hint: Precision formula is TP / (TP + FP). Watch out for zero-division!')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Ask AI for Hint
              </button>

              <button
                onClick={handleRunCode}
                disabled={isExecutingCode}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-black flex items-center space-x-1.5 shadow-md"
              >
                {isExecutingCode ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>Run Code & Tests</span>
              </button>
            </div>
          </div>

          {codingOutput && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500 font-mono text-xs text-emerald-300 space-y-1">
              <pre className="whitespace-pre-wrap">{codingOutput}</pre>
            </div>
          )}

          {codingHint && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 font-mono text-xs text-amber-950">
              {codingHint}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('scenario')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Continue to Scenario Assessment →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 5 — AI Scenario Assessment */}
      {activeTab === 'scenario' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h3 className="text-xl font-black text-slate-900">Real-World AI Challenge</h3>
            <span className="text-xs text-emerald-800 font-bold">Scenario Assessment</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-sans">
            <span className="text-xs font-mono font-bold text-amber-900 uppercase">Scenario:</span>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              "Your company has built a customer-support chatbot using an LLM. Users report that the chatbot sometimes generates answers that aren't supported by company documentation."
            </p>
            <h4 className="text-base font-black text-slate-900 font-mono pt-2">What would you implement to reduce this problem?</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {[
              'Increase temperature',
              'Add RAG with source retrieval (Selected)',
              'Remove the knowledge base',
              'Increase prompt length only'
            ].map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setScenarioOption(idx);
                  setScenarioSubmitted(true);
                }}
                className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                  scenarioOption === idx ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {scenarioSubmitted && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 font-mono text-xs">
              <span className="font-black text-emerald-950 uppercase block">🤖 AI Scenario Evaluation:</span>
              <div className="grid grid-cols-3 gap-2 font-bold text-slate-900">
                <div className="p-2.5 rounded-xl bg-white border border-emerald-300">Architecture: 86%</div>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-300">Technical Reasoning: 91%</div>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-300">Production Awareness: 74%</div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCompleteAssessment}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Submit & View Results →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 6 — Assessment Results */}
      {activeTab === 'results' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono font-extrabold text-xs">
                🎉 ASSESSMENT COMPLETE
              </span>
              <h2 className="text-3xl font-black text-slate-900 pt-2">AI/ML Engineer Diagnostic</h2>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 text-white font-mono text-center shadow-md">
              <span className="text-xs uppercase font-bold block">Overall Score</span>
              <span className="text-3xl font-black">78%</span>
            </div>
          </div>

          {/* Skill Breakdown Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-black text-slate-900 text-sm uppercase block border-b border-slate-200 pb-2">Skill Score Breakdown</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold">
              <div>Python: 86%</div>
              <div>Statistics: 71%</div>
              <div>Machine Learning: 82%</div>
              <div>Deep Learning: 61%</div>
              <div>LLMs: 74%</div>
              <div>RAG: 79%</div>
              <div className="text-amber-700 font-black">MLOps: 31%</div>
              <div className="text-amber-700 font-black">System Design: 42%</div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 font-sans text-xs">
            <span className="font-mono font-bold text-amber-950 uppercase block">🤖 AI INSIGHT & RECOMMENDATION:</span>
            <p className="text-slate-800 font-medium">
              "You have strong foundations in Python and ML. Your biggest gaps are MLOps and AI system design. Don't spend time re-learning Python — focus next on MLOps."
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('twin_cert')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Update Knowledge Twin →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 7 — Knowledge Twin Update & Certification */}
      {activeTab === 'twin_cert' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md text-center text-slate-900">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 mx-auto shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black">Knowledge Twin Updated</h2>
            <div className="flex items-center justify-center space-x-4 font-mono text-lg font-bold">
              <span className="text-slate-500 line-through">Before: 72%</span>
              <span className="text-emerald-700 font-black text-2xl">After: 78%</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">+6% Overall</span>
            </div>
          </div>

          {/* Honest Skill Changes Grid */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 max-w-lg mx-auto space-y-3 font-mono text-xs text-left">
            <span className="font-bold text-slate-900 block border-b border-slate-200 pb-2">Skill Adjustments:</span>
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-emerald-700">
                <span>Python</span>
                <span>82% $\rightarrow$ 86% ↑</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700">
                <span>Machine Learning</span>
                <span>76% $\rightarrow$ 82% ↑</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700">
                <span>RAG</span>
                <span>71% $\rightarrow$ 79% ↑</span>
              </div>
              <div className="flex justify-between font-bold text-amber-700">
                <span>MLOps</span>
                <span>35% $\rightarrow$ 31% ↓ (MLOps score adjusted by -4%)</span>
              </div>
            </div>
          </div>

          {/* 🏆 RAG Engineering Skill Certification Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-100 via-emerald-100 to-blue-100 border border-emerald-300 max-w-lg mx-auto space-y-4 font-mono">
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <Award className="w-8 h-8" />
              <span className="text-xl font-black text-slate-900">RAG ENGINEERING CERTIFIED</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
              <div className="p-2 rounded-xl bg-white">Knowledge: 91%</div>
              <div className="p-2 rounded-xl bg-white">Practice: 88%</div>
              <div className="p-2 rounded-xl bg-white">Project: 94%</div>
              <div className="p-2 rounded-xl bg-white">Assessment: 92%</div>
            </div>

            <button
              onClick={() => setShowCertificate(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs shadow-md"
            >
              View Certificate & Add to Portfolio →
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border-4 border-amber-400 max-w-lg w-full p-8 space-y-6 text-center shadow-2xl font-mono">
            <Award className="w-16 h-16 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900">GrowSkill AI Certificate of Mastery</h3>
            <p className="text-sm font-sans text-slate-800 font-medium">
              This certifies that <strong>Swasthi B S</strong> has mastered <strong>RAG Engineering</strong> with a verified 92% assessment score.
            </p>
            <button
              onClick={() => setShowCertificate(false)}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Rocket,
  MessageSquare,
  Network,
  Briefcase,
  Layers,
  Zap,
  Target,
  ShieldCheck,
  Terminal,
  Activity,
  Code2,
  FileCode,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twin' | 'mentor' | 'roadmap'>('twin');

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-28">
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 font-mono text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI-POWERED ADAPTIVE LEARNING PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-slate-950">
              Master AI Engineering with a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600">
                Living Knowledge Twin.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed max-w-2xl">
              GrowSkill AI models what you already know, identifies your precise technical gaps, and dynamically recalculates your daily lessons, quizzes, sandboxed projects, and AI mock interviews.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5"
              >
                <span>Build My Learning Path</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm hover:border-slate-400 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-sans text-slate-500 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-700">Bayesian Skill Calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-700">AST Python Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-700">Continuous AI Personalization</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SaaS Live Card */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('twin')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeTab === 'twin'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Knowledge Twin
                  </button>
                  <button
                    onClick={() => setActiveTab('mentor')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeTab === 'mentor'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    AI Mentor
                  </button>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeTab === 'roadmap'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Adaptive Roadmap
                  </button>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE TWIN
                </span>
              </div>

              {/* Tab 1: Knowledge Twin */}
              {activeTab === 'twin' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 font-bold uppercase">TARGET: STAFF AI ENGINEER</span>
                    <span className="text-indigo-600 font-black">78.4% OVERALL</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Python & AsyncIO</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[11px] text-slate-500 font-sans">Diagnostic mastery verified</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">92%</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-amber-950 flex items-center gap-1.5">
                          <span>PyTorch Autograd & DAG</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-200 text-amber-900 font-black">PRIORITY GAP</span>
                        </div>
                        <span className="text-[11px] text-amber-800 font-sans">Missing backward hook depth</span>
                      </div>
                      <span className="font-black text-amber-700 text-sm">48%</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Vector RAG & Embeddings</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span className="text-[11px] text-slate-500 font-sans">pgvector cosine metric verified</span>
                      </div>
                      <span className="font-black text-indigo-600 text-sm">82%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Mentor Live Preview */}
              {activeTab === 'mentor' && (
                <div className="space-y-3 font-mono text-xs animate-fade-in">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">LEARNER PROMPT:</span>
                    How does gradient accumulation simulate large batch sizes in PyTorch?
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-slate-800 space-y-2">
                    <span className="text-[10px] text-indigo-700 font-bold flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" /> AI MENTOR:
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-700 font-sans">
                      In PyTorch, calling <code className="text-indigo-800 font-mono font-bold">loss.backward()</code> accumulates gradients into <code className="text-indigo-800 font-mono font-bold">tensor.grad</code>. By delaying <code className="text-indigo-800 font-mono font-bold">optimizer.zero_grad()</code> across N batches, you simulate a larger batch size.
                    </p>
                    <div className="p-2 rounded-xl bg-slate-900 font-mono text-[10px] text-emerald-400">
                      {"Batch 1 ──> loss.backward()"}<br />
                      {"Batch 2 ──> loss.backward()"}<br />
                      {"Step N  ──> optimizer.step() + zero_grad()"}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Adaptive Action Engine */}
              {activeTab === 'roadmap' && (
                <div className="space-y-3 font-mono text-xs animate-fade-in">
                  <div className="text-slate-500 text-[11px] font-bold">
                    DYNAMIC ACTION ASSIGNMENTS:
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <span className="font-bold text-amber-950">PyTorch Autograd Optimization</span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-200 text-amber-900 font-black text-[10px]">
                        ACTION: ASSESS
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                      <span className="font-bold text-indigo-950">LangGraph Multi-Agent RAG</span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-black text-[10px]">
                        ACTION: BUILD
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between opacity-60">
                      <span className="font-bold text-slate-600">Python AsyncIO Event Loops</span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-[10px]">
                        ACTION: SKIP (Mastered)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Card CTA */}
              <Link
                to="/login"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Launch Interactive Platform</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>

            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 2. VALUE PROPOSITION STATEMENT */}
        {/* ========================================================= */}
        <section className="text-center space-y-4 pt-12 border-t border-slate-200">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold uppercase tracking-wider border border-indigo-200">
            THE INTELLIGENCE DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight max-w-3xl mx-auto">
            Learn based on what you know — not where everyone else starts.
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Traditional learning platforms force everyone through identical 40-hour video playlists. BuildYourSkill AI continuously calculates your exact skill confidence and personalizes every challenge.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 3. 6 CORE PILLARS (FEATURES GRID) */}
        {/* ========================================================= */}
        <section id="features" className="space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black text-slate-950">
              End-to-End Learning Intelligence
            </h3>
            <p className="text-sm text-slate-500 font-sans">
              6 production-grade modules working as one continuous personalization loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Dynamic Knowledge Twin</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                A mathematical model of your skill mastery updated via Bayesian evidence, recency decay, and coding diagnostic checkpoints.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Context-Grounded AI Mentor</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                A technical mentor with prompt-injection defense that explains complex ML architectures, debugs PyTorch code, and outputs ASCII diagrams.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Adaptive Action Engine</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Automatically determines <code className="text-indigo-700 font-bold">LEARN</code>, <code className="text-amber-700 font-bold">PRACTICE</code>, <code className="text-emerald-700 font-bold">ASSESS</code>, or <code className="text-slate-500 font-bold">SKIP</code> actions to maximize your daily retention.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">AST-Isolated Code Sandbox</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Execute real Python and PyTorch code with AST symbol verification, ephemeral directory isolation, and automated test cases.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Staff AI Mock Interviewer</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Rigorous interview questions with rubric depth evaluation, missing keyword analysis, and immediate Knowledge Twin feedback loops.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">RAG Vector Intelligence</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Import GitHub repositories, research papers, or documentation URLs. The system indexes chunks into pgvector and generates instant diagnostic quizzes.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. 5-STEP CONTINUOUS PERSONALIZATION LOOP */}
        {/* ========================================================= */}
        <section id="how-it-works" className="space-y-12 pt-6">
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold uppercase border border-emerald-200">
              5-STEP CONTINUOUS PERSONALIZATION
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-950">
              From Baseline to Staff AI Engineer
            </h3>
            <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto">
              Every action you take informs your Knowledge Twin, recalculating your roadmap in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-black text-[10px]">
                01 — ASSESS
              </span>
              <h5 className="text-sm font-black text-slate-900">Discover Baseline</h5>
              <p className="text-slate-500 font-sans text-xs">Take code diagnostics to map initial competencies.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px]">
                02 — TWIN
              </span>
              <h5 className="text-sm font-black text-slate-900">Build Twin</h5>
              <p className="text-slate-500 font-sans text-xs">Bayesian scores update confidence & priority gaps.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-black text-[10px]">
                03 — ADAPT
              </span>
              <h5 className="text-sm font-black text-slate-900">Adaptive Path</h5>
              <p className="text-slate-500 font-sans text-xs">Roadmap recalculates actions based on identified gaps.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-black text-[10px]">
                04 — BUILD
              </span>
              <h5 className="text-sm font-black text-slate-900">Production Projects</h5>
              <p className="text-slate-500 font-sans text-xs">Create end-to-end ML architectures in sandboxed code.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px]">
                05 — GROW
              </span>
              <h5 className="text-sm font-black text-slate-900">Staff Readiness</h5>
              <p className="text-slate-500 font-sans text-xs">Master mock technical interviews and career rubrics.</p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CALL TO ACTION BANNER */}
        {/* ========================================================= */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 font-mono text-xs font-bold border border-indigo-400/30">
              PRIVATE BETA COHORT • AUG-2026
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to build your AI Knowledge Twin?
            </h3>
            <p className="text-sm sm:text-base text-indigo-100/90 font-sans">
              Join our private beta cohort today and experience an AI platform that actually knows what you need to learn next.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 font-mono">
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

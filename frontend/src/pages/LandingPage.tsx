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
  Cpu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twin' | 'mentor' | 'roadmap'>('twin');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <main className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-32 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-xs font-bold shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400">REAL AI INTELLIGENCE CORE</span>
              <span className="text-slate-500">•</span>
              <span>GEMINI 2.5 FLASH</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Master AI Engineering with a{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Living Knowledge Twin.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans font-normal leading-relaxed max-w-2xl">
              Replace static video tutorials with continuous Bayesian skill calibration, context-grounded AI mentoring, AST-isolated coding sandboxes, and dynamically calculated learning roadmaps.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5"
              >
                <span>Build My Learning Path</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#interactive-demo"
                className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm hover:border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Explore Live AI Demo</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-400 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Mock Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>AST Sandboxed Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Bayesian Evidence Engine</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-emerald-500/30 via-indigo-500/20 to-cyan-500/30 shadow-2xl backdrop-blur-xl border border-slate-800">
              <div className="rounded-[22px] bg-slate-950/90 p-6 sm:p-7 space-y-6">
                
                {/* Simulator Tab Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('twin')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'twin'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Knowledge Twin
                    </button>
                    <button
                      onClick={() => setActiveTab('mentor')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'mentor'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      AI Mentor
                    </button>
                    <button
                      onClick={() => setActiveTab('roadmap')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'roadmap'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Adaptive Action
                    </button>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Tab Content 1: Knowledge Twin */}
                {activeTab === 'twin' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">TARGET: STAFF AI ENGINEER</span>
                      <span className="text-emerald-400 font-bold">78.4% OVERALL SCORE</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>Python & AsyncIO</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-[11px] text-slate-400">Bayesian Confidence: High</span>
                        </div>
                        <span className="font-black text-emerald-400 text-sm">92%</span>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-bold text-amber-300 flex items-center gap-1.5">
                            <span>PyTorch Autograd & DAG</span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300">PRIORITY GAP</span>
                          </div>
                          <span className="text-[11px] text-amber-400/80">Missing backward hook depth</span>
                        </div>
                        <span className="font-black text-amber-400 text-sm">48%</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>Vector RAG & Embeddings</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-[11px] text-slate-400">pgvector cosine metric verified</span>
                        </div>
                        <span className="font-black text-cyan-400 text-sm">82%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: AI Mentor Live Dialogue */}
                {activeTab === 'mentor' && (
                  <div className="space-y-3 font-mono text-xs animate-fade-in">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">LEARNER PROMPT:</span>
                      How does gradient accumulation simulate large batch sizes in PyTorch?
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-slate-200 space-y-2">
                      <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                        <Brain className="w-3 h-3" /> AI MENTOR (GROUNDED ON KNOWLEDGE TWIN):
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        In PyTorch, <code className="text-emerald-400">loss.backward()</code> sums gradients into <code className="text-emerald-400">tensor.grad</code>. By skipping <code className="text-emerald-400">optimizer.zero_grad()</code> across N mini-batches, you accumulate gradients before executing <code className="text-emerald-400">optimizer.step()</code>.
                      </p>
                      <div className="p-2 rounded-lg bg-slate-950 font-mono text-[10px] text-emerald-300 border border-slate-800">
                        {"Batch 1 ──> loss.backward()"}<br />
                        {"Batch 2 ──> loss.backward()"}<br />
                        {"Step N  ──> optimizer.step() + zero_grad()"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Adaptive Roadmap Engine */}
                {activeTab === 'roadmap' && (
                  <div className="space-y-3 font-mono text-xs animate-fade-in">
                    <div className="text-slate-400 text-[11px]">
                      DYNAMIC NEXT-BEST ACTION ASSIGNMENTS:
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                        <span className="font-bold text-amber-300">PyTorch Autograd Optimization</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                          ACTION: ASSESS
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                        <span className="font-bold text-cyan-300">LangGraph Multi-Agent RAG</span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px]">
                          ACTION: BUILD
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between opacity-60">
                        <span className="font-bold text-slate-400">Python AsyncIO Event Loops</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px]">
                          ACTION: SKIP (Mastered)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer CTA in Card */}
                <Link
                  to="/login"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Experience Interactive Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </Link>

              </div>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 2. VALUE PROPOSITION STATEMENT */}
        {/* ========================================================= */}
        <section className="text-center space-y-6 pt-12 border-t border-slate-900">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider">
            WHY BUILDYOURSKILL AI IS DIFFERENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
            Learn based on what you know — not where everyone else starts.
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-sans">
            Traditional platforms give everyone the exact same 40-hour video playlist. BuildYourSkill AI diagnoses your exact baseline and adapts every quiz, project, and mentor explanation to your target career role.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 3. 6 CORE ARCHITECTURAL PILLARS (FEATURES) */}
        {/* ========================================================= */}
        <section id="features" className="space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              End-to-End Learning Intelligence
            </h3>
            <p className="text-sm text-slate-400 font-mono">
              6 production-grade modules working as one continuous personalization loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1: Knowledge Twin */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-emerald-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Dynamic Knowledge Twin</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                A mathematical model of your skill mastery calibrated via Bayesian evidence updates, recency decay, and diagnostic assessments.
              </p>
            </div>

            {/* Pillar 2: AI Mentor */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-cyan-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Context-Grounded AI Mentor</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                A 24/7 technical mentor with prompt-injection defense that explains complex ML architectures, debugs PyTorch code, and outputs ASCII diagrams.
              </p>
            </div>

            {/* Pillar 3: Adaptive Roadmap */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-indigo-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-indigo-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Adaptive Action Engine</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Automatically assigns <code className="text-emerald-400">LEARN</code>, <code className="text-amber-400">PRACTICE</code>, <code className="text-cyan-400">ASSESS</code>, or <code className="text-slate-400">SKIP</code> actions to optimize your daily learning efficiency.
              </p>
            </div>

            {/* Pillar 4: AST Sandboxed Code Execution */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-amber-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-white">AST-Isolated Code Sandbox</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Execute real Python and PyTorch code with AST symbol verification, ephemeral directory isolation, memory limits, and automated test cases.
              </p>
            </div>

            {/* Pillar 5: Mock Interview Readiness */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-rose-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-rose-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-rose-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Staff AI Mock Interviewer</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Rigorous interview questions with rubric depth evaluation, missing keyword analysis, and immediate Knowledge Twin feedback loops.
              </p>
            </div>

            {/* Pillar 6: RAG & Learn From Anything */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-teal-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl hover:shadow-teal-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold text-white">RAG Vector Intelligence</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Import GitHub repositories, research papers, or documentation URLs. The system indexes chunks into pgvector and generates instant diagnostic quizzes.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. 5-STEP CONTINUOUS LEARNING CYCLE */}
        {/* ========================================================= */}
        <section id="how-it-works" className="space-y-12 pt-8">
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase">
              THE CONTINUOUS PERSONALIZATION LOOP
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white">
              From Knowledge to Staff AI Career
            </h3>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
              Every action you take informs your Knowledge Twin, recalculating your roadmap in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/50 transition-all">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black text-[10px]">
                01 — ASSESS
              </span>
              <h5 className="text-sm font-black text-white">Discover Baseline</h5>
              <p className="text-slate-400 font-sans text-xs">Take code diagnostics to map initial competencies.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-cyan-500/50 transition-all">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-black text-[10px]">
                02 — TWIN
              </span>
              <h5 className="text-sm font-black text-white">Build Twin</h5>
              <p className="text-slate-400 font-sans text-xs">Bayesian scores update confidence & priority gaps.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-indigo-500/50 transition-all">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-black text-[10px]">
                03 — ADAPT
              </span>
              <h5 className="text-sm font-black text-white">Adaptive Path</h5>
              <p className="text-slate-400 font-sans text-xs">Roadmap recalculates actions based on identified gaps.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-amber-500/50 transition-all">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-[10px]">
                04 — BUILD
              </span>
              <h5 className="text-sm font-black text-white">Production Projects</h5>
              <p className="text-slate-400 font-sans text-xs">Create end-to-end ML architectures in sandboxed code.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-teal-500/50 transition-all">
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-black text-[10px]">
                05 — GROW
              </span>
              <h5 className="text-sm font-black text-white">Staff Readiness</h5>
              <p className="text-slate-400 font-sans text-xs">Master mock technical interviews and career rubrics.</p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CALL TO ACTION BANNER */}
        {/* ========================================================= */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              PRIVATE BETA COHORT • AUG-2026
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to build your AI Knowledge Twin?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              Join our private beta cohort today and experience an AI platform that actually knows what you need to learn next.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 font-mono">
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
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

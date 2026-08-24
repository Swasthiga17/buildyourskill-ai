import React from 'react';
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
  Clock,
  BookOpen
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between select-none">
      <main className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-24">
        {/* 2 & 3. Hero Section + Hero Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-4">
          <div className="space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-950 font-mono text-xs font-black inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>YOUR AI-POWERED PATH TO MASTERY</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Your AI-Powered Path to <span className="text-blue-600">Mastery.</span>
            </h1>

            <p className="text-base text-slate-700 font-sans font-medium leading-relaxed max-w-xl">
              GrowSkill AI understands what you already know, identifies your skill gaps, and creates a personalized learning journey that adapts as you grow.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 hover:scale-105 transition-all inline-flex items-center space-x-2"
              >
                <span>Build My Learning Path →</span>
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-4 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 font-black text-sm hover:bg-slate-50 transition-all"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="p-8 rounded-3xl bg-white border-2 border-blue-300 shadow-xl space-y-6 font-mono relative">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="font-black text-slate-900 text-base">Your Knowledge Twin</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
                78% Profile
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
                Python — 86%
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
                Machine Learning — 72%
              </div>
              <div className="p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 shadow-sm">
                ⭐ RAG — 64% (Focus)
              </div>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950">
                Deep Learning — 48% (Gap)
              </div>
            </div>
          </div>
        </section>

        {/* 4. Trust / Value Statement */}
        <section className="space-y-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans">
            Learn based on what you know — not where everyone else starts.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-left">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <span className="text-2xl block">🧠</span>
              <h3 className="text-lg font-black text-slate-900">Understand</h3>
              <p className="text-slate-600 font-sans">Your AI Knowledge Twin maps your skills and diagnostic baseline.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <span className="text-2xl block">🎯</span>
              <h3 className="text-lg font-black text-slate-900">Personalize</h3>
              <p className="text-slate-600 font-sans">Your learning path adapts dynamically to your daily goals and mistakes.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <span className="text-2xl block">🚀</span>
              <h3 className="text-lg font-black text-slate-900">Grow</h3>
              <p className="text-slate-600 font-sans">Build production projects and prepare for your target AI/ML career.</p>
            </div>
          </div>
        </section>

        {/* 5. How GrowSkill AI Works */}
        <section id="how-it-works" className="space-y-8 font-mono text-xs">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900">From Knowledge to Career</h2>
            <p className="text-slate-600 font-sans">A 5-step continuous learning cycle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-bold text-center">
            <div className="p-5 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 space-y-1">
              <span className="block font-black text-sm">01 — Assess</span>
              <span className="text-[11px] font-sans">Discover baseline</span>
            </div>
            <div className="p-5 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 space-y-1">
              <span className="block font-black text-sm">02 — Understand</span>
              <span className="text-[11px] font-sans">Build Knowledge Twin</span>
            </div>
            <div className="p-5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 space-y-1">
              <span className="block font-black text-sm">03 — Learn</span>
              <span className="text-[11px] font-sans">Adaptive learning path</span>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 space-y-1">
              <span className="block font-black text-sm">04 — Build</span>
              <span className="text-[11px] font-sans">Real-world projects</span>
            </div>
            <div className="p-5 rounded-2xl bg-purple-100 border border-purple-300 text-purple-950 space-y-1">
              <span className="block font-black text-sm">05 — Grow</span>
              <span className="text-[11px] font-sans">Become career ready</span>
            </div>
          </div>
        </section>

        {/* 6. Knowledge Twin Section */}
        <section id="knowledge-twin" className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6 font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Meet Your Knowledge Twin</h2>
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
            <span className="font-black text-amber-950 uppercase block">💡 AI INSIGHT EXAMPLE:</span>
            <p className="text-slate-800 font-sans text-sm">
              "Your Knowledge Twin noticed: You understand RAG fundamentals but need more hands-on experience with production deployment."
            </p>
            <Link to="/login" className="text-blue-700 font-bold inline-block pt-2">
              Build a Production RAG Assistant →
            </Link>
          </div>
        </section>

        {/* 7. Adaptive Learning Section */}
        <section id="learning" className="p-8 sm:p-10 rounded-3xl bg-blue-50 border border-blue-200 shadow-md space-y-6 font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">A Learning Path That Changes With You</h2>
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 overflow-x-auto">
            <pre className="whitespace-pre">{`Your Goal ──> Assessment ──> Skill Gap ──> Path ──> Lesson ──> Practice ──> Assessment ──> Path Updated`}</pre>
          </div>
        </section>

        {/* 8. AI Mentor Section */}
        <section id="ai-mentor" className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-black text-slate-900">Your AI Mentor Is Always With You (Nova)</h2>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2 font-sans">
            <span className="font-mono text-amber-400 font-bold block">🤖 NOVA:</span>
            <p className="text-sm">
              "You struggled with neural networks in your last assessment. Let's review the concept before moving forward."
            </p>
          </div>
        </section>

        {/* 9. Project-Based Learning */}
        <section className="space-y-6 font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Don't Just Learn. Build.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-black text-slate-900">🧠 AI Knowledge Assistant</h3>
              <p className="text-slate-600 font-sans text-xs">RAG • LLMs • FastAPI</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-black text-slate-900">🤖 AI Agent Platform</h3>
              <p className="text-slate-600 font-sans text-xs">Agents • LangGraph • LLMs</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-black text-slate-900">📊 ML Prediction System</h3>
              <p className="text-slate-600 font-sans text-xs">ML • FastAPI • Docker</p>
            </div>
          </div>
        </section>

        {/* 10. Career Intelligence */}
        <section id="career" className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-3xl font-black text-slate-900">Know Where Your Skills Can Take You</h2>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black">72% Career Ready</span>
          </div>
          <p className="text-slate-700 font-sans text-sm">
            Target Role: AI/ML Engineer (18 / 25 skills matched). Skill gaps: MLOps · Deep Learning · Cloud.
          </p>
        </section>

        {/* 11. Final CTA */}
        <section className="p-10 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-700 text-white font-mono text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-5xl font-black">Your next skill is closer than you think.</h2>
          <p className="text-sm font-sans max-w-xl mx-auto opacity-90">
            Let AI understand your knowledge, build your path, and help you become career ready.
          </p>
          <Link
            to="/login"
            className="px-8 py-4 rounded-2xl bg-amber-300 text-slate-950 font-black text-sm shadow-lg hover:scale-105 transition-all inline-block"
          >
            Start Building My Learning Path →
          </Link>
        </section>
      </main>

      {/* 12. Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 font-mono text-xs text-slate-700">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="text-lg font-black text-slate-900 block">GrowSkill AI</span>
            <p className="font-sans text-slate-600">Learn smarter. Build skills. Grow your career.</p>
          </div>
          <div className="space-y-2 font-bold">
            <span className="text-slate-900 block uppercase">Product</span>
            <a href="#knowledge-twin" className="block text-slate-600 hover:text-slate-900">Knowledge Twin</a>
            <a href="#learning" className="block text-slate-600 hover:text-slate-900">Learning</a>
            <a href="#ai-mentor" className="block text-slate-600 hover:text-slate-900">AI Mentor</a>
          </div>
          <div className="space-y-2 font-bold">
            <span className="text-slate-900 block uppercase">Resources</span>
            <span className="block text-slate-600">Documentation</span>
            <span className="block text-slate-600">Learning Guides</span>
          </div>
          <div className="space-y-2 font-bold">
            <span className="text-slate-900 block uppercase">Company</span>
            <span className="block text-slate-600">Privacy & Terms</span>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-slate-100 text-center font-bold text-slate-500">
          © 2026 GrowSkill AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  ArrowRight,
  Brain,
  Target,
  Flame,
  Map,
  Rocket,
  MessageSquare,
  Network,
  BookOpen,
  Clock,
import { Zap } from 'lucide-react';
import { BetaOnboardingBanner } from '../components/BetaOnboardingBanner';

export const MainDashboard: React.FC = () => {
  const navigate = useNavigate();

  const roadmapProgress = [
    { name: 'Python', status: 'completed', text: 'Python ✓' },
    { name: 'ML', status: 'current', text: 'ML ⚡' },
    { name: 'Deep Learning', status: 'upcoming', text: 'Deep Learning 🔒' },
    { name: 'LLMs', status: 'upcoming', text: 'LLMs 🔒' },
    { name: 'RAG', status: 'upcoming', text: 'RAG 🔒' },
    { name: 'MLOps', status: 'upcoming', text: 'MLOps 🔒' }
  ];

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Private Beta Onboarding Checklist Banner */}
      <BetaOnboardingBanner />

      {/* Top Greeting Header */}
      <div className="glass-panel-glow p-8 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-black">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>GROW SKILL AI DASHBOARD</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Welcome back, Swasthi! 👋
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-sans font-medium">
            Let's continue your journey to become an AI/ML Engineer.
          </p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <Link
            to="/roadmap/ml"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all font-mono"
          >
            <span>Start Learning →</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-3 font-mono">
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-emerald-600" />
              Knowledge Score
            </span>
            <span className="text-2xl font-black text-emerald-600">72%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 to-emerald-600 h-full rounded-full w-[72%]" />
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block">+8% this week</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-3 font-mono">
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              Career Readiness
            </span>
            <span className="text-2xl font-black text-blue-600">68%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full w-[68%]" />
          </div>
          <span className="text-[11px] text-blue-700 font-bold block">+6% this week</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-3 font-mono">
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Lessons Completed
            </span>
            <span className="text-2xl font-black text-amber-600">47</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full w-[75%]" />
          </div>
          <span className="text-[11px] text-amber-700 font-bold block">+12 this week</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-3 font-mono">
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              Hours Learned
            </span>
            <span className="text-2xl font-black text-purple-600">28.5h</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full w-[65%]" />
          </div>
          <span className="text-[11px] text-purple-700 font-bold block">+5.4h this week</span>
        </div>
      </div>

      {/* 🔥 Today's Priority Section */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-300 space-y-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
          <div className="flex items-center space-x-3">
            <Flame className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">🔥 Today's Priority</h2>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
              High Priority
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-black">
              +35 XP
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">🧠 ML Model Evaluation</h3>
            <p className="text-sm text-slate-700 font-sans leading-relaxed">
              Your target AI/ML Engineer role requires strong model evaluation skills (Precision/Recall, ROC-AUC, Confusion Matrix), and your current assessment shows a gap.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold">10 min — Learn</div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">15 min — Practice</div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 font-bold border border-blue-200">20 min — Build</div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-200">05 min — Recall</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 border border-emerald-200 space-y-4">
            <span className="text-xs font-mono text-slate-600 font-bold">Estimated Time: 50 min</span>
            <button
              onClick={() => navigate('/roadmap/ml')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md hover:scale-105 transition-all font-mono"
            >
              <span>Start Learning →</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Project Card */}
      <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-5 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-bold">
              RECOMMENDED PROJECT
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
              Intermediate
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-900">Production ML Prediction API</h3>
          <p className="text-xs text-slate-700 font-sans leading-relaxed">
            Build a scalable scikit-learn & FastAPI model serving container with Docker, MLOps metrics, and automated unit testing.
          </p>

          <div className="flex flex-wrap gap-2 font-mono text-[11px] pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold">FastAPI</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold">Docker</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold">MLflow</span>
          </div>
        </div>

        <Link
          to="/projects"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center justify-center space-x-2 shadow-md hover:scale-[1.02] transition-all font-mono"
        >
          <Rocket className="w-4 h-4" />
          <span>Generate Project Blueprint</span>
        </Link>
      </div>

      {/* 🗺️ Your Roadmap Timeline */}
      <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Map className="w-6 h-6 text-emerald-600" />
            <span>🗺️ Your Adaptive Roadmap</span>
          </h2>
          <Link to="/roadmap" className="text-xs font-mono font-bold text-emerald-700 hover:underline">
            Full 12 Stages →
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
          {roadmapProgress.map((item, idx) => (
            <React.Fragment key={idx}>
              <Link
                to={item.name === 'Python' ? '/roadmap/python' : item.name === 'ML' ? '/roadmap/ml' : '/roadmap'}
                className={`px-4 py-2.5 rounded-2xl border transition-all ${
                  item.status === 'completed'
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                    : item.status === 'current'
                    ? 'bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 text-white font-black shadow-md scale-105'
                    : 'bg-white/80 border-slate-300 text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.text}
              </Link>
              {idx < roadmapProgress.length - 1 && <span className="text-slate-400 font-bold">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Motivation Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 via-emerald-100 to-blue-100 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="space-y-1">
          <span className="text-sm font-black text-slate-900 block">You're making great progress! 🚀</span>
          <span className="text-xs text-slate-700 block">Consistent learning is the key to mastering AI/ML.</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <span className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-extrabold text-xs">
            Weekly Goal: 5 of 7 Completed
          </span>
        </div>
      </div>
    </div>
  );
};

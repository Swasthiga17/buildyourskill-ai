import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Brain,
  Layers,
  ArrowRight,
  HelpCircle,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Code,
  Rocket,
  Award,
  Mic
} from 'lucide-react';
import { apiService } from '../services/api';

export const KnowledgeTwin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skill_intel' | 'evolution' | 'benchmark' | 'graph' | 'insights'>('overview');

  // Evidence Drawer State
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [selectedSkillName, setSelectedSkillName] = useState('Machine Learning');

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Network className="w-4 h-4 text-emerald-600" />
              <span>CENTRAL KNOWLEDGE TWIN ENGINE v2.0</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            My Knowledge <span className="text-gradient-emerald">Twin 2.0</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            AI-powered digital twin mapping what you know, your confidence, evidence behind every score, and your career readiness.
          </p>
        </div>

        {/* Overall Score Circle */}
        <div className="p-4 rounded-3xl bg-white border border-emerald-300 shadow-md flex items-center space-x-4 font-mono">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">78%</span>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-600 font-bold block">Overall Confidence</span>
            <span className="text-xs font-black text-emerald-700">+6% this month</span>
          </div>
        </div>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-6 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'overview' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Network className="w-4 h-4" />
          <span className="hidden lg:inline">1. Constellation</span>
        </button>

        <button
          onClick={() => setActiveTab('skill_intel')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'skill_intel' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span className="hidden lg:inline">2. Skill Intel</span>
        </button>

        <button
          onClick={() => setActiveTab('evolution')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'evolution' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden lg:inline">3. Skill Evolution</span>
        </button>

        <button
          onClick={() => setActiveTab('benchmark')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'benchmark' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden lg:inline">4. Benchmark</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'graph' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden lg:inline">5. Dependency Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'insights' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden lg:inline">6. AI Twin Insights</span>
        </button>
      </div>

      {/* SCREEN 1 — Knowledge Constellation Overview */}
      {activeTab === 'overview' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Swasthi's Knowledge Constellation</h2>
            <span className="text-xs font-mono font-bold text-slate-600">
              Blue = Strong (70%+), Yellow = Improving (50-69%), Orange = Skill Gap (&lt;50%)
            </span>
          </div>

          {/* Skill Constellation Canvas */}
          <div className="w-full h-80 rounded-3xl bg-slate-900 border border-slate-800 relative flex items-center justify-center p-6 shadow-inner font-mono">
            {/* Center Core */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10">
              <div className="w-full h-full bg-[#080D14] rounded-full flex flex-col items-center justify-center text-center p-2">
                <Brain className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-bold text-white leading-tight">Swasthi's Twin</span>
                <span className="text-xs font-black text-emerald-400">78%</span>
              </div>
            </div>

            {/* Surrounding Nodes */}
            <div
              onClick={() => {
                setSelectedSkillName('Python');
                setShowEvidenceDrawer(true);
              }}
              className="absolute top-6 left-12 p-3 rounded-2xl bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-all"
            >
              Python 86%
            </div>

            <div
              onClick={() => {
                setSelectedSkillName('Machine Learning');
                setShowEvidenceDrawer(true);
              }}
              className="absolute top-6 right-12 p-3 rounded-2xl bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-all"
            >
              ML 82%
            </div>

            <div
              onClick={() => {
                setSelectedSkillName('RAG Architecture');
                setShowEvidenceDrawer(true);
              }}
              className="absolute bottom-6 left-12 p-3 rounded-2xl bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-all"
            >
              RAG 80%
            </div>

            <div
              onClick={() => {
                setSelectedSkillName('Deep Learning');
                setShowEvidenceDrawer(true);
              }}
              className="absolute bottom-6 right-12 p-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-all"
            >
              DL 61%
            </div>

            <div
              onClick={() => {
                setSelectedSkillName('MLOps & Deployment');
                setShowEvidenceDrawer(true);
              }}
              className="absolute bottom-4 center-x p-3.5 rounded-2xl bg-red-500 text-white font-black text-xs shadow-md cursor-pointer hover:scale-110 transition-all"
            >
              MLOps 31% (Gap ⚠️)
            </div>
          </div>

          <div className="flex justify-center pt-2 font-mono text-xs">
            <button
              onClick={() => {
                setSelectedSkillName('Machine Learning');
                setShowEvidenceDrawer(true);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black shadow-md"
            >
              🔍 Click Any Skill to Inspect Evidence →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2 & 3 — Skill Intelligence & Evidence */}
      {activeTab === 'skill_intel' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Machine Learning Intelligence</h2>
              <span className="text-xs text-emerald-800 font-bold">82% Mastery • Status: 🟢 Strong</span>
            </div>
            <button
              onClick={() => setShowEvidenceDrawer(true)}
              className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs"
            >
              Why is my score 82%? (Inspect Evidence)
            </button>
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Conceptual</span>
              <span className="text-xl font-black text-emerald-600">86%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Practical</span>
              <span className="text-xl font-black text-blue-600">79%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Problem Solving</span>
              <span className="text-xl font-black text-amber-600">81%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Interview</span>
              <span className="text-xl font-black text-purple-600">76%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-slate-600 font-bold block">Projects</span>
              <span className="text-xl font-black text-emerald-700">88%</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Skill Evolution */}
      {activeTab === 'evolution' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Skill Growth Timeline</h2>
              <span className="text-xs text-emerald-800 font-bold">RAG Skill: June (42%) $\rightarrow$ July (57%) $\rightarrow$ August (80%)</span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">+38% in 8 Weeks</span>
          </div>

          {/* Line Chart ASCII Mock */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-amber-400 font-bold uppercase block">RAG Skill Evolution Curve:</span>
            <pre className="whitespace-pre">{`Score
 80 ┤                 ● (August: 80% - RAG Certified)
 70 ┤          ●──────
 57 ┤     ●──── (July: 57% - First RAG Project)
 42 ┤ ●─── (June: 42% - Initial Diagnostic)
    └────────────────────
      June   July   August`}</pre>
          </div>
        </div>
      )}

      {/* SCREEN 5 — Industry Benchmark */}
      {activeTab === 'benchmark' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Industry Benchmark Comparison</h2>
              <span className="text-xs text-slate-600 font-bold">Target Role: AI/ML Engineer</span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">Industry Comparison</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { skill: 'Python', user: 86, ind: 80, status: 'Above Benchmark' },
              { skill: 'Machine Learning', user: 82, ind: 78, status: 'Above Benchmark' },
              { skill: 'Deep Learning', user: 61, ind: 75, status: 'Needs Reinforcement' },
              { skill: 'LLMs', user: 74, ind: 70, status: 'Above Benchmark' },
              { skill: 'RAG Architecture', user: 80, ind: 65, status: 'Above Benchmark' },
              { skill: 'MLOps', user: 31, ind: 72, status: 'Critical Gap ⚠️' },
              { skill: 'System Design', user: 42, ind: 70, status: 'Gap' }
            ].map((b) => (
              <div key={b.skill} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-900 w-36">{b.skill}</span>
                <span className="text-emerald-700">You: {b.user}%</span>
                <span className="text-slate-500">Industry Target: {b.ind}%</span>
                <span className={b.user >= b.ind ? 'text-emerald-700 font-black' : 'text-amber-700 font-black'}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCREEN 6 — Skill Dependency Graph */}
      {activeTab === 'graph' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-black text-slate-900 font-mono">AI Skill Dependency Graph</h2>

          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
            <pre className="whitespace-pre">{`Python (86%)
  │
  ├────────→ Machine Learning (82%)
  │                 │
  │                 ↓
  │           Deep Learning (61%)
  │                 │
  │                 ↓
  │            Transformers (74%)
  │                 │
  │          ┌──────┴──────┐
  │          ↓             ↓
  │         LLM (74%)     RAG (80%)
  │          │             │
  │          └──────┬──────┘
  │                 ↓
  │             AI Agents (68%)
  │                 │
  └────────────→ MLOps (31% ⚠️ Current Priority)`}</pre>
          </div>
        </div>
      )}

      {/* SCREEN 7 — AI Twin Insights */}
      {activeTab === 'insights' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-black text-slate-900">What Your Knowledge Twin Says</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
              <span className="font-black text-emerald-950 uppercase block">🟢 STRENGTH:</span>
              <p className="text-slate-800 font-sans">RAG is becoming one of your strongest skills (80% mastery).</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
              <span className="font-black text-amber-950 uppercase block">🟡 OPPORTUNITY:</span>
              <p className="text-slate-800 font-sans">Deep Learning needs reinforcement (61% mastery).</p>
            </div>
            <div className="p-5 rounded-2xl bg-red-50 border border-red-300 space-y-2 col-span-1 md:col-span-2">
              <span className="font-black text-red-950 uppercase block">🔴 CRITICAL GAP:</span>
              <p className="text-slate-800 font-sans">MLOps (31% mastery) is limiting your production readiness. Improving MLOps will increase readiness by +8-12%.</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Evidence Side Drawer ("Why is my score 82%?") */}
      {showEvidenceDrawer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full p-8 space-y-6 overflow-y-auto shadow-2xl font-mono text-xs text-slate-900 border-l border-emerald-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedSkillName} Evidence</h3>
                <span className="text-emerald-700 font-bold">Why is my score 82%?</span>
              </div>
              <button onClick={() => setShowEvidenceDrawer(false)} className="p-1 text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1">
              <span className="font-black text-emerald-950 block uppercase">AI Evidence Confidence: 92% (High)</span>
              <p className="text-slate-800 font-sans text-xs">
                Your score is supported by 41 verified learning activities, not self-reported estimates.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-slate-900 block uppercase">Evidence Breakdown:</span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>📚 14 Lessons Completed</span>
                <span className="text-emerald-700">+18 Points</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>🧠 Assessments (84% avg)</span>
                <span className="text-emerald-700">+24 Points</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>💻 7 Coding Challenges</span>
                <span className="text-emerald-700">+16 Points</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>🏗️ 2 Projects Evaluated</span>
                <span className="text-emerald-700">+18 Points</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold">
                <span>🎤 Technical Interview (72%)</span>
                <span className="text-emerald-700">+6 Points</span>
              </div>
            </div>

            <button
              onClick={() => setShowEvidenceDrawer(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs shadow-md"
            >
              Close Evidence Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

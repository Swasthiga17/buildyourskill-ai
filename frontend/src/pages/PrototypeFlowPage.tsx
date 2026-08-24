import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Map,
  Sparkles,
  Bot,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Settings,
  Network,
  Rocket,
  BookOpen,
  Award,
  ArrowRight,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';

export const PrototypeFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeJourney, setActiveJourney] = useState<1 | 2 | 3>(1);

  return (
    <div className="space-y-8 select-none text-slate-900 bg-slate-50 p-4 sm:p-8 rounded-3xl min-h-screen">
      {/* Top Banner Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-emerald-400 bg-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-950 font-mono font-black text-xs">
              FIGMA CLICKABLE PROTOTYPE ARCHITECTURE FLOW
            </span>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-amber-200 text-amber-950 font-mono font-black text-xs">
            3 Connected Journeys + 10 Cross-System Links
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Complete Screen Navigation <span className="text-emerald-600">Flow</span>
        </h1>
        <p className="text-base text-slate-800 font-sans font-semibold leading-relaxed max-w-3xl">
          GrowSkill AI connects your Knowledge Twin, Skill Gaps, Adaptive Path, Projects, AI Mentor, and Career Readiness into one seamless intelligent ecosystem.
        </p>
      </div>

      {/* Journey Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <button
          onClick={() => setActiveJourney(1)}
          className={`p-5 rounded-2xl border-2 text-left space-y-1 transition-all ${
            activeJourney === 1 ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <span className="text-sm font-black block">Journey 1: Full Onboarding to Career</span>
          <span className="text-[11px] font-sans text-slate-700 block">
            {'Landing → Onboarding → Assessment → Twin → Dashboard → Path → Lesson → Practice → Project → Career → Settings'}
          </span>
        </button>

        <button
          onClick={() => setActiveJourney(2)}
          className={`p-5 rounded-2xl border-2 text-left space-y-1 transition-all ${
            activeJourney === 2 ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <span className="text-sm font-black block">Journey 2: AI Mentor Dynamic Loop</span>
          <span className="text-[11px] font-sans text-slate-700 block">
            {'Dashboard → Global AI Co-Pilot (Nova) → Contextual Hint ("Python Decorators") → Lesson → Practice'}
          </span>
        </button>

        <button
          onClick={() => setActiveJourney(3)}
          className={`p-5 rounded-2xl border-2 text-left space-y-1 transition-all ${
            activeJourney === 3 ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <span className="text-sm font-black block">Journey 3: Skill Gap to Project</span>
          <span className="text-[11px] font-sans text-slate-700 block">
            {'Career Intel → MLOps Gap (31%) → Recommended Project → Workspace → Career Readiness (+8%)'}
          </span>
        </button>
      </div>

      {/* JOURNEY 1 FLOW VISUALIZER */}
      {activeJourney === 1 && (
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Journey 1: Primary Learner Flow</h2>
            <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold">11 Stepper Nodes</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-emerald-400 border-2 border-slate-800 overflow-x-auto space-y-3">
            <pre className="whitespace-pre">{`Landing (/) ──> Login (/login) ──> Assessment (/assessments) ──> Knowledge Twin (/knowledge-twin)
                                                                                  │
                                                                                  ↓
Settings (/settings) ◄── Career Intel (/career) ◄── Projects (/projects) ◄── Dashboard (/dashboard)`}</pre>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>Launch Dashboard →</span>
            </Link>
          </div>
        </div>
      )}

      {/* JOURNEY 2 FLOW VISUALIZER */}
      {activeJourney === 2 && (
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Journey 2: AI Mentor Co-Pilot Loop</h2>
            <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold">Globally Accessible Co-Pilot</span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3 font-sans">
            <span className="font-mono font-black text-amber-950 block text-sm">🤖 NOVA (AI MENTOR CONTEXTUAL TRIGGER):</span>
            <p className="text-slate-900 font-bold text-xs">
              "You've struggled with Python decorators twice during assessments. Would you like a 10-minute explanation and targeted practice challenge?"
            </p>
            <div className="flex space-x-2 font-mono text-xs pt-1">
              <Link to="/roadmap/python" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">Teach Me</Link>
              <Link to="/assessments" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">Practice Challenge</Link>
            </div>
          </div>
        </div>
      )}

      {/* JOURNEY 3 FLOW VISUALIZER */}
      {activeJourney === 3 && (
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Journey 3: Skill Gap to Career Readiness</h2>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">Project Recommendation Loop</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-emerald-400 border-2 border-slate-800 overflow-x-auto space-y-2">
            <pre className="whitespace-pre">{`Career Intel: MLOps Gap (31%)
      ↓
Recommended Project: Real-Time ML Prediction API (FastAPI + Docker)
      ↓
Workspace: Complete Tasks & Evaluate Code
      ↓
Knowledge Twin Update: MLOps 31% ──> 46% (+15%)
      ↓
Career Readiness: 72% ──> 80% (+8% Job Ready 🎉)`}</pre>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              to="/projects"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>Launch Journey 3 Prototype (To Projects) →</span>
            </Link>
          </div>
        </div>
      )}

      {/* 10 Cross-System Link Badges */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-4 font-mono text-xs">
        <h3 className="text-xl font-black text-slate-900">10 Inter-Connected System Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-bold text-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Twin → Learning Path'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Twin → Career Intel'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Skill Gap → Learning'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Skill Gap → Projects'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Progress → Twin'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Progress → Career'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Projects → Readiness'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Career → Path'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'AI Mentor → All Modules'}</div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">{'Settings → Personalization'}</div>
        </div>
      </div>
    </div>
  );
};

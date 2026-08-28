import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  ArrowRight,
  Flame,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { BetaOnboardingBanner } from '../components/BetaOnboardingBanner';

export const MainDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Beta Onboarding Checklist */}
      <BetaOnboardingBanner />

      {/* Top Greeting Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-transparent pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome back, Alex!</span>
            <span>👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Ready to continue your personalized learning journey?
          </p>
        </div>

        {/* Streak & XP Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E8E4D8] shadow-2xs">
            <span className="text-lg font-black text-slate-900">7</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-500" /> Day Streak
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E8E4D8] shadow-2xs">
            <span className="text-lg font-black text-slate-900">950</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Award className="w-4 h-4 text-indigo-600" /> XP Earned
            </span>
          </div>
        </div>
      </div>

      {/* Row 1: Knowledge Twin Overview (Left) + Top Skill Gaps (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Knowledge Twin Overview Card */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">Knowledge Twin Overview</h2>
            <span className="text-xs text-slate-400 font-medium">Last updated: Today 2:30 AM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Circular Gauge */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center p-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-slate-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-emerald-500"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.78)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900">78%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Overall Score</span>
                </div>
              </div>
            </div>

            {/* Skill Bars */}
            <div className="sm:col-span-8 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Python</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Machine Learning</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full w-[78%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Deep Learning</span>
                  <span>53%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[53%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>RAG</span>
                  <span>61%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[61%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/knowledge-twin"
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2"
            >
              <span>View Full Knowledge Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Skill Gaps Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900">Top Skill Gaps</h2>
              <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">PyTorch</h4>
                  <p className="text-[10px] text-slate-500">Autograd & backward DAGs</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-200 text-amber-900 font-black text-xs">
                  48%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Model Deployment</h4>
                  <p className="text-[10px] text-slate-500">FastAPI & Docker containerization</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-slate-200 text-slate-800 font-black text-xs">
                  35%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Attention Mechanism</h4>
                  <p className="text-[10px] text-slate-500">Multi-head query-key-value math</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-slate-200 text-slate-800 font-black text-xs">
                  50%
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/roadmap"
            className="text-center w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            View All Gaps
          </Link>
        </div>

      </div>

      {/* Row 2: Today's Plan (Left) + Roadmap Progress (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Plan Card */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-black text-slate-900">Today's Plan</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                2h 15m Estimated
              </span>
            </div>
            <span className="text-xs text-slate-500 font-bold">3 Tasks Remaining</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-[#F8F6F0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">PyTorch Tensor Deep Dive</h4>
                  <span className="text-[10px] text-slate-500">Conceptual foundation & broadcasting</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500">30m</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                  ⚡
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Autograd Practice Task</h4>
                  <span className="text-[10px] text-amber-800 font-medium">Active coding in Python sandbox</span>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-900">45m</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F8F6F0] flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Mini-Coding Challenge</h4>
                  <span className="text-[10px] text-slate-500">Build linear regression from scratch</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500">40m</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F8F6F0] flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Recall Quiz</h4>
                  <span className="text-[10px] text-slate-500">5 diagnostic questions to verify retention</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500">20m</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              to="/today-plan"
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all"
            >
              Continue Plan
            </Link>
          </div>
        </div>

        {/* Roadmap Progress Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-base font-black text-slate-900">Roadmap Progress</h2>
            
            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E4D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Stage 02 — Learn</span>
                <span className="text-xs font-bold text-emerald-600">60% Complete</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Supervised Learning Math & Scikit-Learn Model Selection pipelines.
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[60%]" />
              </div>
            </div>
          </div>

          <Link
            to="/roadmap"
            className="text-center w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            View Roadmap
          </Link>
        </div>

      </div>

      {/* Row 3: Recent Activity (Left) + Career Target (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Activity Card */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-4">
          <h2 className="text-base font-black text-slate-900">Recent Activity</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-800">Completed quiz on Python Functions & AsyncIO</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">2h ago</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                <span className="text-xs font-bold text-slate-800">AI Mentor session on Vector Embeddings</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">5h ago</span>
            </div>
          </div>
        </div>

        {/* Career Target Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900">Career Target</h2>
              <span className="text-xs font-bold text-[#2563EB]">Edit</span>
            </div>
            <div>
              <span className="text-sm font-black text-slate-900">AI/ML Engineer</span>
              <p className="text-[11px] text-slate-500">Target Role in High Demand</p>
            </div>
            <div className="pt-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Next Milestone</span>
              <span className="text-xs font-bold text-slate-800">Build Distributed ML Pipeline</span>
            </div>
          </div>

          <Link
            to="/career"
            className="text-center w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            Career Intelligence →
          </Link>
        </div>

      </div>
    </div>
  );
};

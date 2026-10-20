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
  Briefcase,
  Target,
  Zap,
  Activity
} from 'lucide-react';
import { BetaOnboardingBanner } from '../components/BetaOnboardingBanner';

export const MainDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 select-none text-slate-900 font-sans">
      {/* Beta Onboarding Checklist */}
      <BetaOnboardingBanner />

      {/* Top Greeting Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-2.5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight flex items-center gap-3.5">
            <span>Welcome back, Buddy!</span>
            <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">👋</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 font-extrabold max-w-3xl">
            Ready to continue your personalized learning journey toward becoming an AI/ML Engineer?
          </p>
        </div>

        {/* Streak & XP Badges in Yellow + Blue */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-3.5 px-6 py-4 rounded-3xl bg-white/95 border-2 border-amber-400 shadow-xl shadow-amber-500/15 backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black text-amber-600">7</span>
            <span className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-400 animate-pulse stroke-[2.2]" /> Day Streak
            </span>
          </div>

          <div className="flex items-center gap-3.5 px-6 py-4 rounded-3xl bg-white/95 border-2 border-blue-400 shadow-xl shadow-blue-500/15 backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black text-blue-600">950</span>
            <span className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600 fill-blue-400/30 stroke-[2.2]" /> XP Earned
            </span>
          </div>
        </div>
      </div>

      {/* Row 1: Knowledge Twin Overview (Left) + Top Skill Gaps (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Knowledge Twin Overview Card */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-emerald-200/50 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-700">
                <Brain className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Knowledge Twin Overview</h2>
            </div>
            <span className="text-base text-slate-600 font-bold">Last updated: Today 2:30 AM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            {/* Circular Gauge with Yellow -> Green -> Blue Gradient */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-2">
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_6px_16px_rgba(16,185,129,0.35)]" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="ygbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="39"
                    className="text-slate-100"
                    strokeWidth="11"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="39"
                    stroke="url(#ygbGrad)"
                    strokeWidth="11"
                    strokeDasharray={245}
                    strokeDashoffset={245 * (1 - 0.78)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                    78%
                  </span>
                  <span className="text-sm font-black text-emerald-700 uppercase tracking-widest mt-1">
                    Overall Score
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Bars with Vibrant Yellow, Green, and Blue gradients */}
            <div className="sm:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900 mb-2">
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                    Python
                  </span>
                  <span className="font-black text-emerald-600 text-lg sm:text-xl">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[92%] shadow-md shadow-emerald-500/30" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900 mb-2">
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-sm shadow-blue-600" />
                    Machine Learning
                  </span>
                  <span className="font-black text-blue-600 text-lg sm:text-xl">78%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full w-[78%] shadow-md shadow-blue-500/30" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900 mb-2">
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
                    Deep Learning
                  </span>
                  <span className="font-black text-amber-600 text-lg sm:text-xl">53%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full w-[53%] shadow-md shadow-amber-500/30" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900 mb-2">
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-teal-500 shadow-sm shadow-teal-500" />
                    RAG & Vector Search
                  </span>
                  <span className="font-black text-teal-700 text-lg sm:text-xl">61%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-blue-500 h-full rounded-full w-[61%] shadow-md shadow-teal-500/30" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/knowledge-twin"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white text-base sm:text-lg font-black shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center gap-3 hover:scale-[1.02]"
            >
              <span>View Full Knowledge Twin</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* Top Skill Gaps Card in YGB Theme */}
        <div className="lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-7 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-emerald-200/50 pb-5">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-amber-500 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Top Skill Gaps</h2>
              </div>
              <span className="text-sm font-black text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border-2 border-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 stroke-[2.5]" /> Action Required
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4.5 rounded-2xl bg-amber-50/95 border-2 border-amber-300 hover:bg-amber-100/70 transition-colors">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">PyTorch</h4>
                  <p className="text-sm text-slate-600 font-bold mt-0.5">Autograd & backward DAGs</p>
                </div>
                <span className="px-3.5 py-2 rounded-xl bg-amber-200 border-2 border-amber-400 text-amber-950 font-black text-base sm:text-lg shadow-xs">
                  48%
                </span>
              </div>

              <div className="flex items-center justify-between p-4.5 rounded-2xl bg-blue-50/95 border-2 border-blue-300 hover:bg-blue-100/70 transition-colors">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Model Deployment</h4>
                  <p className="text-sm text-slate-600 font-bold mt-0.5">FastAPI & Docker containerization</p>
                </div>
                <span className="px-3.5 py-2 rounded-xl bg-blue-200 border-2 border-blue-400 text-blue-950 font-black text-base sm:text-lg shadow-xs">
                  35%
                </span>
              </div>

              <div className="flex items-center justify-between p-4.5 rounded-2xl bg-emerald-50/95 border-2 border-emerald-300 hover:bg-emerald-100/70 transition-colors">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Attention Mechanism</h4>
                  <p className="text-sm text-slate-600 font-bold mt-0.5">Multi-head query-key-value math</p>
                </div>
                <span className="px-3.5 py-2 rounded-xl bg-emerald-200 border-2 border-emerald-400 text-emerald-950 font-black text-base sm:text-lg shadow-xs">
                  50%
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/roadmap"
            className="text-center w-full py-4 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-emerald-800 hover:text-emerald-950 text-base sm:text-lg font-black transition-all shadow-md mt-4 block"
          >
            View All Gaps →
          </Link>
        </div>

      </div>

      {/* Row 2: Today's Plan (Left) + Roadmap Progress (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Plan Card in YGB Theme */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-emerald-200/50 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-blue-100 border-2 border-blue-300 text-blue-700">
                <Zap className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Today's Plan</h2>
              <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-sm font-black border-2 border-blue-300">
                2h 15m Estimated
              </span>
            </div>
            <span className="text-base text-slate-700 font-bold">3 Tasks Remaining</span>
          </div>

          <div className="space-y-4">
            {/* Task 1: Done in Green */}
            <div className="p-4.5 rounded-2xl bg-emerald-50/95 border-2 border-emerald-400/80 flex items-center justify-between transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-base font-black shadow-md">
                  ✓
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">PyTorch Tensor Deep Dive</h4>
                  <span className="text-sm text-emerald-800 font-extrabold">Conceptual foundation & broadcasting</span>
                </div>
              </div>
              <span className="text-base font-black text-emerald-700">30m</span>
            </div>

            {/* Task 2: Active in Yellow */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-100 border-2 border-amber-400 shadow-md shadow-amber-500/15 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center text-base font-black shadow-md shadow-amber-500/30 animate-pulse">
                  ⚡
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Autograd Practice Task</h4>
                  <span className="text-sm text-amber-900 font-extrabold">Active coding in Python sandbox</span>
                </div>
              </div>
              <span className="text-base font-black text-amber-800">45m</span>
            </div>

            {/* Task 3 */}
            <div className="p-4.5 rounded-2xl bg-white/95 border-2 border-emerald-200/80 flex items-center justify-between hover:border-emerald-400 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 border-2 border-blue-300 flex items-center justify-center text-base font-black">
                  3
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Mini-Coding Challenge</h4>
                  <span className="text-sm text-slate-600 font-bold">Build linear regression from scratch</span>
                </div>
              </div>
              <span className="text-base font-bold text-slate-600">40m</span>
            </div>

            {/* Task 4 */}
            <div className="p-4.5 rounded-2xl bg-white/95 border-2 border-emerald-200/80 flex items-center justify-between hover:border-emerald-400 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 border-2 border-blue-300 flex items-center justify-center text-base font-black">
                  4
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Recall Quiz</h4>
                  <span className="text-sm text-slate-600 font-bold">5 diagnostic questions to verify retention</span>
                </div>
              </div>
              <span className="text-base font-bold text-slate-600">20m</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              to="/today-plan"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white text-base sm:text-lg font-black shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              Continue Plan →
            </Link>
          </div>
        </div>

        {/* Roadmap Progress Card */}
        <div className="lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-7 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b-2 border-emerald-200/50 pb-5">
              <TrendingUp className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Roadmap Progress</h2>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-blue-50/90 border-2 border-emerald-300/80 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-black text-slate-900">Stage 02 — Learn</span>
                <span className="text-base sm:text-lg font-black text-emerald-700">60% Complete</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">
                Supervised Learning Math & Scikit-Learn Model Selection pipelines.
              </p>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 h-full rounded-full w-[60%] shadow-md shadow-emerald-500/30" />
              </div>
            </div>
          </div>

          <Link
            to="/roadmap"
            className="text-center w-full py-4 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-emerald-800 hover:text-emerald-950 text-base sm:text-lg font-black transition-all shadow-md mt-4 block"
          >
            View Roadmap →
          </Link>
        </div>

      </div>

      {/* Row 3: Recent Activity (Left) + Career Target (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Activity Card */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-emerald-200/50 pb-5">
            <Activity className="w-6 h-6 text-blue-600 stroke-[2.5]" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4.5 rounded-2xl bg-white/95 border-2 border-emerald-200">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                <span className="text-base sm:text-lg font-bold text-slate-900">Completed quiz on Python Functions & AsyncIO</span>
              </div>
              <span className="text-sm font-bold text-slate-500">2h ago</span>
            </div>

            <div className="flex items-center justify-between p-4.5 rounded-2xl bg-white/95 border-2 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-blue-600 shadow-sm shadow-blue-600" />
                <span className="text-base sm:text-lg font-bold text-slate-900">AI Mentor session on Vector Embeddings</span>
              </div>
              <span className="text-sm font-bold text-slate-500">5h ago</span>
            </div>
          </div>
        </div>

        {/* Career Target Card */}
        <div className="lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 hover:shadow-2xl transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-emerald-200/50 pb-5">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Career Target</h2>
              </div>
              <span className="text-sm font-black text-blue-600 hover:text-blue-800 cursor-pointer">Edit</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900">AI/ML Engineer</span>
              <p className="text-sm font-extrabold text-emerald-700 mt-1">Target Role in High Demand</p>
            </div>
            <div className="pt-2">
              <span className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider block">Next Milestone</span>
              <span className="text-base sm:text-lg font-black text-slate-900">Build Distributed ML Pipeline</span>
            </div>
          </div>

          <Link
            to="/career"
            className="text-center w-full py-4 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-emerald-800 hover:text-emerald-950 text-base sm:text-lg font-black transition-all shadow-md mt-4 block"
          >
            Career Intelligence →
          </Link>
        </div>

      </div>
    </div>
  );
};

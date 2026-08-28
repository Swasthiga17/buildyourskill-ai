import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
  Share2,
  Brain,
  Zap,
  Target
} from 'lucide-react';

export const RoadmapHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'milestones'>('roadmap');

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Your Personalized Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            A dynamic path that adapts to your progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E4D8] text-xs font-bold text-slate-700 shadow-2xs">
            Role: AI/ML Engineer
          </span>
          <button className="px-4 py-1.5 rounded-xl bg-white border border-[#E8E4D8] text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'roadmap'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'milestones'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Milestones
        </button>
      </div>

      {/* Step Sequence Cards matching Image */}
      <div className="space-y-4">
        
        {/* Step 1: Assess */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Assess</h3>
              <p className="text-xs text-slate-500">Discover your baseline</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        </div>

        {/* Step 2: Understand */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Understand</h3>
              <p className="text-xs text-slate-500">Build your Knowledge Twin</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        </div>

        {/* Step 3: Learn (Active Card with Why This / Why Now) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-50/70 border-2 border-amber-300 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
                03
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Learn</h3>
                <p className="text-xs text-slate-600 font-medium">Adaptive learning path</p>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-xs flex items-center gap-1">
              <span>⚡ In Progress</span>
            </span>
          </div>

          {/* Why This & Why Now sub-cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">WHY THIS?</span>
              <h4 className="font-bold text-slate-900">Master PyTorch Autograd & Tensor DAGs</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Your Knowledge Twin identified PyTorch backward hooks as your primary gap (48% mastery vs 90% target).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">WHY NOW?</span>
              <h4 className="font-bold text-slate-900">Prerequisite for Deep Learning Projects</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Completing this stage unlocks your distributed multi-agent RAG project milestone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-bold">Estimated: 50 min left today</span>
            <Link
              to="/roadmap/ml"
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-xs"
            >
              Continue Learning →
            </Link>
          </div>
        </div>

        {/* Step 4: Build */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs flex items-center justify-between opacity-80">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">Build</h3>
              <p className="text-xs text-slate-500">Real-world sandboxed projects</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        </div>

        {/* Step 5: Grow */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs flex items-center justify-between opacity-80">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
              05
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">Grow</h3>
              <p className="text-xs text-slate-500">Staff career interview readiness</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  Brain,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  Terminal,
  Zap
} from 'lucide-react';

export const AssessmentsCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'completed' | 'recommended'>('available');

  const assessmentCards = [
    {
      title: 'Python Fundamentals',
      questions: '24 Questions',
      time: '45 min',
      level: 'Beginner',
      icon: Terminal,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'Machine Learning Basics',
      questions: '20 Questions',
      time: '30 min',
      level: 'Intermediate',
      icon: Brain,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Deep Learning Concepts',
      questions: '18 Questions',
      time: '30 min',
      level: 'Advanced',
      icon: Zap,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'PyTorch Basics',
      questions: '15 Questions',
      time: '25 min',
      level: 'Beginner',
      icon: Code2,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'RAG Fundamentals',
      questions: '20 Questions',
      time: '35 min',
      level: 'Intermediate',
      icon: Layers,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      title: 'MLOps Basics',
      questions: '20 Questions',
      time: '30 min',
      level: 'Advanced',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Assessments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Test your knowledge and track your progress.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'available'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'recommended'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Recommended
        </button>
      </div>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-5 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {card.level}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900">{card.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{card.questions}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {card.time}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-800 text-xs font-bold transition-all">
                Start
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

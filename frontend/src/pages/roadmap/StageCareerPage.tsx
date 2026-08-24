import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, CheckCircle2, Rocket } from 'lucide-react';

export const StageCareerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-mono">
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Roadmap Home</span>
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 space-y-8 bg-slate-900/90 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 mx-auto">
            <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center text-amber-400">
              <Award className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            🏆 You're Becoming an <span className="text-gradient-gold">AI/ML Engineer</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Congratulations! You have completed all 12 core roadmap domains across Python, Math, ML, Deep Learning, Transformers, LLMs, RAG, Agents, MLOps, and System Design.
          </p>
        </div>

        {/* Readiness Score Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between font-mono">
            <span className="text-sm text-slate-300">Final Assessment Readiness Score</span>
            <span className="text-4xl font-black text-amber-400">82%</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[82%]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Technical Skills</span>
              <span className="text-xl font-bold text-emerald-400">86%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Projects</span>
              <span className="text-xl font-bold text-amber-400">80%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Interview Readiness</span>
              <span className="text-xl font-bold text-cyan-400">74%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Production Skills</span>
              <span className="text-xl font-bold text-purple-400">65%</span>
            </div>
          </div>
        </div>

        {/* Completed Roadmap Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          {[
            'Python',
            'Mathematics',
            'Machine Learning',
            'Deep Learning',
            'Transformers',
            'LLMs',
            'RAG',
            'Agents',
            'MLOps',
            'System Design'
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>✓ {item}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/interview')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm inline-flex items-center space-x-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>🚀 Start Interview Preparation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

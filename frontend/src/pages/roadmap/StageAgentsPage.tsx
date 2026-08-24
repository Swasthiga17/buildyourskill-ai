import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

export const StageAgentsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/roadmap/mlops');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-mono">
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Roadmap Home</span>
      </Link>

      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            STAGE 09 • AGENTIC AI & LANGGRAPH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🕸️ Agentic AI</h1>
          <p className="text-sm text-slate-300">
            Architect multi-agent autonomous systems using LangGraph cyclic state graphs, tool calling, state memory, and human-in-the-loop validation.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/giQw5eazZ-ZJnjy8etV17Lu7jWsTGVAWEELzYB1nh83Dj2MhkibmpyAjV1hJ607eSwboS-JuN6MpXNHtBHcFFqWqn1GIdztuba1kZWLQpqntyAQnYg2yuiToKIzQCNvNsFIFbFGkIZBltT-h84vYEhadfT2Rq4cB76QN0VWXf5HeWfCFhJnPiEGZphXasiKg?purpose=fullsize"
            alt="Agentic AI"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-amber-400 font-mono uppercase">Agentic Architecture Nodes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold">1. ReAct Loop</span>
            <p className="text-[11px] text-slate-400">Reasoning + Action execution loops</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold">2. Tool Calling</span>
            <p className="text-[11px] text-slate-400">Web search, code execution & DB tools</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold">3. Multi-Agent Graph</span>
            <p className="text-[11px] text-slate-400">Supervisor / Worker orchestration in LangGraph</p>
          </div>
        </div>
      </div>

      {/* Unlock CTA Button */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Mastered Agentic AI?</h4>
          <p className="text-xs text-slate-400 font-mono">Click to complete this stage and unlock Stage 10: MLOps!</p>
        </div>
        <button
          onClick={handleComplete}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-2 transition-all shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Complete Domain & Unlock MLOps 🎉</span>
        </button>
      </div>
    </div>
  );
};

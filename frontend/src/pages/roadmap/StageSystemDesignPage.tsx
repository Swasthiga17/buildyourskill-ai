import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, CheckCircle2 } from 'lucide-react';

export const StageSystemDesignPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/roadmap/career');
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
            STAGE 11 • SYSTEM DESIGN & SCALABILITY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🏗️ AI System Design</h1>
          <p className="text-sm text-slate-300">
            Architect scalable ML pipelines, recommendation engines, KV cache management, and production RAG at 10M documents.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/omYS3Tn61k75Hxsl72tIF0JEUyxNdTqRTZoSOs-ZJHxBJS-hoILMdVBdXbkhLmJovXLqn9ca2fZXdAOuwXuxlIyTJatoQlZqE504me-da9tFvTxKWjzSkMCWU-AUQIP_aPv6lb2xdBbNeZPbYNBc_kTvNqQDyN32zpXFESr-ZknuKFwuXyvHwZAi4RMWKHPX?purpose=fullsize"
            alt="AI System Design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 font-mono">SYSTEM DESIGN CHALLENGE</h4>
        <h3 className="text-2xl font-black text-white">Design a production RAG system for 10 million documents.</h3>
        <p className="text-xs text-slate-300">
          Covering vector partitioning, HNSW graph indexing, Redis KV Cache for tokens, and streaming responses.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Mastered System Design?</h4>
          <p className="text-xs text-slate-400 font-mono">Click to complete this final domain and unlock Stage 12: Career Destination!</p>
        </div>
        <button
          onClick={handleComplete}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-2 transition-all shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Complete Roadmap & Unlock AI/ML Engineer 🎉</span>
        </button>
      </div>
    </div>
  );
};

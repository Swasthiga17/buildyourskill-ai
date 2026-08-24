import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle2 } from 'lucide-react';

export const StageMLOpsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/roadmap/system-design');
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
            STAGE 10 • PRODUCTION MLOPS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🚀 MLOps & Production AI</h1>
          <p className="text-sm text-slate-300">
            FastAPI, Docker multi-stage builds, vLLM inference server, MLflow registry, and Prometheus monitoring.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/3EIrut8xqb2lLZ9McA4SVL4r-9FScTqcUrbni7lEoBqaisTcirQlCPrRFfrlnYxEl2Jkq_rPiurBat7FzlU_Q86N-dAOhub5R3VyNRUupQjtZPJV8QUQyszjYxc-5zfSbjB-08SgZHBXysSuuE8WEl-NgXkk5drTIt7v8Yrp-eid3VYG30Cze8UtP18ktm9j?purpose=fullsize"
            alt="MLOps"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Mastered MLOps?</h4>
          <p className="text-xs text-slate-400 font-mono">Click to complete this stage and unlock Stage 11: AI System Design!</p>
        </div>
        <button
          onClick={handleComplete}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-2 transition-all shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Complete Domain & Unlock System Design 🎉</span>
        </button>
      </div>
    </div>
  );
};

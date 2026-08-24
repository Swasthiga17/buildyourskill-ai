import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, Brain } from 'lucide-react';

export const StageDLPage: React.FC = () => {
  const steps = ['Neural Networks', 'Backpropagation', 'Optimization', 'CNN', 'RNN', 'LSTM', 'PyTorch'];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-mono">
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Roadmap Home</span>
      </Link>

      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            STAGE 04 • DEEP LEARNING & PYTORCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🧠 Deep Learning</h1>
          <p className="text-sm text-slate-300">
            Build neural networks from scratch in PyTorch, mastering autograd and custom training loops.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/YJ3Ya3dS4JhRly-JPKwr7s_VfVr42F2nrSmbwPtrSPF1VVH51hKlIVPNA7-Yx9A6d1qfv0v6W0rvWXCpfPNToqRajdhDDMSJ7h-RIiB-97FZ5fNv75Z54XOGCM0aTAKGh5EiyP4cJbAvWK-2WSNuZs_dzu62wH6jlHaGt4MxdQ4hs4xqPsNMAgt-t7rlJ7oq?purpose=fullsize"
            alt="Deep Learning"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Visual Learning Path */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-amber-400 font-mono uppercase">Deep Learning Progression Path</h3>
        <div className="flex flex-col items-center space-y-2 max-w-xs mx-auto py-4">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="w-full p-3 rounded-2xl bg-slate-950 border border-amber-500/30 text-center font-mono text-xs font-bold text-slate-200">
                {step}
              </div>
              {idx < steps.length - 1 && <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

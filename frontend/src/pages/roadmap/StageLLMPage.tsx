import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export const StageLLMPage: React.FC = () => {
  const topics = [
    { title: 'LLM Fundamentals', status: 'completed' },
    { title: 'Prompt Engineering', status: 'completed' },
    { title: 'Structured Output (JSON Mode)', status: 'completed' },
    { title: 'Function Calling', status: 'locked' },
    { title: 'Fine-Tuning (LoRA/QLoRA)', status: 'locked' },
    { title: 'Evaluation (LLM-as-a-Judge)', status: 'locked' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-mono">
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Roadmap Home</span>
      </Link>

      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            STAGE 07 • GENERATIVE AI TRACK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🤖 LLM Engineering</h1>
          <p className="text-sm text-slate-300">
            Master tokens, context windows, prompt engineering, function calling, and QLoRA fine-tuning.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/WYykrp6dJxcZ4HYyWjyZ6sV84yGTcI2YaJr7BFoQAs4tltEXxncwmzfgUDs0j0mXnvmaEl9HezilGTlRRBv3wrClUQkDkbEXpby3c7wxhDH2LUnfS1Yzibf-TWl-2A2Lnb5Ja0DDUO4ANf3LkCYyps-S8x8YSS7ghkQGCBFrhV3-ePrKOZ4B5e0uHzAqk91g?purpose=fullsize"
            alt="LLM Engineering"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-amber-400 font-mono uppercase">LLM Core Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          {topics.map((t, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                t.status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>{t.title}</span>
              {t.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Lock className="w-4 h-4 text-slate-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';

export const StageTransformersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attention' | 'encoder' | 'decoder' | 'bert' | 'gpt'>('attention');

  const pipeline = [
    'Input Text',
    'Tokenization',
    'Embeddings',
    'Self Attention',
    'Multi-Head Attention',
    'Transformer Block',
    'Output Tokens'
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
            STAGE 06 • MODERN AI BRIDGE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">⚡ Transformers</h1>
          <p className="text-sm text-slate-300">
            Understand the mathematical foundation of modern AI: Self-Attention, Encoders, Decoders, BERT, and GPT.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/vYND5sgbADTAKuA2ORJPABGnaHyV2HNjhjiTXrPsQos3G-pMZQ7i-aJ1nVu6QnhoFIAOkNJTUv358mp81aIK6SSjkZdCIa5HegUmVeGCSCH9BTZl2tDHkvB0kNymYxdhmwGjLFIjS4Gvc2AFYRUYbqw4TW0DMV37vbACeUWyngQLZmAUxknJcfD_9_QiT2_4?purpose=fullsize"
            alt="Transformers"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-5 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold font-mono">
        {['attention', 'encoder', 'decoder', 'bert', 'gpt'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`py-2.5 rounded-xl uppercase transition-all ${
              activeTab === t ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
        <h3 className="text-sm font-bold text-amber-400 uppercase">Transformer Data Pipeline</h3>
        <div className="flex flex-wrap items-center gap-2">
          {pipeline.map((p, i) => (
            <React.Fragment key={i}>
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-200">
                {p}
              </span>
              {i < pipeline.length - 1 && <span className="text-amber-400 font-bold">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

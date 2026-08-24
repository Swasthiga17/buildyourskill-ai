import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Eye, CheckCircle2 } from 'lucide-react';

export const StageNLPCVPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<'nlp' | 'cv'>('nlp');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline font-mono">
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Roadmap Home</span>
      </Link>

      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            STAGE 05 • SPECIALIZATION DUAL TRACK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🔤 NLP & 👁️ Computer Vision</h1>
          <p className="text-sm text-slate-300">
            Choose your primary domain specialization track or master both foundations.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/EANigXqC_J7XQY-m_OAZ6ZzNgjbyVuLf8rKTX3m050MNiTLTzeh33-WEE_Rr3sJoFeHWKbmbKg-dsbhcXzzY38JVeomWtMu8vvnRO_E1XoKHuXtkA9oVsgWmOMSGHwgsCDA_760i1zDxtBdSX1rFH6Ge6Af8OhXGUGwmKRGoig_ku_apDlTf7WJVAEFp9vhg?purpose=fullsize"
            alt="NLP & Computer Vision"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Two Large Image Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setSelectedTrack('nlp')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-4 ${
            selectedTrack === 'nlp'
              ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>📝 NLP Track</span>
            </h3>
            {selectedTrack === 'nlp' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          </div>
          <p className="text-xs text-slate-300 font-mono">Text → Embeddings → Tokenization → Sequence Models → Attention</p>
        </div>

        <div
          onClick={() => setSelectedTrack('cv')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-4 ${
            selectedTrack === 'cv'
              ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>👁️ Computer Vision Track</span>
            </h3>
            {selectedTrack === 'cv' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <p className="text-xs text-slate-300 font-mono">Image → CNN → Object Detection → Image Segmentation → ViT</p>
        </div>
      </div>
    </div>
  );
};

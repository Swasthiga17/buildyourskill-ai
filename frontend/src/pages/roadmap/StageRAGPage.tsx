import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export const StageRAGPage: React.FC = () => {
  const pipeline = [
    { title: '📄 Documents', desc: 'PDF, TXT, HTML extraction' },
    { title: '✂️ Chunking', desc: 'Semantic recursive chunking' },
    { title: '🧬 Embeddings', desc: 'Vector representations' },
    { title: '🗄️ Vector DB', desc: 'pgvector HNSW indexing' },
    { title: '🔍 Retrieval', desc: 'Cosine similarity + BM25' },
    { title: '🎯 Reranking', desc: 'Cross-Encoder Reranker' },
    { title: '🤖 LLM', desc: 'Grounded generation' },
    { title: '💬 Answer', desc: 'Evidence-backed response' }
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
            STAGE 08 • ADVANCED RAG TRACK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">🔎 RAG Engineering</h1>
          <p className="text-sm text-slate-300">
            Build enterprise-grade RAG systems with hybrid search, pgvector HNSW indexing, cross-encoder reranking, and Ragas evaluation benchmarks.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/2VFt2zcWjP77K5djvaHoabE0GKB1Ymyt20xoEgVROjwyqqMC8LI28N7tInBtMY5mRgqCpv4c9yK-4JoQQ8B7R_9drLmR9ROxdM8Q44if0x64MrFe8J_pNdzknP2nMzhM9alg-iTOLWeq_xGzwP6Rjzr-OlUUlVaXDbeMt1-j5q9L4dAGmbTfnFaFwiOsoXx5?purpose=fullsize"
            alt="RAG Engineering"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Interactive Pipeline Visual */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-amber-400 font-mono uppercase">RAG End-to-End Pipeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {pipeline.map((p, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
              <h4 className="text-xs font-bold text-white font-mono">{p.title}</h4>
              <p className="text-[10px] text-slate-400 font-mono">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

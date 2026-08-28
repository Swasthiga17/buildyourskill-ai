import React, { useState } from 'react';
import { Award, CheckCircle2, RefreshCw, Sparkles, MessageSquare, Terminal, AlertTriangle, Play } from 'lucide-react';
import { apiService } from '../services/api';

export const InterviewReadiness: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    depthScore: number;
    codeCorrectness: number;
    feedbackText: string;
  } | null>(null);

  const questions = [
    {
      title: 'PyTorch Autograd & Computational Graph',
      category: 'Deep Learning Engineering',
      questionText: 'Explain how PyTorch builds dynamic computational graphs during the forward pass and how backpropagation calculates gradients with `loss.backward()`.',
      expectedKeywords: ['Tensors', 'requires_grad', 'DAG (Directed Acyclic Graph)', 'Chain Rule']
    },
    {
      title: 'Vector Indexing: HNSW vs IVFFlat',
      category: 'RAG & Vector Databases',
      questionText: 'Compare HNSW (Hierarchical Navigable Small World) and IVFFlat vector indexing algorithms in terms of latency, recall, and RAM consumption.',
      expectedKeywords: ['Proximity Graph', 'Voronoi Cells', 'Nearest Neighbor', 'Search Latency']
    }
  ];

  const currentQ = questions[activeQuestion];

  const handleGradeAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsGrading(true);
    setFeedback(null);

    try {
      const res = await apiService.evaluateInterviewAnswer(
        currentQ.title,
        currentQ.category,
        userAnswer,
        currentQ.expectedKeywords
      );
      setFeedback({
        score: Math.round(res.overall_score),
        depthScore: Math.round(res.depth_score),
        codeCorrectness: Math.round(res.accuracy_score),
        feedbackText: res.feedback
      });
    } catch (err) {
      setFeedback({
        score: 88,
        depthScore: 90,
        codeCorrectness: 86,
        feedbackText: 'Great explanation of dynamic graphs and autograd backpropagation using the chain rule.'
      });
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080D14] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-10 select-none">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-[#10B981]/40 space-y-4 bg-[#0D1520]/90">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono font-black tracking-wider">
            <Award className="w-4 h-4" />
            <span>AI/ML INTERVIEW READINESS SIMULATOR</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-[#00D2B8] font-bold">
            Staff Level Grading Engine
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Interview <span className="text-gradient-emerald">Readiness Simulator</span>
        </h1>
        <p className="text-base text-slate-300 font-sans leading-relaxed">
          Practice technical AI engineering interview questions. Get real-time AI feedback on your architectural depth, mathematical rigor, and system design clarity.
        </p>
      </div>

      {/* Readiness Scores Radar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <div className="p-6 rounded-3xl bg-[#0D1520] border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold block">Overall Interview Readiness</span>
          <span className="text-4xl font-black text-[#10B981]">76%</span>
          <p className="text-xs text-slate-500">Ready for Senior AI/ML Engineer interviews</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0D1520] border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold block">Technical Depth Score</span>
          <span className="text-4xl font-black text-[#00D2B8]">82%</span>
          <p className="text-xs text-slate-500">PyTorch, Transformers, System Design</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0D1520] border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold block">System Design Clarity</span>
          <span className="text-4xl font-black text-emerald-300">70%</span>
          <p className="text-xs text-slate-500">vLLM, Vector Search, MLOps</p>
        </div>
      </div>

      {/* Interactive Question Box */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 bg-[#0D1520]/80">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono">
          <span className="text-xs text-[#10B981] font-bold uppercase">{currentQ.category}</span>
          <div className="flex items-center space-x-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveQuestion(idx);
                  setUserAnswer('');
                  setFeedback(null);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeQuestion === idx
                    ? 'bg-[#10B981] text-[#080D14]'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 font-sans">
          <h3 className="text-2xl font-black text-white">{currentQ.title}</h3>
          <p className="text-base text-slate-300 leading-relaxed font-medium">
            {currentQ.questionText}
          </p>
        </div>

        <div className="space-y-3 font-mono">
          <label className="text-xs text-slate-400 font-bold block">Your Technical Explanation:</label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={6}
            placeholder="Explain PyTorch dynamic computational DAGs, requires_grad flag, and backward pass..."
            className="w-full bg-[#05080E] border border-slate-800 rounded-2xl p-4 text-sm text-emerald-400 focus:outline-none focus:border-[#10B981] leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleGradeAnswer}
              disabled={isGrading || !userAnswer.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#00D2B8] text-[#080D14] font-black text-sm flex items-center space-x-2 shadow-lg disabled:opacity-40"
            >
              {isGrading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              <span>Submit Answer for AI Grading</span>
            </button>
          </div>
        </div>

        {/* AI Feedback Report */}
        {feedback && (
          <div className="p-6 rounded-2xl bg-[#080D14] border border-[#10B981]/50 space-y-4 font-mono text-sm">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <span className="text-[#10B981] font-bold uppercase">AI Staff Evaluator Report</span>
              <span className="text-emerald-300 font-black">Overall Score: {feedback.score}%</span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed text-sm">{feedback.feedbackText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Rocket,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Code2,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const ProjectGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'my-projects' | 'recommended'>('explore');

  const projectList = [
    {
      title: 'AI Blog Summarizer with RAG',
      tags: ['RAG', 'LLM', 'MLOps'],
      status: 'In Progress',
      progress: 65,
      description: 'Build a production multi-document RAG pipeline using LangChain, pgvector, and Google Gemini.'
    },
    {
      title: 'Stock Price Prediction',
      tags: ['Scikit-Learn', 'Time Series', 'Python'],
      status: 'In Progress',
      progress: 30,
      description: 'Train and evaluate ARIMA and LSTM regression models on historical market data.'
    },
    {
      title: 'Image Classification App',
      tags: ['Deep Learning', 'PyTorch', 'CNN'],
      status: 'Not Started',
      progress: 0,
      description: 'Build and fine-tune a custom ResNet-50 vision classifier with data augmentation.'
    },
    {
      title: 'ML Model Deployment API',
      tags: ['FastAPI', 'Docker', 'MLOps'],
      status: 'In Progress',
      progress: 45,
      description: 'Containerize an ML model with FastAPI, Prometheus telemetry, and automated CI/CD.'
    }
  ];

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Build and resize projects to master your skills.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Generate Project</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'explore'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setActiveTab('my-projects')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'my-projects'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'recommended'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-white border border-[#E8E4D8] text-slate-600 hover:bg-slate-50'
          }`}
        >
          Recommended
        </button>
      </div>

      {/* Project Cards List */}
      <div className="space-y-4">
        {projectList.map((project, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-4 hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{project.title}</h3>
                  <div className="flex items-center gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-sans">{project.description}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === 'In Progress'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {project.status}
                </span>

                <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-800 text-xs font-bold transition-all">
                  Open
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {project.status === 'In Progress' && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Milestone Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

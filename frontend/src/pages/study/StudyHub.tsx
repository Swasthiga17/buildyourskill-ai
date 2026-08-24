import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight, Sprout, Star, Clock } from 'lucide-react';

export const StudyHub: React.FC = () => {
  const studyModules = [
    {
      id: 'python',
      title: 'Python & Software Engineering for ML',
      stage: 'Stage 01',
      status: 'Mastered ✓',
      time: '15 hours notes',
      icon: '🐍',
      topics: ['Asyncio & Concurrency', 'OOP & Magic Methods', 'FastAPI & Pydantic', 'pytest & CI/CD']
    },
    {
      id: 'math',
      title: 'Mathematics & Statistics for AI',
      stage: 'Stage 02',
      status: 'In Progress',
      time: '18 hours notes',
      icon: '📐',
      topics: ['Linear Algebra & Matrices', 'Multivariable Calculus & Autograd', 'Probability Distributions', 'Hypothesis Testing']
    },
    {
      id: 'ml',
      title: 'Machine Learning Core & Model Evaluation',
      stage: 'Stage 03',
      status: 'Active Focus ⚡',
      time: '24 hours notes',
      icon: '📊',
      topics: ['Supervised Learning', 'Decision Trees & Ensembles', 'PCA & Dimensionality Reduction', 'Precision, Recall & ROC-AUC']
    },
    {
      id: 'dl',
      title: 'Deep Learning & PyTorch Architecture',
      stage: 'Stage 04',
      status: 'Priority Gap',
      time: '30 hours notes',
      icon: '🧠',
      topics: ['Neural Networks from Scratch', 'Backpropagation Mechanics', 'PyTorch nn.Module', 'CNNs & Vision Models']
    }
  ];

  return (
    <div className="space-y-10 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-black tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>GROW SKILL AI STUDY HUB</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          Step-by-Step <span className="text-gradient-emerald">Study & Notes</span>
        </h1>
        <p className="text-base text-slate-700 font-sans font-medium max-w-3xl">
          Deep-dive technical notes, code snippets, architectural diagrams, and step-by-step preparation guides for each stage in your AI/ML Engineer journey.
        </p>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyModules.map((module) => (
          <div
            key={module.id}
            className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-6 flex flex-col justify-between hover:border-emerald-500 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold">
                  {module.stage} {module.icon}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                  {module.status}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">{module.title}</h3>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{module.time}</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-slate-700 block uppercase">Key Topics Covered:</span>
                <ul className="grid grid-cols-1 gap-1.5 font-mono text-xs text-slate-800">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200">
              <Link
                to={`/study/${module.id}`}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center justify-center space-x-2 shadow-md hover:scale-[1.02] transition-all"
              >
                <span>Read Notes & Start Preparation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

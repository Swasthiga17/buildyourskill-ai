import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code, Rocket, Award, CheckCircle2, Zap } from 'lucide-react';

export const StageMathPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linear' | 'stats' | 'prob' | 'calc' | 'opt'>('linear');

  const topics = [
    { title: 'Linear Algebra', progress: 65 },
    { title: 'Statistics', progress: 52 },
    { title: 'Probability', progress: 48 },
    { title: 'Calculus', progress: 35 },
    { title: 'Optimization', progress: 20 }
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
            STAGE 02 • MATHEMATICS FOR AI
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">📐 Mathematics & Statistics</h1>
          <p className="text-sm text-slate-300">
            Don't make this a huge math degree — focus on the exact mathematics required for ML.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0 relative">
          <img
            src="https://images.openai.com/static-rsc-4/SDaD0wgXYyL9dpK4jWJ8EdRSBP05SGUTfFFcIGHsbFLphi7MdXNGq1sEC9d21eOknlCC4JTLnkwK86BupNiY1LeForQ470iJqlIPJaN3ssBh9WhFH7CXu7UJwHE7pAHQjkvpCJ6QFUKMfmbM-LaQYa_Buh42uZqav31mfEPZzdwf2m1bGC2tb6yh1q_Y5DzC?purpose=fullsize"
            alt="Mathematics for AI"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sub Topics Progress */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-amber-400 font-mono uppercase">Mathematics Domains Breakdown</h3>
        <div className="space-y-3">
          {topics.map((t, i) => (
            <div key={i} className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{t.title}</span>
                <span className="text-amber-400 font-bold">{t.progress}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${t.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Topic Highlight */}
      <div className="p-6 rounded-3xl bg-slate-950/90 border border-amber-500/40 space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold">
          <Zap className="w-4 h-4" />
          <span>TODAY'S HIGHLIGHT TOPIC</span>
        </div>
        <h3 className="text-2xl font-black text-white">Gradient Descent</h3>
        <p className="text-xs text-slate-300">
          <strong>Why?</strong> Required to understand how neural networks backpropagate loss and learn optimal weights.
        </p>
      </div>
    </div>
  );
};

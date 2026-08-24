import React, { useState } from 'react';
import { Compass, BookOpen, Code, Rocket, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { todayPlan } from '../data/mockData';

export const TodayPlan: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-300 space-y-3 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center space-x-2 text-xs font-mono text-amber-800 font-extrabold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Daily Micro-Learning Focus</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Today's 45-Minute Focused Plan</h1>
        <p className="text-sm text-slate-700 font-sans font-medium leading-relaxed">
          {todayPlan.whyReason}
        </p>
      </div>

      {/* Step 1: Learn */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-900 font-black uppercase flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300">
            <BookOpen className="w-4 h-4 text-amber-600" /> Step 1: Learn ({todayPlan.learn.duration})
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900">{todayPlan.learn.title}</h3>
        <p className="text-sm text-slate-800 font-sans leading-relaxed bg-amber-50 p-5 rounded-2xl border border-amber-200 font-medium">
          {todayPlan.learn.content}
        </p>
      </div>

      {/* Step 2: Practice */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-blue-900 font-black uppercase flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300">
            <Code className="w-4 h-4 text-blue-600" /> Step 2: Practice ({todayPlan.practice.duration})
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900">{todayPlan.practice.title}</h3>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 font-bold leading-relaxed">
          {todayPlan.practice.prompt}
        </div>
      </div>

      {/* Step 3: Build */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-emerald-900 font-black uppercase flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            <Rocket className="w-4 h-4 text-emerald-600" /> Step 3: Build ({todayPlan.build.duration})
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900">{todayPlan.build.title}</h3>
        <p className="text-sm text-slate-800 font-sans leading-relaxed bg-emerald-50 p-5 rounded-2xl border border-emerald-200 font-medium">
          {todayPlan.build.task}
        </p>
      </div>

      {/* Step 4: Active Recall Quiz */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-300 space-y-5 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-purple-900 font-black uppercase flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300">
            <Award className="w-4 h-4 text-purple-600" /> Step 4: Active Recall Quiz ({todayPlan.recall.duration})
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900">{todayPlan.recall.title}</h3>

        <div className="space-y-6">
          {todayPlan.recall.questions.map((q) => (
            <div key={q.id} className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm font-mono">
              <p className="text-sm font-black text-slate-900">{q.id}. {q.question}</p>
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isCorrect = submitted && idx === q.correctIndex;
                  const isWrong = submitted && isSelected && idx !== q.correctIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black'
                          : isWrong
                          ? 'border-rose-400 bg-rose-100 text-rose-950'
                          : isSelected
                          ? 'border-amber-400 bg-amber-100 text-amber-950'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-emerald-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="text-xs text-slate-700 italic pt-2 border-t border-slate-200 font-sans font-medium">
                  Explanation: {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-[1.01] transition-all font-mono"
          >
            Submit Quiz & Record Evidence
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs text-center font-black font-mono">
            ✓ Quiz Completed! Knowledge Twin PyTorch proficiency updated +3%.
          </div>
        )}
      </div>
    </div>
  );
};

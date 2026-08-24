import React, { useState } from 'react';
import { RoadmapPhase } from '../types';
import {
  CheckCircle2,
  Play,
  Rocket,
  Award,
  BookOpen,
  Code,
  Zap,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface StageLearningViewProps {
  stage: RoadmapPhase;
  onUpdateScore?: (addedPoints: number) => void;
}

export const StageLearningView: React.FC<StageLearningViewProps> = ({ stage, onUpdateScore }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'build' | 'test'>('learn');

  // Interactive Learn Checklist
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Practice Simulation State
  const [practiceCode, setPracticeCode] = useState(
    `# Practice Task: ${stage.practice}\n\ndef solution():\n    # Write your solution here\n    pass\n`
  );
  const [practiceResult, setPracticeResult] = useState<string | null>(null);

  const toggleTopic = (topic: string) => {
    setCompletedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleRunPractice = () => {
    setPracticeResult('Running unit tests...\n✓ Test Case 1 Passed (Output matched expected tensor shape)\n✓ Test Case 2 Passed (Memory benchmark clean)\n🎉 Great job! Skill proficiency increased +5%.');
    if (onUpdateScore) onUpdateScore(5);
  };

  // Sample Quiz Questions for the Test Tab
  const mockQuiz = [
    {
      id: 1,
      question: `What is the primary objective of ${stage.title.split(' ')[1] || 'this stage'}?`,
      options: [
        `Master fundamental concepts and production code quality in ${stage.skills[0] || 'AI'}`,
        'Bypass core mathematical derivations entirely',
        'Use pre-built black-box templates without understanding inner loops',
        'Store static datasets without pre-processing'
      ],
      correctIndex: 0,
      explanation: `Mastery in ${stage.title} requires deep conceptual understanding and production code execution.`
    },
    {
      id: 2,
      question: `Which key tool or framework is essential for ${stage.title}?`,
      options: [
        stage.tools[0] || 'Python',
        'Legacy Excel Macro scripts',
        'FTP Server upload tools',
        'Static HTML generators'
      ],
      correctIndex: 0,
      explanation: `${stage.tools[0] || 'Python'} is standard industry infrastructure for this domain.`
    }
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    mockQuiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 50;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 50 && onUpdateScore) {
      onUpdateScore(10);
    }
  };

  const isDestinationStage = stage.phaseNumber === 14 || stage.title.includes('Interview') || stage.title.includes('Career');

  if (isDestinationStage) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 space-y-8 bg-slate-900/90 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 mx-auto">
            <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center text-amber-400">
              <Award className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            🏆 You're Becoming an <span className="text-gradient-gold">AI/ML Engineer</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Your personalized knowledge twin has mapped 14 complete stages across mathematics, machine learning, deep learning, LLMs, RAG, and production MLOps.
          </p>
        </div>

        {/* Readiness Score Meters */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-slate-300">AI/ML Engineer Overall Readiness</span>
            <span className="text-3xl font-black text-amber-400 font-mono">82%</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[82%]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Technical Skills</span>
              <span className="text-xl font-bold text-emerald-400">86%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Projects Portfolio</span>
              <span className="text-xl font-bold text-amber-400">80%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Interview Prep</span>
              <span className="text-xl font-bold text-cyan-400">74%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Production MLOps</span>
              <span className="text-xl font-bold text-purple-400">65%</span>
            </div>
          </div>
        </div>

        {/* Completed Checklist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          {[
            'Python',
            'Mathematics',
            'Data Engineering',
            'Machine Learning',
            'Deep Learning',
            'Transformers',
            'LLMs',
            'RAG Engineering',
            'Agentic AI',
            'MLOps Systems'
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/interview')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm inline-flex items-center space-x-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>🚀 Start Interview Preparation</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6 bg-slate-900/90 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              {stage.stageCode} • Stage {stage.phaseNumber} of 14
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
              {stage.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{stage.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{stage.description}</p>
        </div>

        {/* Thumbnail Image Display */}
        {stage.illustrationUrl && (
          <div className="w-full md:w-64 h-36 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg shrink-0 relative">
            <img src={stage.illustrationUrl} alt={stage.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent p-2 flex items-end">
              <span className="text-[10px] font-mono text-amber-300 font-bold">
                Readiness: {stage.readiness}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Readiness Progress Bar */}
      <div className="space-y-1.5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold">{stage.title.split(' ')[1] || 'Stage'} Mastery Progress</span>
          <span className="text-amber-400 font-bold">
            {stage.readiness}% ({stage.readiness >= 80 ? 'Almost Mastered' : stage.readiness >= 60 ? 'In Progress' : 'Active Gap'})
          </span>
        </div>
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              stage.readiness >= 80
                ? 'bg-emerald-400'
                : stage.readiness >= 60
                ? 'bg-amber-400'
                : 'bg-gradient-to-r from-amber-500 to-cyan-400'
            }`}
            style={{ width: `${stage.readiness}%` }}
          />
        </div>
      </div>

      {/* Sub-Tabs Selector: Learn | Practice | Build | Test */}
      <div className="grid grid-cols-4 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('learn')}
          className={`py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'learn'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'practice'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => setActiveTab('build')}
          className={`py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'build'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>Build</span>
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'test'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Test</span>
        </button>
      </div>

      {/* Sub-Tab Content Views */}
      <div className="pt-2">
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider">
                📚 Curriculum Topic Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {stage.learnTopics.map((topic, idx) => {
                  const isChecked = completedTopics[topic] || false;
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTopic(topic)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className={isChecked ? 'line-through opacity-80' : ''}>{topic}</span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-600'}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Ready to begin this module?</h4>
                <p className="text-[11px] text-slate-400">
                  Follow guided lessons and hands-on coding notebooks.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('practice')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 font-mono">
                💻 Hands-On Coding Exercise
              </h4>
              <p className="text-xs text-slate-300 font-mono">{stage.practice}</p>
            </div>

            {/* Simulated Code Editor */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 text-xs font-mono">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                <span>python_exercise.py</span>
                <span>Python 3.11</span>
              </div>
              <textarea
                value={practiceCode}
                onChange={(e) => setPracticeCode(e.target.value)}
                rows={6}
                className="w-full p-4 bg-transparent text-emerald-400 focus:outline-none font-mono text-xs"
              />
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500">Run code against automated test suite</span>
                <button
                  onClick={handleRunPractice}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Tests</span>
                </button>
              </div>
            </div>

            {practiceResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs font-mono text-emerald-300 whitespace-pre-line"
              >
                {practiceResult}
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'build' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  🛠️ Recommended Portfolio Project
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {stage.projectLevel || 'Intermediate'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{stage.project}</h3>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-300">Required Skills & Tools:</h5>
                <div className="flex flex-wrap gap-2">
                  {stage.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">Build time: ~1 Week</span>
                <button
                  onClick={() => navigate('/projects')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Start Building Project →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider">
                📝 Active Recall & Skill Assessment
              </h3>
              <p className="text-xs text-slate-300">
                Complete this quick quiz to verify your proficiency and automatically update your Knowledge Twin score.
              </p>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-6">
              {mockQuiz.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white">
                    Q{idx + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center space-x-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          quizAnswers[q.id] === optIdx
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          checked={quizAnswers[q.id] === optIdx}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                          className="text-amber-500 focus:ring-0"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                      <strong className="text-amber-400 block mb-1">Explanation:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                {quizSubmitted && (
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Score: {quizScore}% — Twin Score Updated! 🎉
                  </span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all ml-auto"
                >
                  <span>Submit Quiz Answers</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code, Rocket, Award, CheckCircle2, Play, ArrowRight, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { apiService } from '../../services/api';

export const StagePythonPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'build' | 'test'>('learn');

  // Topic Progress State
  const [topics, setTopics] = useState([
    { name: 'Python Basics', progress: 100, completed: true },
    { name: 'Functions', progress: 100, completed: true },
    { name: 'OOP (Object-Oriented Programming)', progress: 70, completed: false },
    { name: 'Exception Handling', progress: 100, completed: true },
    { name: 'APIs (FastAPI / REST)', progress: 40, completed: false },
    { name: 'Git & GitHub', progress: 100, completed: true },
    { name: 'DSA (Data Structures)', progress: 100, completed: true },
    { name: 'Testing & pytest', progress: 20, completed: false }
  ]);

  // Practice Interactive Sandbox State
  const [userCode, setUserCode] = useState(
    `import asyncio\n\nasync def fetch_dataset_batch(endpoint_urls):\n    """Fetch dataset URLs concurrently using asyncio."""\n    print(f"Fetching {len(endpoint_urls)} ML batches...")\n    await asyncio.sleep(0.5)\n    return {"status": 200, "batches": len(endpoint_urls)}\n\n# Run async task\nresult = asyncio.run(fetch_dataset_batch(["/batch1", "/batch2"]))\nprint(f"Result: {result}")`
  );
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Test Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: 'In Python, what is the primary benefit of using `async def` for API endpoints?',
      options: [
        'It makes code run 10x faster on CPU-bound math calculations',
        'It prevents blocking the main thread during high-concurrency I/O operations',
        'It automatically converts Python functions into C++ binary code',
        'It disables exception handling for cleaner code'
      ],
      correctIndex: 1
    },
    {
      id: 2,
      question: 'Which magic method in Python allows a class instance to be called like a function `model(x)`?',
      options: ['__init__', '__str__', '__call__', '__getitem__'],
      correctIndex: 2
    },
    {
      id: 3,
      question: 'What is the purpose of pydantic `BaseModel` in FastAPI applications?',
      options: [
        'Automatic request payload data validation and type enforcement',
        'Direct connection to PostgreSQL databases without SQL',
        'Rendering HTML CSS frontend templates',
        'Compiling PyTorch models to CUDA'
      ],
      correctIndex: 0
    }
  ];

  const calculateOverallPythonScore = () => {
    const total = topics.reduce((acc, t) => acc + t.progress, 0);
    return Math.round(total / topics.length);
  };

  const handleToggleTopic = (index: number) => {
    const updated = [...topics];
    updated[index].completed = !updated[index].completed;
    updated[index].progress = updated[index].completed ? 100 : 40;
    setTopics(updated);

    apiService.saveProgress('python', updated[index].name, updated[index].progress);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setCodeOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setCodeOutput(`[EXECUTING PYTHON 3.11 SYSTEM ROUTINE]\n> Fetching 2 ML batches...\n> Result: {'status': 200, 'batches': 2}\n\n✓ Code executed cleanly with 0 errors!`);
    }, 800);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / quizQuestions.length) * 100);
    setQuizScore(scorePct);
    setIsSubmitting(false);

    await apiService.submitAssessment('python', scorePct);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-10 select-none">
      <Link to="/roadmap" className="inline-flex items-center space-x-2 text-sm text-[#059669] hover:underline font-mono font-bold">
        <ArrowLeft className="w-5 h-5" />
        <span>← Back to Roadmap Home</span>
      </Link>

      {/* Hero Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-[#10B981]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden bg-white shadow-md">
        <div className="space-y-5 max-w-3xl relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#059669] text-xs font-mono font-black tracking-wider">
            STAGE 01 • FOUNDATION LEVEL
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight">🐍 Python & Programming</h1>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-medium leading-relaxed">
            Build the foundation required for everything that comes later in AI/ML Engineering.
          </p>

          <button
            onClick={() => setActiveTab('learn')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#00D2B8] text-white font-black text-sm inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
          >
            <span>Start Today's Lesson</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Image */}
        <div className="w-full md:w-80 h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-lg shrink-0 relative z-10">
          <img
            src="https://images.openai.com/static-rsc-4/qi_WWRaeeVgt1fyQyBG6HgRp3UH0B0R6DryZAV8LL5O2ebVoUSMRsg5_NOrW5cjvoqyNny89kqAwyjau84afqSM_yI1Y8BsjpHexAMl53z6lpPoDgroxuK6j_yAIn8OmFT68aSXCnlackyZ1zgFnWkTNTsR9PqK-PuPJCE_jyVxf1-TI0Pb1196jpRUNQXs7?purpose=fullsize"
            alt="Python & Programming"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Python Overall Progress Card */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5 font-mono">
        <div className="flex items-center justify-between text-base">
          <span className="text-slate-800 font-extrabold">Overall Python Score</span>
          <span className="text-[#059669] font-black">{calculateOverallPythonScore()}% — Status: Almost Mastered</span>
        </div>

        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="bg-gradient-to-r from-[#10B981] to-[#00D2B8] h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${calculateOverallPythonScore()}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm pt-3 border-t border-slate-200">
          {topics.map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-slate-800 font-bold truncate">{t.name}</span>
              <span className={`font-black ml-2 ${t.completed ? 'text-[#059669]' : 'text-[#0D9488]'}`}>
                {t.completed ? '✓' : `${t.progress}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Tabs: Learn | Practice | Build | Test */}
      <div className="grid grid-cols-4 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-sm font-black font-mono">
        <button
          onClick={() => setActiveTab('learn')}
          className={`py-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'learn' ? 'bg-[#10B981] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`py-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'practice' ? 'bg-[#10B981] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code className="w-5 h-5" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => setActiveTab('build')}
          className={`py-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'build' ? 'bg-[#10B981] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span>Build</span>
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`py-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'test' ? 'bg-[#10B981] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Test</span>
        </button>
      </div>

      {/* Content Tabs */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-8 bg-white">
        {activeTab === 'learn' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#059669] font-mono uppercase tracking-wider">
                📚 Curriculum Topics Checklist
              </h3>
              <span className="text-sm text-slate-600 font-mono font-bold">
                {topics.filter((t) => t.completed).length} / {topics.length} Mastered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm sm:text-base">
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => handleToggleTopic(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    topic.completed
                      ? 'bg-[#10B981]/15 border-[#10B981] text-slate-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#10B981]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <CheckCircle2
                      className={`w-6 h-6 ${topic.completed ? 'text-[#059669]' : 'text-slate-400'}`}
                    />
                    <span className="font-extrabold">{topic.name}</span>
                  </div>
                  <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    {topic.completed ? '100%' : `${topic.progress}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono">
              <h3 className="text-base font-black text-[#059669] uppercase">💻 Interactive Coding Sandbox</h3>
              <span className="text-sm text-slate-500 font-bold">Python 3.11 Async Runner</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-sm">
              <label className="text-white font-bold text-base block">Exercise: Implement Async Dataset Batch Retrieval</label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={10}
                className="w-full bg-[#05080E] border border-slate-800 rounded-xl p-4 font-mono text-sm sm:text-base text-emerald-400 focus:outline-none focus:border-[#10B981] leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D2B8] text-white font-black text-sm flex items-center space-x-2 shadow-md"
                >
                  {isExecuting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  <span>Run Python Code</span>
                </button>
              </div>
            </div>

            {codeOutput && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-[#10B981]/40 font-mono text-sm text-emerald-300 space-y-2">
                <span className="text-xs text-slate-400 uppercase block font-bold">Console Output:</span>
                <pre className="whitespace-pre-wrap leading-relaxed">{codeOutput}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

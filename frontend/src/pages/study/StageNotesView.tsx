import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code,
  Sparkles,
  Zap,
  Play,
  Award,
  HelpCircle,
  FolderGit2,
  Star,
  Check,
  RefreshCw,
  Cpu,
  Layers,
  BarChart3,
  Bot,
  Brain,
  Rocket
} from 'lucide-react';
import { apiService } from '../../services/api';

export const StageNotesView: React.FC = () => {
  const { stageId = 'python' } = useParams<{ stageId: string }>();
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'practice' | 'quiz' | 'project' | 'interview'>('concept');

  // Interactive Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Interactive Sandbox Code state
  const [userCode, setUserCode] = useState<string>(
    stageId === 'python'
      ? `def calculate_grade(marks):\n    """Calculate student grade based on percentage marks."""\n    if marks >= 90: return "A+"\n    elif marks >= 80: return "A"\n    elif marks >= 70: return "B"\n    else: return "C"\n\nstudent_marks = [95, 82, 74, 65]\ngrades = {m: calculate_grade(m) for m in student_marks}\nprint("Student Grades:", grades)`
      : stageId === 'ml'
      ? `from sklearn.metrics import precision_score, recall_score, f1_score\n\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]\ny_pred = [1, 0, 0, 1, 0, 1, 0, 1, 1, 0]\n\nprint("Precision:", precision_score(y_true, y_pred))\nprint("Recall:   ", recall_score(y_true, y_pred))\nprint("F1 Score: ", f1_score(y_true, y_pred))`
      : `import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\nz_values = np.array([-2.0, 0.0, 2.0])\nprint("Sigmoid Outputs:", sigmoid(z_values))`
  );
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const stageData: Record<
    string,
    {
      title: string;
      stageCode: string;
      objective: string;
      notes: string[];
      example: { title: string; desc: string; code: string };
      visualDiagram: string;
      practiceChallenge: string;
      quizQuestions: Array<{ id: number; question: string; options: string[]; correctIndex: number }>;
      miniProject: { title: string; stack: string; features: string[] };
      interviewQuestions: string[];
      keyTakeaways: string[];
    }
  > = {
    python: {
      title: '🐍 Python Fundamentals for AI Engineering',
      stageCode: 'STAGE 01',
      objective: 'Learn Python fundamentals required for data science, machine learning, APIs, automation, and AI development.',
      notes: [
        'int, float, str, bool — Primitives & immutable scalar types',
        'list, tuple, set, dict — Core collection data structures',
        'List Comprehensions — Fast inline list generation [x*2 for x in data]',
        'AsyncIO & FastAPI — Non-blocking I/O routines for serving 10,000+ concurrent AI model requests',
        'Object-Oriented Programming (OOP) — Classes, encapsulation, and __call__ magic methods'
      ],
      example: {
        title: 'Student Grade & Course Score Processor',
        desc: 'Read student marks and assign letter grades using clean Python dictionary comprehensions.',
        code: `name = "Swasthi"\nage = 22\nskills = ["Python", "ML", "RAG"]\n\ndef compute_grade(score):\n    return "A+" if score >= 90 else "A"\n\nprint(f"{name} ({age}) Skills: {skills}")\nprint("Calculated Grade:", compute_grade(94))`
      },
      visualDiagram: `[Raw Data Input] ──> [List Comprehension] ──> [FastAPI Pydantic Validator] ──> [JSON Payload Response]`,
      practiceChallenge: 'Create a Python program that reads a list of student exam marks and calculates the mean, median, and assigns letter grades.',
      quizQuestions: [
        {
          id: 1,
          question: 'What is the primary performance advantage of using list comprehensions over traditional for-loops?',
          options: [
            'They bypass Python bytecode compilation',
            'They execute C-optimized iterator loops in Python runtime',
            'They convert Python code into native CUDA C++',
            'They automatically run code on multiple GPU threads'
          ],
          correctIndex: 1
        },
        {
          id: 2,
          question: 'Which magic method allows a Python class instance `model(x)` to be invoked like a function?',
          options: ['__init__', '__call__', '__str__', '__getitem__'],
          correctIndex: 1
        }
      ],
      miniProject: {
        title: 'AI Learning Progress Tracker',
        stack: 'Python 3.11, Pydantic, JSON Persistence',
        features: ['Track courses completed & learning hours', 'Compute live skill scores & trend analytics', 'Generate weekly progress reports']
      },
      interviewQuestions: [
        'Explain the difference between deep copy and shallow copy in Python.',
        'How does Python garbage collection handle circular references using GIL and ref counts?',
        'What are generator functions and how does the `yield` keyword save RAM memory during batch processing?',
        'How does `asyncio.gather` execute asynchronous tasks concurrently?',
        'When would you use `__slots__` in a Python class definition?'
      ],
      keyTakeaways: [
        'Mastering dictionary & list comprehensions leads to cleaner, 2x faster data preprocessing.',
        'Pydantic models enforce strict data types at API boundaries, eliminating runtime crashes.',
        'AsyncIO prevents blocking main threads during external database or LLM network calls.'
      ]
    },
    ml: {
      title: '📊 Machine Learning & Model Evaluation',
      stageCode: 'STAGE 03',
      objective: 'Master supervised & unsupervised ML algorithms, feature engineering, and precision/recall trade-offs.',
      notes: [
        'Supervised Learning — Input data with known ground-truth targets (Regression & Classification)',
        'Unsupervised Learning — Discovering hidden patterns & clusters (K-Means, PCA)',
        'Confusion Matrix — True Positives (TP), False Positives (FP), False Negatives (FN), True Negatives (TN)',
        'Recall — TP / (TP + FN). Critical when False Negatives are costly (e.g., medical diagnostics & defect detection)',
        'Precision — TP / (TP + FP). Critical when False Positives are costly (e.g., spam filtering & fraud blocking)'
      ],
      example: {
        title: 'Medical Screening vs Spam Filter Metric Decision',
        desc: 'Selecting the evaluation metric based on real-world cost asymmetry.',
        code: `from sklearn.metrics import classification_report\n\n# Medical Screening: FN (missed disease) is disastrous -> Prioritize Recall\n# Spam Filter: FP (good email marked spam) is disastrous -> Prioritize Precision\nprint("Evaluation Metric Rule: Match metric to cost matrix!")`
      },
      visualDiagram: `[Collect Data] ──> [Feature Engineering] ──> [Train Model] ──> [Evaluate Metrics] ──> [Deploy Model]`,
      practiceChallenge: 'Given a confusion matrix [[90, 10], [5, 95]], compute Accuracy, Precision, Recall, and F1 Score by hand.',
      quizQuestions: [
        {
          id: 1,
          question: 'When false negatives are particularly costly (e.g. missed medical diagnosis), which metric should be prioritized?',
          options: ['Accuracy', 'Precision', 'Recall', 'R² Score'],
          correctIndex: 2
        },
        {
          id: 2,
          question: 'What is the harmonic mean of precision and recall called?',
          options: ['ROC-AUC', 'F1 Score', 'Mean Squared Error', 'Adjusted R²'],
          correctIndex: 1
        }
      ],
      miniProject: {
        title: 'Production Customer Churn Predictor',
        stack: 'Python, scikit-learn, XGBoost, FastAPI',
        features: ['Dataset feature scaling & encoding', 'XGBoost classifier training with hyperparameter tuning', 'Model evaluation report & ROC-AUC curve']
      },
      interviewQuestions: [
        'Explain the Bias-Variance tradeoff and how regularization (L1/L2) mitigates overfitting.',
        'Why is accuracy a misleading metric for highly imbalanced datasets (e.g., 99:1 fraud ratio)?',
        'How does a Decision Tree split nodes using Gini Impurity vs Information Gain (Entropy)?',
        'Compare Random Forest (Bagging) vs Gradient Boosting (Boosting).',
        'How does Principal Component Analysis (PCA) reduce feature dimensions while maximizing variance?'
      ],
      keyTakeaways: [
        'Never select an evaluation metric without first analyzing business error costs.',
        'High Recall minimizes missed positive cases; High Precision minimizes false alarms.',
        'F1 Score balances precision and recall on imbalanced datasets.'
      ]
    }
  };

  const currentStage = stageData[stageId] || stageData['python'];

  const handleRunCode = () => {
    setIsExecuting(true);
    setCodeOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      if (stageId === 'python') {
        setCodeOutput(`[EXECUTING PYTHON 3.11 PROGRAM]\n> Student Grades: {95: 'A+', 82: 'A', 74: 'B', 65: 'C'}\n\n✓ Program executed cleanly with 0 errors!`);
      } else {
        setCodeOutput(`[EXECUTING SCIKIT-LEARN EVALUATION]\nPrecision: 0.8000\nRecall:    0.8000\nF1 Score:  0.8000\n\n✓ Evaluation executed cleanly!`);
      }
    }, 700);
  };

  const handleAnswerQuiz = (qId: number, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    currentStage.quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) correct++;
    });
    const scorePct = Math.round((correct / currentStage.quizQuestions.length) * 100);
    setQuizScore(scorePct);
    apiService.submitAssessment(stageId, scorePct);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      <Link to="/study" className="inline-flex items-center space-x-2 text-sm text-emerald-700 hover:underline font-mono font-bold">
        <ArrowLeft className="w-5 h-5" />
        <span>← Back to Study Preparation Hub</span>
      </Link>

      {/* Hero Header */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-extrabold">
            {currentStage.stageCode}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
            10-Section Mastery Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{currentStage.title}</h1>
        <p className="text-base text-slate-700 font-sans font-medium leading-relaxed max-w-3xl">
          <strong>Objective:</strong> {currentStage.objective}
        </p>
      </div>

      {/* 10-Section Content Tabs: Concept -> Notes -> Example -> Code -> Practice -> Quiz -> Project -> Interview -> Takeaways */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm custom-scrollbar">
        <button
          onClick={() => setActiveTab('concept')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'concept' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Concept & Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'code' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>2. Code & Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'practice' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'quiz' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>4. Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('project')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'project' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>5. Mini Project</span>
        </button>

        <button
          onClick={() => setActiveTab('interview')}
          className={`px-4 py-3 rounded-xl flex items-center space-x-2 shrink-0 transition-all ${
            activeTab === 'interview' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>6. Interview Q&A</span>
        </button>
      </div>

      {/* Main Content Workspace */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
        {/* Tab 1: Concept & Notes */}
        {activeTab === 'concept' && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Core Concept Notes</span>
              </h3>
              <ul className="space-y-3 font-sans text-sm text-slate-700">
                {currentStage.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/80 border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Diagram */}
            <div className="space-y-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs sm:text-sm">
              <span className="text-slate-400 uppercase font-bold text-xs block">📐 Visual Architecture Workflow:</span>
              <pre className="whitespace-pre-wrap leading-relaxed">{currentStage.visualDiagram}</pre>
            </div>

            {/* Real World Example */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 font-mono">
              <span className="text-xs font-bold text-amber-900 uppercase">💡 Real-World Example: {currentStage.example.title}</span>
              <p className="text-xs text-slate-700 font-sans">{currentStage.example.desc}</p>
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs overflow-x-auto">{currentStage.example.code}</pre>
            </div>
          </div>
        )}

        {/* Tab 2: Code Sandbox */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono">
              <h3 className="text-lg font-black text-slate-900 uppercase">💻 Interactive Python Code Runner</h3>
              <span className="text-xs text-slate-600 font-bold">Python 3.11</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-sm">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={10}
                className="w-full bg-[#05080E] border border-slate-800 rounded-xl p-4 font-mono text-sm text-emerald-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md"
                >
                  {isExecuting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  <span>Run Python Program</span>
                </button>
              </div>
            </div>

            {codeOutput && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500 font-mono text-sm text-emerald-300 space-y-2">
                <span className="text-xs text-slate-400 uppercase block font-bold">Console Output:</span>
                <pre className="whitespace-pre-wrap leading-relaxed">{codeOutput}</pre>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Practice Challenge */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Practice Coding Challenge</span>
            </h3>

            <div className="p-6 rounded-2xl bg-white/80 border border-emerald-300 space-y-4 font-mono text-sm">
              <span className="text-xs font-bold text-emerald-800 uppercase block">Challenge Prompt:</span>
              <p className="text-sm font-sans text-slate-800 font-medium leading-relaxed">{currentStage.practiceChallenge}</p>
            </div>
          </div>
        )}

        {/* Tab 4: Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Knowledge Check Quiz</span>
            </h3>

            <div className="space-y-6 font-mono text-sm">
              {currentStage.quizQuestions.map((q) => (
                <div key={q.id} className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-4">
                  <h4 className="font-bold text-slate-900">Q{q.id}: {q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerQuiz(q.id, oIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                          userAnswers[q.id] === oIdx
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handleSubmitQuiz}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md"
                >
                  Submit Assessment Answers
                </button>

                {quizScore !== null && (
                  <span className="text-base font-black text-emerald-700">Quiz Score: {quizScore}%</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Mini Project */}
        {activeTab === 'project' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-blue-600" />
              <span>Mini Project Blueprint: {currentStage.miniProject.title}</span>
            </h3>

            <div className="p-6 rounded-2xl bg-white/80 border border-emerald-300 space-y-4 font-mono text-sm">
              <span className="text-xs font-bold text-blue-900 uppercase block">Tech Stack: {currentStage.miniProject.stack}</span>
              <ul className="space-y-2 font-sans text-xs text-slate-800">
                {currentStage.miniProject.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 6: Interview Q&A */}
        {activeTab === 'interview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span>Top 5 Technical Interview Questions</span>
            </h3>

            <ol className="space-y-4 font-mono text-xs sm:text-sm">
              {currentStage.interviewQuestions.map((q, qIdx) => (
                <li key={qIdx} className="p-4 rounded-xl bg-white/80 border border-slate-200 text-slate-900 font-bold">
                  {qIdx + 1}. {q}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Key Takeaways Footer */}
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 font-mono text-xs">
          <span className="font-extrabold text-emerald-950 uppercase block">⭐ Key Takeaways:</span>
          <ul className="space-y-1.5 text-slate-800 font-sans">
            {currentStage.keyTakeaways.map((takeaway, tIdx) => (
              <li key={tIdx} className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

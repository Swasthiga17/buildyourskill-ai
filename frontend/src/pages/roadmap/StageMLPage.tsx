import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Code,
  Rocket,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Zap,
  Bookmark,
  Edit3,
  HelpCircle,
  TrendingUp,
  Brain,
  Layers,
  Star,
  Check,
  X,
  AlertCircle,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { apiService } from '../../services/api';

export const StageMLPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Screen 2: AI Notes State
  const [showGenerateNotesModal, setShowGenerateNotesModal] = useState(false);
  const [learningLevel, setLearningLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [aiNoteResponse, setAiNoteResponse] = useState<string | null>(null);

  // Screen 3: Practice State
  const [practiceSelectedOption, setPracticeSelectedOption] = useState<string | null>(null);
  const [showPracticeAiExplanation, setShowPracticeAiExplanation] = useState(false);

  // Screen 4: Adaptive Quiz State
  const [quizSelectedOption, setQuizSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<'Low' | 'Medium' | 'High' | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Screen 5: Twin Progress
  const [twinProgress, setTwinProgress] = useState(42);

  const handleAiAction = (action: string) => {
    if (action === 'simpler') {
      setAiNoteResponse('🤖 Simpler AI Explanation: Precision is how many positive guesses were right. Recall is how many total real positive cases we caught.');
    } else if (action === 'example') {
      setAiNoteResponse('🤖 Real-World Example: In cancer detection, a missed diagnosis (False Negative) is fatal -> Recall is 100% vital!');
    } else if (action === 'flashcards') {
      setAiNoteResponse('🎴 Flashcard #1: Recall = TP / (TP + FN). Flashcard #2: Precision = TP / (TP + FP).');
    } else if (action === 'summarize') {
      setAiNoteResponse('📝 Summary: Accuracy fails on imbalanced data. Balance Precision & Recall using F1-score.');
    }
  };

  const handleCompleteAssessment = () => {
    setQuizSubmitted(true);
    setTwinProgress(57);
    setActiveScreen(5);
    apiService.submitAssessment('model-evaluation', 85);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      <Link to="/roadmap" className="inline-flex items-center space-x-2 text-sm text-emerald-700 hover:underline font-mono font-bold">
        <ArrowLeft className="w-5 h-5" />
        <span>← Back to Roadmap Graph</span>
      </Link>

      {/* Hero Header */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold">
              STAGE 03 • MACHINE LEARNING
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold">
              64% Skill Mastery
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 font-bold">
              Difficulty: Intermediate
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 font-bold">
              50 min
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Machine Learning $\rightarrow$ <span className="text-gradient-emerald">Model Evaluation</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Learn precision, recall, confusion matrices, ROC-AUC, and cost-sensitive evaluation trade-offs.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateNotesModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>✨ Generate My Notes</span>
        </button>
      </div>

      {/* 5 Core Product Learning Screens Stepper */}
      <div className="grid grid-cols-5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveScreen(1)}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeScreen === 1 ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">1. Topic Overview</span>
        </button>

        <button
          onClick={() => setActiveScreen(2)}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeScreen === 2 ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden md:inline">2. AI Notes</span>
        </button>

        <button
          onClick={() => setActiveScreen(3)}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeScreen === 3 ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Code className="w-4 h-4" />
          <span className="hidden md:inline">3. Practice</span>
        </button>

        <button
          onClick={() => setActiveScreen(4)}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeScreen === 4 ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="hidden md:inline">4. Adaptive Quiz</span>
        </button>

        <button
          onClick={() => setActiveScreen(5)}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeScreen === 5 ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden md:inline">5. Twin Update</span>
        </button>
      </div>

      {/* SCREEN 1 — Topic Overview */}
      {activeScreen === 1 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">What is Model Evaluation?</h3>
            <blockquote className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-emerald-500 text-sm text-slate-800 font-medium">
              "Model evaluation is the process of measuring how well a machine learning model performs on data it has not seen during training."
            </blockquote>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-black text-slate-900">Why it matters</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
              A model can achieve high training accuracy while performing poorly on new data (overfitting). Evaluation metrics help us understand whether the model generalizes effectively before deploying to production users.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-black text-slate-900 font-mono">What you'll learn</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs font-bold">
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ Accuracy</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ Precision</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ Recall</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ F1 Score</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ Confusion Matrix</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800">✓ ROC-AUC</span>
              <span className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 col-span-2">✓ Choosing the right metric</span>
            </div>
          </div>

          {/* AI Recommendation Card */}
          <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-3 font-sans">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-amber-900">
              <Brain className="w-4 h-4 text-amber-600" />
              <span>AI TWIN RECOMMENDATION: WHY THIS TOPIC?</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              Your Knowledge Twin shows strong ML fundamentals but a <strong>high gap in Model Evaluation</strong>. Improving this skill will increase your readiness for production ML roles by 15%.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveScreen(2)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Start Personalized Lesson →</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2 — AI Personalized Notes */}
      {activeScreen === 2 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">Model Evaluation — Personalized Notes</h3>
              <span className="text-xs font-mono font-bold text-emerald-700">Generated for Swasthi B S</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isBookmarked ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Structured Notes Content */}
          <div className="space-y-6 font-mono text-sm">
            {/* 01 Confusion Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 space-y-3">
              <span className="text-xs text-amber-400 font-bold uppercase block">01 — Confusion Matrix Diagram</span>
              <pre className="text-xs sm:text-sm whitespace-pre">{`                 Predicted
               +       -
Actual +       TP      FN
       -       FP      TN`}</pre>
            </div>

            {/* 02 Formulas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">02 — Accuracy Formula</span>
                <code className="text-xs bg-slate-100 p-2 rounded-lg block font-bold text-emerald-700">Accuracy = (TP + TN) / (TP + TN + FP + FN)</code>
                <span className="text-xs text-slate-600 font-sans block">Use when classes are reasonably balanced.</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">03 — Precision</span>
                <code className="text-xs bg-slate-100 p-2 rounded-lg block font-bold text-blue-700">Precision = TP / (TP + FP)</code>
                <span className="text-xs text-slate-600 font-sans block">Of everything predicted positive, how much was positive?</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">04 — Recall</span>
                <code className="text-xs bg-slate-100 p-2 rounded-lg block font-bold text-amber-700">Recall = TP / (TP + FN)</code>
                <span className="text-xs text-slate-600 font-sans block">Of all actual positive cases, how much was detected?</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">05 — F1 Score</span>
                <code className="text-xs bg-slate-100 p-2 rounded-lg block font-bold text-purple-700">F1 = 2 * (Precision * Recall) / (Precision + Recall)</code>
                <span className="text-xs text-slate-600 font-sans block">Combines precision and recall into a single score.</span>
              </div>
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="p-6 rounded-2xl bg-white/80 border border-emerald-300 space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase block">🤖 AI Mentor Prompt Shortcuts:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAiAction('simpler')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:bg-emerald-50"
              >
                Explain simpler
              </button>
              <button
                onClick={() => handleAiAction('example')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:bg-emerald-50"
              >
                Give example
              </button>
              <button
                onClick={() => handleAiAction('flashcards')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:bg-emerald-50"
              >
                Create flashcards
              </button>
              <button
                onClick={() => handleAiAction('summarize')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:bg-emerald-50"
              >
                Summarize
              </button>
            </div>

            {aiNoteResponse && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 font-mono text-xs text-slate-900 leading-relaxed">
                {aiNoteResponse}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveScreen(3)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Go to Interactive Practice →</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Interactive Practice */}
      {activeScreen === 3 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between font-mono border-b border-slate-200 pb-3">
            <h3 className="text-xl font-black text-slate-900 uppercase">Practice Challenge</h3>
            <span className="text-xs text-emerald-800 font-bold">Model Evaluation • Challenge 2/5</span>
          </div>

          {/* Scenario */}
          <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-3 font-sans">
            <span className="text-xs font-mono font-bold text-amber-900 uppercase">Scenario:</span>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              "You are building a disease detection model. Missing a real positive case (False Negative) could have serious medical consequences."
            </p>
            <h4 className="text-base font-black text-slate-900 pt-2 font-mono">Which metric should you prioritize?</h4>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm">
            {['Accuracy', 'Precision', 'Recall', 'R²'].map((opt) => (
              <button
                key={opt}
                onClick={() => setPracticeSelectedOption(opt)}
                className={`p-4 rounded-2xl border text-left font-extrabold transition-all ${
                  practiceSelectedOption === opt
                    ? opt === 'Recall'
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md'
                      : 'bg-red-50 border-red-300 text-red-900'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Correct State Explanation */}
          {practiceSelectedOption === 'Recall' && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-400 space-y-3 font-sans">
              <span className="text-sm font-black text-emerald-800 flex items-center gap-2">
                🟢 Correct! Recall is important because we want to minimize false negatives.
              </span>
              <code className="text-xs font-mono bg-white p-2.5 rounded-xl border border-emerald-300 block font-bold text-emerald-900">
                Recall = TP / (TP + FN)
              </code>

              <button
                onClick={() => setShowPracticeAiExplanation(!showPracticeAiExplanation)}
                className="text-xs font-mono font-bold text-blue-700 hover:underline pt-1 block"
              >
                🤖 Why was this the answer? (Ask AI Mentor)
              </button>

              {showPracticeAiExplanation && (
                <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs text-slate-800 font-mono leading-relaxed">
                  🤖 AI Mentor: In medical screening, predicting a sick patient as "healthy" (False Negative) delays treatment. Recall measures how many actual sick patients were correctly caught by the model!
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveScreen(4)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Take Adaptive Assessment →</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Adaptive Assessment */}
      {activeScreen === 4 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h3 className="text-xl font-black text-slate-900">Adaptive Skill Assessment</h3>
            <span className="text-xs text-emerald-800 font-bold">Question 4 of 10</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between font-bold">
              <span>Assessment Completion</span>
              <span className="text-emerald-700 font-black">70%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div className="bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 h-full rounded-full w-[70%]" />
            </div>
          </div>

          {/* Question */}
          <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-4 font-mono text-sm">
            <h4 className="font-bold text-slate-900 leading-relaxed">
              "A fraud detection model has 99% accuracy, but it detects only 20% of fraudulent transactions. What is the likely problem?"
            </h4>

            <div className="space-y-2">
              {[
                { key: 'A', text: 'A. High precision' },
                { key: 'B', text: 'B. Low recall (Correct: missing 80% of fraud cases!)' },
                { key: 'C', text: 'C. High F1' },
                { key: 'D', text: 'D. Overfitting' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setQuizSelectedOption(opt.key as any)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    quizSelectedOption === opt.key
                      ? opt.key === 'B'
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-sm'
                        : 'bg-amber-100 border-amber-300 text-amber-950'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Feedback Selector */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-bold text-slate-800 block">How confident were you in this answer?</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setConfidenceLevel('Low')}
                className={`px-4 py-2 rounded-xl border flex items-center space-x-1.5 font-bold ${
                  confidenceLevel === 'Low' ? 'bg-amber-200 border-amber-400 text-amber-950' : 'bg-white text-slate-700'
                }`}
              >
                <Frown className="w-4 h-4" />
                <span>😕 Low</span>
              </button>
              <button
                onClick={() => setConfidenceLevel('Medium')}
                className={`px-4 py-2 rounded-xl border flex items-center space-x-1.5 font-bold ${
                  confidenceLevel === 'Medium' ? 'bg-blue-200 border-blue-400 text-blue-950' : 'bg-white text-slate-700'
                }`}
              >
                <Meh className="w-4 h-4" />
                <span>😐 Medium</span>
              </button>
              <button
                onClick={() => setConfidenceLevel('High')}
                className={`px-4 py-2 rounded-xl border flex items-center space-x-1.5 font-bold ${
                  confidenceLevel === 'High' ? 'bg-emerald-200 border-emerald-400 text-emerald-950' : 'bg-white text-slate-700'
                }`}
              >
                <Smile className="w-4 h-4" />
                <span>😊 High</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleCompleteAssessment}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Submit & Update Knowledge Twin →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 5 — Knowledge Twin Update */}
      {activeScreen === 5 && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 mx-auto shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              🎉 Knowledge Twin Updated!
            </h3>
            <div className="flex items-center justify-center space-x-4 font-mono text-lg font-bold pt-2">
              <span className="text-slate-500 line-through">Before: 42%</span>
              <span className="text-emerald-700 font-black text-2xl">After: 57%</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">+15% Skill Growth</span>
            </div>
          </div>

          {/* Skill Visualization Hierarchy */}
          <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 max-w-lg mx-auto space-y-3 font-mono text-left text-xs sm:text-sm">
            <span className="font-bold text-slate-900 block border-b border-slate-200 pb-2">Skill Visualization Hierarchy</span>
            <div className="space-y-1.5 text-slate-800">
              <div className="font-extrabold text-blue-900">Machine Learning ── 64%</div>
              <div className="pl-4">├── Regression ── 78%</div>
              <div className="pl-4">├── Classification ── 72%</div>
              <div className="pl-4">├── Feature Engineering ── 61%</div>
              <div className="pl-4 text-emerald-700 font-black">└── Model Evaluation ── 57% ↑ (+15%)</div>
            </div>
          </div>

          {/* AI Insight & Next Recommendation */}
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 max-w-lg mx-auto space-y-3 text-left font-sans">
            <span className="text-xs font-mono font-bold text-emerald-900 uppercase block">🤖 AI INSIGHT: GREAT PROGRESS!</span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              You've strengthened your understanding of precision, recall and F1 score. Your biggest remaining gap is ROC-AUC and threshold selection.
            </p>
          </div>

          {/* Next Best Skill Recommendation */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 max-w-lg mx-auto flex items-center justify-between font-mono text-xs">
            <div className="text-left">
              <span className="text-[10px] text-amber-800 font-bold uppercase block">Next Best Skill:</span>
              <span className="font-black text-slate-900 text-sm">ROC-AUC & Threshold Optimization</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black">25 min</span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Continue Learning $\rightarrow$ Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* ✨ Generate My Notes Modal */}
      {showGenerateNotesModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-emerald-300 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-slate-900">✨ Generate My Notes</h3>
              </div>
              <button onClick={() => setShowGenerateNotesModal(false)} className="p-1 text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Learning Level Selection */}
            <div className="space-y-2 font-mono text-xs">
              <label className="font-bold text-slate-700 uppercase block">Learning Level:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLearningLevel(lvl)}
                    className={`p-2.5 rounded-xl border font-bold transition-all ${
                      learningLevel === lvl ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowGenerateNotesModal(false);
                setActiveScreen(2);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-[1.02] transition-all"
            >
              [ Generate Notes ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

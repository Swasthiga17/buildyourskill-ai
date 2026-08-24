import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  Award,
  Star,
  Sparkles,
  Zap,
  BarChart3,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  BookOpen,
  Rocket,
  Brain,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { apiService } from '../services/api';

export const ProgressAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'streak' | 'xp' | 'achievements' | 'mastery' | 'analytics' | 'challenge'>('overview');

  const [challengeAccepted, setChallengeAccepted] = useState(false);

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>GAMIFICATION & HABIT ENGINE</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Progress & <span className="text-gradient-emerald">Gamification Hub</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            See how far you've come and turn your AI/ML learning into a daily habit.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 font-mono">
          <div className="p-4 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center space-x-3 text-amber-950 font-black shadow-sm">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            <div className="flex flex-col text-left">
              <span className="text-sm">12 Day Streak</span>
              <span className="text-[10px] text-amber-800">+35 XP Bonus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-7 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'overview' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden xl:inline">1. Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('streak')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'streak' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span className="hidden xl:inline">2. Streak</span>
        </button>

        <button
          onClick={() => setActiveTab('xp')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'xp' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Star className="w-4 h-4" />
          <span className="hidden xl:inline">3. XP & Levels</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'achievements' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="hidden xl:inline">4. Achievements</span>
        </button>

        <button
          onClick={() => setActiveTab('mastery')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'mastery' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span className="hidden xl:inline">5. Skill Mastery</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'analytics' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden xl:inline">6. Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('challenge')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'challenge' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span className="hidden xl:inline">7. Challenge</span>
        </button>
      </div>

      {/* SCREEN 1 — Progress Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Hero Card */}
          <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-400 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono font-black text-xs">
                  AI/ML ENGINEER JOURNEY
                </span>
                <h2 className="text-3xl font-black text-slate-900 pt-2 font-mono">Level 18 — AI Explorer</h2>
              </div>
              <span className="text-xl font-black font-mono text-emerald-700">2,840 / 3,500 XP</span>
            </div>

            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div className="bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 h-full rounded-full w-[81%]" />
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 font-black text-amber-950">🔥 12 Day Streak</div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-black text-emerald-950">⭐ 2,840 XP</div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 font-black text-blue-950">📚 47 Lessons</div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 font-black text-purple-950">🏗️ 6 Projects</div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-black text-emerald-950">🧠 24 Skills</div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 font-black text-amber-950">🏆 8 Achievements</div>
            </div>
          </div>

          {/* Weekly Goal Progress */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-300 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-sm font-black text-slate-900">Weekly Goal Progress</span>
              <span className="text-emerald-700 font-black text-sm">4.2 / 5 hours (84%)</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div className="bg-gradient-to-r from-amber-400 to-emerald-600 h-full rounded-full w-[84%]" />
            </div>
            <span className="text-slate-600 block">You're 84% toward your weekly learning goal. Keep going!</span>
          </div>
        </div>
      )}

      {/* SCREEN 2 — Learning Streak */}
      {activeTab === 'streak' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <Flame className="w-12 h-12 text-amber-500 fill-amber-500 animate-bounce" />
            <div>
              <h2 className="text-3xl font-black text-slate-900">Your Learning Streak — 12 Days 🔥</h2>
              <span className="text-xs font-mono font-bold text-slate-600">Daily habit active</span>
            </div>
          </div>

          {/* Calendar Activity Grid */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 font-mono text-xs">
            <span className="font-bold text-slate-900 block uppercase">Activity Calendar (Past 2 Weeks):</span>
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-slate-700">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
              {/* Week 1 */}
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-amber-400 text-slate-950 font-black">★</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              {/* Week 2 */}
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-amber-400 text-slate-950 font-black">★</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-blue-500 text-white font-black">✓</div>
              <div className="p-3 rounded-xl bg-emerald-500 text-white font-black">Today</div>
              <div className="p-3 rounded-xl bg-slate-100 text-slate-400 font-bold">Tomorrow</div>
            </div>
          </div>

          {/* Streak Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 font-black text-emerald-950 flex items-center justify-between">
              <span>7 Days</span>
              <span>✓ Unlocked</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-100 border border-amber-300 font-black text-amber-950 flex items-center justify-between">
              <span>14 Days</span>
              <span>🔒 2 Days Away</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-500 flex items-center justify-between">
              <span>30 Days</span>
              <span>🔒 Locked</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-500 flex items-center justify-between">
              <span>60 Days</span>
              <span>🔒 Locked</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3 — XP & Levels */}
      {activeTab === 'xp' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 font-mono">Your AI Learning Level</h2>
              <span className="text-xs font-mono font-bold text-emerald-700">Level 18 — AI Explorer (2,840 XP)</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-100 border border-amber-300 font-mono text-xs font-bold text-amber-950">
              Next: Level 19 — AI Builder (660 XP remaining)
            </div>
          </div>

          {/* XP Sources Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-black text-slate-900 text-sm uppercase block border-b border-slate-200 pb-2">XP Reward System</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-bold">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Lesson completed</span>
                <span className="text-emerald-700">+20 XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Quiz passed</span>
                <span className="text-emerald-700">+50 XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Coding challenge</span>
                <span className="text-emerald-700">+75 XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Project completed</span>
                <span className="text-amber-700 font-black">+300 XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Skill mastered</span>
                <span className="text-amber-700 font-black">+500 XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Weekly goal</span>
                <span className="text-emerald-700">+150 XP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Achievements */}
      {activeTab === 'achievements' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Achievements</h2>
            <p className="text-sm text-slate-700 font-sans">Celebrate the skills and projects you've mastered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-blue-50 border border-blue-300 shadow-sm space-y-2">
              <span className="font-extrabold text-blue-950 text-sm block">🐍 Python Explorer</span>
              <p className="text-slate-700 font-sans">Completed Python fundamentals.</p>
              <span className="px-3 py-1 rounded-full bg-blue-200 text-blue-950 font-black inline-block">Unlocked ✓</span>
            </div>

            <div className="p-6 rounded-3xl bg-blue-50 border border-blue-300 shadow-sm space-y-2">
              <span className="font-extrabold text-blue-950 text-sm block">🧠 ML Practitioner</span>
              <p className="text-slate-700 font-sans">Completed 5 ML projects.</p>
              <span className="px-3 py-1 rounded-full bg-blue-200 text-blue-950 font-black inline-block">Unlocked ✓</span>
            </div>

            <div className="p-6 rounded-3xl bg-blue-50 border border-blue-300 shadow-sm space-y-2">
              <span className="font-extrabold text-blue-950 text-sm block">🔎 RAG Explorer</span>
              <p className="text-slate-700 font-sans">Built your first RAG application.</p>
              <span className="px-3 py-1 rounded-full bg-blue-200 text-blue-950 font-black inline-block">Unlocked ✓</span>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-300 shadow-sm space-y-2">
              <span className="font-extrabold text-amber-950 text-sm block">🤖 AI Builder</span>
              <p className="text-slate-700 font-sans">Complete 3 AI projects.</p>
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black inline-block">68% Progress</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-500 text-sm block">🚀 Production Engineer</span>
              <p className="text-slate-400 font-sans">Deploy your first production AI application.</p>
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 font-bold inline-block">Locked 🔒</span>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-300 shadow-sm space-y-2">
              <span className="font-extrabold text-amber-950 text-sm block">🎤 Interview Ready</span>
              <p className="text-slate-700 font-sans">Score 85%+ in technical interview.</p>
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black inline-block">82% Progress</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 5 — Skill Mastery Analytics */}
      {activeTab === 'mastery' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Skill Mastery Analytics</h2>
            <p className="text-sm text-slate-700 font-sans">Your skills are continuously updated through learning and assessment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Python</span>
              <span className="text-2xl font-black text-emerald-600">86%</span>
              <span className="text-emerald-700 font-bold block">+4% this month</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">RAG</span>
              <span className="text-2xl font-black text-emerald-600">79%</span>
              <span className="text-emerald-700 font-bold block">+14% this month</span>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
              <span className="font-bold text-slate-900 block">MLOps (Highest Gap ⚠️)</span>
              <span className="text-2xl font-black text-amber-600">31%</span>
              <span className="text-amber-800 font-bold block">+10% this month</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 6 — Learning Analytics */}
      {activeTab === 'analytics' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">Learning Analytics</h2>
            <span className="text-xs text-slate-600 font-bold">Week | Month | 3 Months | All Time</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-amber-400 font-bold uppercase block">Learning Hours Chart (Past 4 Weeks):</span>
            <pre className="whitespace-pre">{`Hours
30 |             ● (28.5h)
25 |       ●     │
20 |   ●   │     │
15 |   │   │  ●  │
10 | ● │   │  │  │
   └────────────────
     W1  W2  W3  W4`}</pre>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 font-mono text-xs space-y-2">
            <span className="font-extrabold text-amber-950 uppercase block">🤖 AI ANALYTICS INSIGHT:</span>
            <p className="text-slate-800 font-sans">
              "You spend 48% of your time consuming learning content. Increasing project practice could improve your career readiness faster."
            </p>
          </div>
        </div>
      )}

      {/* SCREEN 7 — Weekly Challenge */}
      {activeTab === 'challenge' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-400 shadow-md space-y-8 bg-white/95 backdrop-blur-md">
          <div className="space-y-2 font-mono">
            <span className="px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black">
              THIS WEEK'S CHALLENGE
            </span>
            <h2 className="text-3xl font-black text-slate-900 pt-2">Build a RAG Application</h2>
            <span className="text-xs text-emerald-800 font-bold">Difficulty: Intermediate • 4 hours</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-bold text-slate-900 block uppercase">Requirements Checklist:</span>
            <div className="grid grid-cols-2 gap-2 text-slate-800 font-bold">
              <div>✓ Document ingestion</div>
              <div>✓ Chunking</div>
              <div>✓ Embeddings</div>
              <div>✓ Vector database</div>
              <div>✓ Retrieval</div>
              <div>✓ LLM generation</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-100 via-emerald-100 to-blue-100 border border-emerald-300 font-mono text-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-black text-slate-900 text-sm block">Rewards:</span>
              <span className="text-emerald-800 font-bold block">🏆 500 XP | 🎖️ RAG Builder Badge | 📈 +5% RAG Skill</span>
            </div>

            <button
              onClick={() => setChallengeAccepted(true)}
              className={`px-8 py-4 rounded-2xl font-black text-xs transition-all ${
                challengeAccepted ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white shadow-md hover:scale-105'
              }`}
            >
              {challengeAccepted ? '✓ Challenge Accepted!' : 'Accept Challenge →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

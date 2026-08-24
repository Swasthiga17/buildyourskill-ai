import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  User,
  RefreshCw,
  Code,
  BookOpen,
  ArrowRight,
  Flame,
  Bell,
  Calendar,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Star,
  Check,
  CheckCircle2,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { apiService } from '../services/api';

export const MentorChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'ask' | 'coach' | 'notifications' | 'review'>('home');

  // Screen 2 & 3 Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; code?: string; diagram?: string }>>([
    {
      sender: 'user',
      text: 'What should I learn today?'
    },
    {
      sender: 'ai',
      text: 'Based on your Knowledge Twin, I recommend MLOps Fundamentals.\n\nYou already have strong Python (82%), ML (76%) and RAG (78%) foundations. MLOps is currently your biggest technical gap (35%) for your target AI/ML Engineer role.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMessages);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (query.toLowerCase().includes('rag') || query.toLowerCase().includes('transformer')) {
        setMessages([
          ...newMessages,
          {
            sender: 'ai',
            text: 'Retrieval-Augmented Generation (RAG) connects LLMs to your private data vector databases:',
            diagram: `Documents ──> Chunking ──> Embeddings ──> Vector Database ──> Retriever ──> LLM ──> Answer`,
            code: `from langchain_community.vectorstores import FAISS\nfrom langchain_openai import OpenAIEmbeddings\n\ndb = FAISS.from_documents(docs, OpenAIEmbeddings())\nretriever = db.as_retriever(search_kwargs={"k": 3})`
          }
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            sender: 'ai',
            text: 'I have analyzed your request against your Knowledge Twin. Let us focus on your MLOps skill gap (35%). Shall we start with Docker containerization or FastAPI endpoint serving?'
          }
        ]);
      }
    }, 800);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>PERSISTENT AI LEARNING COACH</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            AI Mentor & <span className="text-gradient-emerald">Daily Coach</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Your personal AI/ML learning companion continuously using your Knowledge Twin + Skill Gaps + Roadmap + Career Goal.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('chat')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask AI Mentor Now</span>
        </button>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-6 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('home')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'home' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="hidden lg:inline">1. Mentor Home</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'chat' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden lg:inline">2. Mentor Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('ask')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'ask' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden lg:inline">3. Ask Anything</span>
        </button>

        <button
          onClick={() => setActiveTab('coach')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'coach' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden lg:inline">4. Daily Coach</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'notifications' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="hidden lg:inline">5. Nudges</span>
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`py-3.5 rounded-xl flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'review' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden lg:inline">6. Weekly Review</span>
        </button>
      </div>

      {/* SCREEN 1 — AI Mentor Home */}
      {activeTab === 'home' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-emerald-600">
                <Bot className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Good afternoon, Swasthi 👋</h2>
              <p className="text-sm text-slate-700 font-sans font-medium">
                I've analyzed your Knowledge Twin & career goal. Here's what I recommend today.
              </p>
            </div>
          </div>

          {/* Today's Recommendation */}
          <div className="p-8 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-4 font-sans">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-amber-900">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>TODAY'S AI RECOMMENDATION</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 font-mono">🎯 Focus: MLOps Fundamentals</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Your MLOps skill is currently <strong className="text-amber-700 font-mono">35%</strong>, making it one of your biggest gaps for your target <strong className="text-emerald-800 font-mono">AI/ML Engineer</strong> role.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-white border border-amber-300 font-bold">10 min — 📚 Learn</div>
              <div className="p-3 rounded-xl bg-white border border-amber-300 font-bold">15 min — 🧪 Practice</div>
              <div className="p-3 rounded-xl bg-white border border-amber-300 font-bold">20 min — 💻 Build</div>
              <div className="p-3 rounded-xl bg-white border border-amber-300 font-bold">05 min — 🧠 Recall</div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              to="/today-plan"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Start Today's 50-Min Plan →</span>
            </Link>
          </div>
        </div>
      )}

      {/* SCREEN 2 — AI Mentor Chat */}
      {activeTab === 'chat' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h3 className="text-xl font-black text-slate-900">AI Mentor Conversation</h3>
            <span className="text-xs text-emerald-800 font-bold">Twin-Connected AI Companion</span>
          </div>

          {/* Messages */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-3xl sm:max-w-4xl p-5 rounded-2xl font-mono text-xs sm:text-sm space-y-3 leading-relaxed ${
                    m.sender === 'user' ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-bold' : 'bg-slate-900 text-emerald-300 border border-slate-800'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono">{m.text}</pre>
                  {m.diagram && (
                    <div className="p-3 rounded-xl bg-[#05080E] border border-slate-800 text-amber-400 text-[11px]">
                      <pre className="whitespace-pre">{m.diagram}</pre>
                    </div>
                  )}
                  {m.code && (
                    <div className="p-3 rounded-xl bg-[#05080E] border border-slate-800 text-emerald-400 text-[11px]">
                      <pre className="whitespace-pre-wrap">{m.code}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Gap Card */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between font-mono text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Why this suggestion?</span>
              <span className="text-slate-700">MLOps: 35% | Required: 70% | Technical Gap: 35%</span>
            </div>
            <button
              onClick={() => handleSendMessage('Give me an MLOps practice challenge')}
              className="px-4 py-2 rounded-xl bg-amber-200 text-amber-950 font-black"
            >
              🧪 Give me a challenge
            </button>
          </div>

          {/* Chat Input */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-300 flex items-center space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI Mentor anything about your roadmap, skills, or projects..."
              className="flex-1 px-4 py-2 font-mono text-xs text-slate-900 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-mono font-black text-xs shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Ask Anything */}
      {activeTab === 'ask' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Ask Anything</h2>
            <p className="text-sm text-slate-700 font-sans">
              Instant explanations, code examples, architecture diagrams, and practice problems powered by your Knowledge Twin.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <label className="font-bold text-slate-700 uppercase block">Suggested Prompts:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Explain Transformers simply',
                'Why am I weak in MLOps?',
                'Give me a RAG project',
                'Quiz me on ML',
                'Prepare me for an AI interview',
                'What should I learn this week?'
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage(p);
                  }}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:bg-emerald-50 text-left"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 4 — Daily Learning Coach */}
      {activeTab === 'coach' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Today's Learning Plan</h2>
              <span className="text-xs text-emerald-800 font-bold">Tuesday • 50 minutes</span>
            </div>
            <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-black text-sm">32 / 50 min Completed</span>
          </div>

          {/* Timeline */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between font-bold">
              <span>09:00 — ✓ 10 min: Review ML fundamentals</span>
              <span className="text-emerald-700">Completed</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between font-bold">
              <span>09:15 — ✓ 15 min: Model evaluation practice</span>
              <span className="text-emerald-700">Completed</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between font-bold">
              <span>09:30 — 🟡 20 min: MLOps lesson & container setup</span>
              <span className="text-amber-800">In Progress</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-slate-500">
              <span>09:50 — ○ 05 min: Active recall assessment</span>
              <span>Pending</span>
            </div>
          </div>

          {/* Adaptive AI Adjustment Banner */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 font-mono text-xs">
            <span className="font-black text-emerald-950 uppercase block">⚡ ADAPTIVE LEARNING ADJUSTMENT:</span>
            <p className="text-slate-800 font-sans">
              "You completed today's practice faster than expected. I reduced your remaining lesson from 20 $\rightarrow$ 15 minutes."
            </p>
          </div>
        </div>
      )}

      {/* SCREEN 5 — Smart Notifications & Nudges */}
      {activeTab === 'notifications' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-black text-slate-900">Your Learning Updates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-black text-emerald-700 flex items-center gap-2">🧠 Knowledge Twin Updated</span>
              <p className="text-slate-700 font-sans">Your RAG score increased from 57% $\rightarrow$ 71%.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-black text-amber-700 flex items-center gap-2">🎯 New Skill Gap</span>
              <p className="text-slate-700 font-sans">MLOps has become your highest-priority skill gap.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-black text-amber-600 flex items-center gap-2">🔥 Learning Streak</span>
              <p className="text-slate-700 font-sans">You're on a 12-day streak. Keep going!</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="font-black text-purple-700 flex items-center gap-2">🏆 Achievement Unlocked</span>
              <p className="text-slate-700 font-sans">RAG Explorer — Completed your first RAG project.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 col-span-1 md:col-span-2">
              <span className="font-black text-blue-700 flex items-center gap-2">💼 Career Alert</span>
              <p className="text-slate-700 font-sans">Your AI/ML Engineer readiness increased to 78%.</p>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 6 — Weekly AI Review */}
      {activeTab === 'review' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 font-mono">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Your Weekly Review</h2>
              <span className="text-xs text-emerald-800 font-bold">August 17–23</span>
            </div>
            <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-black text-sm">+12% Overall Progress</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Hours Learned</span>
              <span className="text-xl font-black text-emerald-600">28.5h</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Lessons</span>
              <span className="text-xl font-black text-amber-600">14</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Projects</span>
              <span className="text-xl font-black text-blue-600">1</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block">Assessments</span>
              <span className="text-xl font-black text-purple-600">3</span>
            </div>
          </div>

          {/* Skill Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-xs">
            <span className="font-black text-slate-900 text-sm uppercase block border-b border-slate-200 pb-2">Knowledge Twin Progress</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-bold">
              <div>Python: 82% ↑2</div>
              <div>ML: 76% ↑5</div>
              <div className="text-emerald-700 font-black">RAG: 71% ↑14</div>
              <div>LLM: 73% ↑8</div>
              <div className="text-amber-700 font-black">MLOps: 35% ↑10</div>
              <div>System Design: 42% ↑3</div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('coach')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Start Next Week's Plan →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

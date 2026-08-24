import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Rocket,
  MessageSquare,
  Send,
  Layers,
  ArrowRight,
  ShieldCheck,
  Star,
  Check
} from 'lucide-react';
import { apiService } from '../services/api';

export const CareerDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'readiness' | 'target' | 'gap' | 'roadmap' | 'skills' | 'projects' | 'resume' | 'job' | 'advisor'
  >('overview');

  // AI Advisor Interactive Chat State
  const [advisorInput, setAdvisorInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello Swasthi! I am your AI Career Advisor. Based on your Knowledge Twin (78%), you are on track to become an AI/ML Engineer. What would you like to ask?'
    }
  ]);

  const handleSendQuestion = (questionText?: string) => {
    const textToSend = questionText || advisorInput;
    if (!textToSend.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: textToSend },
      {
        sender: 'ai',
        text: `To become an AI/ML Engineer, your highest priority is mastering MLOps (current 31%) and Docker model serving. I recommend taking the MLOps Fundamentals 12-hour track and building the Real-Time ML Prediction API project next.`
      }
    ]);
    setAdvisorInput('');
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>AI CAREER COMMAND CENTER</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Career <span className="text-gradient-emerald">Intelligence</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium max-w-2xl">
            Turn your skills into a clear career path. Your Knowledge Twin analyzes your learning progress, projects, and goals to show where you stand and what to build next.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveSection('readiness')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black shadow-md hover:scale-105 transition-all"
          >
            ✨ Analyze My Career
          </button>
        </div>
      </div>

      {/* Sub-Navigation Stepper Sidebar Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-10 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-[11px] font-bold shadow-sm">
        {[
          { id: 'overview', label: '1. Overview' },
          { id: 'readiness', label: '2. Readiness' },
          { id: 'target', label: '3. Target' },
          { id: 'gap', label: '4. Skill Gap' },
          { id: 'roadmap', label: '5. Roadmap' },
          { id: 'skills', label: '6. Skills' },
          { id: 'projects', label: '7. Projects' },
          { id: 'resume', label: '8. Resume' },
          { id: 'job', label: '9. Job Ready' },
          { id: 'advisor', label: '10. AI Advisor' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as any)}
            className={`py-3 rounded-xl flex items-center justify-center transition-all ${
              activeSection === s.id ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md font-black' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1 — Career Readiness */}
      {(activeSection === 'overview' || activeSection === 'readiness') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-1 shadow-lg flex items-center justify-center font-mono">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">72%</span>
                  <span className="text-[10px] text-emerald-700 font-bold">Ready</span>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900">AI/ML Engineer Readiness</h2>
                <p className="text-xs text-slate-600 font-mono font-bold">
                  Target Role: AI/ML Engineer • Level: Intermediate • Skills Matched: 18 / 25
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveSection('gap')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs shadow-md"
            >
              View Detailed Analysis →
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 font-mono text-xs space-y-2">
            <span className="font-black text-amber-950 uppercase block">💡 AI CAREER INSIGHT:</span>
            <p className="text-slate-800 font-sans">
              "You're strong in Python, machine learning fundamentals, and REST APIs. Your biggest opportunities are advanced deep learning, MLOps, and production AI systems."
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2 — Target Role */}
      {(activeSection === 'overview' || activeSection === 'target') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono">
            <h2 className="text-3xl font-black text-slate-900">Target Role: AI/ML Engineer</h2>
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">Role Match: 78%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
              <span className="font-black text-emerald-950 uppercase block text-sm">🟢 WHAT YOU'RE DOING WELL:</span>
              <ul className="space-y-2 font-bold text-slate-800">
                <li>✓ Python & programming (86%)</li>
                <li>✓ Machine Learning fundamentals (82%)</li>
                <li>✓ REST APIs & FastAPI (80%)</li>
                <li>✓ AI/LLM fundamentals (74%)</li>
                <li>✓ Project development (88%)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
              <span className="font-black text-amber-950 uppercase block text-sm">🟡 WHAT YOU NEED NEXT:</span>
              <ul className="space-y-2 font-bold text-slate-800">
                <li>⚡ Deep Learning (61%)</li>
                <li>⚡ MLOps & Model Serving (31%)</li>
                <li>⚡ Docker Containerization</li>
                <li>⚡ Advanced RAG Architecture</li>
                <li>⚡ AI System Design</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3 — Skill Gap Analysis Table */}
      {(activeSection === 'overview' || activeSection === 'gap') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-2xl font-black text-slate-900">Skill Gap Analysis</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-600 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Skill</th>
                  <th className="py-3 px-4">Your Level</th>
                  <th className="py-3 px-4">Required</th>
                  <th className="py-3 px-4">Gap Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-900 font-bold">
                {[
                  { skill: 'Python', user: 'Advanced', req: 'Advanced', gap: '✓ Ready', color: 'text-emerald-700' },
                  { skill: 'Machine Learning', user: 'Intermediate', req: 'Advanced', gap: 'Medium', color: 'text-amber-700' },
                  { skill: 'Deep Learning', user: 'Beginner', req: 'Advanced', gap: 'High', color: 'text-red-600' },
                  { skill: 'NLP', user: 'Intermediate', req: 'Advanced', gap: 'Medium', color: 'text-amber-700' },
                  { skill: 'RAG', user: 'Intermediate', req: 'Advanced', gap: 'Medium', color: 'text-amber-700' },
                  { skill: 'MLOps', user: 'Beginner', req: 'Intermediate', gap: 'High 🔴', color: 'text-red-600' },
                  { skill: 'Cloud', user: 'Beginner', req: 'Intermediate', gap: 'High 🔴', color: 'text-red-600' },
                  { skill: 'System Design', user: 'Beginner', req: 'Intermediate', gap: 'High 🔴', color: 'text-red-600' }
                ].map((row) => (
                  <tr key={row.skill} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-black">{row.skill}</td>
                    <td className="py-3 px-4">{row.user}</td>
                    <td className="py-3 px-4">{row.req}</td>
                    <td className={`py-3 px-4 ${row.color}`}>{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4 — Career Roadmap */}
      {(activeSection === 'overview' || activeSection === 'roadmap') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-black text-slate-900">Recommended Career Path (4–6 Months)</h2>
            <span className="text-slate-600 font-bold">Estimated Journey: 4–6 months</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 space-y-1">
              <span className="font-black text-emerald-950 block">Step 1 — Fundamentals</span>
              <span className="text-slate-800">Python → ML → Stats</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 space-y-1">
              <span className="font-black text-emerald-950 block">Step 2 — Advanced AI</span>
              <span className="text-slate-800">DL → NLP → Transformers</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-100 border border-amber-300 space-y-1">
              <span className="font-black text-amber-950 block">Step 3 — Master GenAI</span>
              <span className="text-slate-800">LLMs → RAG → Agents</span>
            </div>
            <div className="p-4 rounded-2xl bg-red-100 border border-red-300 space-y-1">
              <span className="font-black text-red-950 block">Step 4 — Production Skills</span>
              <span className="text-slate-800">FastAPI → Docker → MLOps</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-100 border border-blue-300 space-y-1">
              <span className="font-black text-blue-950 block">Step 5 — Job Ready</span>
              <span className="text-slate-800">Projects → Interviews</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5 — What to Learn Next */}
      {(activeSection === 'overview' || activeSection === 'skills') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-2xl font-black text-slate-900">What to Learn Next (AI Recommendations)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-red-300 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-900 font-bold text-[10px]">🔥 High Priority</span>
                <h3 className="text-xl font-black text-slate-900">MLOps Fundamentals</h3>
                <p className="text-slate-600 font-sans text-xs">Required for serving & deploying production models. (12 hours)</p>
              </div>
              <Link to="/roadmap/mlops" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Start Learning →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">🧠 High Priority</span>
                <h3 className="text-xl font-black text-slate-900">Deep Learning</h3>
                <p className="text-slate-600 font-sans text-xs">Stronger neural network knowledge required. (20 hours)</p>
              </div>
              <Link to="/roadmap/dl" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Start Learning →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-300 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">☁️ Medium Priority</span>
                <h3 className="text-xl font-black text-slate-900">Cloud Deployment</h3>
                <p className="text-slate-600 font-sans text-xs">Improve deployment of AI applications. (10 hours)</p>
              </div>
              <Link to="/projects" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Start Learning →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6 — Recommended Projects */}
      {(activeSection === 'overview' || activeSection === 'projects') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-2xl font-black text-slate-900">Recommended Career Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-amber-500 font-bold">Impact: ⭐⭐⭐⭐⭐</span>
                <h3 className="text-lg font-black text-slate-900">Production RAG Assistant</h3>
                <p className="text-slate-600 font-sans text-xs">RAG, FAISS, FastAPI, LLMs, Docker</p>
              </div>
              <Link to="/projects" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Build Project →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-amber-500 font-bold">Impact: ⭐⭐⭐⭐</span>
                <h3 className="text-lg font-black text-slate-900">Real-Time ML Prediction API</h3>
                <p className="text-slate-600 font-sans text-xs">Machine Learning, FastAPI, Docker, Cloud</p>
              </div>
              <Link to="/projects" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Build Project →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-amber-500 font-bold">Impact: ⭐⭐⭐⭐⭐</span>
                <h3 className="text-lg font-black text-slate-900">AI Agent Automation Platform</h3>
                <p className="text-slate-600 font-sans text-xs">LLM, Agents, LangGraph, RAG</p>
              </div>
              <Link to="/projects" className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-center">
                Build Project →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8 & 9 — Resume & Job Readiness */}
      {(activeSection === 'overview' || activeSection === 'resume' || activeSection === 'job') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <span className="font-extrabold text-slate-900 text-base block">📄 Resume Readiness: 84% Optimized</span>
              <p className="text-slate-700 font-sans text-xs">
                Strong areas: Technical projects, AI/ML keywords, Full-stack. Needs improvement: Quantifiable metrics & MLOps experience.
              </p>
              <Link to="/interview" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold inline-block">
                Analyze Resume with AI →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <span className="font-extrabold text-slate-900 text-base block">🎯 Job Readiness Score: 7 / 10</span>
              <p className="text-slate-700 font-sans text-xs">
                Recommended Action: Complete MLOps learning path $\rightarrow$ Build 1 production AI project $\rightarrow$ Take AI/ML assessment.
              </p>
              <Link to="/assessments" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-bold inline-block">
                Start Next Action →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10 — AI Career Advisor Chat */}
      {(activeSection === 'overview' || activeSection === 'advisor') && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-6 bg-white/90 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">🤖 Ask Your AI Career Advisor</h2>
          </div>

          {/* Chat Messages Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white h-48 overflow-y-auto space-y-3">
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`p-3 rounded-xl font-sans ${m.sender === 'ai' ? 'bg-slate-800 text-emerald-300' : 'bg-emerald-600 text-white ml-auto max-w-md'}`}>
                <span className="font-mono text-[10px] font-bold block">{m.sender === 'ai' ? '🤖 AI Advisor:' : '👤 Swasthi:'}</span>
                <span className="text-xs">{m.text}</span>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2">
            {[
              'What skill should I learn next?',
              'Am I ready for AI/ML Engineer roles?',
              'Which projects should I build?',
              'How can I improve my resume?'
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSendQuestion(q)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-800 font-bold"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={advisorInput}
              onChange={(e) => setAdvisorInput(e.target.value)}
              placeholder="Ask your career advisor anything..."
              className="flex-1 p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 focus:outline-none"
            />
            <button
              onClick={() => handleSendQuestion()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

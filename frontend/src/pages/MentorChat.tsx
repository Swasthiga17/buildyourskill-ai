import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  Brain,
  Plus,
  ArrowRight,
  Code2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'user',
      text: 'How can I optimize PyTorch tensor autograd performance in deep networks?'
    },
    {
      sender: 'ai',
      text: "Here's a personalized roadmap for your question:\n\n1. In-place operations: Use tensor.add_() instead of creating intermediate tensors.\n2. Gradient Accumulation: Accumulate loss before calling optimizer.step().\n3. Detach Subgraphs: Use tensor.detach() for non-differentiating branches.\n4. Mixed Precision: Wrap training in torch.cuda.amp.autocast().\n\nWould you like a sandboxed coding exercise on this?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const pastConversations = [
    { title: 'PyTorch vs TensorFlow', time: '1h ago', active: true },
    { title: 'Models, Imports & Hooks', time: '1d ago', active: false },
    { title: 'Model Deployment FastAPI', time: 'Yesterday', active: false },
    { title: 'RAG Vector Architecture', time: '3d ago', active: false },
    { title: 'Interview Prep Tips', time: '4d ago', active: false }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userText = input.trim();
    setInput('');
    const newMsgs = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMsgs);
    setIsSending(true);

    setTimeout(() => {
      setMessages([
        ...newMsgs,
        {
          sender: 'ai',
          text: `Grounded on your Knowledge Twin: For "${userText}", I suggest reviewing your active PyTorch autograd checkpoint and testing the gradient flow in our isolated sandbox!`
        }
      ]);
      setIsSending(false);
    }, 600);
  };

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AI Mentor
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Your always-on mentor learning companion.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Chat History */}
        <div className="lg:col-span-3 p-5 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-4">
          <button
            onClick={() => setMessages([])}
            className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block px-2 mb-1">
              Recent Chats
            </span>
            {pastConversations.map((c, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl text-xs font-medium cursor-pointer transition-all ${
                  c.active
                    ? 'bg-amber-50 border border-amber-200 text-amber-950 font-bold'
                    : 'text-slate-700 hover:bg-[#FAF8F2]'
                }`}
              >
                <div className="truncate">{c.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{c.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column: Chat Window */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-4 flex flex-col justify-between min-h-[500px]">
          
          {/* Message Thread */}
          <div className="space-y-4 overflow-y-auto max-h-[380px] custom-scrollbar pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
                  {m.sender === 'user' ? 'You' : 'AI Mentor'}
                </span>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-[#2563EB] text-white font-medium rounded-tr-none'
                      : 'bg-[#FAF8F2] border border-[#E8E4D8] text-slate-800 rounded-tl-none font-sans'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'ai' && (
                  <div className="flex items-center gap-2 pt-2">
                    <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 transition-all">
                      Action Plan
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-[10px] font-bold text-white transition-all">
                      Start Coding Exercise
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                <span>AI Mentor is thinking...</span>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me mentor anything..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E8E4D8] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
            />
            <button
              type="submit"
              disabled={isSending}
              className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Column: User Context Panel */}
        <div className="lg:col-span-3 p-5 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase">Your Context</h3>
          
          <div className="space-y-3 text-xs font-sans">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Role</span>
              <span className="font-bold text-slate-800">AI/ML Engineer</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Recent Focus</span>
              <span className="font-bold text-slate-800">PyTorch Basics</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Top Gap</span>
              <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px] mt-0.5">
                PyTorch (48%)
              </span>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">
            View Full Context
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Search, Bell, Shield, Bot, Sparkles, X, Send } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  onTriggerSplash?: () => void;
  onOpenAuth?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onTriggerSplash, onOpenAuth }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "👋 Hi Buddy! I'm your GrowSkill AI Mentor. How can I help you in your journey today?"
    }
  ]);

  const publicRoutes = ['/landing', '/login'];
  const isPublicPage = publicRoutes.includes(location.pathname);

  const handleCopilotSend = (shortcutText?: string) => {
    const text = shortcutText || copilotQuery;
    if (!text.trim()) return;

    const newMsgs = [...copilotMessages, { sender: 'user' as const, text }];
    setCopilotMessages(newMsgs);
    if (!shortcutText) setCopilotQuery('');

    setTimeout(() => {
      setCopilotMessages([
        ...newMsgs,
        {
          sender: 'ai',
          text: `🤖 Grounded on your Knowledge Twin, I recommend focusing on PyTorch autograd hooks & MLOps deployment pipelines next!`
        }
      ]);
    }, 500);
  };

  if (isPublicPage) {
    if (location.pathname === '/login') {
      return (
        <div className="min-h-screen text-slate-900 flex flex-col justify-center selection:bg-emerald-500 selection:text-white">
          <main className="flex-grow flex flex-col justify-center">{children}</main>
        </div>
      );
    }

    return (
      <div className="min-h-screen text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 flex selection:bg-emerald-500 selection:text-white relative font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenAuth={onOpenAuth}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen justify-between bg-transparent">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/85 backdrop-blur-xl border-b border-emerald-200/50 px-5 sm:px-7 flex items-center justify-between shadow-2xs">
          {/* Search Bar */}
          <div className="relative w-64 sm:w-80 md:w-96">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, skills, roadmaps, code..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/95 border border-emerald-300/60 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/25 transition-all shadow-2xs"
            />
          </div>

          {/* Right Header Icons & User Profile Avatar */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              aria-label="Notifications"
              className="p-2 rounded-xl bg-white/90 hover:bg-amber-50 border border-amber-300/60 text-amber-700 transition-colors relative shadow-2xs"
            >
              <Bell className="w-4 h-4 stroke-[2]" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 ring-1 ring-white animate-pulse" />
            </button>

            <button
              aria-label="Security Status"
              className="p-2 rounded-xl bg-white/90 hover:bg-emerald-50 border border-emerald-300/60 text-emerald-700 transition-colors shadow-2xs"
            >
              <Shield className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Profile Avatar & Info */}
            <div className="flex items-center space-x-2.5 pl-3 border-l border-emerald-200">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-emerald-400/60">
                B
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-black text-slate-900 leading-tight">Buddy</span>
                <span className="text-[10px] font-bold text-emerald-700 leading-tight">AI/ML Engineer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto">{children}</main>

        <Footer />
      </div>

      {/* Floating Ask Mentor Co-pilot */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        {!isCopilotOpen ? (
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white font-sans font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all ring-1 ring-white/60"
          >
            <Sparkles className="w-4 h-4 text-yellow-200 animate-spin stroke-[2]" style={{ animationDuration: '6s' }} />
            <span>AI Mentor</span>
          </button>
        ) : (
          <div className="w-88 sm:w-96 rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-emerald-400/50 p-5 space-y-4 shadow-2xl text-slate-900 ring-2 ring-blue-500/20">
            <div className="flex items-center justify-between border-b-2 border-emerald-200/60 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="font-black text-base text-slate-900">AI Mentor Co-pilot</span>
              </div>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar p-1">
              {copilotMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white ml-6 text-right font-bold'
                      : 'bg-emerald-50/90 border border-emerald-200/80 text-slate-900 mr-6 font-medium'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center space-x-2 pt-2 border-t-2 border-emerald-200/60">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotSend()}
                placeholder="Ask mentor anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-emerald-300 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              <button
                onClick={() => handleCopilotSend()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

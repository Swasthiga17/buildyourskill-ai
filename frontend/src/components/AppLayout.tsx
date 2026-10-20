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
        {/* Top Header Bar in Frosted Glass with YGB theme */}
        <header className="sticky top-0 z-20 h-22 bg-white/80 backdrop-blur-2xl border-b-2 border-emerald-400/30 px-7 sm:px-10 flex items-center justify-between shadow-sm">
          {/* Search Bar */}
          <div className="relative w-88 sm:w-[440px] md:w-[500px]">
            <Search className="w-6 h-6 text-emerald-600 absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, skills, roadmaps, code..."
              className="w-full pl-14 pr-5 py-3 rounded-2xl bg-white/95 border-2 border-emerald-400/40 text-base sm:text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/25 transition-all shadow-sm"
            />
          </div>

          {/* Right Header Icons & User Profile Avatar */}
          <div className="flex items-center space-x-5">
            <button
              aria-label="Notifications"
              className="p-3 rounded-2xl bg-white/90 hover:bg-amber-50 border-2 border-amber-300/60 text-amber-700 transition-colors relative shadow-xs"
            >
              <Bell className="w-6 h-6 stroke-[2.2]" />
              <span className="w-3 h-3 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white animate-pulse" />
            </button>

            <button
              aria-label="Security Status"
              className="p-3 rounded-2xl bg-white/90 hover:bg-emerald-50 border-2 border-emerald-300/60 text-emerald-700 transition-colors shadow-xs"
            >
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Profile Avatar & Info */}
            <div className="flex items-center space-x-4 pl-4 border-l-2 border-emerald-300/50">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md ring-2 ring-emerald-400/60">
                B
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">Buddy</span>
                <span className="text-xs sm:text-sm font-black text-emerald-700 leading-tight">AI/ML Engineer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-7 sm:p-9 lg:p-12 max-w-[1800px] w-full mx-auto">{children}</main>

        <Footer />
      </div>

      {/* Floating Ask Mentor Co-pilot with Yellow+Green+Blue Glow */}
      <div className="fixed bottom-8 right-8 z-50 select-none">
        {!isCopilotOpen ? (
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white font-sans font-black text-base sm:text-lg flex items-center space-x-3 shadow-2xl shadow-emerald-600/35 hover:scale-105 transition-all ring-2 ring-white/60"
          >
            <Sparkles className="w-6 h-6 text-yellow-200 animate-spin stroke-[2.5]" style={{ animationDuration: '6s' }} />
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

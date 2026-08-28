import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Brain, LogIn, Sparkles, X, Send, Bot, ShieldCheck } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  onTriggerSplash?: () => void;
  onOpenAuth?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onTriggerSplash, onOpenAuth }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "👋 Hi Swasthi! I'm your AI Mentor Co-pilot. How can I help you on this page?"
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
          text: `🤖 AI Co-pilot: Grounded on your Knowledge Twin & current view (${location.pathname}), I recommend reviewing your active technical gaps!`
        }
      ]);
    }, 600);
  };

  if (isPublicPage) {
    if (location.pathname === '/login') {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center selection:bg-indigo-500 selection:text-white">
          <main className="flex-grow flex flex-col justify-center">{children}</main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-indigo-500 selection:text-white relative">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenAuth={onOpenAuth}
      />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen justify-between bg-slate-950">
        {/* Top Header Bar for App Workspace */}
        <header className="sticky top-0 z-20 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-8 flex items-center justify-between shadow-sm">
          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Twin: Active</span>
            </span>
            <span className="text-slate-400 text-xs font-mono font-medium hidden sm:inline">
              Target: Staff AI/ML Engineer
            </span>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-2 shadow-sm text-xs font-mono transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1800px] w-full mx-auto">{children}</main>

        <Footer />
      </div>

      {/* Floating Ask Mentor Co-pilot */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        {!isCopilotOpen ? (
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-5 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center space-x-2 shadow-xl hover:scale-105 transition-all border border-indigo-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Ask Mentor</span>
          </button>
        ) : (
          <div className="w-96 sm:w-[420px] rounded-3xl bg-slate-900 border border-slate-700 p-5 space-y-4 shadow-2xl font-mono text-xs text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-white">AI Mentor Co-pilot</span>
              </div>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar p-1">
              {copilotMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white ml-6 text-right'
                      : 'bg-slate-800/80 border border-slate-700 text-slate-200 mr-6'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotSend()}
                placeholder="Ask technical question..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleCopilotSend()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
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

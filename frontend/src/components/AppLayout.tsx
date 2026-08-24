import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sprout, LogIn, RefreshCw, Sparkles, X, Send, Bot } from 'lucide-react';

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

  const publicRoutes = ['/', '/login'];
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
          text: `🤖 AI Co-pilot: Based on your Knowledge Twin & current page (${location.pathname}), I recommend focusing on MLOps & Model Evaluation!`
        }
      ]);
    }, 600);
  };

  if (isPublicPage) {
    if (location.pathname === '/login') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] text-slate-900 flex flex-col justify-center selection:bg-emerald-400 selection:text-slate-950">
          <main className="flex-grow flex flex-col justify-center">{children}</main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] text-slate-900 flex flex-col justify-between selection:bg-emerald-400 selection:text-slate-950">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] text-slate-900 flex selection:bg-emerald-400 selection:text-slate-950 relative">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenAuth={onOpenAuth}
      />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen justify-between bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA]">
        {/* Top Header Bar for App Workspace - Styled matching sidebar gradient */}
        <header className="sticky top-0 z-20 h-20 bg-gradient-to-r from-[#FEF08A]/95 via-[#A7F3D0]/95 to-[#60A5FA]/95 backdrop-blur-xl px-6 sm:px-10 flex items-center justify-between shadow-md">
          {/* Breadcrumb / Status */}
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-mono font-bold">
              <Sprout className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>AI Twin: Active</span>
            </span>
            <span className="text-slate-800 text-sm font-mono font-bold hidden sm:inline">Target: AI/ML Engineer</span>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center space-x-4 text-sm font-mono font-bold">
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black flex items-center space-x-2 shadow-md hover:scale-105 transition-all text-xs sm:text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </header>

        {/* Page Content Container - Expansive 1800px Width */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto">{children}</main>

        <Footer />
      </div>

      {/* ⭐ Persistent "Ask Mentor" Floating Co-pilot Button & Slide-over Panel */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        {!isCopilotOpen ? (
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-6 py-4 rounded-full bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-mono font-black text-sm flex items-center space-x-2.5 shadow-2xl hover:scale-105 transition-all border-2 border-white"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span>✨ Ask Mentor</span>
          </button>
        ) : (
          <div className="w-96 sm:w-[440px] rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-emerald-400 p-6 space-y-4 shadow-2xl font-mono text-xs sm:text-sm text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2.5">
                <Bot className="w-6 h-6 text-emerald-600" />
                <span className="font-black text-base">AI Mentor Co-pilot</span>
              </div>
              <button onClick={() => setIsCopilotOpen(false)} className="p-1 text-slate-500 hover:text-slate-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto custom-scrollbar p-1">
              {copilotMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3.5 rounded-xl max-w-[88%] text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-bold'
                        : 'bg-emerald-50 text-slate-900 border border-emerald-300 font-medium'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Shortcut Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => handleCopilotSend('Explain this concept')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                Explain this
              </button>
              <button
                onClick={() => handleCopilotSend('Give me a hint')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                Give me a hint
              </button>
              <button
                onClick={() => handleCopilotSend("What's next?")}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                What's next?
              </button>
            </div>

            {/* Input Bar */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotSend()}
                placeholder="Ask co-pilot..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleCopilotSend()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-bold hover:scale-105 transition-all"
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

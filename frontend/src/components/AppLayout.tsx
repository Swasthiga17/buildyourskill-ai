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
      text: "👋 Hi Alex! I'm your GrowSkill AI Mentor. How can I help you today?"
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
        <div className="min-h-screen bg-[#F8F6F0] text-slate-900 flex flex-col justify-center selection:bg-[#2563EB] selection:text-white">
          <main className="flex-grow flex flex-col justify-center">{children}</main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F8F6F0] text-slate-900 flex flex-col justify-between selection:bg-[#2563EB] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-slate-900 flex selection:bg-[#2563EB] selection:text-white relative font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenAuth={onOpenAuth}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen justify-between bg-[#F8F6F0]">
        {/* Top Header Bar matching the image */}
        <header className="sticky top-0 z-20 h-16 bg-[#FAF8F2] border-b border-[#E8E4D8] px-6 sm:px-8 flex items-center justify-between shadow-2xs">
          {/* Search Bar */}
          <div className="relative w-72 sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#E0DCCE] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] shadow-2xs"
            />
          </div>

          {/* Right Header Icons & User Profile Avatar */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-[#EBE7DC] transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1.5 right-1.5" />
            </button>

            <button className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-[#EBE7DC] transition-colors">
              <Shield className="w-4 h-4 text-emerald-600" />
            </button>

            {/* Profile Avatar & Info */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-[#E8E4D8]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                AR
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Alex Rivera</span>
                <span className="text-[10px] text-slate-500 leading-tight">AI Engineer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 max-w-[1700px] w-full mx-auto">{children}</main>

        <Footer />
      </div>

      {/* Floating Ask Mentor Co-pilot */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        {!isCopilotOpen ? (
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-4 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans font-bold text-xs flex items-center space-x-2 shadow-lg hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Mentor</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-2xl bg-white border border-[#E0DCCE] p-4 space-y-3 shadow-2xl text-xs text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-sm text-slate-900">AI Mentor Co-pilot</span>
              </div>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar p-1">
              {copilotMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl ${
                    m.sender === 'user'
                      ? 'bg-[#2563EB] text-white ml-6 text-right'
                      : 'bg-[#F7F5EE] border border-[#E8E4D8] text-slate-800 mr-6'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotSend()}
                placeholder="Ask mentor anything..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#F7F5EE] border border-[#E8E4D8] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
              <button
                onClick={() => handleCopilotSend()}
                className="p-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

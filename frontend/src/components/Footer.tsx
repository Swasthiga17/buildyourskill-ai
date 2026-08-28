import React from 'react';
import { Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-500 py-10 px-6 sm:px-8 lg:px-12 mt-20">
      <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-sans gap-4">
        <div className="flex items-center space-x-2.5">
          <Brain className="w-5 h-5 text-indigo-600" />
          <span className="text-slate-900 font-black text-sm font-mono">BuildYourSkill AI</span>
        </div>
        <p className="font-medium">© 2026 BuildYourSkill AI. Adaptive AI Learning Intelligence.</p>
        <div className="flex items-center space-x-6 font-bold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
          <a href="/roadmap" className="hover:text-indigo-600 transition-colors">Roadmap</a>
        </div>
      </div>
    </footer>
  );
};

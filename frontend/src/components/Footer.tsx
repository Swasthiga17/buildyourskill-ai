import React from 'react';
import { Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-2 border-emerald-400/30 bg-white/75 backdrop-blur-xl text-slate-700 py-10 px-6 sm:px-8 lg:px-12 mt-20">
      <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-slate-700 font-sans gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 text-white shadow-md">
            <Brain className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-slate-900 font-black text-base font-sans tracking-tight">
            GrowSkill <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">AI</span>
          </span>
        </div>
        <p className="font-bold text-slate-600">© 2026 GrowSkill AI. Adaptive AI Learning Intelligence.</p>
        <div className="flex items-center space-x-6 font-extrabold text-slate-800">
          <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
          <a href="/roadmap" className="hover:text-blue-700 transition-colors">Roadmap</a>
        </div>
      </div>
    </footer>
  );
};

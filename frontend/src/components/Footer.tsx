import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#070A14] text-slate-400 py-12 px-6 sm:px-8 lg:px-12 mt-20">
      <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400 font-mono">
        <div className="flex items-center space-x-2.5">
          <Sprout className="w-6 h-6 text-amber-400" />
          <span className="text-white font-extrabold text-base">GrowSkill AI</span>
        </div>
        <p>© 2026 GrowSkill AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

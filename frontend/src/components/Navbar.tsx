import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] backdrop-blur-xl shadow-md border-none">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Sprout Icon (High Contrast & Visible) */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sprout className="w-7 h-7 text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-mono">
              GrowSkill <span className="text-gradient-emerald font-black">AI</span>
            </span>
          </Link>

          {/* Actions: Log in & Get Started Free (High Contrast & Visible) */}
          <div className="flex items-center space-x-6 text-base font-black font-mono">
            <Link to="/login" className="text-slate-900 hover:text-emerald-700 transition-colors px-3 py-2">
              Log in
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-sm hover:scale-105 transition-all shadow-md"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

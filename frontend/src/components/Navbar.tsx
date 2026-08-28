import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 text-slate-900 transition-all shadow-sm">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Clean Modern Badge */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 p-[2px] shadow-md group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-indigo-600 group-hover:rotate-6 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-mono">
                BuildYourSkill <span className="text-indigo-600 font-black">AI</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 -mt-1 tracking-wider uppercase">
                Adaptive Learning Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600 font-sans">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <Link to="/roadmap" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <span>Roadmap</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold border border-indigo-200">
                Live
              </span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs font-mono shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useEffect, useState } from 'react';
import { Sprout } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // Exact 3-second duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (elapsed >= duration) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] flex flex-col items-center justify-center z-50 select-none p-4 cursor-pointer font-sans"
      onClick={onComplete}
      title="Click to skip"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-emerald-400/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-5 text-center max-w-xs w-full">
        {/* Centered Sprout & AI Nodes Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-xl">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative shadow-inner">
            <Sprout className="w-10 h-10 text-emerald-600 stroke-[2.2]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            GrowSkill <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xs text-slate-600 font-medium">Personalized AI/ML Learning Platform</p>
        </div>

        {/* 3-Second Loading Bar & Counter */}
        <div className="w-full space-y-1.5 pt-2">
          <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden border border-emerald-300/50 p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 h-full rounded-full transition-all duration-75 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 px-0.5">
            <span className="text-slate-600">Starting session...</span>
            <span className="text-emerald-800 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Sprout } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] flex flex-col items-center justify-center z-50 select-none p-4 cursor-pointer" onClick={onComplete}>
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-emerald-400/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {/* Centered Sprout & AI Nodes Logo */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-xl">
          <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center relative shadow-inner">
            <Sprout className="w-12 h-12 text-emerald-600" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
            <span className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Brand Name ONLY */}
        <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          GrowSkill <span className="text-gradient-emerald">AI</span>
        </span>
      </div>
    </div>
  );
};

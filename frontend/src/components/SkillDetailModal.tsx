import React from 'react';
import { X } from 'lucide-react';
import { SkillNode } from '../types';

interface SkillDetailModalProps {
  skill: SkillNode | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-amber-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{skill.name}</h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs text-slate-300 mb-4">{skill.description}</p>
        <div className="text-xs font-bold text-amber-400 font-mono">Current Proficiency: {skill.currentScore}%</div>
      </div>
    </div>
  );
};

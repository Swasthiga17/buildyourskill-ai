import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SkillNode } from '../types';

interface KnowledgeGraphCanvasProps {
  skills: SkillNode[];
  onSelectNode?: (skill: SkillNode) => void;
}

export const KnowledgeGraphCanvas: React.FC<KnowledgeGraphCanvasProps> = ({ skills, onSelectNode }) => {
  const flowNodeIds = ['python', 'numpy', 'pandas', 'statistics', 'ml_core', 'pytorch', 'deep_learning', 'transformers', 'llms', 'rag', 'agents', 'mlops'];

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span>AI/ML Knowledge Graph</span>
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {flowNodeIds.map((id, index) => {
          const skill = skills.find(s => s.id === id);
          if (!skill) return null;
          return (
            <div
              key={id}
              onClick={() => onSelectNode && onSelectNode(skill)}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 cursor-pointer hover:border-amber-400 transition-colors"
            >
              <span className="text-[10px] font-mono text-slate-400">Step 0{index + 1}</span>
              <h4 className="text-xs font-bold text-white truncate">{skill.name}</h4>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${skill.currentScore}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

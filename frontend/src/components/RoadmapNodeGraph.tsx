import React from 'react';
import { RoadmapPhase } from '../types';
import {
  Code,
  Binary,
  Database,
  Cpu,
  Brain,
  Layers,
  Zap,
  Sparkles,
  Search,
  Bot,
  Rocket,
  Network,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowDown,
  FastForward
} from 'lucide-react';

interface RoadmapNodeGraphProps {
  phases: RoadmapPhase[];
  activePersona: 'alex' | 'userA' | 'userB' | 'userC';
  selectedPhaseId: number;
  onSelectPhase: (id: number) => void;
}

const iconMap: Record<string, any> = {
  Code,
  Binary,
  Database,
  Cpu,
  Brain,
  Layers,
  Zap,
  Sparkles,
  Search,
  Bot,
  Rocket,
  Network,
  Briefcase,
  Award
};

export const RoadmapNodeGraph: React.FC<RoadmapNodeGraphProps> = ({
  phases,
  activePersona,
  selectedPhaseId,
  onSelectPhase
}) => {
  const getPersonaStatus = (phase: RoadmapPhase) => {
    if (!phase.personaStatuses) return phase.status;
    return phase.personaStatuses[activePersona] || phase.status;
  };

  return (
    <div className="w-full glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-amber-400" />
            <span>Interactive 14-Stage AI/ML Skill Graph</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any stage node to inspect topics, tools, projects, and interview questions.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-slate-300">Completed</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span className="text-amber-400 font-bold">Active Priority</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            <span className="text-slate-400">Skipped (Bypassed)</span>
          </span>
        </div>
      </div>

      {/* Grid Flow Chart Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative">
        {phases.map((phase, idx) => {
          const IconComponent = iconMap[phase.icon] || Code;
          const status = getPersonaStatus(phase);
          const isSelected = selectedPhaseId === phase.id;

          let cardStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700';
          let badgeText = `Stage ${phase.phaseNumber}`;
          let badgeStyle = 'bg-slate-800 text-slate-400';

          if (status === 'completed') {
            cardStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 hover:border-emerald-400';
            badgeText = 'Completed ✓';
            badgeStyle = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
          } else if (status === 'in_progress') {
            cardStyle =
              'bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-400 text-white shadow-lg shadow-amber-500/15 hover:border-amber-300 ring-1 ring-amber-400/40';
            badgeText = 'Active Focus 🔥';
            badgeStyle = 'bg-amber-500 text-slate-950 font-black';
          } else if (status === 'skipped') {
            cardStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60 hover:opacity-100';
            badgeText = 'Skipped ⏭';
            badgeStyle = 'bg-slate-800/80 text-slate-500';
          }

          if (isSelected) {
            cardStyle += ' ring-2 ring-cyan-400 scale-[1.02] shadow-xl';
          }

          return (
            <div key={phase.id} className="relative group">
              <div
                onClick={() => onSelectPhase(phase.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-36 relative select-none ${cardStyle}`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <IconComponent className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${badgeStyle}`}>
                    {badgeText}
                  </span>
                </div>

                {/* Node Title */}
                <div>
                  <h4 className="text-xs font-extrabold line-clamp-2 leading-tight">{phase.title}</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{phase.duration}</p>
                </div>

                {/* Category Tag */}
                <div className="text-[9px] font-mono tracking-wider text-slate-400 uppercase pt-1 border-t border-slate-800/60 truncate">
                  {phase.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

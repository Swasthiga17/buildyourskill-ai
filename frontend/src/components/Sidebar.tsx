import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  Network,
  Map,
  BookOpen,
  Compass,
  Rocket,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Settings,
  Sparkles,
  GitBranch,
  FileText
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  user?: {
    name: string;
    role: string;
  };
  onOpenAuth?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  user = { name: 'Buddy', role: 'AI/ML Candidate' }
}) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/knowledge-twin', label: 'Knowledge Twin', icon: Network },
    { path: '/skill-gaps', label: 'Skill Gaps', icon: Sparkles },
    { path: '/roadmap', label: 'Roadmap', icon: Map },
    { path: '/today-plan', label: "Today's Plan", icon: Compass },
    { path: '/study', label: 'Learn', icon: BookOpen },
    { path: '/projects', label: 'Projects', icon: Rocket },
    { path: '/assessments', label: 'Assessments', icon: Award },
    { path: '/interview', label: 'Interview Prep', icon: ShieldCheck },
    { path: '/mentor', label: 'AI Mentor', icon: MessageSquare },
    { path: '/import-knowledge', label: 'Documents (RAG)', icon: FileText },
    { path: '/learn-anything', label: 'GitHub Analyzer', icon: GitBranch },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/admin', label: 'Admin Telemetry', icon: ShieldCheck }
  ];

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col justify-between bg-white/90 backdrop-blur-2xl border-r border-emerald-400/30 text-slate-800 transition-all duration-300 z-30 select-none shadow-lg shrink-0 ${collapsed ? 'w-14' : 'w-48 lg:w-52'
        }`}
    >
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-emerald-200/50 bg-white/50">
          <Link to="/" className="flex items-center space-x-2 group overflow-hidden">
            <div className="w-4 h-6 rounded-sm bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform ring-1 ring-emerald-400/60">
              <Sprout className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            {!collapsed && (
              <span className="text-base font-black tracking-tight text-slate-900 font-sans truncate">
                GrowSkill <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">AI</span>
              </span>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
          >
            {collapsed ? <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" /> : <ChevronLeft className="w-4.5 h-4.5 stroke-[2.2]" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-130px)] custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/' && (location.pathname === '/dashboard' || location.pathname === '')) ||
              (item.path === '/roadmap' && location.pathname.startsWith('/roadmap')) ||
              (item.path === '/study' && location.pathname.startsWith('/study'));

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${isActive
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-sm shadow-emerald-600/30 ring-1 ring-emerald-400/50 font-extrabold'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-emerald-50 hover:translate-x-0.5'
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors stroke-[2.2] ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                {!collapsed && <span className="truncate tracking-tight">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Beta User Badge */}
      {!collapsed && (
        <div className="p-2.5 border-t border-emerald-200/50">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-50/95 via-emerald-50/80 to-blue-50/95 border border-emerald-300/60 text-slate-900 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-900 tracking-tight">Beta Member</span>
              <span className="text-amber-800 bg-amber-200/90 border border-amber-300 px-1.5 py-0.5 rounded text-[9px] font-black flex items-center gap-0.5">
                ✨ PRO
              </span>
            </div>
            <p className="text-[10px] text-emerald-800 font-semibold truncate">AI Mentor Active</p>
          </div>
        </div>
      )}
    </aside>
  );
};

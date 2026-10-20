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
      className={`sticky top-0 h-screen flex flex-col justify-between bg-white/85 backdrop-blur-2xl border-r-2 border-emerald-400/30 text-slate-800 transition-all duration-300 z-30 select-none shadow-2xl shrink-0 ${
        collapsed ? 'w-28' : 'w-[420px] lg:w-[450px] xl:w-[480px]'
      }`}
    >
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between h-24 px-7 border-b-2 border-emerald-300/40 bg-white/40">
          <Link to="/" className="flex items-center space-x-4 group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-xl shadow-emerald-500/30 group-hover:scale-105 transition-transform ring-2 ring-emerald-400/60">
              <Sprout className="w-8 h-8 stroke-[2.8]" />
            </div>
            {!collapsed && (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans truncate">
                GrowSkill <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">AI</span>
              </span>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-3 rounded-2xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-100/60 transition-colors border border-transparent hover:border-emerald-300"
          >
            {collapsed ? <ChevronRight className="w-7 h-7 stroke-[2.8]" /> : <ChevronLeft className="w-7 h-7 stroke-[2.8]" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 sm:p-5 space-y-2.5 overflow-y-auto max-h-[calc(100vh-230px)] custom-scrollbar">
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
                className={`flex items-center space-x-4.5 px-5 py-4 rounded-2xl text-lg sm:text-xl font-black transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-xl shadow-emerald-600/35 ring-2 ring-emerald-400/60 scale-[1.02]'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-emerald-100/60 hover:translate-x-2'
                }`}
              >
                <Icon className={`w-7 h-7 shrink-0 transition-colors stroke-[2.5] ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                {!collapsed && <span className="truncate tracking-tight">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Beta User Badge in Yellow-Green-Blue Theme */}
      {!collapsed && (
        <div className="p-5 border-t-2 border-emerald-300/40">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-100/95 via-emerald-100/80 to-blue-100/95 border-2 border-emerald-400/50 text-slate-900 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Beta Member</span>
              <span className="text-amber-700 bg-amber-200/90 border border-amber-400 px-2.5 py-0.5 rounded-xl text-sm font-black flex items-center gap-1 shadow-xs">
                ✨ PRO
              </span>
            </div>
            <p className="text-sm sm:text-base text-emerald-900 font-extrabold">Personalized AI Mentor Active</p>
          </div>
        </div>
      )}
    </aside>
  );
};

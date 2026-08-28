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
  user = { name: 'Alex Rivera', role: 'AI/ML Candidate' }
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
      className={`sticky top-0 h-screen flex flex-col justify-between bg-[#F7F5EE] border-r border-[#E8E4D8] text-slate-800 transition-all duration-200 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#E8E4D8]">
          <Link to="/" className="flex items-center space-x-2.5 group overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            {!collapsed && (
              <span className="text-lg font-black tracking-tight text-slate-900 font-sans truncate">
                GrowSkill <span className="text-emerald-600">AI</span>
              </span>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#EBE7DC] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] custom-scrollbar">
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
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#2563EB] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#EBE7DC]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Beta User Badge */}
      {!collapsed && (
        <div className="p-3">
          <div className="p-3 rounded-2xl bg-[#EDE9FE] border border-[#DDD6FE] text-purple-950 space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
              <span>Beta User</span>
              <span className="text-amber-500 text-xs">✨</span>
            </div>
            <p className="text-[10px] text-purple-700 font-medium">Pro Access Beta Program</p>
          </div>
        </div>
      )}
    </aside>
  );
};

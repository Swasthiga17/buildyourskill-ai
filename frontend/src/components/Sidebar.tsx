import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Brain,
  LayoutDashboard,
  Network,
  UploadCloud,
  Map,
  BookOpen,
  Compass,
  Rocket,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Flame,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Settings,
  Briefcase
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
  user = { name: 'Swasthi B S', role: 'Staff AI/ML Candidate' },
  onOpenAuth
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/roadmap', label: 'My Roadmap', icon: Map },
    { path: '/study', label: 'Study & Notes 📚', icon: BookOpen },
    { path: '/knowledge-twin', label: 'Knowledge Twin', icon: Network },
    { path: '/learn-anything', label: 'Learn Anything ✨', icon: Sparkles },
    { path: '/progress', label: 'Progress & XP 🏆', icon: TrendingUp },
    { path: '/projects', label: 'Projects', icon: Rocket },
    { path: '/mentor', label: 'AI Mentor', icon: MessageSquare },
    { path: '/assessments', label: 'Assessments 🧪', icon: Award },
    { path: '/import-knowledge', label: 'Import Knowledge', icon: UploadCloud },
    { path: '/today-plan', label: "Today's Plan", icon: Compass },
    { path: '/interview', label: 'Interview Prep', icon: ShieldCheck },
    { path: '/career', label: 'Career Intel 💼', icon: Briefcase },
    { path: '/settings', label: 'Settings ⚙️', icon: Settings },
    { path: '/admin', label: 'Admin Telemetry 🛡️', icon: ShieldCheck }
  ];

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col justify-between bg-slate-900 border-r border-slate-800 text-slate-300 shadow-xl transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div>
        {/* Top Logo Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-slate-800/80 bg-slate-950/50">
          <Link to="/" className="flex items-center space-x-3 group overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-emerald-400 to-cyan-400 p-[2px] shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-emerald-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            {!collapsed && (
              <span className="text-lg font-black tracking-tight text-white font-mono truncate">
                BuildYourSkill <span className="text-emerald-400">AI</span>
              </span>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/dashboard') ||
              (item.path === '/study' && location.pathname.startsWith('/study'));

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center space-x-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Learning Streak & Profile */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Day Streak
              </span>
              <span className="font-bold text-amber-300">7 Days 🔥</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full w-[70%]" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">{user.name}</span>
                <span className="text-[10px] text-slate-400 truncate">{user.role}</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onOpenAuth}
              title="Sign In / Switch Profile"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

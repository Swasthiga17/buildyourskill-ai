import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sprout,
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
  user = { name: 'Swasthi B S', role: 'AI/ML Learner' },
  onOpenAuth
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
    { path: '/settings', label: 'Settings ⚙️', icon: Settings }
  ];

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col justify-between bg-gradient-to-b from-[#FEF08A]/95 via-[#A7F3D0]/95 to-[#60A5FA]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-80'
      }`}
    >
      <div>
        {/* Top Logo Header - Seamless (No border line below) */}
        <div className="flex items-center justify-between h-20 px-6 bg-white/70 backdrop-blur-md">
          <Link to="/" className="flex items-center space-x-3 group overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sprout className="w-7 h-7 text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            {!collapsed && (
              <span className="text-2xl font-black tracking-tight text-slate-900 truncate">
                GrowSkill <span className="text-gradient-emerald">AI</span>
              </span>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl bg-white/80 text-slate-800 hover:text-emerald-700 hover:bg-white transition-colors shadow-sm"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-270px)] custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/study' && location.pathname.startsWith('/study'));
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md font-black scale-[1.02]'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-white/60 font-extrabold'
                }`}
              >
                <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-700'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && isActive && (
                  <span className="ml-auto w-3 h-3 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Learning Streak & Profile - Seamless (No border line above) */}
      <div className="p-4 space-y-3 bg-white/40 backdrop-blur-md">
        {!collapsed && (
          <div className="p-3.5 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center justify-between text-sm font-mono shadow-sm">
            <div className="flex items-center space-x-2.5">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="font-extrabold text-amber-950 text-sm">12 Days Streak!</span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-300 text-amber-950 font-black shadow-xs">+35 XP</span>
          </div>
        )}

        {!collapsed ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 shadow-sm">
            <div className="flex items-center space-x-3.5 truncate">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shrink-0 shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-sm font-black text-emerald-700">
                  SB
                </div>
              </div>
              <div className="flex flex-col truncate font-mono">
                <span className="font-extrabold text-slate-900 text-sm truncate">{user.name}</span>
                <span className="text-slate-600 text-xs font-semibold truncate">{user.role}</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
                else navigate('/login');
              }}
              className="p-2 text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-sm font-black text-emerald-700">
                SB
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Brain,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Map,
  Bot,
  FileText,
  ShieldCheck,
  Rocket,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sprout
} from 'lucide-react';
import { apiService } from '../services/api';

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  frontDescription: string;
  frontHighlights: string[];
  backTechStack: string[];
  backDetails: string;
  statLabel: string;
  statValue: string;
}

const FEATURE_FLASHCARDS: FeatureCard[] = [
  {
    id: 'twin',
    title: 'Dynamic Knowledge Twin',
    subtitle: 'Real-time Bayesian Skill Graph',
    category: 'Core Engine',
    tag: '78% Benchmark',
    icon: Brain,
    color: 'from-amber-400 to-emerald-500',
    frontDescription:
      'Models your conceptual understanding, coding mastery, and knowledge retention across 50+ AI/ML topics in real-time.',
    frontHighlights: [
      'Automated skill gap detection against industry roles',
      'Dynamic knowledge decay tracking & recall prompts',
      'Continuous calibration from quizzes and projects'
    ],
    backTechStack: ['Bayesian Graph', 'Vector State Tracking', 'Embeddings Radar'],
    backDetails:
      'Constantly compares your mastery against live job market rubrics for AI/ML Engineering, highlighting exact autograd, CUDA, or deployment deficits.',
    statLabel: 'Current Fidelity',
    statValue: '78%'
  },
  {
    id: 'roadmap',
    title: 'Adaptive Multi-Stage Roadmap',
    subtitle: 'From Fundamentals to Production MLOps',
    category: 'Curriculum',
    tag: '10 Stages',
    icon: Map,
    color: 'from-emerald-400 to-teal-500',
    frontDescription:
      'A structured 10-stage technical path covering Python math, PyTorch autograd, Transformers, LLMs, and System Design.',
    frontHighlights: [
      'Dedicated interactive study hubs for each stage',
      'Conceptual notes, key equations & visual architectures',
      'Tailored practice tasks and retention check quizzes'
    ],
    backTechStack: ['Stage-Gated Unlocks', 'Step Study Hubs', 'Interactive Notes'],
    backDetails:
      'Unlocks stages dynamically as you demonstrate proficiency. Study notes contain concise mathematical derivations and runnable code patterns.',
    statLabel: 'Curriculum Depth',
    statValue: '10 Stages'
  },
  {
    id: 'mentor',
    title: '24/7 Context-Aware AI Mentor',
    subtitle: 'Personalized Architectural Tutor',
    category: 'AI Guidance',
    tag: 'Knowledge Grounded',
    icon: Bot,
    color: 'from-blue-500 to-indigo-600',
    frontDescription:
      'An always-accessible AI mentor that grounds its explanations in your specific Knowledge Twin and current gaps.',
    frontHighlights: [
      'Floating global Co-pilot accessible on every page',
      'Custom analogies and code debugging tailored to your level',
      'Instant recommendations for next high-impact study steps'
    ],
    backTechStack: ['Twin-Grounded Prompts', 'Multi-turn Memory', 'Code Copilot'],
    backDetails:
      'Unlike generic chatbots, the AI Mentor knows what you have learned and where you struggle, answering questions with targeted technical depth.',
    statLabel: 'Availability',
    statValue: 'Instant 24/7'
  },
  {
    id: 'rag',
    title: 'Document & Repo RAG Ingestion',
    subtitle: 'Learn from Research Papers & Repos',
    category: 'Knowledge Ingestion',
    tag: 'Vector Search',
    icon: FileText,
    color: 'from-teal-500 to-blue-500',
    frontDescription:
      'Upload ArXiv PDFs, technical documentation, or GitHub repositories to synthesize concepts directly into your Twin.',
    frontHighlights: [
      'Multi-hop retrieval over personal PDF libraries',
      'Automated extraction of key theorems and code snippets',
      'Citation-backed self-assessment question generator'
    ],
    backTechStack: ['Dense Vectors', 'BM25 Hybrid', 'PDF Chunking Engine'],
    backDetails:
      'Turns complex research papers into bite-sized learning checkpoints and automatically correlates external documentation with your roadmap.',
    statLabel: 'Ingestion Formats',
    statValue: 'PDF, MD, Code'
  },
  {
    id: 'interview',
    title: 'Technical Mock Interview Center',
    subtitle: 'STAR Framework AI Assessment',
    category: 'Career Readiness',
    tag: 'Live Scoring',
    icon: ShieldCheck,
    color: 'from-amber-500 to-orange-500',
    frontDescription:
      'Simulate high-stakes technical interviews with live AI evaluation across ML architecture, mathematical rigor, and trade-offs.',
    frontHighlights: [
      'STAR method scoring with immediate actionable feedback',
      'Follow-up probe questions mimicking tier-1 tech interviews',
      'Comprehensive readiness score mapped to hiring bars'
    ],
    backTechStack: ['STAR Rubrics', 'Voice & Text AI', 'Speech Latency Score'],
    backDetails:
      'Provides benchmarked percentiles against candidates aiming for senior and staff ML roles, ensuring you can explain complex architectures under pressure.',
    statLabel: 'Readiness Bar',
    statValue: 'Top 15%'
  },
  {
    id: 'projects',
    title: 'Production Project Generator',
    subtitle: 'Resume-Grade Engineering Blueprints',
    category: 'Portfolio Builder',
    tag: 'Production Ready',
    icon: Rocket,
    color: 'from-emerald-500 to-blue-600',
    frontDescription:
      'Generate end-to-end project blueprints with verified architectures, starter code repositories, and milestone tracking.',
    frontHighlights: [
      'Production Docker, FastAPI, and PyTorch templates',
      'Interview talking points for each architectural design decision',
      'System design diagrams and CI/CD validation hooks'
    ],
    backTechStack: ['Architecture Schemas', 'Starter Repos', 'Resume Bullets'],
    backDetails:
      'Build portfolio projects that impress engineering managers, complete with performance benchmarks, latency numbers, and deployment guides.',
    statLabel: 'Blueprint Types',
    statValue: '8+ Blueprints'
  }
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCard = FEATURE_FLASHCARDS[activeCardIndex];
  const ActiveIcon = activeCard.icon;

  const handleNextCard = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev + 1) % FEATURE_FLASHCARDS.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev - 1 + FEATURE_FLASHCARDS.length) % FEATURE_FLASHCARDS.length);
  };

  const handleSelectCard = (idx: number) => {
    setIsFlipped(false);
    setActiveCardIndex(idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiService.login(email || 'alex.rivera@example.com', password || 'password123');
      localStorage.setItem('token', 'demo_token_jwt_auth');
      navigate('/dashboard');
    } catch (err: any) {
      // Demo fallback: proceed smoothly
      localStorage.setItem('token', 'demo_token_jwt_auth');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await apiService.login('alex.rivera@example.com', 'password123');
    } catch (e) {
      // demo fallback
    }
    localStorage.setItem('token', 'demo_token_google_auth');
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    setEmail('alex.rivera@example.com');
    setPassword('password123');
    localStorage.setItem('token', 'demo_token_quick_auth');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF08A] via-[#A7F3D0] to-[#60A5FA] flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none font-sans">
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-3 border-b border-emerald-300/40">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-400/60 group-hover:scale-105 transition-transform">
            <Sprout className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
          <span className="text-base font-black text-slate-900 tracking-tight">
            GrowSkill <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline text-xs font-semibold text-slate-700">Platform Features & Sign In</span>
          <button
            onClick={handleQuickDemo}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            ⚡ Demo Access
          </button>
        </div>
      </header>

      {/* Main Container: Feature Flashcard (Left) + Login Form (Right) */}
      <main className="max-w-6xl w-full mx-auto my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* LEFT COLUMN: Interactive Feature Flashcard Showcase (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-emerald-300/60 shadow-xl p-5 sm:p-6 space-y-4">
            {/* Flashcard Header & Quick Navigation */}
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Feature Flashcards</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  GrowSkill AI Capabilities
                </h2>
              </div>

              {/* Card Pagination & Flip Button */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500">
                  {activeCardIndex + 1} / {FEATURE_FLASHCARDS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-emerald-300/60"
                  title="Flip flashcard"
                >
                  <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Flashcard 3D Frame */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative min-h-[260px] sm:min-h-[280px] rounded-xl p-5 cursor-pointer transition-all duration-300 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-lg border border-emerald-500/30 hover:border-emerald-400 flex flex-col justify-between group overflow-hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

              {!isFlipped ? (
                /* FRONT OF CARD */
                <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className={`p-2 rounded-lg bg-gradient-to-tr ${activeCard.color} text-white shadow-sm`}>
                          <ActiveIcon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                            {activeCard.category}
                          </span>
                          <h3 className="text-lg font-bold text-white tracking-tight">
                            {activeCard.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                        {activeCard.tag}
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 font-normal leading-relaxed">
                      {activeCard.frontDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1">
                      {activeCard.frontHighlights.map((hl, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="italic">💡 Click card or Flip button to see architecture</span>
                    <span className="text-emerald-300 font-bold">{activeCard.statLabel}: {activeCard.statValue}</span>
                  </div>
                </div>
              ) : (
                /* BACK OF CARD: Deep-Dive Architecture */
                <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg bg-gradient-to-tr ${activeCard.color} text-white shadow-sm`}>
                          <ActiveIcon className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <h3 className="text-base font-bold text-emerald-300">
                          {activeCard.title} — Architecture
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-slate-400">Deep Dive</span>
                    </div>

                    <p className="text-sm text-slate-200 font-normal leading-relaxed">
                      {activeCard.backDetails}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Underlying Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCard.backTechStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white/15 border border-white/20 text-xs text-white font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="italic">🔄 Click to return to overview</span>
                    <span className="text-amber-300 font-bold">Metric: {activeCard.statValue}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Flashcard Selector Pills & Arrows */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Mini Pill Selectors */}
              <div className="flex flex-wrap items-center gap-1.5">
                {FEATURE_FLASHCARDS.map((fc, idx) => (
                  <button
                    key={fc.id}
                    type="button"
                    onClick={() => handleSelectCard(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeCardIndex === idx
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-xs scale-105 ring-1 ring-emerald-400'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {fc.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Next / Prev Controls */}
              <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  aria-label="Previous card"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextCard}
                  aria-label="Next card"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Integrated Sign In Form (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-300/60 shadow-xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Heading */}
              <div className="border-b border-emerald-100 pb-3 mb-4 space-y-1">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Sign in to your account
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  Access your Knowledge Twin and roadmap.
                </p>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-emerald-500 bg-white text-slate-900 font-bold text-sm flex items-center justify-center space-x-2.5 transition-all shadow-2xs hover:bg-slate-50 cursor-pointer mb-3"
              >
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3 text-[11px]">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-2.5 text-slate-400 font-semibold uppercase tracking-wider">
                  or email credentials
                </span>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase block text-xs tracking-wider">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.rivera@example.com"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all text-sm shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 uppercase block text-xs tracking-wider">
                      Password
                    </label>
                    <a href="#forgot" className="text-emerald-700 hover:underline font-bold text-xs">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all text-sm shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all disabled:opacity-50 cursor-pointer mt-1"
                >
                  {isLoading ? <span>Signing in...</span> : <span>Sign In →</span>}
                </button>

                {/* One-Click Quick Demo Access Button */}
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>⚡ One-Click Demo Access</span>
                </button>
              </form>
            </div>

            {/* Footer / Account Link */}
            <div className="pt-2 border-t border-slate-100 text-center space-y-1">
              <div className="text-xs font-medium text-slate-700">
                <span>Don't have an account? </span>
                <Link to="/dashboard" className="text-emerald-700 hover:underline font-bold">
                  Create an account
                </Link>
              </div>
              <p className="text-[10px] text-slate-400">
                Protected by GrowSkill AI Telemetry. Demo sandbox active.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-6xl w-full mx-auto text-center pt-2 text-xs text-slate-600 font-medium border-t border-emerald-200/40">
        © 2026 GrowSkill AI. Personalized Artificial Intelligence & Machine Learning Career Platform.
      </footer>
    </div>
  );
};

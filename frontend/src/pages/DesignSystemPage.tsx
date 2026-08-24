import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Type,
  Layout,
  Layers,
  Sparkles,
  Bot,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Settings,
  Smartphone,
  Network,
  Rocket,
  Map,
  BookOpen,
  HelpCircle,
  Award,
  ArrowRight,
  Sun,
  Moon,
  Bell
} from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [activeFigmaPage, setActiveFigmaPage] = useState<string>('01 — Brand');

  const figmaPages = [
    '01 — Brand',
    '02 — Design Tokens',
    '03 — Components',
    '04 — Landing',
    '05 — Onboarding',
    '06 — Assessment',
    '07 — Knowledge Twin',
    '08 — Dashboard',
    '09 — Learning',
    '10 — AI Mentor',
    '11 — Practice',
    '12 — Projects',
    '13 — Progress',
    '14 — Career Intelligence',
    '15 — Settings',
    '16 — Mobile',
    '17 — Prototype Flow'
  ];

  return (
    <div className="space-y-8 select-none text-slate-900 bg-slate-50 p-4 sm:p-8 rounded-3xl min-h-screen">
      {/* Top Banner Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-blue-400 bg-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-4 py-1.5 rounded-full bg-blue-100 border border-blue-400 text-blue-950 font-mono font-black text-xs">
              FIGMA DESIGN SYSTEM & CORE ARCHITECTURE
            </span>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-amber-200 text-amber-950 font-mono font-black text-xs">
            100% Legible Deep Navy & High Contrast
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          GrowSkill AI <span className="text-blue-600">Design System</span>
        </h1>
        <p className="text-base text-slate-800 font-sans font-semibold leading-relaxed max-w-3xl">
          Learn smarter. Build skills. Grow your career. Complete component tokens, color palette, typography hierarchy, AI component specs, and end-to-end screen navigation flow.
        </p>
      </div>

      {/* 16 Figma Pages Navigation Stepper */}
      <div className="p-4 rounded-3xl bg-white border-2 border-blue-300 shadow-md space-y-3 font-mono text-xs">
        <span className="font-black text-slate-900 uppercase block">FIGMA FILE ORGANIZATION (17 SECTIONS):</span>
        <div className="flex flex-wrap gap-2">
          {figmaPages.map((p) => (
            <button
              key={p}
              onClick={() => setActiveFigmaPage(p)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                activeFigmaPage === p
                  ? 'bg-blue-600 text-white shadow-md font-black scale-105'
                  : 'bg-slate-100 text-slate-900 hover:bg-blue-100 border border-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1 — Brand Foundation */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4">
          <Palette className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-black text-slate-900 font-mono">1. Brand Foundation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-300 space-y-2">
            <span className="text-blue-950 font-black text-base block">Product Name</span>
            <span className="text-slate-900 font-extrabold text-xl">GrowSkill AI</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 col-span-2">
            <span className="text-amber-950 font-black text-base block">Tagline</span>
            <span className="text-slate-900 font-extrabold text-lg font-sans">
              "Learn smarter. Build skills. Grow your career."
            </span>
          </div>
        </div>

        <div className="space-y-2 font-mono text-xs">
          <span className="font-black text-slate-900 uppercase block">Brand Traits:</span>
          <div className="flex flex-wrap gap-2 font-bold text-slate-900">
            {['Intelligent', 'Friendly', 'Personal', 'Modern', 'Trustworthy', 'Career-Focused', 'Encouraging'].map((t) => (
              <span key={t} className="px-3.5 py-1.5 rounded-xl bg-blue-100 border border-blue-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2 — Color System */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4">
          <Palette className="w-7 h-7 text-amber-500" />
          <h2 className="text-2xl font-black text-slate-900">2. Color Tokens (Deep Navy Text for 100% Legibility)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-slate-900">
          <div className="p-5 rounded-2xl bg-blue-600 text-white space-y-2 shadow-md">
            <span className="font-black text-sm block">Primary Blue</span>
            <span className="text-[11px] block font-mono">#2563EB / #3B82F6</span>
            <span className="text-[10px] font-sans block opacity-90">Buttons, Active Tabs, Links</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-300 text-slate-950 space-y-2 shadow-md">
            <span className="font-black text-sm block">Bright Yellow</span>
            <span className="text-[11px] block font-mono">#FEF08A / #FACC15</span>
            <span className="text-[10px] font-sans block opacity-90">Highlights, Badges, AI Cards</span>
          </div>

          <div className="p-5 rounded-2xl bg-sky-100 text-slate-900 border border-sky-300 space-y-2 shadow-md">
            <span className="font-black text-sm block">Soft Blue BG</span>
            <span className="text-[11px] block font-mono">#F0F9FF</span>
            <span className="text-[10px] font-sans block">Hero Sections, Page BG</span>
          </div>

          <div className="p-5 rounded-2xl bg-white text-slate-900 border-2 border-slate-300 space-y-2 shadow-md">
            <span className="font-black text-sm block">Main Surface</span>
            <span className="text-[11px] block font-mono">#FFFFFF White</span>
            <span className="text-[10px] font-sans block">Cards, Sidebars, Modals</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
            <span className="font-black text-sm block">Deep Navy Text</span>
            <span className="text-[11px] block font-mono">#0F172A / #1E293B</span>
            <span className="text-[10px] font-sans block opacity-90">Primary Body Text</span>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Typography */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-sans">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4 font-mono">
          <Type className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-black text-slate-900">3. Typography Hierarchy (Inter & Plus Jakarta Sans)</h2>
        </div>

        <div className="space-y-4 text-slate-900">
          <div>
            <span className="text-xs font-mono font-black text-slate-500 block">DISPLAY (36px Bold)</span>
            <p className="text-3xl font-black text-slate-900">Grow your skills with AI.</p>
          </div>
          <div>
            <span className="text-xs font-mono font-black text-slate-500 block">H1 (28px ExtraBold)</span>
            <p className="text-2xl font-black text-slate-900">Your Learning Dashboard</p>
          </div>
          <div>
            <span className="text-xs font-mono font-black text-slate-500 block">H2 (20px Bold)</span>
            <p className="text-xl font-bold text-slate-900">Recommended for You</p>
          </div>
          <div>
            <span className="text-xs font-mono font-black text-slate-500 block">BODY (14px Medium)</span>
            <p className="text-sm font-medium text-slate-800">Your personalized learning path is adapting to your progress.</p>
          </div>
          <div>
            <span className="text-xs font-mono font-black text-slate-500 block">CAPTION (12px Muted)</span>
            <p className="text-xs font-bold text-slate-600">Updated 5 minutes ago</p>
          </div>
        </div>
      </div>

      {/* SECTION 4 — Buttons & Components */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4">
          <Layout className="w-7 h-7 text-emerald-600" />
          <h2 className="text-2xl font-black text-slate-900">4. Component Token Specs</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-bold">
          <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-black shadow-md">
            Primary: Start Learning →
          </button>
          <button className="px-6 py-3 rounded-2xl bg-white border-2 border-blue-600 text-blue-900 font-black">
            Secondary: View Details
          </button>
          <button className="px-6 py-3 rounded-2xl bg-amber-300 text-slate-950 font-black shadow-md">
            Yellow CTA: Take Assessment →
          </button>
          <button className="px-6 py-3 rounded-2xl bg-transparent text-slate-600 hover:text-slate-900 font-bold">
            Ghost: Skip for now
          </button>
        </div>
      </div>

      {/* SECTION 5 — AI Component Specs */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4">
          <Bot className="w-7 h-7 text-amber-500" />
          <h2 className="text-2xl font-black text-slate-900">5. AI Component Standards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-3 font-sans">
            <span className="font-mono font-black text-amber-950 block text-sm">🤖 AI INSIGHT CARD:</span>
            <p className="text-slate-900 font-bold text-xs">
              "You are strong in Python but need more practice with model deployment."
            </p>
            <span className="font-mono text-xs text-blue-900 font-bold block pt-1">
              Recommended action: Complete MLOps fundamentals module.
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-300 space-y-3 font-sans">
            <span className="font-mono font-black text-blue-950 block text-sm">🤖 AI MENTOR CARD (NOVA):</span>
            <p className="text-slate-900 font-bold text-xs">"Ready for today's learning session?"</p>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-mono font-black text-xs shadow-md">
              Start Session →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 6 — Core Screen Navigation Architecture Flow */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-md space-y-6 font-mono text-xs">
        <div className="flex items-center space-x-3 border-b-2 border-slate-200 pb-4">
          <Layers className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-black text-slate-900">6. Core Screen Navigation Architecture Flow</h2>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-emerald-400 border-2 border-slate-800 overflow-x-auto space-y-2">
          <pre className="whitespace-pre">{`Landing
   ↓
Onboarding
   ↓
Knowledge Assessment
   ↓
Knowledge Twin
   ↓
Learning Dashboard
   ↓
Adaptive Learning Path
   ↓
Topic ──> Lesson ──> Practice ──> Assessment ──> Project ──> Progress ──> Settings`}</pre>
        </div>
      </div>
    </div>
  );
};

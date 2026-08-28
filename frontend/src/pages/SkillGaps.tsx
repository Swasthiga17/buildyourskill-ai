import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, ArrowRight, Brain, AlertTriangle, ShieldCheck, Sprout, TrendingUp, BarChart3 } from 'lucide-react';
import { apiService, SkillGapsResponse, SkillGapItem } from '../services/api';

export const SkillGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const [gapsData, setGapsData] = useState<SkillGapsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGaps() {
      try {
        const data = await apiService.getSkillGaps();
        if (data) setGapsData(data);
      } catch (e) {
        console.warn('Failed to load skill gaps', e);
      } finally {
        setLoading(false);
      }
    }
    loadGaps();
  }, []);

  const fallbackSkills = [
    { name: 'Python', current: 82, target: 85, status: 'Strong', color: 'bg-emerald-500', isCritical: false },
    { name: 'RAG Engineering', current: 78, target: 80, status: 'Strong', color: 'bg-emerald-500', isCritical: false },
    { name: 'LLM Engineering', current: 71, target: 80, status: 'Good', color: 'bg-blue-500', isCritical: false },
    { name: 'Machine Learning', current: 64, target: 80, status: 'Good', color: 'bg-blue-500', isCritical: false },
    { name: 'Deep Learning', current: 42, target: 80, status: 'High Gap', color: 'bg-amber-500', isCritical: true },
    { name: 'AI System Design', current: 35, target: 70, status: 'Medium Gap', color: 'bg-amber-500', isCritical: true },
    { name: 'MLOps', current: 20, target: 75, status: 'Critical Gap', color: 'bg-red-500', isCritical: true }
  ];

  const skillGapsList = gapsData?.priority_gaps?.map((g: SkillGapItem) => ({
    name: g.name,
    current: Math.round(g.current_score),
    target: Math.round(g.required_score),
    status: g.priority === 'critical' ? 'Critical Gap' : (g.priority === 'high' ? 'High Gap' : (g.current_score >= 75 ? 'Strong' : 'Good')),
    color: g.is_critical ? (g.priority === 'critical' ? 'bg-red-500' : 'bg-amber-500') : (g.current_score >= 75 ? 'bg-emerald-500' : 'bg-blue-500'),
    isCritical: g.is_critical
  })) || fallbackSkills;

  const topGap = gapsData?.priority_gaps?.find(g => g.is_critical)?.name || 'MLOps';

  return (
    <div className="space-y-10 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-black tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>GROW SKILL AI GAP ANALYSIS</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          Your <span className="text-gradient-emerald">Skill Gaps</span>
        </h1>
        <p className="text-base text-slate-700 font-sans font-medium max-w-3xl">
          Understand exactly what is holding you back from becoming a production-ready AI/ML Engineer.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-2 font-mono">
          <span className="text-xs text-slate-600 font-bold uppercase block">Knowledge Score</span>
          <span className="text-4xl font-black text-emerald-600 block">
            {gapsData ? `${Math.round(gapsData.overall_readiness)}%` : '72%'}
          </span>
          <span className="text-xs text-slate-600 block">Based on live evidence</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-2 font-mono">
          <span className="text-xs text-slate-600 font-bold uppercase block">Career Readiness</span>
          <span className="text-4xl font-black text-blue-600 block">
            {gapsData ? `${Math.round(gapsData.overall_readiness * 0.95)}%` : '68%'}
          </span>
          <span className="text-xs text-slate-600 block">Target: {gapsData?.target_role || 'AI/ML Engineer'}</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-2 font-mono">
          <span className="text-xs text-slate-600 font-bold uppercase block">Industry Match</span>
          <span className="text-4xl font-black text-amber-600 block">
            {gapsData ? `${Math.round(gapsData.industry_benchmark_match)}%` : '61%'}
          </span>
          <span className="text-xs text-slate-600 block">2026 Industry Benchmark</span>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-400 shadow-md space-y-4">
        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-black">
            🤖 AI TWIN INSIGHT
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-900">
          Focus on <span className="text-gradient-emerald">{topGap}</span> Next
        </h3>

        <p className="text-sm text-slate-700 font-sans leading-relaxed">
          Closing your <strong className="text-amber-600">{topGap}</strong> skill gap with hands-on practice will significantly increase your readiness for production AI/ML roles.
        </p>

        <div className="pt-2">
          <button
            onClick={() => navigate('/roadmap')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-extrabold text-sm inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all"
          >
            <span>Build My Gap-Focused Roadmap →</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Skill Gaps Breakdown Table/List */}
      <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            <span>Target vs Actual Skill Analysis</span>
          </h2>
          <span className="text-xs font-mono text-slate-600 font-bold">{skillGapsList.length} Core Areas Analyzed</span>
        </div>

        <div className="space-y-4 font-mono text-sm">
          {skillGapsList.map((skill, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900 text-base">{skill.name}</span>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-600">Current: {skill.current}%</span>
                  <span className="text-slate-500">Target: {skill.target}%</span>
                  <span className={`px-3 py-1 rounded-full font-black ${
                    skill.isCritical ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {skill.status}
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div className={`${skill.color} h-full rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, skill.current)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

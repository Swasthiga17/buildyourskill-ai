import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { apiService } from '../services/api';

export const KnowledgeTwin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'realtime' | 'calibration' | 'analysis' | 'insights'>('skills');
  const [twinData, setTwinData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTwin = async () => {
      try {
        const data = await apiService.getKnowledgeTwin();
        setTwinData(data);
      } catch (e) {
        console.warn('Using local fallback for twin');
      } finally {
        setIsLoading(false);
      }
    };
    loadTwin();
  }, []);

  const skillsList = [
    { name: 'Python', score: 89, target: 89, gap: 0, confidence: 'High', trend: 'up' },
    { name: 'Machine Learning', score: 77, target: 85, gap: 8, confidence: 'Medium', trend: 'up' },
    { name: 'Deep Learning', score: 68, target: 80, gap: 12, confidence: 'Medium', trend: 'up' },
    { name: 'PyTorch', score: 48, target: 90, gap: 42, confidence: 'Low', trend: 'alert' },
    { name: 'SQL', score: 61, target: 70, gap: 9, confidence: 'Medium', trend: 'up' },
    { name: 'MLOps', score: 50, target: 95, gap: 45, confidence: 'Low', trend: 'alert' },
    { name: 'Model Deployment', score: 70, target: 85, gap: 15, confidence: 'Medium', trend: 'up' },
    { name: 'System Security & SSL', score: 79, target: 90, gap: 11, confidence: 'High', trend: 'up' }
  ];

  return (
    <div className="space-y-6 select-none text-slate-900 font-sans">
      {/* Header with Title & Overall Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Knowledge Twin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-time reflection of your active skills based on evidence and daily learning progress.
          </p>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-[#E8E4D8] shadow-2xs">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" stroke="#F1F5F9" strokeWidth="3" fill="none" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={88}
                  strokeDashoffset={88 * (1 - 0.79)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="absolute text-[11px] font-black text-slate-900">79%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Overall Score</span>
              <span className="text-xs font-bold text-slate-700">Staff AI Track</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card with Tabs & Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4D8] shadow-2xs space-y-6">
        
        {/* Navigation Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4 text-xs font-bold">
          {[
            { id: 'skills', label: 'Skills' },
            { id: 'realtime', label: 'Real-Time' },
            { id: 'calibration', label: 'Calibration' },
            { id: 'analysis', label: 'Analysis' },
            { id: 'insights', label: 'Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                <th className="pb-3 pl-2">Skill</th>
                <th className="pb-3">Your Score</th>
                <th className="pb-3">Target Score</th>
                <th className="pb-3">Gap</th>
                <th className="pb-3">Confidence</th>
                <th className="pb-3 text-right pr-2">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skillsList.map((s) => (
                <tr key={s.name} className="hover:bg-[#FAF8F2] transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                      {s.name.charAt(0)}
                    </div>
                    <span>{s.name}</span>
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 w-8">{s.score}%</span>
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.score >= 75 ? 'bg-emerald-500' : s.score >= 60 ? 'bg-[#2563EB]' : 'bg-amber-500'
                          }`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 font-bold text-slate-600">{s.target}%</td>

                  <td className="py-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        s.gap === 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : s.gap > 30
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {s.gap === 0 ? '0%' : `-${s.gap}%`}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        s.confidence === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.confidence === 'Medium'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {s.confidence}
                    </span>
                  </td>

                  <td className="py-4 text-right pr-2">
                    {s.trend === 'up' ? (
                      <span className="inline-flex items-center text-emerald-600 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-amber-500 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Tip Banner */}
        <div className="p-4 rounded-2xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            ⚡
          </div>
          <p className="text-xs text-purple-950 font-medium">
            <strong>Target Action:</strong> Focus on <strong>PyTorch</strong> and <strong>MLOps</strong> to accelerate your readiness for Staff AI Engineer milestones.
          </p>
        </div>

      </div>
    </div>
  );
};

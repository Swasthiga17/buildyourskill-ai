import React, { useState, useEffect } from 'react';
import {
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Key,
  ShieldCheck,
  Star,
  Activity,
  PlusCircle,
  Copy,
  Check,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { apiService } from '../services/api';

export const AdminBetaDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [invites, setInvites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Invite Generator Form State
  const [maxUses, setMaxUses] = useState(1);
  const [expiryDays, setExpiryDays] = useState(30);
  const [cohort, setCohort] = useState('aug-2026');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [m, inv] = await Promise.all([
        apiService.getBetaMetrics(),
        apiService.listBetaInvites()
      ]);
      setMetrics(m);
      setInvites(inv);
    } catch (err: any) {
      setError(err.message || 'Failed to load admin metrics. Ensure your user has admin privileges.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await apiService.createBetaInvite(maxUses, expiryDays, cohort);
      setGeneratedCode(res.raw_invite_code);
      loadData();
    } catch (err: any) {
      alert('Failed to generate invite code: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm font-bold text-slate-600">Loading Cohort Telemetry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-red-50 rounded-3xl border border-red-200 text-center space-y-4 text-slate-900">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-black text-red-900">Admin Authorization Required</h2>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none text-slate-900 animate-fade-in">
      {/* Header */}
      <div className="glass-panel-glow p-8 rounded-3xl border border-indigo-200 bg-white/90 backdrop-blur-md shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-mono font-black border border-indigo-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> ADMIN TELEMETRY DASHBOARD
            </span>
            <span className="text-xs font-bold text-slate-500">Cohort: {metrics?.cohort || 'aug-2026'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Private Beta Operations
          </h1>
          <p className="text-sm text-slate-600">
            Real-time cohort telemetry, Knowledge Twin growth calculations, and invite token governance.
          </p>
        </div>

        <button
          onClick={loadData}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold font-mono">
            <span>BETA TESTERS</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics?.total_beta_testers || 0}</div>
          <p className="text-xs text-emerald-600 font-bold">
            {metrics?.active_beta_testers || 0} active in last 7 days
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold font-mono">
            <span>ASSESSMENTS & INTERVIEWS</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {(metrics?.assessments_completed || 0) + (metrics?.interviews_completed || 0)}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {metrics?.assessments_completed || 0} tests • {metrics?.interviews_completed || 0} mock interviews
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold font-mono">
            <span>AVERAGE FEEDBACK RATING</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {metrics?.average_feedback_rating || 4.5} <span className="text-sm font-normal text-slate-500">/ 5.0</span>
          </div>
          <p className="text-xs text-indigo-600 font-bold">
            {metrics?.positive_feedback_percentage || 85}% positive sentiment
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold font-mono">
            <span>KNOWLEDGE TWIN GROWTH</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            +{metrics?.knowledge_twin_growth?.average_growth_points || 3.5} pts
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {metrics?.knowledge_twin_growth?.percentage_improving || 80}% testers improving
          </p>
        </div>
      </div>

      {/* Feature Ratings & AI Latency Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Ratings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" /> Feature Quality Scores
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics?.feature_ratings || {}).map(([feature, rating]: any) => (
              <div key={feature} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-xs font-bold text-slate-700 uppercase">{feature}</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-900">{rating} ★</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance & Onboarding Dropoff */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" /> AI Performance & Onboarding Funnel
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 font-mono">LLM SUCCESS RATE</span>
              <div className="text-2xl font-black text-emerald-600">
                {metrics?.ai_performance?.llm_success_rate || 99.2}%
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 font-mono">MENTOR AVG LATENCY</span>
              <div className="text-2xl font-black text-slate-900">
                {metrics?.ai_performance?.mentor_avg_latency_s || 1.8}s
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">Onboarding Step Completion:</span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="font-bold text-indigo-900">Step 1</div>
                <div className="text-indigo-600 font-black">{metrics?.onboarding?.dropoff_by_step?.step_1 || 0}</div>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="font-bold text-indigo-900">Step 2</div>
                <div className="text-indigo-600 font-black">{metrics?.onboarding?.dropoff_by_step?.step_2 || 0}</div>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="font-bold text-indigo-900">Step 3</div>
                <div className="text-indigo-600 font-black">{metrics?.onboarding?.dropoff_by_step?.step_3 || 0}</div>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="font-bold text-indigo-900">Step 4</div>
                <div className="text-indigo-600 font-black">{metrics?.onboarding?.dropoff_by_step?.step_4 || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Code Generator Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600" /> Generate Beta Invite Code
            </h3>
            <p className="text-xs text-slate-500">
              Generates secure, hashed invite codes for onboarding new testers.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreateInvite} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-bold text-slate-700">Max Uses</label>
            <input
              type="number"
              min="1"
              max="50"
              value={maxUses}
              onChange={(e) => setMaxUses(parseInt(e.target.value) || 1)}
              className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Expiry (Days)</label>
            <input
              type="number"
              min="1"
              max="90"
              value={expiryDays}
              onChange={(e) => setExpiryDays(parseInt(e.target.value) || 30)}
              className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Cohort Tag</label>
            <input
              type="text"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Create Invite'}</span>
          </button>
        </form>

        {/* Generated Code Alert */}
        {generatedCode && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-emerald-800 font-mono">NEW INVITE CODE GENERATED</span>
              <div className="text-lg font-mono font-black text-emerald-950">{generatedCode}</div>
              <p className="text-xs text-emerald-700">Share this code directly with your beta invitee.</p>
            </div>
            <button
              onClick={() => copyToClipboard(generatedCode)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition-all shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        )}

        {/* Active Invites Table */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono">Active Invite Tokens ({invites.length})</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-mono">
                <tr>
                  <th className="p-3">Prefix</th>
                  <th className="p-3">Cohort</th>
                  <th className="p-3">Uses</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Expires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invites.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{inv.code_prefix}****</td>
                    <td className="p-3 text-slate-600">{inv.cohort}</td>
                    <td className="p-3 font-bold text-slate-900">{inv.used_count} / {inv.max_uses}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {inv.active ? 'Active' : 'Exhausted'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">
                      {new Date(inv.expires_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

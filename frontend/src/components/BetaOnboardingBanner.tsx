import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, X, Compass, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

export const BetaOnboardingBanner: React.FC = () => {
  const navigate = useNavigate();
  const [betaInfo, setBetaInfo] = useState<any>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const loadStatus = async () => {
    try {
      const status = await apiService.getBetaStatus();
      setBetaInfo(status);
      if (status.is_beta_user && !status.onboarding_completed) {
        const guide = await apiService.getOnboardingGuide();
        setOnboardingData(guide);
      }
    } catch (e) {
      console.warn('Beta onboarding load error', e);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (!betaInfo?.is_beta_user || betaInfo?.onboarding_completed || isDismissed || !onboardingData) {
    return null;
  }

  const completedCount = onboardingData.completed_steps?.length || 0;
  const progressPercent = Math.round((completedCount / 4) * 100);

  const handleCompleteStep = async (stepNum: number, url: string) => {
    try {
      await apiService.completeOnboardingStep(stepNum);
      navigate(url);
      loadStatus();
    } catch (e) {
      navigate(url);
    }
  };

  const handleSkipAll = async () => {
    try {
      await apiService.completeOnboardingStep(4, true);
      setIsDismissed(true);
    } catch (e) {
      setIsDismissed(true);
    }
  };

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 border border-indigo-800/40 shadow-xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> PRIVATE BETA PILOT
            </span>
            <span className="text-xs text-indigo-300 font-medium">Cohort: {betaInfo.cohort || 'aug-2026'}</span>
          </div>
          <h3 className="text-lg font-black text-white">
            Welcome to BuildYourSkill AI! Let's build your AI Knowledge Twin.
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            Complete the 4-step diagnostic checklist to calibrate your personalized curriculum, AI Mentor grounding, and mock interview readiness.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isExpanded ? 'Hide Checklist' : `Continue Checklist (${progressPercent}%)`}</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Checklist Details */}
      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-slate-800 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-indigo-200">
              <span>Onboarding Progress</span>
              <span>{completedCount} of 4 steps completed</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-indigo-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {onboardingData.steps?.map((st: any) => {
              const isDone = st.completed;
              return (
                <div
                  key={st.step}
                  onClick={() => handleCompleteStep(st.step, st.action_url)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? 'bg-slate-800/40 border-emerald-500/30 opacity-75'
                      : 'bg-slate-800/90 border-indigo-600/50 hover:border-indigo-400 hover:scale-[1.01]'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-200">
                        {st.step}
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {st.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-indigo-300" />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{st.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSkipAll}
              className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
            >
              Skip onboarding and explore freely
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

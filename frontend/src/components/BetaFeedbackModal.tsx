import React, { useState } from 'react';
import { MessageSquarePlus, Star, Send, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { apiService } from '../services/api';

export const BetaFeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<'mentor' | 'interview' | 'project' | 'assessment' | 'platform' | 'bug'>('mentor');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiService.submitFeedback(category, rating, comment.trim());
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setComment('');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-emerald-300"
        title="Report AI accuracy or submit beta feedback"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span>Beta Feedback</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-slate-900 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                PRIVATE BETA PILOT
              </span>
              <h2 className="text-2xl font-black text-slate-900">Share Your Experience</h2>
              <p className="text-sm text-slate-600">
                Help us refine our AI reasoning models, Knowledge Twin accuracy, and learning roadmaps.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Thank You!</h3>
                <p className="text-sm text-emerald-700">Your feedback has been logged to the engineering telemetry stream.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Category Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Feature Area</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="mentor">AI Mentor & Architecture Explanations</option>
                    <option value="interview">Mock Interview & Answer Rubric</option>
                    <option value="project">Project Generator Quality</option>
                    <option value="assessment">Diagnostic Assessments & Quiz</option>
                    <option value="platform">Platform Performance & UX</option>
                    <option value="bug">Report an AI Hallucination / Bug</option>
                  </select>
                </div>

                {/* Rating Stars */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">{rating} / 5</span>
                  </div>
                </div>

                {/* Comment Text Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Feedback & AI Evaluation</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what was insightful, what was missing, or how the AI can improve..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    required
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Feedback'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

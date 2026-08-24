import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Settings,
  User,
  Target,
  BookOpen,
  Zap,
  Bot,
  Bell,
  Network,
  ShieldCheck,
  Share2,
  Lock,
  CheckCircle2,
  Save,
  Download,
  Trash2,
  Sparkles,
  Flame,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';
import { apiService } from '../services/api';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'preferences' | 'style' | 'difficulty' | 'mentor' | 'notifications' | 'twin' | 'privacy' | 'integrations' | 'account'
  >('profile');

  // Profile & Preferences State
  const [targetRole, setTargetRole] = useState('AI/ML Engineer');
  const [learningGoal, setLearningGoal] = useState('Get a job');
  const [currentLevel, setCurrentLevel] = useState('Intermediate');
  const [dailyTime, setDailyTime] = useState('2 hrs');

  // Learning Style State
  const [selectedStyle, setSelectedStyle] = useState('Hands-on + Visual');

  // Difficulty & Adaptive State
  const [difficultyMode, setDifficultyMode] = useState('Balanced');
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(true);

  // AI Mentor Nova State
  const [mentorName, setMentorName] = useState('Nova');
  const [mentorPersonality, setMentorPersonality] = useState('Friendly');
  const [teachingStyle, setTeachingStyle] = useState('Coach');
  const [proactiveMentor, setProactiveMentor] = useState(true);
  const [mentorBehaviors, setMentorBehaviors] = useState({
    explainDifficult: true,
    giveHints: true,
    trackWeak: true,
    suggestNext: true,
    encourageStreak: true,
    directAnswers: false
  });

  // Notifications State
  const [reminderTime, setReminderTime] = useState('7:00 PM');
  const [notifFrequency, setNotifFrequency] = useState('Smart');
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    recommendedLesson: true,
    assessmentReminder: true,
    projectMilestone: true,
    weeklyReport: true,
    mentorSuggestions: true,
    careerOpps: false
  });

  // Knowledge Twin State
  const [twinAutoUpdate, setTwinAutoUpdate] = useState(true);
  const [twinDataSources, setTwinDataSources] = useState({
    courses: true,
    assessments: true,
    projects: true,
    coding: true,
    activity: true,
    mentorConversations: true
  });

  // Privacy State
  const [personalization, setPersonalization] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('Private');

  // Integrations State
  const [githubConnected, setGithubConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(true);

  // Save Success State Banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSaveAll = () => {
    setShowSuccessBanner(true);
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 select-none text-slate-900">
      {/* Header Banner */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-600" />
              <span>PERSONALIZATION CONTROL CENTER</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Settings & <span className="text-gradient-emerald">Personalization</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium max-w-2xl">
            Make GrowSkill AI work the way you learn. Customize your learning goals, AI mentor, notifications, privacy, Knowledge Twin, and connected services.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-2 shadow-md hover:scale-105 transition-all shrink-0 font-mono"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Success Banner Notification */}
      {showSuccessBanner && (
        <div className="p-6 rounded-3xl bg-emerald-600 text-white font-mono text-xs space-y-3 shadow-xl animate-bounce">
          <div className="flex items-center space-x-2 font-black text-sm">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Your learning experience has been updated! 🎉</span>
          </div>
          <p className="font-sans text-xs">
            GrowSkill AI will now personalize your Learning Path $\rightarrow$ Lessons $\rightarrow$ Difficulty $\rightarrow$ AI Mentor Nova $\rightarrow$ Projects $\rightarrow$ Assessments $\rightarrow$ Career Recommendations.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-black text-xs inline-flex items-center space-x-1.5 shadow-md"
          >
            <span>Go to Learning Dashboard →</span>
          </button>
        </div>
      )}

      {/* Settings Sub-Navigation Stepper Sidebar */}
      <div className="grid grid-cols-5 sm:grid-cols-10 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-300 font-mono text-[11px] font-bold shadow-sm">
        {[
          { id: 'profile', label: '👤 Profile' },
          { id: 'preferences', label: '🎯 Target' },
          { id: 'style', label: '📚 Style' },
          { id: 'difficulty', label: '⚡ Difficulty' },
          { id: 'mentor', label: '🤖 Mentor' },
          { id: 'notifications', label: '🔔 Alerts' },
          { id: 'twin', label: '🧠 Twin' },
          { id: 'privacy', label: '🔒 Privacy' },
          { id: 'integrations', label: '🔗 Tools' },
          { id: 'account', label: '⚙️ Account' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id as any)}
            className={`py-3 rounded-xl flex items-center justify-center transition-all ${
              activeTab === s.id ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md font-black' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1 — Quick Profile Card */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Quick Profile Overview</h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block">Target Role</span>
              <span className="text-sm font-black text-emerald-700">{targetRole}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block">Learning Goal</span>
              <span className="text-sm font-black text-blue-600">Become job-ready</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block">Current Level</span>
              <span className="text-sm font-black text-amber-600">{currentLevel}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block">Daily Learning Time</span>
              <span className="text-sm font-black text-purple-600">{dailyTime}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold block">Learning Style</span>
              <span className="text-sm font-black text-emerald-800">{selectedStyle}</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2 — Learning Preferences */}
      {activeTab === 'preferences' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Learning Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Target Role:</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none"
              >
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="GenAI Engineer">GenAI Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Learning Goal:</label>
              <select
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none"
              >
                <option value="Get a job">Get a job</option>
                <option value="Switch career">Switch career</option>
                <option value="Improve current skills">Improve current skills</option>
                <option value="Build projects">Build projects</option>
                <option value="Prepare for interviews">Prepare for interviews</option>
                <option value="Master a technology">Master a technology</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Current Proficiency Level:</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Elementary">Elementary</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Daily Learning Commitment:</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['30 min', '1 hr', '2 hrs', '3 hrs', '4+ hrs'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDailyTime(t)}
                    className={`px-4 py-2.5 rounded-xl font-bold transition-all ${
                      dailyTime === t ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3 — Learning Style */}
      {activeTab === 'style' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">How Do You Learn Best?</h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { id: 'Visual', icon: '🎥', label: 'Visual', desc: 'Videos, diagrams' },
              { id: 'Hands-on + Visual', icon: '🛠', label: 'Hands-on', desc: 'Coding, projects' },
              { id: 'Reading', icon: '📖', label: 'Reading', desc: 'Articles, docs' },
              { id: 'Audio', icon: '🎧', label: 'Audio', desc: 'Voice explanations' },
              { id: 'Problem Solving', icon: '🧩', label: 'Problem Solving', desc: 'Quizzes & challenges' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStyle(st.id)}
                className={`p-5 rounded-2xl border text-center space-y-2 transition-all ${
                  selectedStyle === st.id ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-2xl block">{st.icon}</span>
                <span className="font-bold block text-xs">{st.label}</span>
                <span className="text-[10px] text-slate-600 font-sans block">{st.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4 — Difficulty & Adaptive */}
      {activeTab === 'difficulty' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Choose Your Challenge Level</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setDifficultyMode('Easy')}
              className={`p-6 rounded-2xl border text-left space-y-2 ${
                difficultyMode === 'Easy' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-base font-extrabold block">Easy</span>
              <span className="text-xs font-sans text-slate-600">Build confidence and strengthen fundamentals.</span>
            </button>

            <button
              onClick={() => setDifficultyMode('Balanced')}
              className={`p-6 rounded-2xl border text-left space-y-2 ${
                difficultyMode === 'Balanced' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-base font-extrabold block">Balanced</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-black text-[9px]">⭐ Recommended</span>
              </div>
              <span className="text-xs font-sans text-slate-600">Gradually increase difficulty based on performance.</span>
            </button>

            <button
              onClick={() => setDifficultyMode('Challenging')}
              className={`p-6 rounded-2xl border text-left space-y-2 ${
                difficultyMode === 'Challenging' ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-base font-extrabold block">Challenging</span>
              <span className="text-xs font-sans text-slate-600">Push your limits with advanced problems.</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between font-bold">
            <div>
              <span className="text-sm text-slate-900 block">Adaptive Difficulty Engine (ON)</span>
              <span className="text-slate-600 font-sans text-xs">Automatically adjusts difficulty based on assessment results & mistakes</span>
            </div>
            <input
              type="checkbox"
              checked={adaptiveDifficulty}
              onChange={(e) => setAdaptiveDifficulty(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* SECTION 5 — AI Mentor Nova */}
      {activeTab === 'mentor' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-3xl font-black text-slate-900">Your AI Mentor (Nova)</h2>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">Persistent Co-Pilot</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Mentor Name:</label>
              <input
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Personality:</label>
              <select
                value={mentorPersonality}
                onChange={(e) => setMentorPersonality(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 focus:outline-none"
              >
                <option value="Friendly">Friendly</option>
                <option value="Professional">Professional</option>
                <option value="Motivational">Motivational</option>
                <option value="Direct">Direct</option>
                <option value="Socratic">Socratic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase block">Teaching Style:</label>
              <select
                value={teachingStyle}
                onChange={(e) => setTeachingStyle(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 font-bold text-slate-900 focus:outline-none"
              >
                <option value="Coach">Coach</option>
                <option value="Teacher">Teacher</option>
                <option value="Interviewer">Interviewer</option>
                <option value="Pair Programmer">Pair Programmer</option>
                <option value="Career Advisor">Career Advisor</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="font-bold text-slate-900 uppercase block">Mentor Behavior Preferences:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'explainDifficult', label: '☑ Explain difficult concepts' },
                { key: 'giveHints', label: '☑ Give hints before answers' },
                { key: 'trackWeak', label: '☑ Track weak areas' },
                { key: 'suggestNext', label: '☑ Suggest what to learn next' },
                { key: 'encourageStreak', label: '☑ Encourage consistent learning' },
                { key: 'directAnswers', label: '☐ Give direct answers immediately' }
              ].map((b) => (
                <div key={b.key} className="p-3.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800">
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6 — Notifications */}
      {activeTab === 'notifications' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Notifications & Reminders</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold">
              <span>Daily Reminder Time</span>
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="p-2 rounded-xl bg-slate-100 font-bold text-slate-900"
              >
                <option value="8:00 AM">8:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold">
              <span>Notification Frequency</span>
              <select
                value={notifFrequency}
                onChange={(e) => setNotifFrequency(e.target.value)}
                className="p-2 rounded-xl bg-slate-100 font-bold text-slate-900"
              >
                <option value="Smart">Smart (AI Activity Based)</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7 — Knowledge Twin Settings */}
      {activeTab === 'twin' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-3xl font-black text-slate-900">Your Knowledge Twin Settings</h2>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">🟢 Up to date</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">Skills Tracked: 42</div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">Activities: 186</div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">Assessments: 24</div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">Projects: 6</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between font-bold">
            <div>
              <span className="text-sm text-slate-900 block">Automatic Knowledge Twin Updates (ON)</span>
              <span className="text-slate-600 font-sans text-xs">Updates skill levels when you complete lessons, projects, or quizzes</span>
            </div>
            <input
              type="checkbox"
              checked={twinAutoUpdate}
              onChange={(e) => setTwinAutoUpdate(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* SECTION 8 — Privacy & Data */}
      {activeTab === 'privacy' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Privacy & Data Controls</h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span>Profile Visibility</span>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="p-2 rounded-xl bg-slate-100 text-slate-900 font-bold"
              >
                <option value="Private">Private</option>
                <option value="Recruiters only">Recruiters only</option>
                <option value="Public">Public</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="px-5 py-3 rounded-xl bg-slate-900 text-white font-bold inline-flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download My Data (.json)</span>
              </button>
              <button className="px-5 py-3 rounded-xl bg-red-100 text-red-900 font-bold">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9 — Integrations */}
      {activeTab === 'integrations' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Connected Tools & Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold">
              <span>GitHub Repositories</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black">Connected ✓</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center font-bold">
              <span>YouTube Educational Videos</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black">Connected ✓</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10 — Account Settings */}
      {activeTab === 'account' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-300 shadow-md space-y-8 bg-white/90 backdrop-blur-md font-mono text-xs">
          <h2 className="text-3xl font-black text-slate-900">Account & Security</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold text-slate-800">
            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <span className="text-slate-500 block font-normal">Name</span>
              <span className="text-sm font-black text-slate-900">Swasthi B S</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <span className="text-slate-500 block font-normal">Role</span>
              <span className="text-sm font-black text-emerald-700">AI/ML Learner</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

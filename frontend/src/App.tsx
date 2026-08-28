import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';
import { AppLayout } from './components/AppLayout';
import { BetaFeedbackModal } from './components/BetaFeedbackModal';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { MainDashboard } from './pages/MainDashboard';
import { KnowledgeTwin } from './pages/KnowledgeTwin';
import { ImportKnowledge } from './pages/ImportKnowledge';
import { TodayPlan } from './pages/TodayPlan';
import { ProjectGenerator } from './pages/ProjectGenerator';
import { MentorChat } from './pages/MentorChat';
import { InterviewReadiness } from './pages/InterviewReadiness';
import { CareerDashboard } from './pages/CareerDashboard';
import { AssessmentsCenter } from './pages/AssessmentsCenter';
import { ProgressAnalytics } from './pages/ProgressAnalytics';
import { LearnFromAnythingPage } from './pages/LearnFromAnythingPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminBetaDashboard } from './pages/AdminBetaDashboard';

// Multi-Page Roadmap & Dedicated Study Folder Imports
import { RoadmapHome } from './pages/roadmap/RoadmapHome';
import { StagePythonPage } from './pages/roadmap/StagePythonPage';
import { StageMathPage } from './pages/roadmap/StageMathPage';
import { StageMLPage } from './pages/roadmap/StageMLPage';
import { StageDLPage } from './pages/roadmap/StageDLPage';
import { StageNLPCVPage } from './pages/roadmap/StageNLPCVPage';
import { StageTransformersPage } from './pages/roadmap/StageTransformersPage';
import { StageLLMPage } from './pages/roadmap/StageLLMPage';
import { StageRAGPage } from './pages/roadmap/StageRAGPage';
import { StageAgentsPage } from './pages/roadmap/StageAgentsPage';
import { StageMLOpsPage } from './pages/roadmap/StageMLOpsPage';
import { StageSystemDesignPage } from './pages/roadmap/StageSystemDesignPage';

// Dedicated Study Hub & Notes Routes
import { StudyHub } from './pages/study/StudyHub';
import { StageNotesView } from './pages/study/StageNotesView';

export const AppContent: React.FC<{ onTriggerSplash: () => void }> = ({ onTriggerSplash }) => {
  const navigate = useNavigate();

  return (
    <AppLayout
      onTriggerSplash={onTriggerSplash}
      onOpenAuth={() => navigate('/login')}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/knowledge-twin" element={<KnowledgeTwin />} />
        <Route path="/import-knowledge" element={<ImportKnowledge />} />
        <Route path="/learn-anything" element={<LearnFromAnythingPage />} />
        
        {/* Multi-Page Roadmap Routes */}
        <Route path="/roadmap" element={<RoadmapHome />} />
        <Route path="/roadmap/python" element={<StagePythonPage />} />
        <Route path="/roadmap/math" element={<StageMathPage />} />
        <Route path="/roadmap/ml" element={<StageMLPage />} />
        <Route path="/roadmap/dl" element={<StageDLPage />} />
        <Route path="/roadmap/nlp-cv" element={<StageNLPCVPage />} />
        <Route path="/roadmap/transformers" element={<StageTransformersPage />} />
        <Route path="/roadmap/llms" element={<StageLLMPage />} />
        <Route path="/roadmap/rag" element={<StageRAGPage />} />
        <Route path="/roadmap/agents" element={<StageAgentsPage />} />
        <Route path="/roadmap/mlops" element={<StageMLOpsPage />} />
        <Route path="/roadmap/system-design" element={<StageSystemDesignPage />} />

        {/* Dedicated Step-by-Step Study & Notes Routes */}
        <Route path="/study" element={<StudyHub />} />
        <Route path="/study/:stageId" element={<StageNotesView />} />

        <Route path="/today-plan" element={<TodayPlan />} />
        <Route path="/projects" element={<ProjectGenerator />} />
        <Route path="/mentor" element={<MentorChat />} />
        <Route path="/assessments" element={<AssessmentsCenter />} />
        <Route path="/progress" element={<ProgressAnalytics />} />
        <Route path="/interview" element={<InterviewReadiness />} />
        <Route path="/career" element={<CareerDashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminBetaDashboard />} />
      </Routes>
      <BetaFeedbackModal />
    </AppLayout>
  );
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <AppContent onTriggerSplash={() => setShowSplash(true)} />
      )}
    </Router>
  );
};

export default App;

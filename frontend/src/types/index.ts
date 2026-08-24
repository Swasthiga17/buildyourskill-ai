export type SkillStatus = 'learned' | 'learning' | 'weak' | 'missing' | 'recommended';

export type SkillCategory = 'programming' | 'math' | 'ml' | 'dl' | 'genai' | 'ai_eng' | 'mlops' | 'system_design';

export interface EvidenceItem {
  id: string;
  type: 'github' | 'upload' | 'quiz' | 'project';
  title: string;
  detail: string;
  confidence: 'high' | 'medium' | 'low';
  date: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  currentScore: number;
  requiredScore: number;
  description: string;
  prerequisites: string[];
  resources: { title: string; url: string; type: string }[];
  practiceTask: string;
  projectIdea: string;
  evidence: EvidenceItem[];
}

export interface RoadmapPhase {
  id: number;
  phaseNumber: number;
  stageCode: string;
  title: string;
  category: string;
  duration: string;
  readiness: number;
  status: 'completed' | 'in_progress' | 'upcoming' | 'skipped';
  icon: string;
  skills: string[];
  tools: string[];
  learnTopics: string[];
  description: string;
  objectives: string[];
  practice: string;
  project: string;
  projectLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';
  masteryTest: string;
  interviewQuestions?: string[];
  illustrationUrl?: string;
  personaStatuses?: {
    userA: 'skipped' | 'in_progress' | 'upcoming' | 'completed'; // Full Stack Dev
    userB: 'skipped' | 'in_progress' | 'upcoming' | 'completed'; // Data Analyst
    userC: 'skipped' | 'in_progress' | 'upcoming' | 'completed'; // ML Practitioner
    alex: 'completed' | 'in_progress' | 'upcoming' | 'skipped'; // Active User
  };
}

export interface RecallQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyPlan {
  durationMinutes: number;
  learn: {
    title: string;
    duration: string;
    content: string;
  };
  practice: {
    title: string;
    duration: string;
    prompt: string;
  };
  build: {
    title: string;
    duration: string;
    task: string;
  };
  recall: {
    title: string;
    duration: string;
    questions: RecallQuestion[];
  };
  whyReason: string;
}

export interface UserTwinProfile {
  name: string;
  role: string;
  targetRole: string;
  knowledgeScore: number;
  readinessScore: number;
  streakDays: number;
  totalHours: number;
  projectsCount: number;
  domainScores: {
    Programming: number;
    Mathematics: number;
    MachineLearning: number;
    DeepLearning: number;
    GenerativeAI: number;
    AIEngineering: number;
    MLOps: number;
    SystemDesign: number;
  };
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  level: number;
  problemStatement: string;
  whyProject: string;
  skillsLearned: string[];
  techStack: string[];
  milestones: string[];
  duration: string;
  portfolioValue: string;
  interviewQuestions: string[];
}

export interface MockQuestion {
  id: string;
  category: string;
  type: 'mcq' | 'concept' | 'coding' | 'system_design';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  sampleAnswer?: string;
  explanation: string;
}

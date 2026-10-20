const envApiUrl = (import.meta as any).env?.VITE_API_BASE_URL;
const API_BASE_URL = envApiUrl !== undefined ? envApiUrl : (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:8000' : '');

export interface UserTwinProfile {
  name: string;
  role: string;
  targetRole: string;
  knowledgeScore: number;
  readinessScore: number;
  streakDays: number;
  totalHours: number;
  domainScores: Record<string, number>;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  status: 'learned' | 'learning' | 'locked' | 'review' | 'mastered' | 'in_progress';
  currentScore: number;
  requiredScore: number;
  confidence?: number;
  description: string;
  prerequisites: string[];
  resources?: Array<{ title: string; url: string; type: string }>;
  practiceTask?: string;
  projectIdea?: string;
  evidence: Array<{
    id: string | number;
    type: 'quiz' | 'github' | 'project' | 'assessment' | 'interview' | 'document';
    title: string;
    detail: string;
    confidence: 'low' | 'medium' | 'high';
    date?: string;
    created_at?: string;
  }>;
}

export interface SkillGapItem {
  skill_code: string;
  name: string;
  category: string;
  current_score: number;
  required_score: number;
  gap: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  importance_weight: number;
  confidence: number;
  is_critical: boolean;
  recommended_action: string;
  estimated_hours_to_close: number;
}

export interface SkillGapsResponse {
  target_role: string;
  overall_readiness: number;
  total_gaps: number;
  critical_gaps_count: number;
  priority_gaps: SkillGapItem[];
  industry_benchmark_match: number;
}

export interface RoadmapStep {
  id: number;
  stage_code: string;
  stage_number: number;
  title: string;
  icon?: string;
  description?: string;
  estimated_hours: number;
  progress: number;
  status: 'locked' | 'unlocked' | 'active' | 'completed' | 'skipped';
  prerequisites: string[];
  topics: Array<{
    id: number;
    name: string;
    difficulty: string;
    completed: boolean;
    score: number;
  }>;
}

export interface RoadmapResponse {
  roadmap_id: number;
  target_role: string;
  overall_progress: number;
  knowledge_score: number;
  completed_stages_count: number;
  active_stage?: string;
  recommendation: string;
  steps: RoadmapStep[];
}

export interface MentorChatResponse {
  conversation_id: number;
  reply: string;
  code_example?: string;
  diagram?: string;
  suggested_actions: string[];
  knowledge_gap_highlighted?: string;
}

export interface ProjectBlueprint {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  target_role: string;
  problem_statement: string;
  objective: string;
  architecture: string;
  tech_stack: string[];
  milestones: Array<{ phase: string; desc: string }>;
  starter_code?: string;
  evaluation_criteria: string[];
  interview_talking_points: string[];
  created_at: string;
}

export interface InterviewEvaluationResponse {
  overall_score: number;
  depth_score: number;
  accuracy_score: number;
  clarity_score: number;
  feedback: string;
  missing_concepts: string[];
  strengths: string[];
  updated_knowledge_score: number;
}

// Token helper
const TOKEN_KEY = 'growskill_auth_token';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const apiService = {
  // --- AUTH ---
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async register(email: string, full_name: string, password: string, target_role = 'AI/ML Engineer'): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, full_name, password, target_role })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    if (data.access_token) this.setToken(data.access_token);
    return data;
  },

  async login(email: string, password: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    if (data.access_token) this.setToken(data.access_token);
    return data;
  },

  async getMe(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return null;
    return await res.json();
  },

  // --- KNOWLEDGE TWIN ---
  async getKnowledgeTwin(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/knowledge-twin/`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Knowledge Twin API unavailable, using fallback', e);
    }
    return null;
  },

  async addEvidence(skill_code: string, evidence_type: string, title: string, detail: string, score: number): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/knowledge-twin/evidence`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ skill_code, evidence_type, title, detail, score })
    });
    return await res.json();
  },

  // --- SKILL GAPS ---
  async getSkillGaps(target_role?: string): Promise<SkillGapsResponse | null> {
    try {
      const url = target_role
        ? `${API_BASE_URL}/api/skill-gaps/?target_role=${encodeURIComponent(target_role)}`
        : `${API_BASE_URL}/api/skill-gaps/`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Skill gaps API unavailable', e);
    }
    return null;
  },

  // --- ROADMAP ---
  async getRoadmap(): Promise<RoadmapResponse | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/roadmap/`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Roadmap API unavailable', e);
    }
    return null;
  },

  async getRoadmapSummary(): Promise<any> {
    const rm = await this.getRoadmap();
    if (rm) {
      return {
        overall_progress: rm.overall_progress,
        knowledge_score: rm.knowledge_score,
        completed_stages_count: rm.completed_stages_count,
        recommendation: rm.recommendation
      };
    }
    return {
      overall_progress: 32.0,
      knowledge_score: 72.0,
      completed_stages_count: 4,
      recommendation: 'Based on your 80% Python score, focus today on FastAPI API integration and PyTorch Tensors.'
    };
  },

  async personalizeRoadmap(profileSkills: Record<string, number>, targetRole = 'AI/ML Engineer'): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/roadmap/personalize`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ target_role: targetRole, existing_skills: profileSkills })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Personalize roadmap error', e);
    }
    return {
      python_skipped: true,
      active_focus: '03 Machine Learning & PyTorch',
      recommendation: 'Mastered Python (85%). Skipped Stage 01 and unlocked Core Machine Learning!',
      unlocked_stage_ids: [1, 2, 3],
      completed_stage_ids: [1]
    };
  },

  async saveProgress(stageId: string, topicName: string, score: number): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/roadmap/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stage_id: stageId, topic_name: topicName, score })
    });
    return await res.json();
  },

  async submitAssessment(stageId: string, score: number): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/roadmap/assessment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stage_id: stageId, score })
    });
    return await res.json();
  },

  // --- AI MENTOR ---
  async sendMentorMessage(message: string, conversation_id?: number): Promise<MentorChatResponse> {
    const res = await fetch(`${API_BASE_URL}/api/mentor/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, conversation_id })
    });
    if (!res.ok) throw new Error('Mentor service currently unavailable');
    return await res.json();
  },

  // --- AI PROJECTS ---
  async generateProject(goal?: string, target_role = 'AI/ML Engineer', difficulty = 'Advanced'): Promise<ProjectBlueprint> {
    const res = await fetch(`${API_BASE_URL}/api/projects/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ goal, target_role, difficulty })
    });
    if (!res.ok) throw new Error('Project generator service failed');
    return await res.json();
  },

  async getSavedProjects(): Promise<ProjectBlueprint[]> {
    const res = await fetch(`${API_BASE_URL}/api/projects/saved`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return [];
    return await res.json();
  },

  // --- AI INTERVIEW ---
  async evaluateInterviewAnswer(
    question_title: string,
    category: string,
    user_answer: string,
    expected_keywords: string[] = []
  ): Promise<InterviewEvaluationResponse> {
    const res = await fetch(`${API_BASE_URL}/api/interview/evaluate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ question_title, category, user_answer, expected_keywords })
    });
    if (!res.ok) throw new Error('Interview evaluator service failed');
    return await res.json();
  },

  // --- CODING SANDBOX ---
  async runCode(code: string, test_cases?: any[]): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/assessments/run-code`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ code, test_cases })
    });
    if (!res.ok) throw new Error('Code sandbox execution failed');
    return await res.json();
  },

  // --- KNOWLEDGE INGESTION & RAG ---
  async ingestContent(title: string, content: string, doc_type = 'text', source_url?: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/knowledge/ingest`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, content, doc_type, source_url })
    });
    if (!res.ok) throw new Error('Ingestion failed');
    return await res.json();
  },

  // --- GITHUB INTELLIGENCE ---
  async analyzeGitHubRepo(repo_url: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/github/analyze`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ repo_url })
    });
    if (!res.ok) throw new Error('GitHub analysis failed');
    return await res.json();
  },

  // --- TODAY PLAN ---
  async getTodayPlan(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/today-plan/`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Today plan API unavailable', e);
    }
    return null;
  },

  // --- PRIVATE BETA & ONBOARDING ---
  async validateInvite(invite_code: string): Promise<{ valid: boolean; cohort: string; remaining_uses: number; reason: string }> {
    const res = await fetch(`${API_BASE_URL}/api/beta/validate-invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invite_code })
    });
    if (!res.ok) throw new Error('Invite validation failed');
    return await res.json();
  },

  async getBetaStatus(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/beta/status`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Beta status endpoint unavailable', e);
    }
    return { is_beta_user: false, onboarding_completed: true };
  },

  async getOnboardingGuide(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/beta/onboarding`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load onboarding guide');
    return await res.json();
  },

  async completeOnboardingStep(step_number: number, mark_all_done = false): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/beta/onboarding/complete-step`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ step_number, mark_all_done })
    });
    if (!res.ok) throw new Error('Failed to complete onboarding step');
    return await res.json();
  },

  // --- FEEDBACK ---
  async submitFeedback(
    feature: string,
    rating: number,
    feedback_text: string,
    entity_id?: string,
    sentiment?: string,
    metadata?: any
  ): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/feedback/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ feature, rating, feedback_text, entity_id, sentiment, metadata })
    });
    if (!res.ok) throw new Error('Feedback submission failed');
    return await res.json();
  },

  async getMyFeedback(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/feedback/mine`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch personal feedback');
    return await res.json();
  },

  // --- ADMIN TELEMETRY & INVITES ---
  async getBetaMetrics(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/admin/beta-metrics`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch admin beta metrics');
    return await res.json();
  },

  async createBetaInvite(max_uses = 1, expiry_days = 30, cohort = 'aug-2026'): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/admin/create-invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ max_uses, expiry_days, cohort })
    });
    if (!res.ok) throw new Error('Failed to generate beta invite');
    return await res.json();
  },

  async listBetaInvites(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/admin/invites`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to list beta invites');
    return await res.json();
  },

  async getBetaFunnel(cohort?: string): Promise<any> {
    const url = cohort
      ? `${API_BASE_URL}/api/admin/beta-funnel?cohort=${encodeURIComponent(cohort)}`
      : `${API_BASE_URL}/api/admin/beta-funnel`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch beta funnel metrics');
    return await res.json();
  },

  async getBetaFeedbackList(params?: { feature?: string; rating?: number; sentiment?: string }): Promise<any[]> {
    let query = '';
    if (params) {
      const q = new URLSearchParams();
      if (params.feature) q.append('feature', params.feature);
      if (params.rating) q.append('rating', params.rating.toString());
      if (params.sentiment) q.append('sentiment', params.sentiment);
      query = `?${q.toString()}`;
    }
    const res = await fetch(`${API_BASE_URL}/api/admin/beta-feedback${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch beta feedback list');
    return await res.json();
  }
};

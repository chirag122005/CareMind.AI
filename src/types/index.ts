export type RiskLevel = "Low" | "Medium" | "High";

export interface AssessmentResult {
  depressionScore: number;
  anxietyScore: number;
  stressScore: number;
  suicideRisk: RiskLevel;
  explanation: string;
}

export interface UserState {
  hasCompletedAssessment: boolean;
  assessmentResult: AssessmentResult | null;
  moodHistory: MoodEntry[];
  lastSentiment: AssessmentResult | null;
}

export interface MoodEntry {
  date: string;
  sadness: number;
  anger: number;
  fear: number;
  happiness: number;
  overall: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

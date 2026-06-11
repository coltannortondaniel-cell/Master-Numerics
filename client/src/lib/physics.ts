import { api } from "./api";

/**
 * Typed client for the Physics Journey API (server/src/controllers/physics.controller.ts).
 * Response shapes mirror the controller exactly so the UI never guesses.
 */

export type ProgressStatus = "STARTED" | "COMPLETED" | "MASTERED";
export type QuestionScope = "CONCEPT_CHECK" | "PRACTICE";
export type QuestionKind = "MCQ" | "TRUE_FALSE" | "NUMERIC";
export type SectionKind =
  | "HERO"
  | "CONTEXT"
  | "CONCEPT"
  | "SIMULATION"
  | "WORKED_EXAMPLES"
  | "VIDEOS"
  | "CONCEPT_CHECK"
  | "PRACTICE"
  | "DEEPER_DIVE"
  | "SUMMARY";

export interface Palette {
  accent: string;
  glow: string;
}

/** ─────────────── Section content shapes (Json column, varies by kind) ─────────────── */
export interface HeroContent {
  scene: string;
  headline: string;
  sub: string;
}
export interface MarkdownContent {
  markdown: string;
}
export interface SimulationContent {
  simId: string;
  intro: string;
}
export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
}
export interface WorkedExamplesContent {
  examples: WorkedExample[];
}
export interface VideoRef {
  youtubeId: string;
  title: string;
}
export interface VideosContent {
  videos: VideoRef[];
}
export interface IntroContent {
  intro: string;
}
export interface SummaryFormula {
  label: string;
  tex: string;
}
export interface SummaryContent {
  takeaways: string[];
  formulas: SummaryFormula[];
}

export interface LessonSection {
  kind: SectionKind;
  title: string | null;
  content: unknown;
}

export interface Question {
  id: string;
  scope: QuestionScope;
  orderIndex: number;
  kind: QuestionKind;
  prompt: string;
  options?: string[] | null;
  hint?: string | null;
}

/** ─────────────── Endpoint payloads ─────────────── */
export interface WorldSummary {
  slug: string;
  name: string;
  subtitle: string;
  gradeRange: string;
  scaleLabel: string;
  orderIndex: number;
  palette: Palette;
  lessonCount: number;
  completedCount: number;
}

export interface ContinueTarget {
  worldSlug: string;
  worldName: string;
  lessonSlug: string;
  title: string;
}

export interface WorldsResponse {
  worlds: WorldSummary[];
  continue: ContinueTarget | null;
}

export interface WorldDetail {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  gradeRange: string;
  scaleLabel: string;
  palette: Palette;
}

export interface LessonSummary {
  slug: string;
  title: string;
  tagline: string;
  orderIndex: number;
  xpReward: number;
  estMinutes: number;
  status: ProgressStatus | null;
  bestScore: number | null;
}

export interface WorldResponse {
  world: WorldDetail;
  lessons: LessonSummary[];
}

export interface LessonResponse {
  lesson: {
    slug: string;
    title: string;
    tagline: string;
    xpReward: number;
    estMinutes: number;
    world: { slug: string; name: string; palette: Palette; gradeRange: string };
    sections: LessonSection[];
    questions: Question[];
  };
  progress: { status: ProgressStatus; bestScore: number | null; attempts: number };
  nextLesson: { slug: string; title: string; worldSlug: string; worldName: string } | null;
}

export interface QuizResult {
  questionId: string;
  correct: boolean;
  correctAnswer: string;
  explanation: string;
}

export interface QuizResponse {
  results: QuizResult[];
  score: number;
  total: number;
  /** Present only for PRACTICE submissions. */
  percent?: number;
  bestScore?: number;
  status?: ProgressStatus;
}

export interface CompleteResponse {
  xpAwarded: number;
  bonusAwarded: number;
  totalXp: number;
  status: ProgressStatus;
}

/** MCQ → option index · TRUE_FALSE → boolean · NUMERIC → number */
export type AnswerValue = number | boolean;
export interface SubmittedAnswer {
  questionId: string;
  answer: AnswerValue;
}

export const physicsApi = {
  async worlds(): Promise<WorldsResponse> {
    const { data } = await api.get<WorldsResponse>("/physics/worlds");
    return data;
  },
  async world(slug: string): Promise<WorldResponse> {
    const { data } = await api.get<WorldResponse>(`/physics/worlds/${slug}`);
    return data;
  },
  async lesson(slug: string): Promise<LessonResponse> {
    const { data } = await api.get<LessonResponse>(`/physics/lessons/${slug}`);
    return data;
  },
  async submitQuiz(
    slug: string,
    scope: QuestionScope,
    answers: SubmittedAnswer[]
  ): Promise<QuizResponse> {
    const { data } = await api.post<QuizResponse>(`/physics/lessons/${slug}/quiz`, {
      scope,
      answers,
    });
    return data;
  },
  async complete(slug: string): Promise<CompleteResponse> {
    const { data } = await api.post<CompleteResponse>(`/physics/lessons/${slug}/complete`);
    return data;
  },
  /** Fire-and-forget study-time accumulation. */
  logTime(slug: string, seconds: number): void {
    void api.post(`/physics/lessons/${slug}/time`, { seconds }).catch(() => {});
  },
};

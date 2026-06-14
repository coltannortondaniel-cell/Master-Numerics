export type QuestionSeed = {
  scope: "CONCEPT_CHECK" | "PRACTICE";
  kind:
    | "MCQ" | "TRUE_FALSE" | "NUMERIC" | "MATCHING" | "FILL_BLANK"
    | "ORDER" | "SYMBOLIC" | "GRAPH" | "PROOF";
  prompt: string;
  // MCQ: string[] · MATCHING: {left,right} · ORDER/PROOF: steps in correct order
  options?: string[] | { left: string[]; right: string[] };
  // MCQ: index · T/F: boolean · NUMERIC: {value,tolerance} · MATCHING: right[] ·
  // FILL_BLANK: accepted strings per blank · ORDER/PROOF: null (order in options) ·
  // SYMBOLIC: {expr,vars?,tolerance?} · GRAPH: {expr,domain?,variable?,tolerance?}
  answer:
    | number
    | boolean
    | { value: number; tolerance: number }
    | string[]
    | string[][]
    | { expr: string; vars?: string[]; tolerance?: number }
    | { expr: string; domain?: [number, number]; variable?: string; tolerance?: number; mode?: "draw"; samples?: number }
    | null;
  /** 1 (easiest) → 5 (hardest), relative within the unit. Defaults to 2. */
  difficulty?: number;
  hint?: string;
  explanation: string;
};

export type SectionSeed = {
  kind:
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
  title?: string;
  content: unknown;
};

export type LessonSeed = {
  slug: string;
  title: string;
  tagline: string;
  estMinutes: number;
  xpReward: number;
  /** 1 (gentle) → 5 (graduate). Shown as the lesson/node difficulty badge. */
  difficulty?: number;
  /** Slug of a math lesson this (physics) lesson depends on — shows a jump prompt. */
  requiresMath?: string;
  sections: SectionSeed[];
  questions: QuestionSeed[];
};

export type WorldSeed = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  gradeRange: string;
  /** Physics: a length scale ("3×10⁶ m"). Math: a city address ("1 Counting Lane"). */
  scaleLabel: string;
  palette: { accent: string; glow: string };
  lessons: LessonSeed[];
};

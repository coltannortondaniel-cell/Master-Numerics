export type QuestionSeed = {
  scope: "CONCEPT_CHECK" | "PRACTICE";
  kind: "MCQ" | "TRUE_FALSE" | "NUMERIC" | "MATCHING" | "FILL_BLANK" | "ORDER";
  prompt: string;
  // MCQ: string[] · MATCHING: {left,right} (left[i]↔right[i]) · ORDER: correct order
  options?: string[] | { left: string[]; right: string[] };
  // MCQ: index · T/F: boolean · NUMERIC: {value,tolerance} · MATCHING: right[] ·
  // FILL_BLANK: accepted strings per blank · ORDER: null (order lives in options)
  answer: number | boolean | { value: number; tolerance: number } | string[] | string[][] | null;
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

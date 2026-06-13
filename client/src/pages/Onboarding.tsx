import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Atom, Sigma, Check } from "lucide-react";
import { useAuth } from "../store/auth";
import { Mascot, type Mood } from "../components/mascot/Mascot";
import { Button } from "../components/ui/Button";
import { setOnboarded } from "../lib/onboarding";

type Subject = "physics" | "math";

interface Band {
  key: string;
  label: string;
  hint: string;
}
const BANDS: Band[] = [
  { key: "early", label: "Early (K–2)", hint: "Counting, shapes, everyday science" },
  { key: "elementary", label: "Elementary (3–5)", hint: "Fractions, motion, measurement" },
  { key: "middle", label: "Middle (6–8)", hint: "Pre-algebra, forces, energy" },
  { key: "high", label: "High school (9–12)", hint: "Algebra, calculus, mechanics" },
  { key: "college", label: "College", hint: "Multivariable, E&M, beyond" },
  { key: "graduate", label: "Graduate", hint: "Advanced & specialized topics" },
];

/** Map the granular registration grade onto a band for a sensible default. */
function defaultBand(grade?: string): string {
  if (!grade) return "middle";
  if (grade === "KINDERGARTEN" || grade === "GRADE_1" || grade === "GRADE_2") return "early";
  if (["GRADE_3", "GRADE_4", "GRADE_5"].includes(grade)) return "elementary";
  if (["GRADE_6", "GRADE_7", "GRADE_8"].includes(grade)) return "middle";
  if (["GRADE_9", "GRADE_10", "GRADE_11", "GRADE_12"].includes(grade)) return "high";
  if (grade === "UNDERGRAD") return "college";
  if (grade === "GRADUATE") return "graduate";
  return "middle";
}

interface PlacementQ {
  prompt: string;
  options: string[];
  answer: number;
}
const QUESTIONS: Record<Subject, PlacementQ[]> = {
  math: [
    { prompt: "What is 7 × 8?", options: ["54", "56", "48", "64"], answer: 1 },
    { prompt: "Simplify: 3/4 + 1/4", options: ["1", "4/8", "1/2", "3/8"], answer: 0 },
    { prompt: "Solve for x: 2x + 6 = 14", options: ["x = 2", "x = 4", "x = 6", "x = 10"], answer: 1 },
  ],
  physics: [
    { prompt: "Which has more mass: a feather or a brick?", options: ["Feather", "Brick", "Same", "Neither"], answer: 1 },
    { prompt: "Speed is distance divided by…", options: ["mass", "time", "force", "energy"], answer: 1 },
    { prompt: "Newton's 2nd law is best written as…", options: ["F = ma", "E = mc²", "v = d/t", "p = mv"], answer: 0 },
  ],
};

type Step = "intro" | "subject" | "grade" | "quiz" | "done";
const INTRO: { line: string; mood: Mood }[] = [
  { line: "Hi there — welcome to Master Numerics! 👋", mood: "wave" },
  { line: "I'll be your guide from counting all the way to the calculus of the cosmos.", mood: "happy" },
  { line: "Let's set you up with the perfect starting point. Ready?", mood: "happy" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const grade = useAuth((s) => s.user?.gradeLevel);

  const [step, setStep] = useState<Step>("intro");
  const [introIdx, setIntroIdx] = useState(0);
  const [subject, setSubject] = useState<Subject>("physics");
  const [band, setBand] = useState<string>(() => defaultBand(grade));
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const questions = QUESTIONS[subject];
  const bandLabel = useMemo(() => BANDS.find((b) => b.key === band)?.label ?? "your level", [band]);

  function finish() {
    setOnboarded();
    navigate(subject === "physics" ? "/journey" : "/city", { replace: true });
  }

  function answer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === questions[qIdx].answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIdx + 1 < questions.length) {
        setQIdx((q) => q + 1);
        setPicked(null);
      } else {
        setStep("done");
      }
    }, 900);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="starfield" aria-hidden />
      <div className="glass relative z-10 w-full max-w-lg px-6 py-8 sm:px-8">
        {/* progress dots */}
        <div className="mb-6 flex justify-center gap-1.5">
          {["intro", "subject", "grade", "quiz", "done"].map((s) => (
            <span
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-6 bg-accent" : "w-1.5 bg-line/20"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ---------- INTRO ---------- */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center text-center"
            >
              <Mascot mood={INTRO[introIdx].mood} size={140} />
              <p className="mt-4 min-h-[3.5rem] font-display text-xl font-semibold">
                {INTRO[introIdx].line}
              </p>
              <Button
                className="mt-6"
                onClick={() =>
                  introIdx + 1 < INTRO.length ? setIntroIdx((i) => i + 1) : setStep("subject")
                }
              >
                {introIdx + 1 < INTRO.length ? "Next" : "Let's go"}
              </Button>
            </motion.div>
          )}

          {/* ---------- SUBJECT ---------- */}
          {step === "subject" && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center"
            >
              <h2 className="font-display text-2xl font-bold">What would you like to start with?</h2>
              <p className="mt-1 text-sm text-fg/55">You can switch anytime with the toggle.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {([
                  { key: "physics", label: "Physics", icon: <Atom size={28} />, blurb: "Motion to the cosmos" },
                  { key: "math", label: "Math", icon: <Sigma size={28} />, blurb: "Counting to calculus" },
                ] as const).map((o) => {
                  const active = subject === o.key;
                  return (
                    <button
                      key={o.key}
                      onClick={() => setSubject(o.key)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-5 transition-all ${
                        active
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-line/12 text-fg/70 hover:border-line/30"
                      }`}
                    >
                      {o.icon}
                      <span className="font-display text-lg font-semibold">{o.label}</span>
                      <span className="text-xs text-fg/50">{o.blurb}</span>
                    </button>
                  );
                })}
              </div>
              <Button className="mt-6 w-full" onClick={() => setStep("grade")}>
                Continue
              </Button>
            </motion.div>
          )}

          {/* ---------- GRADE ---------- */}
          {step === "grade" && (
            <motion.div
              key="grade"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center"
            >
              <h2 className="font-display text-2xl font-bold">Where are you at?</h2>
              <p className="mt-1 text-sm text-fg/55">Pick the level that fits you best.</p>
              <div className="mt-5 flex flex-col gap-2 text-left">
                {BANDS.map((b) => {
                  const active = band === b.key;
                  return (
                    <button
                      key={b.key}
                      onClick={() => setBand(b.key)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                        active ? "border-accent bg-accent/10" : "border-line/12 hover:border-line/30"
                      }`}
                    >
                      <span>
                        <span className="block font-display font-semibold">{b.label}</span>
                        <span className="block text-xs text-fg/50">{b.hint}</span>
                      </span>
                      {active && <Check size={18} className="text-accent" />}
                    </button>
                  );
                })}
              </div>
              <Button
                className="mt-6 w-full"
                onClick={() => {
                  setQIdx(0);
                  setPicked(null);
                  setScore(0);
                  setStep("quiz");
                }}
              >
                A few quick questions
              </Button>
            </motion.div>
          )}

          {/* ---------- QUIZ ---------- */}
          {step === "quiz" && (
            <motion.div
              key={`quiz-${qIdx}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
            >
              <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-nebula">
                Quick check · {qIdx + 1} / {questions.length}
              </p>
              <h2 className="mt-3 text-center font-display text-xl font-semibold">
                {questions[qIdx].prompt}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {questions[qIdx].options.map((opt, i) => {
                  const isAnswer = i === questions[qIdx].answer;
                  const chosen = picked === i;
                  const reveal = picked !== null;
                  return (
                    <button
                      key={i}
                      disabled={reveal}
                      onClick={() => answer(i)}
                      className={`rounded-xl border px-4 py-3 text-left font-semibold transition-all ${
                        reveal && isAnswer
                          ? "border-success bg-success/15 text-success"
                          : chosen
                          ? "border-alert bg-alert/15 text-alert"
                          : "border-line/12 hover:border-accent hover:bg-accent/5"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ---------- DONE ---------- */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <Mascot mood="celebrate" size={150} />
              <h2 className="mt-4 font-display text-2xl font-bold">You're all set!</h2>
              <p className="mt-2 text-sm text-fg/65">
                You got <span className="font-semibold text-fg">{score}/{questions.length}</span>.
                We'll start you at <span className="font-semibold text-accent">{bandLabel}</span> in{" "}
                {subject === "physics" ? "Physics" : "Math"} — and you can test out of units as you go.
              </p>
              <Button variant="gold" className="mt-6 w-full" onClick={finish}>
                Start learning
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

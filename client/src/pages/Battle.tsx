import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Trophy, Handshake, Dumbbell } from "lucide-react";
import { getSocket } from "../lib/socket";
import { useXp } from "../store/xp";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { Markdown } from "../components/ui/Markdown";
import { Button } from "../components/ui/Button";

type Phase = "lobby" | "searching" | "playing" | "over";
type Subject = "MIXED" | "PHYSICS" | "MATH";
type Mode = "ranked" | "casual";

interface Question {
  index: number;
  total: number;
  prompt: string;
  kind: "MCQ" | "TRUE_FALSE" | "NUMERIC";
  options: string[] | null;
  durationMs: number;
  penaltyMs: number;
}
interface Result {
  index: number;
  outcome: "you" | "opp" | "none";
  correctAnswer: string;
  scores: { you: number; opp: number };
}
interface Over {
  result: "win" | "loss" | "draw";
  scores: { you: number; opp: number };
  xp: number;
  coins: number;
  achievements: { key: string; name: string; xpReward: number; coinReward: number }[];
}

export default function Battle() {
  const [phase, setPhase] = useState<Phase>("lobby");
  const [subject, setSubject] = useState<Subject>("MIXED");
  const [mode, setMode] = useState<Mode>("casual");
  const [opponent, setOpponent] = useState<{ username: string; xp: number } | null>(null);
  const [scores, setScores] = useState({ you: 0, opp: 0 });
  const [question, setQuestion] = useState<Question | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [over, setOver] = useState<Over | null>(null);
  const [answered, setAnswered] = useState(false);
  const [numeric, setNumeric] = useState("");
  const [oppTyping, setOppTyping] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);

  const deadline = useRef(0);
  const pushToast = useXp((s) => s.push);

  // Socket wiring
  useEffect(() => {
    const socket = getSocket();
    const onWaiting = () => setPhase("searching");
    const onStart = (d: { opponent: { username: string; xp: number }; subject: string; mode: string }) => {
      setOpponent(d.opponent);
      setScores({ you: 0, opp: 0 });
      setResult(null);
      setOver(null);
      setPhase("playing");
    };
    const onQuestion = (q: Question) => {
      setQuestion(q);
      setResult(null);
      setAnswered(false);
      setNumeric("");
      setOppTyping(false);
      deadline.current = Date.now() + q.durationMs;
      setLockUntil(q.penaltyMs > 0 ? Date.now() + q.penaltyMs : 0);
    };
    const onResult = (r: Result) => {
      setResult(r);
      setScores(r.scores);
    };
    const onOver = (o: Over) => {
      setOver(o);
      setPhase("over");
      setQuestion(null);
      if (o.xp > 0) {
        pushToast({
          kind: o.result === "win" ? "bonus" : "xp",
          amount: o.xp,
          title: o.result === "win" ? "Victory!" : o.result === "draw" ? "Hard-fought draw" : "Good fight",
          detail: o.coins > 0 ? `+${o.coins} coins` : undefined,
        });
      }
      for (const a of o.achievements ?? []) {
        pushToast({ kind: "mastery", title: `Achievement: ${a.name}`, amount: a.xpReward });
      }
    };
    const onOppTyping = () => {
      setOppTyping(true);
      window.setTimeout(() => setOppTyping(false), 1200);
    };
    const onError = (e: { message: string }) => {
      setError(e.message);
      setPhase("lobby");
    };

    socket.on("mm:waiting", onWaiting);
    socket.on("battle:start", onStart);
    socket.on("battle:question", onQuestion);
    socket.on("battle:result", onResult);
    socket.on("battle:over", onOver);
    socket.on("opponent:typing", onOppTyping);
    socket.on("mm:error", onError);
    socket.on("connect_error", () => setError("Couldn't reach the arena. Try again."));

    return () => {
      socket.off("mm:waiting", onWaiting);
      socket.off("battle:start", onStart);
      socket.off("battle:question", onQuestion);
      socket.off("battle:result", onResult);
      socket.off("battle:over", onOver);
      socket.off("opponent:typing", onOppTyping);
      socket.off("mm:error", onError);
      socket.emit("mm:leave");
    };
  }, [pushToast]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "playing" || !question) return;
    const t = setInterval(() => {
      setRemaining(Math.max(0, deadline.current - Date.now()));
    }, 100);
    return () => clearInterval(t);
  }, [phase, question]);

  function findMatch() {
    setError("");
    getSocket().emit("mm:join", { subject, mode });
    setPhase("searching");
  }
  function cancel() {
    getSocket().emit("mm:leave");
    setPhase("lobby");
  }
  function submit(answer: number | boolean) {
    if (answered || Date.now() < lockUntil) return;
    setAnswered(true);
    getSocket().emit("battle:answer", { answer });
  }
  function submitNumeric() {
    if (answered || numeric === "") return;
    submit(parseFloat(numeric));
  }

  const locked = Date.now() < lockUntil;
  const pct = question ? Math.max(0, Math.min(100, (remaining / question.durationMs) * 100)) : 0;

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#FF4757", glow: "#6B21D6" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        {/* LOBBY */}
        {phase === "lobby" && (
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-alert">1v1 Duel</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Battle Arena</h1>
            <p className="mt-2 text-neutron/55">Best of 10. First correct answer takes the point.</p>

            <div className="glass mx-auto mt-8 max-w-sm p-6 text-left">
              <p className="mb-2 text-sm text-neutron/60">Subject</p>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {(["MIXED", "PHYSICS", "MATH"] as Subject[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      subject === s ? "bg-cosmic text-neutron shadow-glow" : "bg-white/5 text-neutron/60 hover:text-neutron"
                    }`}
                  >
                    {s === "MIXED" ? "Mixed" : s === "PHYSICS" ? "Physics" : "Math"}
                  </button>
                ))}
              </div>
              <p className="mb-2 text-sm text-neutron/60">Mode</p>
              <div className="mb-6 grid grid-cols-2 gap-2">
                {(["casual", "ranked"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-all ${
                      mode === m ? "bg-cosmic text-neutron shadow-glow" : "bg-white/5 text-neutron/60 hover:text-neutron"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <Button variant="danger" onClick={findMatch} className="w-full">
                <Swords size={16} strokeWidth={1.75} /> Find match
              </Button>
              {error && <p className="mt-3 text-sm text-alert">{error}</p>}
            </div>
            <p className="mt-4 text-xs text-neutron/40">
              Tip: open this page in two windows (as two accounts) to duel yourself.
            </p>
          </div>
        )}

        {/* SEARCHING */}
        {phase === "searching" && (
          <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-alert border-t-transparent" />
            <div>
              <p className="font-display text-xl font-bold">Searching for an opponent…</p>
              <p className="text-sm text-neutron/55">{mode} · {subject.toLowerCase()}</p>
            </div>
            <Button variant="ghost" onClick={cancel}>Cancel</Button>
          </div>
        )}

        {/* PLAYING */}
        {phase === "playing" && question && (
          <div>
            {/* Scoreboard */}
            <div className="mb-4 flex items-center justify-between">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-success tabular-nums">{scores.you}</p>
                <p className="text-xs text-neutron/50">You</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-xs text-neutron/40">
                  Q{question.index + 1} / {question.total}
                </p>
                {oppTyping && <p className="text-xs text-nebula animate-pulse">opponent typing…</p>}
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-alert tabular-nums">{scores.opp}</p>
                <p className="text-xs text-neutron/50">{opponent?.username ?? "Opponent"}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{ width: `${pct}%`, background: pct < 25 ? "#FF4757" : "#FFB800" }}
              />
            </div>

            {/* Question */}
            <div className="glass px-5 py-6 sm:px-8">
              <div className="font-display text-lg font-semibold">
                <Markdown>{question.prompt}</Markdown>
              </div>

              <div className="mt-5">
                {locked && (
                  <p className="mb-3 rounded-lg bg-alert/15 px-3 py-2 text-sm text-alert">
                    ⏱ Penalty — locked for a moment…
                  </p>
                )}
                {question.kind === "MCQ" && (
                  <div className="grid grid-cols-1 gap-2">
                    {(question.options ?? []).map((opt, i) => (
                      <button
                        key={i}
                        disabled={answered || locked}
                        onClick={() => submit(i)}
                        className="flex items-center gap-2 rounded-lg border border-neutron/15 px-4 py-3 text-left transition-all hover:border-cosmic hover:bg-white/5 disabled:opacity-50"
                      >
                        <span className="font-mono text-xs text-neutron/50">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {question.kind === "TRUE_FALSE" && (
                  <div className="flex gap-2">
                    {[true, false].map((b) => (
                      <button
                        key={String(b)}
                        disabled={answered || locked}
                        onClick={() => submit(b)}
                        className="flex-1 rounded-lg border border-neutron/15 px-4 py-3 font-semibold transition-all hover:border-cosmic hover:bg-white/5 disabled:opacity-50"
                      >
                        {b ? "True" : "False"}
                      </button>
                    ))}
                  </div>
                )}
                {question.kind === "NUMERIC" && (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      disabled={answered || locked}
                      value={numeric}
                      onChange={(e) => {
                        setNumeric(e.target.value);
                        getSocket().emit("battle:typing");
                      }}
                      placeholder="Answer"
                      className="w-40 rounded-lg border border-neutron/15 bg-space/70 px-3 py-2 font-mono outline-none focus:border-cosmic"
                    />
                    <Button onClick={submitNumeric} disabled={answered || locked || numeric === ""}>
                      Submit
                    </Button>
                  </div>
                )}
                {answered && !result && (
                  <p className="mt-3 text-sm text-neutron/50">Answer locked in — waiting…</p>
                )}
              </div>

              {/* Per-question reveal */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${
                      result.outcome === "you"
                        ? "bg-success/15 text-success"
                        : result.outcome === "opp"
                          ? "bg-alert/15 text-alert"
                          : "bg-white/5 text-neutron/70"
                    }`}
                  >
                    {result.outcome === "you"
                      ? "✓ You took the point!"
                      : result.outcome === "opp"
                        ? "Opponent got it first."
                        : "No one answered in time."}
                    <span className="ml-2 font-normal text-neutron/60">Answer: {result.correctAnswer}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* OVER */}
        {phase === "over" && over && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-sm text-center"
          >
            <div className="flex justify-center" style={{ color: over.result === "win" ? "#E8B33A" : over.result === "draw" ? "#C0C7D0" : "#FF4757" }}>
              {over.result === "win" ? <Trophy size={56} strokeWidth={1.4} /> : over.result === "draw" ? <Handshake size={56} strokeWidth={1.4} /> : <Dumbbell size={56} strokeWidth={1.4} />}
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold">
              {over.result === "win" ? "Victory!" : over.result === "draw" ? "Draw" : "Defeat"}
            </h1>
            <p className="mt-1 text-lg text-neutron/70">
              {over.scores.you} – {over.scores.opp}
            </p>
            {over.xp > 0 && <p className="mt-2 font-mono text-solar">+{over.xp} XP</p>}
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="danger" onClick={() => { setPhase("lobby"); setOver(null); }}>
                Play again
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

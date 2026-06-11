import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  type LessonResponse,
  type HeroContent,
  type MarkdownContent,
  type SimulationContent,
  type WorkedExamplesContent,
  type VideosContent,
  type IntroContent,
  type SummaryContent,
} from "../../lib/physics";
import { useContentApi } from "../../lib/contentApi";
import { parseApiError } from "../../lib/api";
import { useXp } from "../../store/xp";
import { Button } from "../ui/Button";
import { StatusChip } from "./StatusChip";
import { HeroSection } from "./sections/HeroSection";
import { ProseSection } from "./sections/ProseSection";
import { SimulationSection } from "./sections/SimulationSection";
import { WorkedExamples } from "./sections/WorkedExamples";
import { VideoSection } from "./sections/VideoSection";
import { DeeperDive } from "./sections/DeeperDive";
import { SummaryCard } from "./sections/SummaryCard";
import { ConceptCheck } from "./quiz/ConceptCheck";
import { PracticeSet } from "./quiz/PracticeSet";

function Reveal({ children, index }: { children: React.ReactNode; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.03 }}
    >
      {children}
    </motion.div>
  );
}

export function LessonViewer({ data, basePath = "/journey" }: { data: LessonResponse; basePath?: string }) {
  const { lesson, progress, nextLesson } = data;
  const palette = lesson.world.palette;
  const contentApi = useContentApi();
  const pushToast = useXp((s) => s.push);
  const setTotalXp = useXp((s) => s.setTotalXp);

  const conceptQs = useMemo(
    () => lesson.questions.filter((q) => q.scope === "CONCEPT_CHECK"),
    [lesson.questions]
  );
  const practiceQs = useMemo(
    () => lesson.questions.filter((q) => q.scope === "PRACTICE"),
    [lesson.questions]
  );

  const alreadyComplete = progress.status === "COMPLETED" || progress.status === "MASTERED";
  const [practiceAttempted, setPracticeAttempted] = useState(
    progress.attempts > 0 || progress.bestScore != null
  );
  const [completed, setCompleted] = useState(alreadyComplete);
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState("");
  const [scrollPct, setScrollPct] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Study-time heartbeat (only while the tab is visible)
  useEffect(() => {
    let acc = 0;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        acc += 15;
        if (acc >= 30) {
          contentApi.logTime(lesson.slug, acc);
          acc = 0;
        }
      }
    }, 15000);
    return () => {
      if (acc > 0) contentApi.logTime(lesson.slug, acc);
      window.clearInterval(id);
    };
  }, [lesson.slug]);

  async function complete() {
    setCompleting(true);
    setCompleteError("");
    try {
      const res = await contentApi.complete(lesson.slug);
      setTotalXp(res.totalXp);
      setCompleted(true);
      pushToast({ kind: "xp", amount: res.xpAwarded, title: "Lesson complete!", detail: lesson.title });
      if (res.bonusAwarded > 0) {
        pushToast({ kind: "bonus", amount: res.bonusAwarded, title: "Perfect practice bonus" });
      }
      if (res.status === "MASTERED") {
        pushToast({ kind: "mastery", title: "Lesson mastered", detail: "90%+ on two separate days" });
      }
    } catch (e) {
      const parsed = parseApiError(e);
      setCompleteError(
        parsed.code === "PRACTICE_REQUIRED"
          ? "Try the practice problems before completing the lesson."
          : parsed.message
      );
    } finally {
      setCompleting(false);
    }
  }

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="fixed left-0 right-0 top-0 z-30 h-0.5 bg-transparent">
        <div
          className="h-full origin-left"
          style={{ background: palette.accent, transform: `scaleX(${scrollPct})` }}
        />
      </div>

      <article className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Lesson header */}
        <header>
          <Link
            to={`${basePath}/${lesson.world.slug}`}
            className="font-mono text-xs uppercase tracking-[0.25em] text-neutron/45 hover:text-neutron"
          >
            {lesson.world.name}
          </Link>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{lesson.title}</h1>
          <p className="mt-1 text-lg text-neutron/65">{lesson.tagline}</p>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <StatusChip status={completed ? "COMPLETED" : progress.status} />
            <span className="font-mono text-xs text-neutron/40">~{lesson.estMinutes} min</span>
            <span className="font-mono text-xs text-solar/70">+{lesson.xpReward} XP</span>
          </div>
        </header>

        {/* Sections in order */}
        {lesson.sections.map((s, i) => {
          let node: React.ReactNode = null;
          switch (s.kind) {
            case "HERO":
              node = <HeroSection content={s.content as HeroContent} palette={palette} />;
              break;
            case "CONTEXT":
              node = (
                <ProseSection
                  eyebrow="Real-world context"
                  title={s.title}
                  markdown={(s.content as MarkdownContent).markdown}
                />
              );
              break;
            case "CONCEPT":
              node = (
                <ProseSection
                  eyebrow="Core concept"
                  title={s.title}
                  markdown={(s.content as MarkdownContent).markdown}
                />
              );
              break;
            case "SIMULATION":
              node = <SimulationSection title={s.title} content={s.content as SimulationContent} />;
              break;
            case "WORKED_EXAMPLES":
              node = (
                <WorkedExamples
                  title={s.title}
                  examples={(s.content as WorkedExamplesContent).examples}
                />
              );
              break;
            case "VIDEOS":
              node = <VideoSection title={s.title} videos={(s.content as VideosContent).videos} />;
              break;
            case "CONCEPT_CHECK":
              node = (
                <ConceptCheck
                  slug={lesson.slug}
                  intro={(s.content as IntroContent).intro}
                  questions={conceptQs}
                />
              );
              break;
            case "PRACTICE":
              node = (
                <PracticeSet
                  slug={lesson.slug}
                  intro={(s.content as IntroContent).intro}
                  questions={practiceQs}
                  onSubmitted={() => setPracticeAttempted(true)}
                />
              );
              break;
            case "DEEPER_DIVE":
              node = <DeeperDive title={s.title} markdown={(s.content as MarkdownContent).markdown} />;
              break;
            case "SUMMARY":
              node = <SummaryCard content={s.content as SummaryContent} palette={palette} />;
              break;
          }
          return (
            <Reveal key={i} index={i}>
              {node}
            </Reveal>
          );
        })}

        {/* Completion + Next */}
        <div
          className="rounded-2xl px-6 py-7 text-center"
          style={{
            background: `linear-gradient(160deg, ${palette.glow}22, rgba(16,18,32,0.6))`,
            border: `1px solid ${palette.accent}33`,
          }}
        >
          {completed ? (
            <>
              <p className="text-3xl">🎉</p>
              <p className="mt-2 font-display text-xl font-bold">Lesson complete</p>
              {nextLesson ? (
                <>
                  <p className="mt-1 text-sm text-neutron/60">Next up: {nextLesson.title}</p>
                  <Link to={`${basePath}/${nextLesson.worldSlug}/${nextLesson.slug}`} className="mt-4 inline-block">
                    <Button variant="gold">Continue the journey →</Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="mt-1 text-sm text-neutron/60">
                    You've reached the edge of the charted map.
                  </p>
                  <Link to={basePath} className="mt-4 inline-block">
                    <Button>Back to the map</Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <p className="font-display text-xl font-bold">Ready to log this lesson?</p>
              <p className="mt-1 text-sm text-neutron/60">
                {practiceAttempted
                  ? `Earn +${lesson.xpReward} XP and continue the journey.`
                  : "Finish the practice problems above to complete this lesson."}
              </p>
              <div className="mt-4">
                <Button
                  variant="gold"
                  onClick={() => void complete()}
                  loading={completing}
                  disabled={!practiceAttempted}
                >
                  Complete lesson
                </Button>
              </div>
              {completeError && <p className="mt-3 text-sm text-alert">{completeError}</p>}
            </>
          )}
        </div>
      </article>
    </div>
  );
}

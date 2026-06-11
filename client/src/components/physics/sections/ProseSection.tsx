import { Markdown } from "../../ui/Markdown";

/** CONTEXT / CONCEPT — a titled glass card of KaTeX-aware markdown. */
export function ProseSection({
  title,
  markdown,
  eyebrow,
}: {
  title?: string | null;
  markdown: string;
  eyebrow?: string;
}) {
  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      {eyebrow && (
        <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-nebula">
          {eyebrow}
        </p>
      )}
      {title && <h3 className="mb-3 font-display text-2xl font-bold">{title}</h3>}
      <Markdown>{markdown}</Markdown>
    </section>
  );
}

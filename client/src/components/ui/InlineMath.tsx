import { Tex } from "./Tex";

/** Render a short label that may contain inline `$…$` KaTeX, inline (no block wrap). */
export function InlineMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.length > 1 && p.startsWith("$") && p.endsWith("$") ? (
          <Tex key={i} tex={p.slice(1, -1)} />
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

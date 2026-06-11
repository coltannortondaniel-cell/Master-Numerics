import { useMemo } from "react";
import katex from "katex";

interface Props {
  tex: string;
  display?: boolean;
  className?: string;
}

/** Renders a raw KaTeX string (e.g. SUMMARY formula `tex` fields). */
export function Tex({ tex, display = false, className }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        output: "htmlAndMathml",
      });
    } catch {
      return tex;
    }
  }, [tex, display]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

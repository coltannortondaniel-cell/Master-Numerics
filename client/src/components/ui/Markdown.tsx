import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";

/**
 * Cosmic-themed markdown with inline/﻿block KaTeX (via $…$ and $$…$$).
 * Used for CONTEXT, CONCEPT, DEEPER_DIVE sections and quiz prompts.
 */

const components: Components = {
  p: ({ children }) => <p className="leading-relaxed text-neutron/85">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-neutron">{children}</strong>,
  em: ({ children }) => <em className="italic text-neutron/90">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1.5 pl-6 marker:text-cosmic">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-6 marker:text-cosmic">{children}</ol>
  ),
  li: ({ children }) => <li className="text-neutron/85">{children}</li>,
  h1: ({ children }) => (
    <h1 className="mt-6 mb-2 font-display text-2xl font-bold text-neutron">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-5 mb-2 font-display text-xl font-bold text-neutron">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 font-display text-lg font-semibold text-neutron">{children}</h3>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-nebula underline decoration-nebula/40 underline-offset-2 hover:text-white"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-solar">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-cosmic/60 pl-4 italic text-neutron/70">
      {children}
    </blockquote>
  ),
};

interface Props {
  children: string;
  className?: string;
}

function MarkdownImpl({ children, className }: Props) {
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export const Markdown = memo(MarkdownImpl);

import { Link } from "react-router-dom";

/** The Σ-in-ring mark + serif wordmark, matching the brand identity. */
export function Logo({ size = "md", tagline = false }: { size?: "md" | "lg"; tagline?: boolean }) {
  const ring = size === "lg" ? 44 : 30;
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 no-underline text-neutron" aria-label="Master Numerics home">
      <svg width={ring} height={ring} viewBox="0 0 100 100" className="shrink-0" aria-hidden>
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Cinzel, serif"
          fontWeight="700"
          fontSize="58"
          fill="currentColor"
        >
          Σ
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-brand font-semibold tracking-[0.18em] ${size === "lg" ? "text-2xl" : "text-base"}`}
        >
          MASTER&nbsp;NUMERICS
        </span>
        {tagline && (
          <span className="mt-2 flex items-center gap-2 text-[0.6rem] tracking-[0.3em] text-neutron/50">
            <span className="h-px w-6 bg-neutron/30" />
            MASTER THE LANGUAGE OF NUMBERS
            <span className="h-px w-6 bg-neutron/30" />
          </span>
        )}
      </span>
    </Link>
  );
}

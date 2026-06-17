import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "premium" | "gold" | "ghost" | "danger";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-body font-semibold tracking-wide " +
  "transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  // Monochrome primary — a white (dark in light-theme) surface, the brief's default CTA.
  primary: "bg-accent text-on-accent hover:bg-accent-bright active:scale-[0.98]",
  // The ONLY blue button — reserved for purchases / upgrade (brief §1.2 --premium).
  premium: "bg-premium text-white hover:brightness-110 active:scale-[0.98]",
  // Rewards / currency actions.
  gold: "bg-currency text-base hover:brightness-110 active:scale-[0.98]",
  ghost:
    "bg-transparent border border-fg/15 text-fg hover:border-fg/40 hover:bg-fg/5",
  danger: "bg-wrong/90 text-white hover:bg-wrong",
};

export function Button({ variant = "primary", loading, children, className, ...rest }: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}

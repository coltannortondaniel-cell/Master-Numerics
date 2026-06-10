import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "ghost" | "danger";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-display font-semibold " +
  "transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary: "bg-cosmic text-neutron hover:shadow-glow hover:brightness-110 active:scale-[0.98]",
  gold: "bg-solar text-space hover:shadow-glow-gold hover:brightness-110 active:scale-[0.98]",
  ghost:
    "bg-transparent border border-neutron/15 text-neutron hover:border-cosmic hover:text-white",
  danger: "bg-alert/90 text-neutron hover:bg-alert",
};

export function Button({ variant = "primary", loading, children, ...rest }: Props) {
  return (
    <button className={`${base} ${variants[variant]}`} disabled={loading || rest.disabled} {...rest}>
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

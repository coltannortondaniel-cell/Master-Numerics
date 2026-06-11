import type { ReactNode } from "react";

/** Shared chrome + inputs for the interactive simulations. */

export function SimFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-neutron/10 bg-space/60 p-4 sm:p-5">{children}</div>
  );
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-neutron/70">{label}</span>
        <span className="font-mono text-solar tabular-nums">
          {format ? format(value) : value}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-cosmic cursor-pointer"
      />
    </label>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div>
      {label && <p className="mb-1 text-sm text-neutron/70">{label}</p>}
      <div className="inline-flex rounded-lg bg-white/5 p-1" role="tablist">
        {options.map((o) => (
          <button
            key={o.value}
            role="tab"
            aria-selected={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              value === o.value ? "bg-cosmic text-neutron shadow-glow" : "text-neutron/55 hover:text-neutron"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SimButton({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-solar text-space"
          : "border border-neutron/15 text-neutron hover:border-cosmic hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function Readout({ items }: { items: { label: string; value: string; color?: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg bg-white/5 px-3 py-2">
          <p className="text-[0.7rem] uppercase tracking-wide text-neutron/45">{it.label}</p>
          <p className="font-mono text-sm font-semibold tabular-nums" style={{ color: it.color }}>
            {it.value}
          </p>
        </div>
      ))}
    </div>
  );
}

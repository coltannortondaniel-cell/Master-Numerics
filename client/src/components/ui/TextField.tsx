import type { InputHTMLAttributes } from "react";
import { useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ label, error, hint, ...rest }: Props) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutron/80">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`rounded-xl bg-space/70 border px-4 py-3 text-neutron placeholder:text-neutron/30
          transition-colors duration-200 focus:outline-none
          ${error ? "border-alert focus:border-alert" : "border-neutron/15 focus:border-cosmic"}`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-neutron/40">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

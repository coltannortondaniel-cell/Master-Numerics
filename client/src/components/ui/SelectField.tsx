import type { SelectHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export function SelectField({ label, error, children, ...rest }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutron/80">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={!!error}
        className={`rounded-xl bg-space/70 border px-4 py-3 text-neutron transition-colors duration-200
          focus:outline-none ${error ? "border-alert" : "border-neutron/15 focus:border-cosmic"}`}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p role="alert" className="text-sm text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

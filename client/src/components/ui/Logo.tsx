import { Link } from "react-router-dom";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link to="/" className="inline-flex items-baseline gap-1 no-underline">
      <span
        className={`font-display font-bold tracking-tight text-neutron ${
          size === "lg" ? "text-3xl" : "text-xl"
        }`}
      >
        Master
      </span>
      <span
        className={`font-mono font-semibold text-solar ${
          size === "lg" ? "text-3xl" : "text-xl"
        }`}
      >
        Numerics
      </span>
    </Link>
  );
}

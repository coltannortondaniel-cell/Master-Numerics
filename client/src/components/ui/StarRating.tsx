import { Star } from "lucide-react";

interface Props {
  /** Number of earned stars. */
  count: number;
  max?: number;
  size?: number;
  className?: string;
  /** Filled-star color class. Defaults to currency gold; maps pass a
   *  monochrome class so the only color on the map is "you are here". */
  fillClass?: string;
}

/**
 * 1–3 star rating shown above each unit node (earned by mastery / quiz score).
 * Earned stars use the warm `star` token; the rest are faint outlines.
 */
export function StarRating({ count, max = 3, size = 16, className = "", fillClass = "text-star" }: Props) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${count} of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < count;
        return (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={filled ? fillClass : "text-fg/20"}
            fill={filled ? "currentColor" : "none"}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

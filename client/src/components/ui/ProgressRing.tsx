interface Props {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

/** Circular progress indicator used for world/lesson completion. */
export function ProgressRing({
  value,
  size = 44,
  stroke = 4,
  color = "#22D3A0",
  trackColor = "rgba(240,244,255,0.12)",
  children,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      {children && (
        <span className="absolute inset-0 flex items-center justify-center text-[0.7rem] font-mono">
          {children}
        </span>
      )}
    </div>
  );
}

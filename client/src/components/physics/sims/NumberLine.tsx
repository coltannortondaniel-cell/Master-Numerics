import { useState } from "react";
import { SimFrame, SliderControl, SegmentedControl, SimButton } from "./SimControls";

/**
 * number-line — model addition and subtraction as jumps along a number line.
 * Pick a starting number, an operation (+ or −), and an amount; each jump is
 * one unit, and the landing spot is the answer. Reinforces that adding moves
 * right and subtracting moves left.
 */
const MIN = 0;
const MAX = 20;

export function NumberLine() {
  const [start, setStart] = useState(3);
  const [op, setOp] = useState<"add" | "sub">("add");
  const [amount, setAmount] = useState(4);
  const [jumps, setJumps] = useState(0); // jumps taken so far

  const sign = op === "add" ? 1 : -1;
  const result = clamp(start + sign * amount);
  const current = clamp(start + sign * jumps);
  const done = jumps >= amount;

  function step() {
    if (jumps < amount) setJumps((j) => j + 1);
  }
  function reset() {
    setJumps(0);
  }
  function setStartClamped(v: number) {
    setStart(v);
    setJumps(0);
  }

  // SVG geometry
  const W = 340;
  const H = 120;
  const padX = 18;
  const span = W - padX * 2;
  const x = (n: number) => padX + (n / MAX) * span;
  const yLine = 78;

  return (
    <SimFrame>
      <div className="mb-3 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neutron/45">
          {start} {op === "add" ? "+" : "−"} {amount} ={" "}
          <span className="text-solar">{done ? result : "?"}</span>
        </p>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-space/60">
        {/* axis */}
        <line x1={padX} y1={yLine} x2={W - padX} y2={yLine} stroke="rgba(240,244,255,0.35)" strokeWidth="1.5" />
        {/* ticks + labels */}
        {Array.from({ length: MAX + 1 }).map((_, n) => (
          <g key={n}>
            <line x1={x(n)} y1={yLine - 4} x2={x(n)} y2={yLine + 4} stroke="rgba(240,244,255,0.3)" strokeWidth="1" />
            {n % 2 === 0 && (
              <text x={x(n)} y={yLine + 18} fontSize="8" textAnchor="middle" fill="rgba(240,244,255,0.5)">
                {n}
              </text>
            )}
          </g>
        ))}

        {/* jump arcs already taken */}
        {Array.from({ length: jumps }).map((_, i) => {
          const from = clamp(start + sign * i);
          const to = clamp(start + sign * (i + 1));
          const mid = (x(from) + x(to)) / 2;
          return (
            <path
              key={i}
              d={`M ${x(from)} ${yLine} Q ${mid} ${yLine - 30} ${x(to)} ${yLine}`}
              fill="none"
              stroke={op === "add" ? "#22D3A0" : "#FF8C42"}
              strokeWidth="2"
              markerEnd="url(#nl-arrow)"
            />
          );
        })}
        <defs>
          <marker id="nl-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={op === "add" ? "#22D3A0" : "#FF8C42"} />
          </marker>
        </defs>

        {/* start marker */}
        <circle cx={x(start)} cy={yLine} r="4" fill="#7FB3FF" />
        {/* current position marker */}
        <g transform={`translate(${x(current)} ${yLine})`}>
          <circle r="6" fill="#FFB800" stroke="#0A0B14" strokeWidth="1.5" />
        </g>
        <text x={x(current)} y={yLine - 14} fontSize="11" textAnchor="middle" fill="#FFB800" fontWeight="bold">
          {current}
        </text>
      </svg>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Start at" value={start} min={MIN} max={MAX} step={1} onChange={setStartClamped} />
        <SliderControl label="Amount" value={amount} min={1} max={10} step={1} onChange={(v) => { setAmount(v); setJumps(0); }} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SegmentedControl
          label="Operation"
          options={[
            { value: "add", label: "Add  +" },
            { value: "sub", label: "Subtract  −" },
          ]}
          value={op}
          onChange={(v) => { setOp(v); setJumps(0); }}
        />
        <div className="ml-auto flex gap-2">
          <SimButton onClick={step} active={!done}>{done ? "Landed" : `Jump (${jumps}/${amount})`}</SimButton>
          <SimButton onClick={reset}>Reset</SimButton>
        </div>
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        Adding jumps to the <span className="text-success">right</span>; subtracting jumps to the{" "}
        <span className="text-[#FF8C42]">left</span>. Each jump is one unit — the spot you land on is the answer.
      </p>
    </SimFrame>
  );
}

function clamp(n: number) {
  return Math.max(MIN, Math.min(MAX, n));
}

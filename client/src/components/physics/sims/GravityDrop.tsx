import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * gravity-drop — drop identical balls on Earth, the Moon, and a planet you
 * design with the gravity slider. Weaker gravity ⇒ a slower, floatier fall.
 */
const FALL_HEIGHT_M = 10; // metres
const G_EARTH = 9.8;
const G_MOON = 1.62;

interface Lane {
  key: string;
  label: string;
  g: number;
  color: string;
}

export function GravityDrop() {
  const [customG, setCustomG] = useState(3.7); // Mars-ish
  const [running, setRunning] = useState(false);
  const [times, setTimes] = useState<Record<string, number | null>>({});
  const [t, setT] = useState(0);
  const raf = useRef<number>();
  const start = useRef(0);

  const lanes: Lane[] = [
    { key: "earth", label: "Earth", g: G_EARTH, color: "#22D3A0" },
    { key: "moon", label: "Moon", g: G_MOON, color: "#C9CED6" },
    { key: "custom", label: "Your planet", g: customG, color: "#FFB800" },
  ];

  function drop() {
    setTimes({});
    setT(0);
    start.current = performance.now();
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setT(0);
    setTimes({});
  }

  useEffect(() => {
    if (!running) return;
    const landTimes: Record<string, number> = {};
    for (const l of lanes) landTimes[l.key] = Math.sqrt((2 * FALL_HEIGHT_M) / l.g);
    const maxT = Math.max(...Object.values(landTimes));

    const tick = () => {
      const elapsed = (performance.now() - start.current) / 1000;
      setT(elapsed);
      if (elapsed >= maxT) {
        setTimes(landTimes);
        setRunning(false);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, customG]);

  const fallenFrac = (g: number) => {
    const fallen = 0.5 * g * t * t; // metres
    return Math.min(1, fallen / FALL_HEIGHT_M);
  };

  return (
    <SimFrame>
      <div className="grid grid-cols-3 gap-3">
        {lanes.map((l) => {
          const frac = running || t > 0 ? fallenFrac(l.g) : 0;
          const landed = times[l.key] != null;
          return (
            <div key={l.key} className="flex flex-col items-center">
              <div className="relative h-56 w-full overflow-hidden rounded-lg border border-neutron/10 bg-gradient-to-b from-space to-black/40">
                <div
                  className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full"
                  style={{
                    top: `calc(${frac * 100}% - ${frac * 20}px + 6px)`,
                    background: `radial-gradient(circle at 35% 30%, #fff, ${l.color})`,
                    boxShadow: `0 0 12px ${l.color}`,
                    transition: landed ? "none" : undefined,
                  }}
                />
                <div className="absolute bottom-0 h-1 w-full" style={{ background: `${l.color}66` }} />
              </div>
              <p className="mt-2 text-sm font-semibold" style={{ color: l.color }}>
                {l.label}
              </p>
              <p className="font-mono text-xs text-neutron/50">
                g = {l.g.toFixed(2)} m/s²
              </p>
              <p className="font-mono text-xs text-neutron/70">
                {landed ? `${times[l.key]!.toFixed(2)} s` : running ? "…" : "—"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <SliderControl
          label="Your planet's gravity"
          value={customG}
          min={0.5}
          max={25}
          step={0.1}
          unit="m/s²"
          onChange={setCustomG}
          format={(v) => v.toFixed(1)}
        />
        <div className="flex items-center gap-2">
          <SimButton onClick={drop} active={running}>
            {running ? "Falling…" : "Drop"}
          </SimButton>
          <SimButton onClick={reset}>Reset</SimButton>
        </div>
        <Readout
          items={[
            { label: "Drop height", value: `${FALL_HEIGHT_M} m` },
            { label: "Moon vs Earth", value: `${(G_EARTH / G_MOON).toFixed(1)}× slower` },
            {
              label: "Your fall",
              value: `${Math.sqrt((2 * FALL_HEIGHT_M) / customG).toFixed(2)} s`,
              color: "#FFB800",
            },
          ]}
        />
      </div>
    </SimFrame>
  );
}

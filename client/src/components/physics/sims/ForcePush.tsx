import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * force-push — Newton's second law made physical: a = F / m. Pick a force and a
 * mass, push the crate, and watch heavier crates accelerate more slowly.
 */
export function ForcePush() {
  const [force, setForce] = useState(20); // N
  const [mass, setMass] = useState(4); // kg
  const [x, setX] = useState(0); // metres along the 12 m track
  const [v, setV] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef<number>();
  const last = useRef(0);

  const a = force / mass;
  const TRACK = 12;

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last.current) / 1000);
      last.current = now;
      setV((vv) => vv + a * dt);
      setX((xx) => {
        const nx = xx + v * dt;
        if (nx >= TRACK) {
          setRunning(false);
          return TRACK;
        }
        return nx;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, v, a]);

  function push() {
    setX(0);
    setV(0);
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    setX(0);
    setV(0);
  }

  const leftPct = (x / TRACK) * 88;
  const boxSize = 26 + Math.min(28, mass * 3);

  return (
    <SimFrame>
      <div className="relative h-40 overflow-hidden rounded-lg border border-neutron/10 bg-gradient-to-b from-space to-black/40">
        {/* ground */}
        <div className="absolute bottom-6 left-0 right-0 h-px bg-neutron/20" />
        {/* crate */}
        <div
          className="absolute bottom-6"
          style={{ left: `${leftPct}%`, transition: running ? "none" : "left 200ms" }}
        >
          <div
            className="grid place-items-center rounded bg-gradient-to-br from-solar to-[#c77f00] text-space font-bold shadow-glow-gold"
            style={{ width: boxSize, height: boxSize }}
          >
            {mass}kg
          </div>
          {/* force arrow */}
          {(running || x === 0) && (
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: boxSize + 4, width: 18 + force, height: 0 }}
            >
              <div className="h-0.5 w-full bg-alert" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-l-8 border-y-transparent border-l-alert" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Force" value={force} min={2} max={60} step={1} unit="N" onChange={setForce} />
        <SliderControl label="Mass" value={mass} min={1} max={16} step={1} unit="kg" onChange={setMass} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <SimButton onClick={push} active={running}>
          {running ? "Pushing…" : "Push!"}
        </SimButton>
        <SimButton onClick={reset}>Reset</SimButton>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Acceleration", value: `${a.toFixed(2)} m/s²`, color: "#9FB6D4" },
            { label: "Speed", value: `${v.toFixed(1)} m/s` },
            { label: "Distance", value: `${x.toFixed(1)} m` },
          ]}
        />
      </div>
    </SimFrame>
  );
}

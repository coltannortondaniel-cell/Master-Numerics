import { useEffect, useRef } from "react";

/**
 * Ambient, behind-everything deep-space field on a single <canvas> (brief §2).
 *
 * Three parallax layers create depth: a FAR layer of tiny, dim, slow specks; a
 * MID layer of small drifting dust; and a NEAR layer of larger, brighter dots
 * that genuinely attract one another (softened Newtonian gravity) — falling into
 * slow orbits and slingshots, speed-clamped + damped so the motion stays calm.
 * Everything is greyscale (ink-500 → white) over near-black, with a faint
 * vignette. It never competes with foreground content.
 *
 * Accessibility: under prefers-reduced-motion (or the in-app data-motion="reduced"
 * toggle) it renders a single static frame and never animates.
 * Performance: one canvas + rAF, paused when the tab is hidden; particle counts
 * are capped on mobile; the O(n²) attraction runs on the small NEAR layer only.
 */

interface P {
  x: number; y: number; vx: number; vy: number; r: number; m: number; lum: number;
}

interface Layer {
  ps: P[];
  alpha: number; // overall layer opacity
  gravity: boolean; // near layer only
  links: boolean; // constellation links (near only)
}

// NEAR-layer gravity tunables — chosen so orbits stay graceful (brief §2).
const G = 0.06;
const DT = 0.9;
const MAX_SPEED = 0.6;
const DAMPING = 0.999;
const SOFTENING = 12;
const LINK_DIST = 90;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flag = document.documentElement.dataset.motion === "reduced";
  return mq || flag;
}

export function GravityField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0, dpr = 1;
    let layers: Layer[] = [];
    let running = false;

    const mobile = () => window.innerWidth < 768;

    // [count, rMin, rMax, driftMax, lumMin, lumMax, alpha]
    function configs(): Array<{ n: number; rMin: number; rMax: number; drift: number; lumMin: number; lumMax: number; alpha: number; gravity: boolean; links: boolean }> {
      const m = mobile();
      return [
        // FAR: tiny, dim, slow, plentiful — pure parallax drift
        { n: m ? 40 : 90, rMin: 0.4, rMax: 1.0, drift: 0.04, lumMin: 120, lumMax: 160, alpha: 0.5, gravity: false, links: false },
        // MID: small dust, a touch faster/brighter
        { n: m ? 22 : 50, rMin: 0.9, rMax: 1.7, drift: 0.1, lumMin: 165, lumMax: 200, alpha: 0.55, gravity: false, links: false },
        // NEAR: larger, bright, gravitating bodies + constellation links
        { n: m ? 12 : 24, rMin: 1.8, rMax: 4.0, drift: 0.18, lumMin: 205, lumMax: 255, alpha: 0.6, gravity: true, links: true },
      ];
    }

    function spawn() {
      layers = configs().map((c) => ({
        alpha: c.alpha,
        gravity: c.gravity,
        links: c.links,
        ps: Array.from({ length: c.n }, () => {
          const r = c.rMin + Math.random() * (c.rMax - c.rMin);
          const t = (r - c.rMin) / Math.max(0.001, c.rMax - c.rMin);
          return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * c.drift,
            vy: (Math.random() - 0.5) * c.drift,
            r,
            m: r * r, // mass ∝ radius² → bigger dots pull harder
            lum: Math.round(c.lumMin + t * (c.lumMax - c.lumMin)),
          };
        }),
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }

    function gravitate(ps: P[]) {
      const n = ps.length;
      for (let i = 0; i < n; i++) {
        const a = ps[i];
        for (let j = i + 1; j < n; j++) {
          const b = ps[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const r2 = dx * dx + dy * dy + SOFTENING * SOFTENING;
          const inv = 1 / Math.sqrt(r2);
          const f = (G * a.m * b.m) / r2;
          const fx = f * dx * inv, fy = f * dy * inv;
          a.vx += (fx / a.m) * DT; a.vy += (fy / a.m) * DT;
          b.vx -= (fx / b.m) * DT; b.vy -= (fy / b.m) * DT;
        }
      }
    }

    function integrate(ps: P[], clamp: boolean) {
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (clamp) {
          p.vx *= DAMPING; p.vy *= DAMPING;
          const sp = Math.hypot(p.vx, p.vy);
          if (sp > MAX_SPEED) { p.vx = (p.vx / sp) * MAX_SPEED; p.vy = (p.vy / sp) * MAX_SPEED; }
        }
        p.x += p.vx * DT; p.y += p.vy * DT;
        // soft wrap-around so the field never empties
        if (p.x < -5) p.x = W + 5; else if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5; else if (p.y > H + 5) p.y = -5;
      }
    }

    function step() {
      for (const layer of layers) {
        if (layer.gravity) gravitate(layer.ps);
        integrate(layer.ps, layer.gravity);
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const layer of layers) {
        const ps = layer.ps;
        if (layer.links) {
          ctx!.lineWidth = 1;
          for (let i = 0; i < ps.length; i++) {
            const a = ps[i];
            for (let j = i + 1; j < ps.length; j++) {
              const b = ps[j];
              const dx = b.x - a.x, dy = b.y - a.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < LINK_DIST * LINK_DIST) {
                const o = (1 - Math.sqrt(d2) / LINK_DIST) * 0.1 * layer.alpha;
                ctx!.strokeStyle = `rgba(210,214,222,${o.toFixed(3)})`;
                ctx!.beginPath();
                ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
              }
            }
          }
        }
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          ctx!.fillStyle = `rgba(${p.lum},${p.lum},${p.lum},${layer.alpha.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      // faint vignette — darkens the edges so content reads clearly
      const g = ctx!.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      g.addColorStop(0, "rgba(6,7,8,0)");
      g.addColorStop(1, "rgba(6,7,8,0.55)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);
    }

    function loop() { step(); draw(); raf = requestAnimationFrame(loop); }
    function start() { if (running) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
    function staticFrame() { for (let i = 0; i < 140; i++) step(); draw(); }

    resize();
    if (prefersReducedMotion()) staticFrame(); else start();

    const onResize = () => { resize(); if (prefersReducedMotion()) staticFrame(); };
    const onVisibility = () => {
      if (prefersReducedMotion()) return;
      if (document.hidden) stop(); else start();
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => { stop(); if (prefersReducedMotion()) staticFrame(); else start(); };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    mq.addEventListener?.("change", onMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}

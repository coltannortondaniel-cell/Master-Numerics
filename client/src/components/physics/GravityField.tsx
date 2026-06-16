import { useEffect, useRef } from "react";

/**
 * Ambient, behind-everything n-body gravity field on a single <canvas>.
 *
 * Different-sized dots genuinely attract each other (softened Newtonian gravity),
 * fall into orbits, swing past, and slingshot — but the system is deliberately
 * slow and calm (low G + velocity clamp + damping). It evokes "scaling objects,
 * deeper into space" without ever competing with foreground content.
 *
 * Accessibility: under prefers-reduced-motion (or the in-app data-motion="reduced"
 * toggle) it renders a single static frame and never animates.
 */

interface P {
  x: number; y: number; vx: number; vy: number; r: number; m: number;
}

// Tunables — chosen so orbits stay graceful (see brief §2).
const G = 0.06;
const DT = 0.9;
const MAX_SPEED = 0.6;
const DAMPING = 0.999;
const SOFTENING = 12;
const LINK_DIST = 90;

function accentRGB(): [number, number, number] {
  if (typeof window === "undefined") return [91, 163, 245];
  const v = getComputedStyle(document.documentElement).getPropertyValue("--c-accent").trim();
  const m = v.split(/\s+/).map(Number);
  return m.length === 3 && m.every((n) => Number.isFinite(n)) ? [m[0], m[1], m[2]] : [91, 163, 245];
}

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
    let particles: P[] = [];
    let running = false;

    function count(): number {
      return window.innerWidth < 768 ? 45 : 120;
    }

    function spawn() {
      const n = count();
      particles = Array.from({ length: n }, () => {
        const r = 1 + Math.random() * 3; // 1–4 px
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r,
          m: r * r, // mass ∝ radius² → bigger dots pull harder
        };
      });
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

    function step() {
      const n = particles.length;
      // pairwise softened gravity (O(n²); fine at n≤120)
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const r2 = dx * dx + dy * dy + SOFTENING * SOFTENING;
          const inv = 1 / Math.sqrt(r2);
          const f = (G * a.m * b.m) / r2;
          const fx = f * dx * inv;
          const fy = f * dy * inv;
          a.vx += (fx / a.m) * DT;
          a.vy += (fy / a.m) * DT;
          b.vx -= (fx / b.m) * DT;
          b.vy -= (fy / b.m) * DT;
        }
      }
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > MAX_SPEED) {
          p.vx = (p.vx / sp) * MAX_SPEED;
          p.vy = (p.vy / sp) * MAX_SPEED;
        }
        p.x += p.vx * DT;
        p.y += p.vy * DT;
        // soft wrap-around so the field never empties
        if (p.x < -5) p.x = W + 5; else if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5; else if (p.y > H + 5) p.y = -5;
      }
    }

    function draw() {
      const [cr, cg, cb] = accentRGB();
      ctx!.clearRect(0, 0, W, H);
      const n = particles.length;
      // faint constellation links between close particles
      ctx!.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const o = (1 - Math.sqrt(d2) / LINK_DIST) * 0.12;
            ctx!.strokeStyle = `rgba(${cr},${cg},${cb},${o.toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      // dots — bigger = brighter
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        const o = 0.25 + (p.r / 4) * 0.35;
        ctx!.fillStyle = `rgba(${cr},${cg},${cb},${o.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function staticFrame() {
      // Settle a little, then draw one frame — no ongoing animation.
      for (let i = 0; i < 140; i++) step();
      draw();
    }

    resize();

    if (prefersReducedMotion()) {
      staticFrame();
    } else {
      start();
    }

    const onResize = () => {
      resize();
      if (prefersReducedMotion()) staticFrame();
    };
    const onVisibility = () => {
      if (prefersReducedMotion()) return;
      if (document.hidden) stop();
      else start();
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      stop();
      if (prefersReducedMotion()) staticFrame();
      else start();
    };

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

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

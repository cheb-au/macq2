import { useEffect, useRef } from "react";

const CX = 900;
const CY = 612;
const TILT = -0.42;

/**
 * The decision doesn't fade in - it detonates. As the artefacts collapse, a
 * flash and shockwaves rip outward through the black and the planet snaps into
 * being, its ring spinning around it on a fixed axis.
 */
export function DecisionSphere({ formed }: { formed: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(0);
  target.current = formed ? 1 : 0;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const W = 1920;
    const H = 1080;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let prog = 0;
    let last = 0;
    let t = 0;
    let prevT = 0;
    let delayT = -1; // counts up once the suck begins; planet forms after DELAY
    let fired = false;
    let burstT = 1; // 1 = finished (no burst yet)
    const DELAY = 0.82; // let the artefacts whirl in before the detonation
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const cosR = Math.cos(TILT);
    const sinR = Math.sin(TILT);

    const draw = (ts: number) => {
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      t += dt;

      // arm on the collapse, then detonate once the artefacts have arrived
      if (target.current === 1 && prevT === 0) {
        delayT = 0;
        fired = false;
      }
      if (target.current === 0) {
        delayT = -1;
      }
      prevT = target.current;

      let grow = 0;
      if (delayT >= 0) {
        delayT += dt;
        if (delayT >= DELAY) {
          grow = 1;
          if (!fired) {
            burstT = 0;
            fired = true;
          }
        }
      }
      if (burstT < 1) burstT += dt / 0.85;
      const bt = Math.min(1, Math.max(0, burstT));
      const bursting = burstT < 1;

      prog += (grow - prog) * (1 - Math.exp(-dt * 6.5));
      const p = ease(Math.min(1, prog));
      ctx.clearRect(0, 0, W, H);

      if (p <= 0.02 && !bursting) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // brief scale pop on impact
      const pop = bursting ? 1 + Math.sin(bt * Math.PI) * 0.16 : 1;
      const R = (20 + p * p * 54) * pop;
      const rx = R * 2.05;
      const ry = R * 0.62;

      const ringPos = (theta: number) => {
        const ex = rx * Math.cos(theta);
        const ey = ry * Math.sin(theta);
        return {
          x: CX + cosR * ex - sinR * ey,
          y: CY + sinR * ex + cosR * ey,
          depth: Math.sin(theta),
        };
      };

      // atmospheric halo
      const halo = ctx.createRadialGradient(CX, CY, R * 0.6, CX, CY, R * 3.8);
      halo.addColorStop(0, `rgba(150,160,255,${0.32 * p})`);
      halo.addColorStop(0.4, `rgba(120,130,240,${0.12 * p})`);
      halo.addColorStop(1, "rgba(120,130,240,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(CX, CY, R * 3.8, 0, Math.PI * 2);
      ctx.fill();

      // ---- ring particles: back half (behind the planet) ----
      const N = 48;
      const spin = t * 0.7;
      for (let i = 0; i < N; i++) {
        const theta = (i / N) * Math.PI * 2 + spin;
        const pt = ringPos(theta);
        if (pt.depth > 0) continue; // front half drawn later
        const dist = Math.hypot(pt.x - CX, pt.y - CY);
        if (dist < R * 0.98) continue; // hidden behind the planet
        const b = pt.depth * 0.5 + 0.5;
        ctx.fillStyle = `rgba(150,160,240,${(0.14 + b * 0.3) * p})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.4 + b * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- planet body ----
      const lx = CX - R * 0.4;
      const ly = CY - R * 0.42;
      const body = ctx.createRadialGradient(lx, ly, R * 0.1, CX, CY, R * 1.05);
      body.addColorStop(0, `rgba(244,246,255,${p})`);
      body.addColorStop(0.35, `rgba(168,176,246,${p})`);
      body.addColorStop(0.75, `rgba(96,104,205,${p})`);
      body.addColorStop(1, `rgba(38,42,86,${p})`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fill();

      // rim
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,206,255,${0.5 * p})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // specular
      const spec = ctx.createRadialGradient(lx, ly, 0, lx, ly, R * 0.55);
      spec.addColorStop(0, `rgba(255,255,255,${0.55 * p})`);
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(lx, ly, R * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // ---- ring particles: front half (over the planet) ----
      for (let i = 0; i < N; i++) {
        const theta = (i / N) * Math.PI * 2 + spin;
        const pt = ringPos(theta);
        if (pt.depth <= 0) continue;
        const b = pt.depth * 0.5 + 0.5;
        ctx.fillStyle = `rgba(206,212,255,${(0.2 + b * 0.55) * p})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.6 + b * 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- explosion: shockwaves + flash ----
      if (bt < 1) {
        for (let s = 0; s < 3; s++) {
          const st = bt - s * 0.13;
          if (st > 0 && st < 1) {
            const rr = st * 820;
            const a = (1 - st) * 0.5 * (1 - s * 0.24);
            ctx.strokeStyle = `rgba(184,192,255,${a})`;
            ctx.lineWidth = 2.4 * (1 - st) + 0.4;
            ctx.beginPath();
            ctx.ellipse(CX, CY, rr, rr * 0.72, TILT, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        const flashR = 40 + bt * 560;
        const flashA = Math.pow(1 - bt, 1.6) * 0.95;
        const fg = ctx.createRadialGradient(CX, CY, 0, CX, CY, flashR);
        fg.addColorStop(0, `rgba(236,238,255,${flashA})`);
        fg.addColorStop(0.45, `rgba(150,160,255,${flashA * 0.4})`);
        fg.addColorStop(1, "rgba(150,160,255,0)");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(CX, CY, flashR, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

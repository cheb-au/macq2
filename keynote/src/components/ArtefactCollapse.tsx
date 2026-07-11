import { useEffect, useRef } from "react";

/**
 * A field of hundreds of "artefacts" (documents, specs, screens) that drift
 * as loose noise, then collapse and swirl into a single luminous decision.
 * `phase`: 0 = scattered, 1 = converging, 2 = collapsed to one point.
 */
export function ArtefactCollapse({ phase }: { phase: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(0);
  target.current = phase >= 2 ? 1 : 0;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const W = 1920;
    const H = 1080;
    const cx = W / 2;
    const cy = 540;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const N = 460;
    const parts = Array.from({ length: N }, (_, k) => {
      // deterministic radial scatter (no RNG so resume/replay is stable)
      const ang = k * 2.399963; // golden angle
      const rad = 120 + Math.sqrt(k / N) * 560;
      const wob = ((k * 53) % 100) / 100;
      return {
        ang,
        rad,
        size: 2 + (wob * 4),
        spin: 0.6 + wob * 1.8,
        hue: wob,
        ox: Math.cos(ang) * rad,
        oy: Math.sin(ang) * rad * 0.62,
      };
    });

    let raf = 0;
    let prog = 0;
    let t = 0;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const draw = () => {
      t += 0.006;
      prog += (target.current - prog) * 0.045;
      const p = ease(Math.min(1, prog));
      ctx.clearRect(0, 0, W, H);

      // artefacts
      for (let k = 0; k < N; k++) {
        const q = parts[k];
        const drift = (1 - p);
        const ang = q.ang + t * 0.12 * q.spin + p * q.spin * 3.4;
        const rad = q.rad * (1 - p) + 2 * p;
        const x = cx + Math.cos(ang) * rad + Math.sin(t + k) * 3 * drift;
        const y =
          cy + Math.sin(ang) * rad * 0.62 + Math.cos(t * 0.8 + k) * 3 * drift;
        const s = q.size * (1 - p * 0.75);
        const baseA = 0.05 + q.hue * 0.14;
        const a = baseA * (1 - p) + 0.5 * p;
        // colour lerps from cool grey to violet as it collapses
        const r = Math.round(150 + p * 40);
        const g = Math.round(156 + p * 20);
        const b = Math.round(180 + p * 70);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fillRect(x - s / 2, y - s / 2, s, s * 1.3);
      }

      // the emerging decision core
      if (p > 0.05) {
        const R = 20 + p * p * 52; // planet radius

        // atmospheric outer glow
        const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 3.6);
        halo.addColorStop(0, `rgba(150,160,255,${0.3 * p})`);
        halo.addColorStop(0.4, `rgba(120,130,240,${0.12 * p})`);
        halo.addColorStop(1, "rgba(120,130,240,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 3.6, 0, Math.PI * 2);
        ctx.fill();

        // planetary ring, tilted - drawn behind the planet
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * 2.05, R * 0.62, -0.42, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(178,186,255,${0.32 * p})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * 1.7, R * 0.5, -0.42, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150,160,240,${0.16 * p})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // planet body - shaded sphere, light from upper-left
        const lx = cx - R * 0.4;
        const ly = cy - R * 0.42;
        const body = ctx.createRadialGradient(lx, ly, R * 0.1, cx, cy, R * 1.05);
        body.addColorStop(0, `rgba(244,246,255,${p})`);
        body.addColorStop(0.35, `rgba(168,176,246,${p})`);
        body.addColorStop(0.75, `rgba(96,104,205,${p})`);
        body.addColorStop(1, `rgba(38,42,86,${p})`);
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();

        // rim / atmosphere light on the lit edge
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,206,255,${0.5 * p})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // specular highlight
        const spec = ctx.createRadialGradient(lx, ly, 0, lx, ly, R * 0.55);
        spec.addColorStop(0, `rgba(255,255,255,${0.55 * p})`);
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = spec;
        ctx.beginPath();
        ctx.arc(lx, ly, R * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // front arc of the ring, over the planet's lower edge
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * 2.05, R * 0.62, -0.42, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.strokeStyle = `rgba(190,198,255,${0.34 * p})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
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
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

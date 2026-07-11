import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  z: number; // depth 0..1
  vx: number;
  vy: number;
  r: number;
}

/**
 * Persistent ambient constellation that lives behind every slide.
 * Slow drifting nodes connected by thin lines - the "digital environment"
 * the presentation travels through. Runs on one canvas for the whole deck.
 */
export function NodeField({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const W = 1920;
    const H = 1080;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const COUNT = 58;
    const nodes: Node[] = Array.from({ length: COUNT }, (_, k) => {
      const z = (k % 10) / 10; // deterministic depth spread, no RNG
      const gx = ((k * 137.5) % 100) / 100;
      const gy = ((k * 71.3) % 100) / 100;
      return {
        x: gx * W,
        y: gy * H,
        z,
        vx: (Math.sin(k * 1.7) * 0.12 + 0.04) * (0.4 + z),
        vy: (Math.cos(k * 2.3) * 0.1 + 0.03) * (0.4 + z),
        r: 0.8 + z * 2.2,
      };
    });

    let raf = 0;
    let t = 0;
    const LINK = 240;

    const draw = () => {
      t += 0.0032;
      ctx.clearRect(0, 0, W, H);
      const glow = intensityRef.current;

      // update
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // slow breathing drift
        n.x += Math.sin(t + n.z * 6) * 0.14;
        n.y += Math.cos(t * 0.8 + n.z * 4) * 0.12;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const alpha =
              (1 - d / LINK) * 0.14 * glow * (0.4 + (a.z + b.z) / 2);
            ctx.strokeStyle = `rgba(150,160,210,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const a = (0.18 + n.z * 0.5) * glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,206,230,${a})`;
        ctx.fill();
        if (n.z > 0.72) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,147,255,${0.05 * glow})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="stage__ambient"
      style={{ width: 1920, height: 1080 }}
    />
  );
}

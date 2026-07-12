import { useEffect, useRef } from "react";

export const LINEAR = ["Research", "Design", "Engineering", "QA", "Release"];
// clockwise from the top
const LOOP = ["Signal", "Hypothesis", "Prototype", "Evidence", "Learning"];

const CX = 460;
const CY = 350;
const R = 215;

function linearPos(i: number) {
  return { x: CX, y: 60 + i * 142 };
}
function loopPos(i: number) {
  const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
  return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R };
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/**
 * The signature moment for "AI changes how work gets done":
 * five stages sit in a rigid, top-down assembly line, then physically
 * reorganise - gliding into a circular feedback loop with a signal that
 * begins to travel continuously around it.  `mode` 0 = line, 1 = loop.
 */
export function PipelineReorg({ mode }: { mode: number }) {
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const linLabels = useRef<(SVGTextElement | null)[]>([]);
  const loopLabels = useRef<(SVGTextElement | null)[]>([]);
  const path = useRef<SVGPathElement>(null);
  const closeSeg = useRef<SVGPathElement>(null);
  const signal = useRef<SVGCircleElement>(null);
  const waitHints = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let m = 0;
    let sig = 0;
    let last = 0;
    const step = (ts: number) => {
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      // framerate-independent approach so the morph always lands in ~1s
      m += (modeRef.current - m) * (1 - Math.exp(-dt * 5));
      const e = easeInOut(Math.min(1, Math.max(0, m)));

      const cur = LINEAR.map((_, i) => {
        const a = linearPos(i);
        const b = loopPos(i);
        return { x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e) };
      });

      cur.forEach((p, i) => {
        nodes.current[i]?.setAttribute(
          "transform",
          `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`
        );
        linLabels.current[i]?.setAttribute("opacity", (1 - e).toFixed(3));
        loopLabels.current[i]?.setAttribute("opacity", e.toFixed(3));
        waitHints.current[i]?.setAttribute(
          "opacity",
          (Math.max(0, 1 - e * 2.2) * 0.9).toFixed(3)
        );
      });

      // main path through nodes 0..4
      let d = `M ${cur[0].x} ${cur[0].y}`;
      for (let i = 1; i < cur.length; i++) d += ` L ${cur[i].x} ${cur[i].y}`;
      path.current?.setAttribute("d", d);
      // closing segment 4 -> 0, curved outward, fades in with the loop
      const a = cur[4];
      const b = cur[0];
      const mx = (a.x + b.x) / 2 + (a.x - CX) * 0.2;
      const my = (a.y + b.y) / 2;
      closeSeg.current?.setAttribute("d", `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`);
      closeSeg.current?.setAttribute("opacity", (e * 0.9).toFixed(3));

      // travelling signal - speeds up as the loop forms
      sig += dt * (0.06 + e * 0.32);
      if (sig > 1) sig -= 1;
      const seg = sig * 5; // 0..5 across the 5 links (closing link included when loop)
      const segCount = e > 0.4 ? 5 : 4;
      const si = Math.floor(sig * segCount);
      const frac = sig * segCount - si;
      const from = cur[si % 5];
      const to = cur[(si + 1) % 5];
      const sx = lerp(from.x, to.x, frac);
      const sy = lerp(from.y, to.y, frac);
      void seg;
      if (signal.current) {
        signal.current.setAttribute("cx", sx.toFixed(1));
        signal.current.setAttribute("cy", sy.toFixed(1));
        signal.current.setAttribute("opacity", (0.25 + e * 0.75).toFixed(3));
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 920 700" style={{ width: 780, height: 594 }}>
      <defs>
        <linearGradient id="pl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(200,206,230,0.5)" />
          <stop offset="1" stopColor="rgba(139,147,255,0.6)" />
        </linearGradient>
      </defs>

      <path ref={path} fill="none" stroke="url(#pl)" strokeWidth={1.5} strokeLinecap="round" />
      <path ref={closeSeg} fill="none" stroke="var(--violet)" strokeWidth={1.5} strokeDasharray="2 6" strokeLinecap="round" />

      <circle ref={signal} r={5} fill="#fff">
        <animate attributeName="r" values="4;6;4" dur="1.4s" repeatCount="indefinite" />
      </circle>

      {LINEAR.map((lin, i) => (
        <g key={i} ref={(el) => (nodes.current[i] = el)}>
          <circle r={30} fill="rgba(20,23,28,0.9)" stroke="var(--line-strong)" strokeWidth={1} />
          <circle r={30} fill="none" stroke="var(--violet)" strokeWidth={1} opacity={0.25} />
          <circle r={4.5} fill="var(--violet)" />
          <text
            ref={(el) => (linLabels.current[i] = el)}
            x={48}
            y={6}
            fill="var(--ink)"
            fontSize={24}
            fontWeight={500}
            style={{ fontFamily: "var(--font)" }}
          >
            {lin}
          </text>
          <text
            ref={(el) => (loopLabels.current[i] = el)}
            x={0}
            y={-46}
            textAnchor="middle"
            fill="var(--ink)"
            fontSize={20}
            fontWeight={600}
            opacity={0}
            style={{ fontFamily: "var(--font)" }}
          >
            {LOOP[i]}
          </text>
          <text
            ref={(el) => (waitHints.current[i] = el)}
            x={46}
            y={30}
            fill="var(--ink-faint)"
            fontSize={12}
            style={{ fontFamily: "var(--mono)", letterSpacing: "0.1em" }}
          >
            {i < 4 ? "▽ wait" : ""}
          </text>
        </g>
      ))}
    </svg>
  );
}

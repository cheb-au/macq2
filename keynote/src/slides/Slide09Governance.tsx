import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import type { SlideProps } from "../engine/types";

interface Card {
  p: number;
  k: string;
  t: string;
  sub?: string;
  variant: "" | "ai" | "amber" | "judge" | "safe";
  icon: ComponentType<{ size?: number }>;
}

const CARDS: Card[] = [
  { p: 1, k: "Signal", t: "High application abandonment", variant: "", icon: Icon.signal },
  {
    p: 2,
    k: "AI",
    t: "Predicts scarcity messaging will increase completed applications by 8-12%.",
    variant: "ai",
    icon: Icon.node,
  },
  {
    p: 3,
    k: "Proposed",
    t: "Introduce scarcity messaging",
    sub: "“Apply now before this offer ends.”",
    variant: "amber",
    icon: Icon.bolt,
  },
  {
    p: 4,
    k: "Judgement",
    t: "Rejected - optimises conversion at the expense of customer trust.",
    variant: "judge",
    icon: Icon.shield,
  },
  {
    p: 5,
    k: "Resolution",
    t: "Clearer guidance and simpler next steps.",
    sub: "Reduced complexity instead of increasing pressure.",
    variant: "safe",
    icon: Icon.compass,
  },
];

export default function Slide09Governance({ active }: SlideProps) {
  const [p, setP] = useState(0);
  const [struck, setStruck] = useState(false);

  // the slide plays itself: 2s beats, no keyboard taps required
  useEffect(() => {
    if (!active) {
      setP(0);
      setStruck(false);
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    at(400, () => setP(1)); // signal
    at(4400, () => setP(2)); // ai investigates
    at(8400, () => setP(3)); // proposed (amber, attractive)
    at(10000, () => setStruck(true)); // ~1.5s later, turns red (rejected)
    at(12400, () => setP(4)); // judgement (deliberate)
    at(16400, () => setP(5)); // resolution (calm)
    at(20400, () => setP(6)); // takeaway 1
    at(24400, () => setP(7)); // takeaway 2
    return () => timers.forEach((t) => clearTimeout(t));
  }, [active]);

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <span className="kicker">The other side of speed</span>
        <h2 className="h1" style={{ maxWidth: 1300 }}>
          <Words text="Speed without governance" at={0} grad="ink" />
          <br />
          <Words text="becomes risk." at={0} from={3} grad="ink" />
        </h2>
      </div>

      <div className="incident" style={{ marginTop: 48 }}>
        {CARDS.map((c, i) => {
          const shown = p >= c.p;
          const isStruck = c.variant === "amber" && struck;
          const dur = c.variant === "judge" ? 1.1 : 0.6;
          return (
            <div
              key={c.k}
              className={[
                "istep",
                "istep--left",
                `istep--${c.variant || "plain"}`,
                isStruck ? "is-struck" : "",
                shown ? "is-shown" : "",
              ].filter(Boolean).join(" ")}
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateX(-46px)",
                transition: `opacity ${dur}s var(--ease-out), transform ${dur}s var(--ease-out)`,
              }}
            >
              <div className="istep__rail">
                <div className="istep__dot">
                  <c.icon size={20} />
                </div>
                {i < CARDS.length - 1 && <div className="istep__line" />}
              </div>
              <div className="istep__card">
                <div className="istep__k">{c.k}</div>
                <div className="istep__t">{c.t}</div>
                {c.sub && <div className="istep__sub">{c.sub}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="takeaway" style={{ minHeight: 56, marginTop: 34 }}>
        <div
          className="takeaway__text"
          style={{
            color: "var(--ink-faint)",
            opacity: p >= 6 ? 1 : 0,
            transform: p >= 6 ? "none" : "translateY(10px)",
            transition: "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
          }}
        >
          AI found the fastest answer.
        </div>
        <div
          className="takeaway__text"
          style={{
            color: "var(--violet)",
            opacity: p >= 7 ? 1 : 0,
            transform: p >= 7 ? "none" : "translateY(10px)",
            transition: "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
          }}
        >
          Leadership chose the right one.
        </div>
      </div>
    </div>
  );
}

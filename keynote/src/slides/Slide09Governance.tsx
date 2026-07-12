import type { ComponentType } from "react";
import { Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

interface Card {
  p: number;
  k: string;
  t: string;
  sub?: string;
  note?: string;
  cite?: string;
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
    note: "False urgency. Consumer credit.",
    variant: "amber",
    icon: Icon.bolt,
  },
  {
    p: 5,
    k: "Judgement",
    t: "Rejected. Optimises conversion at the expense of customer trust - and lands inside the new Unfair Trading Practices prohibition.",
    cite: "Competition and Consumer Amendment (Unfair Trading Practices) Act 2026 - passed 1 July 2026, commences 1 July 2027.",
    variant: "judge",
    icon: Icon.shield,
  },
  {
    p: 6,
    k: "Resolution",
    t: "Clearer guidance and simpler next steps.",
    sub: "Reduced friction instead of increasing pressure.",
    variant: "safe",
    icon: Icon.compass,
  },
];

// click-driven: 1 signal, 2 AI, 3 proposed (amber, tempting), 4 the turn (red),
// 5 judgement, 6 resolution, 7-8 the two closing lines
export default function Slide09Governance(_: SlideProps) {
  const beat = useBeat();
  const struck = beat >= 4;

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
          const shown = beat >= c.p;
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
                {c.note && <div className="istep__note">{c.note}</div>}
                {c.cite && <div className="istep__cite">{c.cite}</div>}
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
            opacity: beat >= 7 ? 1 : 0,
            transform: beat >= 7 ? "none" : "translateY(10px)",
            transition: "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
          }}
        >
          AI found the fastest answer.
        </div>
        <div
          className="takeaway__text"
          style={{
            color: "var(--violet)",
            opacity: beat >= 8 ? 1 : 0,
            transform: beat >= 8 ? "none" : "translateY(10px)",
            transition: "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
          }}
        >
          Leadership chose the right one.
        </div>
      </div>
    </div>
  );
}

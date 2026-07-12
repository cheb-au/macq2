import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const RUNGS = [
  { label: "Critique", desc: "Learning by reviewing work, not just creating it." },
  {
    label: "Customer exposure",
    desc: "Building empathy through real customer problems and conversations.",
  },
  {
    label: "Systems thinking",
    desc: "Understanding dependencies, platforms and organisational complexity.",
  },
  {
    label: "Commercial context",
    desc: "Balancing customer value with business outcomes, risk and regulation.",
  },
  {
    label: "Verification",
    desc: "Testing assumptions against evidence instead of opinion.",
  },
  {
    label: "Decision quality",
    desc: "Making better decisions with stronger judgement and clearer trade-offs.",
  },
];

export default function Slide10Growth({ review }: SlideProps) {
  const beat = useBeat();
  // capabilities roll in from beat 1; the active one sits at the centre
  const active = beat - 1; // -1 before any capability, 0..5 as they roll
  const rolling = beat >= 1;
  const atDestination = beat >= RUNGS.length; // Decision quality centred

  // review contact sheet: the roller only shows one rung at a time, so expand
  // the whole maturity model into a static, fully-legible ladder
  if (review) {
    return (
      <div className="stack grow" style={{ gap: 8 }}>
        <div className="s-head">
          <span className="kicker">People · The talent question</span>
          <h2 className="h1">
            <Words text="Growing designers in an AI world." at={0} grad="ink" />
          </h2>
        </div>
        <div className="ascent">
          <div className="caproller caproller--review">
            {RUNGS.map((r, i) => (
              <div
                key={r.label}
                className={[
                  "capitem",
                  "capitem--active",
                  i === RUNGS.length - 1 ? "capitem--key" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="capitem__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="capitem__body">
                  <div className="capitem__label">{r.label}</div>
                  <div className="capitem__desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="stack" style={{ gap: 30 }}>
            <p className="h2" style={{ fontSize: 46, lineHeight: 1.2, maxWidth: 700 }}>
              How do we develop great designers after AI removes the{" "}
              <span className="gold">apprenticeship?</span>
            </p>
            <p className="subline" style={{ fontSize: 27, maxWidth: 640 }}>
              AI is reducing the cost of execution.{" "}
              <span className="gold">
                The competitive advantage becomes how quickly people develop
                expertise.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">People · The talent question</span>
        </Reveal>
        <h2 className="h1">
          <Words text="Growing designers in an AI world." at={0} grad="ink" />
        </h2>
      </div>

      <div className="ascent">
        <div
          className="caproller"
          style={{
            opacity: rolling ? 1 : 0,
            transform: "translateY(-82px)", // align the active row with the question
            transition: "opacity 0.6s var(--ease-out)",
          }}
        >
          <span className="caproller__now" />
          {RUNGS.map((r, i) => {
            const rel = i - active;
            const on = rel === 0;
            const dist = Math.abs(rel);
            const isKey = i === RUNGS.length - 1;
            return (
              <div
                key={r.label}
                className={[
                  "capitem",
                  on ? "capitem--active" : "",
                  on && isKey && atDestination ? "capitem--key" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transform: `translateY(calc(-50% + ${rel * 128}px))`,
                  opacity: on ? 1 : Math.max(0.1, 0.5 - dist * 0.17),
                  filter: on ? "blur(0)" : `blur(${Math.min(9, 2.4 + dist * 2.2)}px)`,
                }}
              >
                <span className="capitem__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="capitem__body">
                  <div className="capitem__label">{r.label}</div>
                  <div className="capitem__desc">{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="stack" style={{ gap: 30 }}>
          <Reveal at={0} i={1} variant="rise">
            <p className="h2" style={{ fontSize: 46, lineHeight: 1.2, maxWidth: 700 }}>
              How do we develop great designers after AI removes the{" "}
              <span className="gold">apprenticeship?</span>
            </p>
          </Reveal>
          <Reveal at={7} variant="soft">
            <p className="subline" style={{ fontSize: 27, maxWidth: 640 }}>
              AI is reducing the cost of execution.{" "}
              <span className="gold">
                The competitive advantage becomes how quickly people develop
                expertise.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const STAGES = [
  {
    name: "Customer signal",
    from: "Weeks",
    to: "Hours",
    verb: "Frame",
    bullets: [
      "Separate symptoms from problems.",
      "Decide which signals deserve attention.",
      "Anchor the opportunity.",
    ],
  },
  {
    name: "Hypothesis",
    from: "Days",
    to: "Minutes",
    verb: "Prioritise",
    bullets: [
      "Choose the highest-value assumption.",
      "Balance customer, commercial and technical constraints.",
      "Decide what is worth testing.",
    ],
  },
  {
    name: "Prototype",
    from: "Weeks",
    to: "Hours",
    verb: "Coach",
    bullets: [
      "Challenge the solution.",
      "Raise design quality.",
      "Make the trade-offs explicit.",
    ],
  },
  {
    name: "Evidence",
    from: "Weeks",
    to: "Minutes",
    verb: "Govern",
    bullets: [
      "Validate the findings.",
      "Check risk and bias.",
      "Decide whether the evidence is sufficient.",
      "Human involvement on high-risk decisions - APRA's stated minimum.",
    ],
  },
  {
    name: "Experiment",
    from: "Months",
    to: "Days",
    verb: "Align",
    bullets: [
      "Bring engineering, product and business together.",
      "Decide rollout strategy.",
      "Protect customers while learning.",
    ],
  },
  {
    name: "Learning",
    from: "Weeks",
    to: "Minutes",
    verb: "Scale",
    bullets: [
      "Turn insights into standards.",
      "Share patterns across teams.",
      "Feed learning back into the next cycle.",
    ],
  },
];

export default function Slide06Pipeline({ review }: SlideProps) {
  const beat = useBeat();
  const active = Math.min(Math.max(beat, 0), STAGES.length - 1);
  const payoff = beat >= STAGES.length; // after all six, land the payoff
  const s = STAGES[active];

  // review contact sheet: the roller shows one stage at a time, so expand the
  // whole walk-through into a static, fully-legible list
  if (review) {
    return (
      <div className="stack grow" style={{ gap: 8 }}>
        <div className="s-head">
          <span className="kicker">Ways of working · The system of work</span>
          <h2 className="h1">
            <Words text="An AI-native operating model." at={0} grad="ink" />
          </h2>
        </div>

        <div className="opreview">
          {STAGES.map((st, i) => (
            <div className="opreview__row" key={st.name}>
              <div className="opreview__stage">
                <span className="opreview__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="opreview__name">{st.name}</span>
                <span className="opreview__dur">
                  {st.from} → {st.to}
                </span>
              </div>
              <div className="opreview__lead">
                <span className="opreview__verb">{st.verb}</span>
                <span className="opreview__bul">{st.bullets.join(" · ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="opreview__payoff">
          Six steps. The work compresses.{" "}
          <span className="gold">The role gets bigger.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Ways of working · The system of work</span>
        </Reveal>
        <h2 className="h1">
          <Words text="An AI-native operating model." at={0} grad="ink" />
        </h2>
      </div>

      <div className="opwalk">
        {/* left - what AI compressed */}
        <div className="opwalk__side opwalk__side--left" style={{ opacity: payoff ? 0 : 1, transition: "opacity 0.5s var(--ease-out)" }}>
          <div key={active} className="opwalk__timing">
            <div className="opwalk__slabel">Time recovered</div>
            <div className="opwalk__dur">
              <span className="opwalk__from">{s.from}</span>
              <span className="opwalk__arrow">→</span>
              <span className="opwalk__to">{s.to}</span>
            </div>
            <div className="opwalk__srce">Measured on Levri. Not modelled.</div>
          </div>
        </div>

        {/* centre - the roller of stages */}
        <div className="opwalk__center" style={{ opacity: payoff ? 0 : 1, transition: "opacity 0.5s var(--ease-out)" }}>
          {STAGES.map((st, i) => {
            const rel = i - active;
            const on = rel === 0;
            const dist = Math.abs(rel);
            return (
              <div
                key={st.name}
                className={["opwalk__stage", on ? "is-active" : ""].join(" ")}
                style={{
                  transform: `translateY(calc(-50% + ${rel * 82}px))`,
                  opacity: on ? 1 : Math.max(0.09, 0.34 - dist * 0.11),
                  filter: on ? "blur(0)" : `blur(${Math.min(5, 1.6 + dist * 1.4)}px)`,
                }}
              >
                <span className="opwalk__marker">▶</span>
                <span className="opwalk__name">{st.name}</span>
              </div>
            );
          })}
        </div>

        {/* right - where leadership creates value */}
        <div className="opwalk__side opwalk__side--right" style={{ opacity: payoff ? 0 : 1, transition: "opacity 0.5s var(--ease-out)" }}>
          <div key={active} className="opwalk__lead">
            <div className="opwalk__slabel">My role as a leader</div>
            <div className="opwalk__verb">{s.verb}</div>
            <ul className="opwalk__bullets">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="opwalk__payoff"
          style={{ pointerEvents: payoff ? "auto" : "none" }}
        >
          <Words text="Six steps. The work compresses." at={STAGES.length} grad="ink" />
          <Words
            text="The role gets bigger."
            at={STAGES.length}
            from={4}
            grad="gold"
          />
        </div>
      </div>
    </div>
  );
}

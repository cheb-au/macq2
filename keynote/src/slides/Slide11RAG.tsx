import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const COLS = [
  {
    key: "green",
    verb: "Delegate",
    desc: "AI accelerates execution.",
    items: ["Draft", "Summarise", "Prototype", "Explore"],
  },
  {
    key: "amber",
    verb: "Review",
    desc: "Humans verify AI output.",
    items: ["Design", "Code", "Research", "Content"],
  },
  {
    key: "red",
    verb: "Decide",
    desc: "Leadership owns the outcome.",
    items: ["Customer outcomes", "Financial outcomes", "Risk", "Compliance"],
  },
];

export default function Slide11RAG(_: SlideProps) {
  const beat = useBeat();

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Ways of working · A model for accountability</span>
        </Reveal>
        <h2 className="h1" style={{ maxWidth: 1400 }}>
          <Words text="How far should AI go?" at={0} grad="ink" />
        </h2>
      </div>

      <div className="gov" style={{ marginTop: 48 }}>
        {COLS.map((c, ci) => {
          const colBeat = ci + 1;
          const shown = beat >= colBeat;
          const isRed = c.key === "red";
          return (
            <div
              key={c.key}
              className={[
                "govcol",
                `gov--${c.key}`,
                shown ? "govcol--shown" : "",
                isRed ? "govcol--key" : "",
                c.key === "amber" && shown ? "govcol--pulse" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                opacity: shown ? 1 : 0,
                // red scales up (importance); green/amber slide in from the left
                transform: shown
                  ? "none"
                  : isRed
                  ? "scale(0.9)"
                  : "translateX(-44px)",
                transition:
                  "opacity 0.7s var(--ease-out), transform 0.85s var(--ease-out)",
              }}
            >
              <div className="govcol__h">
                <span className="govcol__led" />
                <span className="govcol__verb">{c.verb}</span>
              </div>
              <div className="govcol__desc">{c.desc}</div>
              <div className="govcol__items">
                {c.items.map((it, i) => (
                  <Reveal key={it} at={colBeat} i={i + 1} variant="soft">
                    <div className="govcol__item">{it}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Reveal at={4} variant="soft" style={{ marginTop: 40 }}>
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            lineHeight: 1.5,
            color: "var(--ink-faint)",
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          Human involvement on high-risk decisions, ownership across the AI
          lifecycle, a register of AI use. Not my framework - APRA's minimum
          expectation, April 2026.
        </p>
      </Reveal>

      <Reveal at={4} i={1} variant="rise" style={{ marginTop: 26 }}>
        <p className="eyebrow-quote" style={{ textAlign: "center", maxWidth: "none" }}>
          AI accelerates execution.{" "}
          <span className="gold">Leadership remains accountable.</span>
        </p>
      </Reveal>
    </div>
  );
}

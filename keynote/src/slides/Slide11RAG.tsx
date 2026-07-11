import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const COLS = [
  {
    key: "green",
    label: "Green",
    note: "Move fast",
    items: ["Drafting", "Research support", "Low-risk prototypes"],
  },
  {
    key: "amber",
    label: "Amber",
    note: "Human review required",
    items: ["Research synthesis", "UI generation", "Production code"],
  },
  {
    key: "red",
    label: "Red",
    note: "Human accountability, always",
    items: [
      "Sensitive customer data",
      "Autonomous production",
      "Financial decisions",
      "Regulated outcomes",
    ],
  },
];

export default function Slide11RAG(_: SlideProps) {
  const beat = useBeat();
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">A model for accountability</span>
        </Reveal>
        <h2 className="h1" style={{ maxWidth: 1400 }}>
          <Words text="Where AI should help -" at={0} grad="ink" />
          <br />
          <Words text="and where it shouldn't." at={0} from={4} grad="ink" />
        </h2>
      </div>

      <div className="gov" style={{ marginTop: 20 }}>
        {COLS.map((c, ci) => (
          <Reveal
            key={c.key}
            at={ci}
            until={2}
            variant="rise"
            className={`govcol gov--${c.key}`}
          >
            <div className="govcol__h">
              <span className="govcol__led" />
              {c.label}
            </div>
            <div className="govcol__items">
              {c.items.map((it) => (
                <div key={it} className="govcol__item">
                  {it}
                </div>
              ))}
            </div>
            <div className="govcol__note">{c.note}</div>
          </Reveal>
        ))}
      </div>

      {/* scrim so the closing statement reads over the receding columns */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          background:
            "radial-gradient(70% 60% at 50% 55%, rgba(9,10,12,0.86), rgba(9,10,12,0.4) 70%, transparent)",
          opacity: beat >= 3 ? 1 : 0,
          transition: "opacity 0.9s var(--ease-out)",
        }}
      />

      {/* the statement dominates - RAG recedes behind it */}
      <Reveal
        at={3}
        variant="rise"
        style={{
          position: "absolute",
          inset: "0 128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <p className="h1" style={{ textAlign: "center", maxWidth: 1400 }}>
          <span className="grad-ink">The risk isn't speed.</span>
          <br />
          <span className="gold">It's unclear accountability.</span>
        </p>
      </Reveal>
    </div>
  );
}

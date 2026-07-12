import type { CSSProperties } from "react";
import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const BANKS = ["Commonwealth", "ANZ", "Macquarie"];
const LAYERS = [
  "Design system",
  "Research",
  "Governance",
  "Customer insight",
  "Leadership",
];

const scene = (visible: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "84px 128px",
  opacity: visible ? 1 : 0,
  transform: visible ? "none" : "scale(0.98)",
  filter: visible ? "none" : "blur(8px)",
  transition:
    "opacity 1s var(--ease-out), transform 1.1s var(--ease-out), filter 1s var(--ease-out)",
  pointerEvents: "none",
});

function Phone({ bank, alive }: { bank: string; alive: boolean }) {
  return (
    <div className={["phone", alive ? "phone--alive" : ""].filter(Boolean).join(" ")}>
      <div className="phone__scr">
        <span className="phone__notch" />
        <div className="phone__bar" style={{ width: "42%" }} />
        <div className="phone__balance" />
        <div className="phone__card" />
        <div className="phone__card" />
        <div className="phone__card" />
        <div className="phone__btn" />
      </div>
      <div className="phone__label">{bank}</div>
    </div>
  );
}

export default function SlideDifferentiation({ review }: SlideProps) {
  const beat = useBeat();
  const sceneA = review || beat <= 2;

  return (
    <>
      {/* scene A - three identical banks, one comes alive */}
      <div style={scene(sceneA)}>
        <div className="s-head" style={{ alignItems: "center", textAlign: "center" }}>
          <span className="kicker">The great equaliser</span>
          <h2 className="h1" style={{ maxWidth: 1500 }}>
            <Words text="Everyone gets the same AI." at={0} grad="ink" />
            <br />
            <Words text="Differentiation is designed." at={0} from={5} grad="violet" />
          </h2>
        </div>

        <div className="diff-phones">
          {BANKS.map((b, i) => (
            <Phone key={b} bank={b} alive={(review || beat >= 1) && i === 2} />
          ))}
        </div>

        <div className="diff-lines">
          <div
            className="diff-line"
            style={{ opacity: review || beat >= 1 ? 1 : 0 }}
          >
            The model didn't create the difference.
          </div>
          <div
            className="diff-line diff-line--gold"
            style={{ opacity: review || beat >= 2 ? 1 : 0 }}
          >
            The system did.
          </div>
        </div>
      </div>

      {/* scene B - the system that shapes the AI */}
      <div style={scene(!review && beat === 3)}>
        <div className="diff-stack">
          <Reveal at={3} variant="fade">
            <span className="diff-stack__end">AI</span>
          </Reveal>
          <Reveal at={3} i={1} variant="fade">
            <span className="diff-stack__arrow">↓</span>
          </Reveal>
          <div className="diff-stack__layers">
            {LAYERS.map((l, i) => (
              <Reveal key={l} at={3} i={2 + i} variant="soft">
                <span>{l}</span>
              </Reveal>
            ))}
          </div>
          <Reveal at={3} i={8} variant="fade">
            <span className="diff-stack__arrow">↓</span>
          </Reveal>
          <Reveal at={3} i={9} variant="rise">
            <span className="diff-stack__out gold">Customer experience</span>
          </Reveal>
        </div>
      </div>

      {/* scene C - the closer */}
      <div style={{ ...scene(!review && beat === 4), gap: 20 }}>
        <p className="lead" style={{ fontSize: 44, color: "var(--ink-faint)" }}>
          <Words text="AI is becoming the engine." at={4} />
        </p>
        <p
          className="display"
          style={{ fontSize: 76, maxWidth: 1500, lineHeight: 1.08 }}
        >
          <span className="gold">The design system becomes the steering wheel.</span>
        </p>
      </div>

      {/* footer - only while the phones are on screen */}
      <div
        className="diff-foot"
        style={{ opacity: review || beat <= 2 ? 1 : 0 }}
      >
        AI generates output. <span className="muted">Systems generate quality.</span>
      </div>
    </>
  );
}

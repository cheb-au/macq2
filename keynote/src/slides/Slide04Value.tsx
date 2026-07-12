import { Reveal, Words } from "../components/Reveal";
import { WaterTank } from "../components/WaterTank";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const CEIL = ["Judgement", "Taste", "Systems", "Leadership"];

export default function Slide04Value(_: SlideProps) {
  const beat = useBeat();
  // fills on entry, the floor rises on beat 1, then the ceiling brightens on beat 2
  const level = beat < 0 ? 0 : beat >= 1 ? 76 : 52;
  const ceilOn = beat >= 2; // capabilities brighten only once the water settles

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Re-pricing the work</span>
        </Reveal>
        <h2 className="h1">
          <Words text="What becomes valuable?" at={0} grad="ink" />
        </h2>
      </div>

      <WaterTank
        level={level}
        ceilOn={ceilOn}
        ceiling={CEIL.map((t) => ({ t }))}
        subCaption="Output scales. Judgement compounds."
      />

      <div className="takeaway">
        <Reveal at={1} variant="rise" style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
          <span className="takeaway__mark">→</span>
          <div className="takeaway__text">AI raises the floor.</div>
        </Reveal>
        <Reveal at={2} variant="rise">
          <div className="takeaway__text" style={{ color: "var(--accent)" }}>
            Leaders raise the ceiling.
          </div>
        </Reveal>
        <Reveal at={2} i={1} variant="soft" style={{ marginTop: 8 }}>
          <div style={{ fontSize: 20, color: "var(--ink-faint)", maxWidth: 960 }}>
            But a rising floor means everything ships faster - including the ideas
            that shouldn't.
          </div>
        </Reveal>
      </div>
    </div>
  );
}

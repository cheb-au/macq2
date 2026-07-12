import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const CEIL = ["Judgement", "Taste", "Systems", "Leadership"];

// a smooth wave line across a 0..1440 viewBox (4 wavelengths → seamless scroll)
function waveLine(amp: number, base: number, phase: number) {
  let d = `M0 ${(base + amp * Math.sin(phase)).toFixed(1)}`;
  for (let x = 15; x <= 1440; x += 15) {
    const y = base + amp * Math.sin((x / 360) * Math.PI * 2 + phase);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}
const FILL_A = waveLine(8, 28, 0) + " L1440 60 L0 60 Z";
const CREST = waveLine(8, 28, 0);

export default function Slide04Value(_: SlideProps) {
  const beat = useBeat();
  const ceilOn = beat >= 1; // the 4 ceiling words fill in with the second rise
  // fills on entry, the floor rises on beat 1, then the ceiling brightens on beat 2.
  // the first fill pours in slowly and irregularly (CSS @keyframes waterPour).
  const level = beat < 0 ? 0 : beat >= 1 ? 76 : 52;
  const pouring = beat === 0;

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

      <div className="s-fill center" style={{ flexDirection: "column", gap: 0 }}>
        <div className="tank">
          <div className="tank__ceiling" data-on={ceilOn}>
            {CEIL.map((c, i) => (
              <span key={c}>
                {c}
                {i < CEIL.length - 1 && <i style={{ marginLeft: 22 }} />}
              </span>
            ))}
          </div>
          <div className="tank__caption" data-on={ceilOn}>
            the ceiling - only leaders raise it
          </div>

          <div
            className={["tank__water", pouring ? "tank__water--pour" : ""]
              .filter(Boolean)
              .join(" ")}
            style={{
              height: `${level}%`,
              // the pour is a CSS animation; the raise uses the CSS elastic transition
              transition: beat >= 1 ? undefined : "none",
            }}
          >
            <div className="tank__body" />
            <div className="tank__waves">
              <svg className="tank__wave tank__wave--a" viewBox="0 0 1440 60" preserveAspectRatio="none">
                <path d={FILL_A} />
              </svg>
              <svg className="tank__wave tank__crest" viewBox="0 0 1440 60" preserveAspectRatio="none">
                <path d={CREST} fill="none" />
              </svg>
            </div>
            <div className="tank__fill-label">Where leaders create value</div>
          </div>
        </div>

      </div>

      <div className="takeaway" style={{ justifyContent: "center" }}>
        {/* comes in as the water starts filling */}
        <Reveal at={0} variant="rise" style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
          <span className="takeaway__mark">→</span>
          <div className="takeaway__text">AI raises the floor.</div>
        </Reveal>
        {/* beat 1: fades in over ~2s together with the rise and the ceiling words */}
        <div
          className="takeaway__text"
          style={{
            color: "var(--accent)",
            opacity: beat >= 1 ? 1 : 0,
            transform: beat >= 1 ? "none" : "translateY(12px)",
            transition:
              "opacity 1.9s var(--ease-out), transform 1.9s var(--ease-out)",
          }}
        >
          Leaders raise the ceiling.
        </div>
      </div>
    </div>
  );
}

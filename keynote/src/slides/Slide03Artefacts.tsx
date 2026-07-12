import { Reveal, Words } from "../components/Reveal";
import { ArtefactOrbit, LABELS } from "../components/ArtefactOrbit";
import { DecisionSphere } from "../components/DecisionSphere";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

export default function Slide03Artefacts({ review }: SlideProps) {
  const beat = useBeat();
  const collapsed = beat >= 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "96px 128px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ArtefactOrbit collapse={collapsed} />
      <DecisionSphere formed={collapsed} />

      {/* header */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <Reveal at={0} variant="fade">
          <span className="kicker">Where value moves</span>
        </Reveal>
        <h2 className="h1" style={{ marginTop: 22, maxWidth: 1300 }}>
          <Words text="From producing artefacts" at={0} grad="ink" />
          <br />
          <span
            style={{
              color: beat >= 2 ? "var(--violet)" : "var(--ink-faint)",
              transition: "color 1s var(--ease-out)",
            }}
          >
            <Words text="to scaling decisions." at={2} />
          </span>
        </h2>
      </div>

      {/* label centred on the decision, dropped below it */}
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 812,
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: "-0.015em",
            display: "flex",
            gap: 16,
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Words text="Hundreds of artefacts" at={2} grad="ink" />
          <span style={{ color: "var(--ink-ghost)" }}>→</span>
          <Words text="One decision" at={2} from={3} grad="violet" />
        </div>
      </div>

      {/* review-only: mock the opening state (the artefact cloud) as an inset,
          since the contact sheet can only show the collapsed final state */}
      {review && (
        <div className="state-mock">
          <div className="state-mock__cap">Opens as - the artefact cloud</div>
          <div className="state-mock__frame">
            {LABELS.map((l) => (
              <span key={l} className="state-mock__chip">
                {l}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />
    </div>
  );
}

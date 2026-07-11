import type { CSSProperties } from "react";
import { Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const scene = (visible: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 160px",
  gap: 30,
  opacity: visible ? 1 : 0,
  transform: visible ? "none" : "scale(0.98)",
  filter: visible ? "none" : "blur(8px)",
  transition:
    "opacity 1s var(--ease-out), transform 1.1s var(--ease-out), filter 1s var(--ease-out)",
  pointerEvents: "none",
});

export default function Slide12Future(_: SlideProps) {
  const beat = useBeat();

  return (
    <>
      {/* thesis */}
      <div style={scene(beat === 0)}>
        <h2 className="h1" style={{ fontSize: 76, maxWidth: 1400 }}>
          <Words text="The future belongs to organisations" at={0} grad="accent" />
          <br />
          <Words text="that learn fastest." at={0} from={4} grad="accent" />
        </h2>
      </div>

      {/* the pivot - same AI, different leadership */}
      <div style={scene(beat === 1 || beat === 2)}>
        <p className="h1" style={{ fontSize: 66, color: "var(--ink)", maxWidth: 1400 }}>
          <Words text="Every organisation will have access to the same AI." at={1} grad="ink" />
        </p>
        <p
          className="h1"
          style={{
            fontSize: 66,
            maxWidth: 1400,
            opacity: beat >= 2 ? 1 : 0,
            transition: "opacity 1s var(--ease-out)",
          }}
        >
          <Words text="Not every organisation will know how to lead with it." at={2} grad="gold" />
        </p>
      </div>

      {/* the one idea to leave them with */}
      <div style={scene(beat >= 3)}>
        <p className="lead" style={{ fontSize: 40, color: "var(--ink-faint)" }}>
          <Words text="AI will commoditise execution." at={3} />
        </p>
        <p className="display" style={{ fontSize: 96, maxWidth: 1500 }}>
          <Words text="Leadership becomes the advantage." at={3} from={4} grad="gold" />
        </p>
      </div>

      {/* fade to black */}
      <div className={["blackout", beat >= 4 ? "on" : ""].join(" ")} />
    </>
  );
}

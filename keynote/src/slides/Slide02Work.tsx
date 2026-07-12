import { Reveal, Words } from "../components/Reveal";
import { PipelineReorg } from "../components/PipelineReorg";
import { PhaseScroll } from "../components/PhaseScroll";
import type { Phase } from "../components/PhaseScroll";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const PHASES: Phase[] = [
  {
    label: "Traditional organisation",
    text: "A straight line. Research to release - with a queue at every handoff.",
  },
  {
    label: "Modern organisation",
    text: "A loop. Signal to learning - closing continuously.",
    accent: true,
  },
];

export default function Slide02Work(_: SlideProps) {
  const beat = useBeat();
  const mode = beat >= 1 ? 1 : 0;
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">The shift</span>
        </Reveal>
        <h2 className="h1">
          <Words text="AI isn't replacing design." at={0} grad="ink" />
          <br />
          <Words text="It's redefining leadership." at={0} from={4} grad="violet" />
        </h2>
      </div>

      <div
        className="row"
        style={{ flex: 1, alignItems: "center", gap: 30, minHeight: 0 }}
      >
        <div style={{ flex: "0 0 560px" }}>
          <PhaseScroll phases={PHASES} active={mode} />
        </div>

        <div className="grow center" style={{ display: "flex" }}>
          <PipelineReorg mode={mode} />
        </div>
      </div>

      <div className="takeaway">
        <Reveal at={2} variant="rise" style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
          <span className="takeaway__mark">→</span>
          <div className="takeaway__text" style={{ color: "var(--ink-faint)" }}>
            AI compresses organisational handoffs.
          </div>
        </Reveal>
        <Reveal at={3} variant="rise">
          <div className="takeaway__text">Not jobs.</div>
        </Reveal>
      </div>
    </div>
  );
}

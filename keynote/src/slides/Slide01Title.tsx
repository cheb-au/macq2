import { Reveal, Words } from "../components/Reveal";
import { MacquarieLogo } from "../components/MacquarieLogo";
import type { SlideProps } from "../engine/types";

export default function Slide01Title(_: SlideProps) {
  return (
    <div className="stack grow center s-center" style={{ gap: 34 }}>
      <Reveal at={0} variant="fade" style={{ marginBottom: 10 }}>
        <MacquarieLogo width={240} style={{ color: "var(--ink)" }} />
      </Reveal>

      <Reveal at={0} i={1} variant="fade">
        <span className="kicker">A Head of UX perspective</span>
      </Reveal>

      <h1 className="display" style={{ maxWidth: 1500 }}>
        <Words text="Designing the" at={0} from={0} grad="accent" />
        <br />
        <Words text="AI-Native Organisation" at={0} from={2} grad="accent" />
      </h1>

      <Reveal at={1} i={1} variant="soft">
        <p className="lead" style={{ maxWidth: 900 }}>
          Lessons from building Levri while leading enterprise design teams.
        </p>
      </Reveal>

      <Reveal at={2} variant="rise" style={{ marginTop: 26 }}>
        <p className="subline" style={{ maxWidth: 1000, textAlign: "center" }}>
          AI isn't changing what good design is.
        </p>
      </Reveal>

      <Reveal at={3} variant="soft">
        <p className="subline" style={{ maxWidth: 1000, textAlign: "center" }}>
          It's changing how quickly we move from{" "}
          <span className="gold">ambiguity</span> to{" "}
          <span className="gold">evidence</span>.
        </p>
      </Reveal>
    </div>
  );
}

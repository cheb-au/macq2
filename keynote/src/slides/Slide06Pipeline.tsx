import { Reveal, Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const STAGES = [
  { name: "Customer signal", tool: "Listening", icon: Icon.signal },
  { name: "Hypothesis", tool: "Framing", icon: Icon.compass },
  { name: "Prototype", tool: "Generative UI", icon: Icon.layers },
  { name: "Evidence", tool: "Instrumentation", icon: Icon.node },
  { name: "Experiment", tool: "Cohorts", icon: Icon.tree },
  { name: "Learning", tool: "Synthesis", icon: Icon.loop },
];

export default function Slide06Pipeline(_: SlideProps) {
  const beat = useBeat();
  const on = beat >= 1;
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">The system of work</span>
        </Reveal>
        <h2 className="h1">
          <Words text="An AI-native operating model." at={0} grad="ink" />
        </h2>
      </div>

      <div className="s-fill center">
        <div className="pipeflow" data-on={on}>
          <div className="pipeflow__rail" />
          <div className="pipeflow__pulse" />
          {STAGES.map((s, i) => (
            <div key={s.name} className="pipeflow__cell">
              <div
                className="pstage"
                data-on={on}
                style={{ ["--i" as string]: i }}
              >
                <div className="pstage__orb">
                  <s.icon size={34} />
                </div>
                <div className="pstage__name">{s.name}</div>
                <Reveal at={2} i={i} variant="fade">
                  <div className="pstage__tool">{s.tool}</div>
                </Reveal>
              </div>
              {i < STAGES.length - 1 && (
                <svg className="pipeflow__link" viewBox="0 0 60 12">
                  <path
                    className="pipeflow__linkpath"
                    d="M2 6 H50 M45 2 L50 6 L45 10"
                    style={{ ["--i" as string]: i }}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <Reveal at={3} variant="rise">
        <div className="takeaway">
          <span className="takeaway__mark">↻</span>
          <div className="takeaway__text">
            One continuous loop.{" "}
            <span className="muted">Tools change. The flow doesn't.</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

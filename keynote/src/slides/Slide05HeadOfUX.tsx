import { Reveal, Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import type { SlideProps } from "../engine/types";

const THEN = [
  "Managing delivery",
  "Reviewing screens",
  "Growing craft",
  "Allocating designers",
  "Shipping projects",
];
const NOW = [
  "Designing systems",
  "Reviewing decisions",
  "Growing judgement",
  "Orchestrating capability",
  "Accelerating learning",
];

export default function Slide05HeadOfUX(_: SlideProps) {
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">The role, redefined</span>
        </Reveal>
        <h2 className="h1" style={{ whiteSpace: "nowrap" }}>
          <Words text="What changes for a Head of Design?" at={0} grad="ink" />
        </h2>
      </div>

      <div className="tnn" style={{ marginTop: 16 }}>
        <div className="tnn__col--then">
          <Reveal at={0} variant="fade">
            <div className="tnn__h">
              <span className="tag then">Then</span>
            </div>
          </Reveal>
          {THEN.map((t, i) => (
            <Reveal key={t} at={0} i={i} variant="soft" until={0}>
              <div className="tnn__row">{t}</div>
            </Reveal>
          ))}
        </div>

        <div className="tnn__col--now">
          <Reveal at={1} variant="fade">
            <div className="tnn__h">
              <span className="tag now">Now</span>
            </div>
          </Reveal>
          {NOW.map((t, i) => (
            <Reveal key={t} at={1} i={i} variant="soft">
              <div className="tnn__row">
                <Icon.arrowRight className="ico" size={22} />
                {t}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal at={2} variant="rise" style={{ marginTop: 4 }}>
        <p
          className="eyebrow-quote"
          style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
        >
          Headcount doesn't fall in year one.{" "}
          <span className="muted">The shape does.</span>
        </p>
      </Reveal>
    </div>
  );
}

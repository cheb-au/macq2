import { Reveal, Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import type { SlideProps } from "../engine/types";

const AI = ["Generated", "Investigated", "Suggested", "Automated"];
const HUMAN = ["Prioritised", "Directed", "Validated", "Protected", "Governed"];

export default function Slide08Intent(_: SlideProps) {
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Division of labour</span>
        </Reveal>
        <h2 className="h1">
          <Words text="AI accelerated execution." at={0} grad="ink" />
          <br />
          <Words text="I directed intent." at={0} from={3} grad="violet" />
        </h2>
      </div>

      <div className="split" style={{ marginTop: 24 }}>
        <div className="split__col">
          <Reveal at={1} variant="fade">
            <div className="split__label">The AI</div>
          </Reveal>
          <div className="pills">
            {AI.map((t, i) => (
              <Reveal key={t} at={1} i={i} variant="soft">
                <div className="pill pill--muted">
                  <Icon.bolt className="ico" size={22} />
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="split__rule" />

        <div className="split__col">
          <Reveal at={2} variant="fade">
            <div className="split__label" style={{ color: "var(--accent)" }}>
              The human
            </div>
          </Reveal>
          <div className="pills">
            {HUMAN.map((t, i) => (
              <Reveal key={t} at={2} i={i} variant="soft">
                <div className="pill">
                  <Icon.compass className="ico" size={22} />
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal at={3} variant="rise" style={{ marginTop: 8 }}>
        <div className="takeaway">
          <span className="takeaway__mark">→</span>
          <div className="takeaway__text">
            Machines produce the options.{" "}
            <span className="muted">People own the intent.</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

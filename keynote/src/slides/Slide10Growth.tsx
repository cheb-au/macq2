import { Reveal, Words } from "../components/Reveal";
import type { SlideProps } from "../engine/types";

// bottom → top
const RUNGS = [
  "Critique",
  "Customer exposure",
  "Systems thinking",
  "Business context",
  "Judgement",
];

export default function Slide10Growth(_: SlideProps) {
  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">The talent question</span>
        </Reveal>
        <h2 className="h1">
          <Words text="Growing designers in an AI world." at={0} grad="ink" />
        </h2>
      </div>

      <div className="ascent">
        <div className="rungs">
          {RUNGS.map((r, i) => {
            const hot = i === RUNGS.length - 1;
            return (
              <Reveal
                key={r}
                at={0}
                i={i}
                variant="soft"
                className={["rung", hot ? "hot" : ""].join(" ")}
                style={{ marginLeft: `${i * 52}px` }}
              >
                <div className="rung__num">{String(i + 1).padStart(2, "0")}</div>
                <div className="rung__t">{r}</div>
                <div className="rung__ln" />
              </Reveal>
            );
          })}
        </div>

        <div className="stack" style={{ gap: 32 }}>
          <Reveal at={1} variant="rise">
            <p className="h2" style={{ fontSize: 54 }}>
              <span className="grad-ink">Not through</span>{" "}
              <span className="gold">UI production.</span>
            </p>
          </Reveal>
          <Reveal at={2} variant="soft">
            <p className="subline">
              Execution is becoming cheaper.{" "}
              <span className="gold">Judgement becomes more valuable.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

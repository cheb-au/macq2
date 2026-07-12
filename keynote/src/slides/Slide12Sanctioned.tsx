import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

type Src = "build" | "buy" | "tenant";

const ROWS: { cap: string; src: Src; why: string }[] = [
  {
    cap: "Generative exploration",
    src: "tenant",
    why: "Speed, with our data boundary intact",
  },
  { cap: "Design-to-code", src: "buy", why: "Commodity. Don't build it." },
  {
    cap: "Research synthesis",
    src: "tenant",
    why: "Touches customer voice - must be governed",
  },
  {
    cap: "Design-system compliance",
    src: "build",
    why: "Our system, our accessibility bar, our audit trail",
  },
];
const SRC_LABEL: Record<Src, string> = {
  build: "Build",
  buy: "Buy",
  tenant: "Enterprise tenant",
};

const MATRIX: { cls: string; dot: "green" | "amber" | "red"; v: string }[] = [
  { cls: "Public", dot: "green", v: "Any sanctioned tool." },
  { cls: "Internal", dot: "green", v: "Enterprise tenant only." },
  { cls: "Confidential", dot: "amber", v: "Enterprise tenant. Logged. Named owner." },
  { cls: "Customer PII", dot: "red", v: "Never leaves the boundary. No exceptions." },
];

export default function Slide12Sanctioned({ review }: SlideProps) {
  const beat = useBeat();
  const matrix = review || beat >= 1;

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Tools · The sanctioned path</span>
        </Reveal>
        <h2 className="h1">
          <Words text="We don't buy tools. We sanction paths." at={0} grad="ink" />
        </h2>
      </div>

      <div className="sanction">
        {/* state 1 - the sourcing decision */}
        <div
          className="sanction__layer"
          style={{ opacity: matrix ? 0 : 1, pointerEvents: matrix ? "none" : "auto" }}
        >
          <div className="sanction__thead">
            <span>Capability</span>
            <span>Sourcing</span>
            <span>Why</span>
          </div>
          {ROWS.map((r) => (
            <div className="sanction__row" key={r.cap}>
              <span className="sanction__cap">{r.cap}</span>
              <span className={`srcpill srcpill--${r.src}`}>{SRC_LABEL[r.src]}</span>
              <span className="sanction__why">{r.why}</span>
            </div>
          ))}
        </div>

        {/* state 2 - the data classification matrix */}
        <div
          className="sanction__layer sanction__layer--matrix"
          style={{ opacity: matrix ? 1 : 0, pointerEvents: matrix ? "auto" : "none" }}
        >
          <div className="sanction__sublabel">
            The fastest path has to be the sanctioned path.
          </div>
          {MATRIX.map((m) => (
            <div className="matrix__row" key={m.cls}>
              <span className="matrix__cls">{m.cls}</span>
              <span className={`matrix__dot matrix__dot--${m.dot}`} />
              <span className="matrix__v">{m.v}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="sanction__foot">
        A designer pasting customer data into a consumer model isn't a productivity
        win. <span className="sanction__sting">It's an incident.</span>
      </p>
    </div>
  );
}

import type { ComponentType } from "react";
import { Reveal, Words } from "../components/Reveal";
import { Icon } from "../components/Icons";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

interface Step {
  beat: number;
  k: string;
  t: string;
  variant?: "danger" | "safe";
  icon: ComponentType<{ size?: number }>;
  strikeAt?: number;
}

const STEPS: Step[] = [
  { beat: 1, k: "Signal", t: "A customer is charged", icon: Icon.signal },
  { beat: 2, k: "AI", t: "Automated investigation traces the fault", icon: Icon.node },
  {
    beat: 3,
    k: "Proposed",
    t: "A fast shortcut that could double-refund",
    icon: Icon.bolt,
    variant: "danger",
    strikeAt: 4,
  },
  { beat: 4, k: "Judgement", t: "Rejected - unsafe under load", icon: Icon.shield },
  {
    beat: 5,
    k: "Resolution",
    t: "Idempotent repair · customer protected",
    icon: Icon.shield,
    variant: "safe",
  },
];

export default function Slide09Governance(_: SlideProps) {
  const beat = useBeat();
  const frozen = beat === 3; // the held decision point
  const danger = beat >= 3 && beat < 5;

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      {/* tension flood - the frame holds its breath on the risky decision */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(80% 70% at 50% 60%, rgba(224,133,133,0.16), transparent 70%)",
          opacity: frozen ? 1 : danger ? 0.4 : 0,
          transition: "opacity 0.9s var(--ease-out)",
        }}
      />

      <div className="s-head" style={{ position: "relative", zIndex: 2 }}>
        <Reveal at={0} variant="fade">
          <span className="kicker">The other side of speed</span>
        </Reveal>
        <h2 className="h1" style={{ maxWidth: 1300 }}>
          <Words text="Speed without governance" at={0} grad="ink" />
          <br />
          <Words text="becomes risk." at={0} from={3} grad="ink" />
        </h2>
      </div>

      <div className="incident" style={{ marginTop: 6, position: "relative", zIndex: 2 }}>
        {STEPS.map((s, i) => {
          const shown = beat >= s.beat;
          const struck = s.strikeAt !== undefined && beat >= s.strikeAt;
          const isDanger = s.variant === "danger";
          const dimmed = frozen && !isDanger && shown;
          return (
            <div
              key={s.k}
              className={[
                "istep",
                isDanger ? "istep--danger" : "",
                s.variant === "safe" ? "istep--safe" : "",
                struck ? "istep--strike" : "",
                frozen && isDanger ? "istep--held" : "",
              ].filter(Boolean).join(" ")}
              style={{
                opacity: shown ? (dimmed ? 0.32 : 1) : 0,
                transform: shown ? "none" : "translateY(18px)",
                filter: shown ? "none" : "blur(6px)",
                transition:
                  "opacity .6s var(--ease-out), transform .8s var(--ease-out), filter .6s var(--ease-out)",
              }}
            >
              <div className="istep__rail">
                <div className="istep__dot">
                  <s.icon size={20} />
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="istep__line"
                    style={{
                      background:
                        beat > s.beat ? "var(--line-strong)" : "var(--line)",
                    }}
                  />
                )}
              </div>
              <div className="istep__card">
                <div className="istep__k">{s.k}</div>
                <div className="istep__t">{s.t}</div>
              </div>

              {/* the held-for-review badge, only while frozen on the danger */}
              {isDanger && (
                <div
                  className="hold-badge"
                  style={{
                    opacity: frozen ? 1 : 0,
                    transform: frozen ? "translateX(0)" : "translateX(-12px)",
                  }}
                >
                  <span className="hold-badge__pulse" />
                  Held - human decision required
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Reveal at={6} variant="rise" style={{ marginTop: 4, position: "relative", zIndex: 2 }}>
        <p className="eyebrow-quote">
          AI solved the investigation.{" "}
          <span className="muted">Leadership owned the outcome.</span>
        </p>
      </Reveal>
    </div>
  );
}

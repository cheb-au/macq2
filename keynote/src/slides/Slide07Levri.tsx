import { Reveal, Words } from "../components/Reveal";
import { LevriStack } from "../components/LevriStack";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const FACTS = [
  "3 months",
  "one team of one",
  "real customers",
  "real payments",
];

export default function Slide07Levri(_: SlideProps) {
  const beat = useBeat();
  const live = beat >= 6;

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Evidence · the one thing no one else can show</span>
        </Reveal>
        <h2 className="h1">
          <Words text="I didn't describe it." at={0} grad="ink" />{" "}
          <Words text="I built it." at={0} from={3} grad="gold" />
        </h2>
      </div>

      <div className="row" style={{ flex: 1, alignItems: "center", gap: 40, minHeight: 0 }}>
        <div className="grow" style={{ display: "flex", justifyContent: "center" }}>
          <LevriStack beat={beat} />
        </div>

        <div className="stack" style={{ flex: "0 0 440px", gap: 24 }}>
          <div
            style={{
              fontSize: 21,
              lineHeight: 1.5,
              color: "var(--ink-dim)",
              maxWidth: 400,
              opacity: live ? 0 : 1,
              transition: "opacity 0.6s var(--ease-out)",
              position: live ? "absolute" : "relative",
            }}
          >
            A production platform, assembled one layer at a time - repository to
            live customers.
          </div>

          <div
            style={{
              opacity: live ? 1 : 0,
              transform: live ? "none" : "translateY(16px)",
              transition: "opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid color-mix(in srgb, var(--gold) 45%, transparent)",
                background: "rgba(203,171,116,0.08)",
                color: "var(--gold-soft)",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              <span className="dot" style={{ background: "var(--gold)", boxShadow: "0 0 12px 2px rgba(203,171,116,0.6)" }} />
              LIVE IN PRODUCTION
            </div>
            <div className="factlist" style={{ marginTop: 26 }}>
              {FACTS.map((f) => (
                <div key={f} className="fact" style={{ fontSize: 27 }}>
                  <span className="dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

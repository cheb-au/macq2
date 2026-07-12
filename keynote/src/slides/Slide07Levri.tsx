import { useEffect, useState } from "react";
import { Reveal, Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const MILESTONES: { t: string; key?: boolean }[] = [
  { t: "Production platform" },
  { t: "Real customers" },
  { t: "Real revenue" },
  { t: "AI-native operating model proven", key: true },
];

export default function Slide07Levri({ active }: SlideProps) {
  const beat = useBeat();
  const [showLevri, setShowLevri] = useState(false);

  // "through Levri" resolves into the heading ~700ms after the slide arrives
  useEffect(() => {
    if (!active) {
      setShowLevri(false);
      return;
    }
    const t = window.setTimeout(() => setShowLevri(true), 700);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="stack grow" style={{ gap: 8 }}>
      <div className="s-head">
        <Reveal at={0} variant="fade">
          <span className="kicker">Proof</span>
        </Reveal>
        <h2 className="h1">
          <Words text="From theory to production." at={0} grad="ink" />
          <br />
          <span
            className="gold"
            style={{
              opacity: showLevri ? 1 : 0,
              filter: showLevri ? "blur(0)" : "blur(14px)",
              transition: "opacity 0.9s var(--ease-out), filter 0.9s var(--ease-out)",
            }}
          >
            through Levri.
          </span>
        </h2>
      </div>

      <div className="row" style={{ flex: 1, alignItems: "center", gap: 40, minHeight: 0 }}>
        <div className="stack" style={{ flex: "0 0 560px", gap: 26 }}>
          <Reveal at={0} i={1} variant="rise">
            <div className="stack" style={{ gap: 0, lineHeight: 0.86 }}>
              <span
                className="grad-accent"
                style={{ fontSize: 96, fontWeight: 600, letterSpacing: "-0.05em" }}
              >
                100+
              </span>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 500,
                  color: "var(--ink-dim)",
                  letterSpacing: "-0.02em",
                }}
              >
                teams
              </span>
            </div>
          </Reveal>
          <Reveal at={0} i={2} variant="soft">
            <p className="lead" style={{ fontSize: 27, maxWidth: 480 }}>
              Built to test an AI-native operating model.
            </p>
          </Reveal>
          <Reveal at={0} i={3} variant="soft">
            <div
              className="stack"
              style={{ gap: 8, fontSize: 24, color: "var(--ink-soft)", fontWeight: 500 }}
            >
              <span>One multidisciplinary team.</span>
              <span>Production from day one.</span>
            </div>
          </Reveal>
        </div>

        <div className="grow" style={{ display: "flex", justifyContent: "center" }}>
          <div className="milestones">
            {MILESTONES.map((m, i) => (
              <div key={m.t} className="milestones__cell">
                <Reveal
                  at={i + 1}
                  variant="rise"
                  className={["milestone", m.key ? "milestone--key" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="milestone__dot" />
                  <div className="milestone__t">{m.t}</div>
                </Reveal>
                {i < MILESTONES.length - 1 && (
                  <div
                    className="milestone__link"
                    style={{
                      opacity: beat >= i + 2 ? 1 : 0.15,
                      transition: "opacity 0.6s var(--ease-out)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Reveal at={5} variant="rise">
        <p className="eyebrow-quote">
          The experiment was the operating model.
          <br />
          <span className="gold">The product was the proof.</span>
        </p>
      </Reveal>
    </div>
  );
}

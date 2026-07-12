import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Words } from "../components/Reveal";
import { WaterTank } from "../components/WaterTank";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

const ADVANTAGES = [
  "Better customer understanding",
  "Stronger design systems",
  "Clearer accountability",
  "Faster organisational learning",
  "Better leadership",
];

const scene = (visible: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 160px",
  gap: 30,
  opacity: visible ? 1 : 0,
  transform: visible ? "none" : "scale(0.98)",
  filter: visible ? "none" : "blur(8px)",
  transition:
    "opacity 1s var(--ease-out), transform 1.1s var(--ease-out), filter 1s var(--ease-out)",
  pointerEvents: "none",
});

export default function Slide12Future({ review }: SlideProps) {
  const beat = useBeat();

  // beat 3 water callback: the fifth ceiling word (ACCOUNTABILITY) lands last
  const [showAcct, setShowAcct] = useState(false);
  useEffect(() => {
    if (review) return;
    if (beat !== 3) {
      setShowAcct(false);
      return;
    }
    const t = setTimeout(() => setShowAcct(true), 1100);
    return () => clearTimeout(t);
  }, [beat, review]);

  // beat 4 keyframe self-plays: line 1 lands, line 2 arrives ~3s later, then it
  // sits for ~3.8s before fading to black on its own - no click needed
  const [revealLast, setRevealLast] = useState(false);
  const [autoBlack, setAutoBlack] = useState(false);
  useEffect(() => {
    if (review) return;
    if (beat !== 4) {
      setRevealLast(false);
      setAutoBlack(false);
      return;
    }
    const t1 = setTimeout(() => setRevealLast(true), 3000);
    const t2 = setTimeout(() => setAutoBlack(true), 6800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [beat, review]);

  // in the review contact sheet, show the finished keyframe (no auto-fade)
  const acct = review || showAcct;
  const last = review || revealLast;
  const black = !review && (beat >= 5 || autoBlack);

  return (
    <>
      {/* beat 0 - same AI for everyone */}
      <div style={scene(beat === 0)}>
        <h2 className="h1" style={{ fontSize: 72, maxWidth: 1450 }}>
          <Words
            text="Every financial institution will have access to the same AI."
            at={0}
            grad="ink"
          />
        </h2>
      </div>

      {/* beats 1-2 - where the advantage actually comes from */}
      <div style={scene(beat === 1 || beat === 2)}>
        <p className="h2" style={{ fontSize: 52, color: "var(--ink)", maxWidth: 1300 }}>
          <Words text="The advantage won't come from the technology." at={1} grad="ink" />
        </p>
        <div
          className="stack"
          style={{ gap: 16, marginTop: 18, alignItems: "center" }}
        >
          <p className="h2" style={{ fontSize: 52, color: "var(--ink)", marginBottom: 6 }}>
            <Words text="It will be..." at={2} grad="ink" />
          </p>
          {ADVANTAGES.map((a, i) => (
            <div
              key={a}
              style={{
                fontSize: 34,
                fontWeight: 500,
                color: "var(--gold-soft)",
                opacity: beat >= 2 ? 1 : 0,
                transform: beat >= 2 ? "none" : "translateY(10px)",
                transition:
                  "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
                transitionDelay: `${i * 260}ms`,
              }}
            >
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* beat 3 - the water callback: the ceiling now reads five words */}
      <div
        style={{
          ...scene(beat === 3),
          padding: "56px 160px",
          gap: 0,
          alignItems: "stretch",
        }}
      >
        <WaterTank
          level={76}
          ceilOn={beat === 3}
          lastIn={acct}
          ceiling={[
            { t: "Judgement" },
            { t: "Taste" },
            { t: "Systems" },
            { t: "Leadership" },
            { t: "Accountability", gold: true },
          ]}
        />
      </div>

      {/* beat 4 - the one idea to leave them with (self-plays, then self-fades) */}
      <div style={{ ...scene(beat === 4), gap: 64 }}>
        <p
          className="lead"
          style={{ fontSize: 42, color: "var(--ink-faint)", marginTop: 40 }}
        >
          <Words text="AI commoditises execution." at={4} />
        </p>
        <p
          className="display"
          style={{
            fontSize: 92,
            maxWidth: 1500,
            marginTop: 12,
            opacity: last ? 1 : 0,
            filter: last ? "blur(0)" : "blur(14px)",
            transition: "opacity 1s var(--ease-out), filter 1s var(--ease-out)",
          }}
        >
          <span className="gold">Leadership differentiates outcomes.</span>
        </p>
      </div>

      {/* fade to black - on a click, or automatically once the line has sat */}
      <div className={["blackout", black ? "on" : ""].join(" ")} />
    </>
  );
}

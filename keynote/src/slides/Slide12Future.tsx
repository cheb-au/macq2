import { useEffect, useState } from "react";
import { Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

export default function Slide12Future({ review }: SlideProps) {
  const beat = useBeat();

  // the close self-plays: the small line lands, the statement arrives ~3s later,
  // then it sits and fades to black on its own - no click needed
  const [revealLast, setRevealLast] = useState(false);
  const [autoBlack, setAutoBlack] = useState(false);
  useEffect(() => {
    if (review) return;
    if (beat !== 0) {
      setRevealLast(false);
      setAutoBlack(false);
      return;
    }
    const t1 = setTimeout(() => setRevealLast(true), 3000);
    // statement is fully in by ~4s; hold ~2s, then fade to black
    const t2 = setTimeout(() => setAutoBlack(true), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [beat, review]);

  // in the review contact sheet, show the finished statement (no auto-fade)
  const last = review || revealLast;
  const black = !review && (beat >= 1 || autoBlack);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 64,
          padding: "0 160px",
          pointerEvents: "none",
        }}
      >
        <p className="lead" style={{ fontSize: 42, color: "var(--ink-faint)", marginTop: 40 }}>
          <Words text="AI commoditises execution." at={0} />
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

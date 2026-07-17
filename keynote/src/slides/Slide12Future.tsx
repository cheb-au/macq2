import { useEffect, useState } from "react";
import { Words } from "../components/Reveal";
import { useBeat } from "../engine/PresentationContext";
import type { SlideProps } from "../engine/types";

export default function Slide12Future({ review }: SlideProps) {
  const beat = useBeat();

  // beat 0: the small line lands, the statement blurs in ~2.5s later (you hold
  // it as long as you like). beat 1 (2/2): keep it on screen 5s, then fade out.
  const [revealLast, setRevealLast] = useState(false);
  const [autoBlack, setAutoBlack] = useState(false);
  useEffect(() => {
    if (review) return;
    setAutoBlack(false);
    if (beat === 0) {
      const t = setTimeout(() => setRevealLast(true), 2500);
      return () => clearTimeout(t);
    }
    // beat 1: statement stays up, then fades to black after 5 seconds
    setRevealLast(true);
    const t = setTimeout(() => setAutoBlack(true), 5000);
    return () => clearTimeout(t);
  }, [beat, review]);

  // in the review contact sheet, show the finished statement (no auto-fade)
  const last = review || revealLast;
  const black = !review && autoBlack;

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

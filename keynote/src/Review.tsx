import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { BeatProvider } from "./engine/PresentationContext";
import { NodeField } from "./components/NodeField";
import { slides } from "./slides";

/**
 * A simple scroll-through of every slide in its final (fully-revealed) state -
 * for quick visual feedback. Open at #/review.
 */
export function Review() {
  const rootRef = useRef<HTMLDivElement>(null);

  // scale each 1920px stage to whatever width the frame actually renders at
  useEffect(() => {
    const fit = () => {
      const frame = rootRef.current?.querySelector(".review__frame");
      if (!frame) return;
      const scale = frame.getBoundingClientRect().width / 1920;
      rootRef.current!.style.setProperty("--rscale", String(scale));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="review" ref={rootRef}>
      <div className="review__head">
        <h1>Designing the AI-Native Organisation</h1>
        <p>Final state of every slide · scroll to review</p>
      </div>

      {slides.map((s, i) => {
        // show the last meaningful beat (skip S12's fade-to-black)
        const finalBeat = s.id === "s13" ? s.beats - 2 : s.beats - 1;
        const frameStyle = {
          ["--accent" as string]: s.accent ?? "var(--violet)",
          ["--accent-glow" as string]: s.accentGlow ?? "rgba(139,147,255,0.5)",
        } as CSSProperties;

        return (
          <div className="review__item" key={s.id}>
            <div className="review__meta">
              <span className="review__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="review__id">/ {slides.length}</span>
            </div>
            <div className="review__frame" style={frameStyle}>
              <div className="review__stage">
                <div className="stage__glow" />
                <NodeField />
                <section className="slide" data-state="active">
                  <BeatProvider value={finalBeat}>
                    <s.Component active beat={finalBeat} dir={1} review />
                  </BeatProvider>
                </section>
                <div className="stage__grain" />
                <div className="stage__vignette" />
              </div>
            </div>
          </div>
        );
      })}

      <div className="review__foot">End · open the deck at #/ for the live keynote</div>
    </div>
  );
}

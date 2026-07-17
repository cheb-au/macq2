import type { CSSProperties } from "react";
import { BeatProvider } from "../engine/PresentationContext";
import type { SlideDef } from "../engine/types";

/**
 * A live miniature of a slide at a given beat - the same 1920x1080 stage the
 * deck renders, scaled down. Used by the presenter view.
 */
export function SlidePreview({
  slide,
  beat,
  width,
}: {
  slide: SlideDef;
  beat: number;
  width: number;
}) {
  const scale = width / 1920;
  const height = width * (1080 / 1920);
  const style = {
    ["--accent" as string]: slide.accent ?? "var(--violet)",
    ["--accent-glow" as string]: slide.accentGlow ?? "rgba(139,147,255,0.5)",
    transform: `scale(${scale})`,
  } as CSSProperties;

  return (
    <div className="pv" style={{ width, height }}>
      <div className="pv__stage" style={style}>
        <div className="stage__glow" />
        <section className="slide" data-state="active">
          <BeatProvider value={beat}>
            <slide.Component active beat={beat} dir={1} />
          </BeatProvider>
        </section>
        <div className="stage__grain" />
        <div className="stage__vignette" />
      </div>
    </div>
  );
}

import { BeatProvider } from "./PresentationContext";
import type { Controller } from "./PresentationContext";

/**
 * Renders the slide stack. Exactly one slide is "active"; neighbours are
 * mounted (for cinematic enter/exit) but far slides render an empty shell
 * to keep ambient animation cost low.
 */
export function Deck({ ctrl }: { ctrl: Controller }) {
  const { index, beat, dir, slides } = ctrl;

  return (
    <div className="deck">
      {slides.map((s, i) => {
        const state =
          i === index ? "active" : i < index ? "past" : "future";
        const near = Math.abs(i - index) <= 1;

        // per-slide beat: active uses live beat; past slides sit fully
        // revealed as they recede; future slides start blank.
        const slideBeat =
          i === index ? beat : i < index ? s.beats - 1 : -1;

        return (
          <section
            key={s.id}
            className="slide"
            data-state={state}
            aria-hidden={state !== "active"}
          >
            {near && (
              <BeatProvider value={slideBeat}>
                <s.Component active={i === index} beat={slideBeat} dir={dir} />
              </BeatProvider>
            )}
          </section>
        );
      })}
    </div>
  );
}

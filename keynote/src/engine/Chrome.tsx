import type { Controller } from "./PresentationContext";

export function Chrome({ ctrl, showHint }: { ctrl: Controller; showHint: boolean }) {
  const { index, beat, slides, goTo } = ctrl;
  const total = slides.length;
  const beats = slides[index].beats;

  return (
    <>
      <div className="chrome">
        <div className="chrome__top">
          <div className="wordmark">
            <svg className="wordmark__logo" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 3 12l9 10 9-10L12 2Z" stroke="var(--ink-soft)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M12 7 7.5 12 12 17l4.5-5L12 7Z" stroke="var(--accent)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            <span>Macquarie</span>
            <span className="wordmark__sep">·</span>
            <span className="wordmark__sub">Head of UX</span>
          </div>
        </div>

        {/* vertical navigation rail - right edge, top-down */}
        <div className="nav-rail">
          <div className="nav-rail__count">
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>/ {String(total).padStart(2, "0")}</span>
          </div>
          {slides.map((s, i) => {
            const state = i < index ? "done" : i === index ? "cur" : "future";
            return (
              <div
                key={s.id}
                className="nav-rail__row"
                data-state={state}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
              >
                {state === "cur" ? (
                  <span className="nav-rail__tick nav-rail__tick--cur">
                    {Array.from({ length: beats }).map((_, b) => (
                      <i key={b} className={b <= beat ? "on" : ""} />
                    ))}
                  </span>
                ) : (
                  <span className="nav-rail__tick" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

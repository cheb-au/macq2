import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "./slides";
import { NOTES } from "./notes";
import { SlidePreview } from "./components/SlidePreview";

const CHANNEL = "keynote";

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function clock() {
  const d = new Date();
  let h = d.getHours();
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

export function Presenter() {
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [split, setSplit] = useState(60); // % width of the left (previews) column
  const [noteSize, setNoteSize] = useState(24);
  const [now, setNow] = useState(Date.now());
  const startRef = useRef(Date.now());
  const chRef = useRef<BroadcastChannel | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftW, setLeftW] = useState(720);

  // ---- sync with the deck window ----
  useEffect(() => {
    const ch = new BroadcastChannel(CHANNEL);
    chRef.current = ch;
    ch.onmessage = (e) => {
      const m = e.data;
      if (m?.t === "state") {
        setIndex(m.index);
        setBeat(m.beat);
      }
    };
    ch.postMessage({ t: "hello" }); // ask the deck for its current position
    return () => ch.close();
  }, []);

  const send = useCallback((cmd: string, target?: number) => {
    chRef.current?.postMessage({ t: "cmd", cmd, target });
  }, []);

  // ---- keyboard mirrors the deck ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          send("next");
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          send("prev");
          break;
        case "Home":
          send("first");
          break;
        case "End":
          send("last");
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [send]);

  // ---- ticking clock/timer + responsive preview sizing ----
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(t);
  }, []);
  useEffect(() => {
    const measure = () => setLeftW(leftRef.current?.clientWidth ?? 720);
    measure();
    const ro = new ResizeObserver(measure);
    if (leftRef.current) ro.observe(leftRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ---- draggable divider ----
  const drag = (e: React.MouseEvent) => {
    e.preventDefault();
    const move = (ev: MouseEvent) => {
      const pct = (ev.clientX / window.innerWidth) * 100;
      setSplit(Math.min(80, Math.max(32, pct)));
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const total = slides.length;
  const cur = slides[index];
  const prev = index > 0 ? slides[index - 1] : null;
  const next = index < total - 1 ? slides[index + 1] : null;
  const note = NOTES[cur?.id];
  const nextNote = next ? NOTES[next.id] : null;

  const pad = 28;
  const bigW = Math.max(240, leftW - pad * 2);
  const smallW = Math.max(160, (leftW - pad * 2 - 20) / 2);

  return (
    <div className="pr">
      <div className="pr__left" ref={leftRef} style={{ width: `${split}%` }}>
        <div className="pr__bar">
          <div className="pr__timer">
            <span className="pr__elapsed">{fmt(now - startRef.current)}</span>
            <button
              className="pr__btn"
              onClick={() => (startRef.current = Date.now())}
            >
              Reset
            </button>
          </div>
          <div className="pr__count">
            Slide {index + 1} / {total}
            <span className="pr__beat">
              {" "}
              · beat {beat + 1} / {cur?.beats ?? 1}
            </span>
          </div>
          <div className="pr__clock">{clock()}</div>
        </div>

        <div className="pr__current" style={{ padding: pad }}>
          <SlidePreview slide={cur} beat={beat} width={bigW} />
        </div>

        <div className="pr__thumbs" style={{ padding: `0 ${pad}px ${pad}px` }}>
          <button className="pr__thumb" onClick={() => send("prev")} disabled={!prev}>
            <span className="pr__thumbcap">‹ Previous</span>
            {prev ? (
              <SlidePreview slide={prev} beat={prev.beats - 1} width={smallW} />
            ) : (
              <div className="pv pv--empty" style={{ width: smallW, height: smallW * (1080 / 1920) }} />
            )}
          </button>
          <button className="pr__thumb" onClick={() => send("next")} disabled={!next}>
            <span className="pr__thumbcap">Next ›</span>
            {next ? (
              <SlidePreview slide={next} beat={0} width={smallW} />
            ) : (
              <div className="pv pv--empty" style={{ width: smallW, height: smallW * (1080 / 1920) }} />
            )}
          </button>
        </div>
      </div>

      <div className="pr__divider" onMouseDown={drag} />

      <div className="pr__notes" style={{ width: `${100 - split}%` }}>
        <div className="pr__noteshead">
          <span className="pr__notestitle">{note?.title ?? cur?.id}</span>
          <div className="pr__fontctl">
            <button className="pr__btn" onClick={() => setNoteSize((s) => Math.max(14, s - 2))}>
              A-
            </button>
            <button className="pr__btn" onClick={() => setNoteSize((s) => Math.min(48, s + 2))}>
              A+
            </button>
          </div>
        </div>
        <div className="pr__notesbody" style={{ fontSize: noteSize, lineHeight: 1.5 }}>
          {(note?.notes ?? "No notes for this slide yet.")
            .split("\n")
            .map((line, i) => (
              <p key={i} className={line.trim() ? "" : "pr__gap"}>
                {line}
              </p>
            ))}
          {nextNote && (
            <div className="pr__nextnote">
              <span className="pr__nextlabel">Up next — {nextNote.title}</span>
              <p>{nextNote.notes.split("\n")[0]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

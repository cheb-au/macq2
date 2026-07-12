import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { SlideDef } from "./types";

// the deck remembers where you are in the URL hash (#4 = slide 4, #4.2 = beat 2)
// so a refresh lands you on the same spot instead of the title
function readHash(slides: SlideDef[]): { index: number; beat: number } {
  const m = /^#(\d+)(?:\.(\d+))?$/.exec(window.location.hash);
  if (!m) return { index: 0, beat: 0 };
  const index = Math.max(0, Math.min(slides.length - 1, parseInt(m[1], 10) - 1));
  const beat = Math.max(
    0,
    Math.min(slides[index].beats - 1, m[2] ? parseInt(m[2], 10) : 0)
  );
  return { index, beat };
}

/* ---- Beat context: a slide's children read the active reveal beat ---- */
const BeatContext = createContext<number>(-1);
export const BeatProvider = BeatContext.Provider;
export const useBeat = () => useContext(BeatContext);

export interface Controller {
  index: number;
  beat: number;
  dir: number;
  /** increments on every navigation step - used to re-trigger animations */
  step: number;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
  slides: SlideDef[];
}

export function usePresentation(slides: SlideDef[]): Controller {
  const start = useRef(readHash(slides));
  const [index, setIndex] = useState(start.current.index);
  const [beat, setBeat] = useState(start.current.beat);
  const [dir, setDir] = useState(1);
  const [step, setStep] = useState(0);
  const lock = useRef(false);

  // refs hold the source of truth so navigation reads current values
  const iRef = useRef(index);
  const bRef = useRef(beat);
  iRef.current = index;
  bRef.current = beat;

  // mirror position into the URL hash (replaceState = no reload, no history spam)
  useEffect(() => {
    const suffix = beat > 0 ? `.${beat}` : "";
    window.history.replaceState(null, "", `#${index + 1}${suffix}`);
  }, [index, beat]);

  // debounce so an autorepeating key press doesn't skip beats
  const guard = useCallback((fn: () => void) => {
    if (lock.current) return;
    lock.current = true;
    fn();
    window.setTimeout(() => (lock.current = false), 90);
  }, []);

  const next = useCallback(() => {
    guard(() => {
      const i = iRef.current;
      const b = bRef.current;
      const max = slides[i].beats - 1;
      setDir(1);
      setStep((s) => s + 1);
      if (b < max) {
        setBeat(b + 1);
      } else if (i < slides.length - 1) {
        setIndex(i + 1);
        setBeat(0);
      }
    });
  }, [guard, slides]);

  const prev = useCallback(() => {
    guard(() => {
      const i = iRef.current;
      const b = bRef.current;
      setDir(-1);
      setStep((s) => s + 1);
      if (b > 0) {
        setBeat(b - 1);
      } else if (i > 0) {
        setIndex(i - 1);
        setBeat(slides[i - 1].beats - 1);
      }
    });
  }, [guard, slides]);

  const goTo = useCallback(
    (target: number) => {
      guard(() => {
        const clamped = Math.max(0, Math.min(slides.length - 1, target));
        setDir(clamped >= iRef.current ? 1 : -1);
        setStep((s) => s + 1);
        setIndex(clamped);
        setBeat(0);
      });
    },
    [guard, slides]
  );

  return { index, beat, dir, step, next, prev, goTo, slides };
}

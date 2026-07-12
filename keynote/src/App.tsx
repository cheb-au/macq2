import { useEffect, useRef, useState } from "react";
import { usePresentation } from "./engine/PresentationContext";
import { Deck } from "./engine/Deck";
import { Chrome } from "./engine/Chrome";
import { NodeField } from "./components/NodeField";
import { slides } from "./slides";

export default function App() {
  const ctrl = usePresentation(slides);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);
  const hintTimer = useRef<number>(0);

  const { next, prev, goTo, index } = ctrl;

  // ---- fit the 1920x1080 stage into the viewport (letterboxed) ----
  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      if (stageRef.current)
        stageRef.current.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // ---- keyboard-driven presentation control ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(slides.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          // number keys jump to a slide
          if (/^[1-9]$/.test(e.key)) {
            e.preventDefault();
            goTo(parseInt(e.key, 10) - 1);
          }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  const toggleFullscreen = () => {
    const el = viewportRef.current ?? document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  };

  // ---- reveal the keyboard hint briefly, then again when idle ----
  useEffect(() => {
    const bump = () => {
      setShowHint(true);
      window.clearTimeout(hintTimer.current);
      hintTimer.current = window.setTimeout(() => setShowHint(false), 3200);
    };
    bump();
    window.addEventListener("mousemove", bump);
    window.addEventListener("keydown", bump);
    return () => {
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("keydown", bump);
      window.clearTimeout(hintTimer.current);
    };
  }, []);

  // ---- drive the ambient accent per active slide ----
  const active = slides[index];
  const stageStyle = {
    ["--accent" as string]: active.accent ?? "var(--violet)",
    ["--accent-glow" as string]: active.accentGlow ?? "rgba(139,147,255,0.5)",
  } as React.CSSProperties;

  return (
    <div
      className="viewport"
      ref={viewportRef}
      onClick={() => next()}
    >
      <div className="stage" ref={stageRef} style={stageStyle}>
        <div className="stage__glow" />
        <NodeField />
        <Deck ctrl={ctrl} />
        <div className="stage__grain" />
        <div className="stage__vignette" />
        <Chrome ctrl={ctrl} showHint={showHint} />
      </div>
    </div>
  );
}

import { Icon } from "./Icons";
import type { ComponentType } from "react";

interface Layer {
  key: string;
  label: string;
  meta: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

// build order - foundation first (index 0), production last
const LAYERS: Layer[] = [
  { key: "repo", label: "Repository", meta: "the foundation", icon: Icon.grid },
  { key: "auth", label: "Authentication", meta: "accounts & identity", icon: Icon.shield },
  { key: "pay", label: "Payments", meta: "real money moves", icon: Icon.card },
  { key: "browser", label: "Browser automation", meta: "agents in the loop", icon: Icon.bolt },
  { key: "ai", label: "AI", meta: "generation & investigation", icon: Icon.spark },
  { key: "exp", label: "Experiments", meta: "evidence, not opinion", icon: Icon.tree },
  { key: "prod", label: "Production", meta: "real customers", icon: Icon.signal },
];

/**
 * The emotional centrepiece: Levri assembling itself from nothing. Each beat
 * lays down another layer of the platform - the stack literally builds upward
 * from an empty repository to a live production system.
 */
export function LevriStack({ beat }: { beat: number }) {
  const activeCount = Math.max(0, Math.min(beat + 1, LAYERS.length));
  const live = beat >= LAYERS.length - 1;
  const pct = (activeCount / LAYERS.length) * 100;

  return (
    <div className={["lvstack", live ? "is-live" : ""].join(" ")}>
      <div className="lvstack__spine">
        <div className="lvstack__fill" style={{ height: `${pct}%` }} />
      </div>
      <div className="lvstack__rows">
        {/* render top → bottom (production first) */}
        {LAYERS.slice().reverse().map((l) => {
          const idx = LAYERS.indexOf(l);
          const on = beat >= idx;
          const top = idx === activeCount - 1; // most-recently laid layer
          return (
            <div
              key={l.key}
              className={["lvl", on ? "on" : "", top ? "top" : ""].join(" ")}
            >
              <div className="lvl__orb">
                <l.icon size={24} />
              </div>
              <div className="lvl__body">
                <div className="lvl__label">{l.label}</div>
                <div className="lvl__meta">{l.meta}</div>
              </div>
              <div className="lvl__status">{on && <span className="lvl__dot" />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

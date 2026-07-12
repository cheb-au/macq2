// a smooth wave line across a 0..1440 viewBox (4 wavelengths -> seamless scroll)
function waveLine(amp: number, base: number, phase: number) {
  let d = `M0 ${(base + amp * Math.sin(phase)).toFixed(1)}`;
  for (let x = 15; x <= 1440; x += 15) {
    const y = base + amp * Math.sin((x / 360) * Math.PI * 2 + phase);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}
const FILL_A = waveLine(8, 28, 0) + " L1440 60 L0 60 Z";
const CREST = waveLine(8, 28, 0);

export interface CeilWord {
  t: string;
  gold?: boolean;
}

interface WaterTankProps {
  /** water height, 0..100 */
  level: number;
  /** ceiling words revealed */
  ceilOn: boolean;
  ceiling: CeilWord[];
  /** whether the gold (final) word has revealed - lets it land last */
  lastIn?: boolean;
  subCaption?: string;
}

/**
 * The value tank - execution is the rising floor, judgement/taste/systems/
 * leadership the ceiling only leaders raise. Shared by slide 04 and the close.
 */
export function WaterTank({
  level,
  ceilOn,
  ceiling,
  lastIn = true,
  subCaption,
}: WaterTankProps) {
  return (
    <div className="s-fill center" style={{ flexDirection: "column", gap: 0 }}>
      <div className="tank">
        <div className="tank__ceiling" data-on={ceilOn}>
          {ceiling.map((c, i) => (
            <span
              key={c.t}
              className={c.gold ? "tank__ceil--gold" : ""}
              style={
                c.gold
                  ? { opacity: lastIn ? 1 : 0, transition: "opacity 0.9s var(--ease-out)" }
                  : undefined
              }
            >
              {c.t}
              {i < ceiling.length - 1 && <i style={{ marginLeft: 22 }} />}
            </span>
          ))}
        </div>
        <div className="tank__caption" data-on={ceilOn}>
          the ceiling - only leaders raise it
        </div>
        {subCaption && (
          <div className="tank__caption tank__caption--sub" data-on={ceilOn}>
            {subCaption}
          </div>
        )}

        <div className="tank__water" style={{ height: `${level}%` }}>
          <div className="tank__body" />
          <div className="tank__waves">
            <svg
              className="tank__wave tank__wave--a"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
            >
              <path d={FILL_A} />
            </svg>
            <svg
              className="tank__wave tank__crest"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
            >
              <path d={CREST} fill="none" />
            </svg>
          </div>
          <div className="tank__fill-label">Where leaders create value</div>
        </div>
      </div>

      <div className="tank-floor">
        <b>Execution</b> - the floor, raised by AI
      </div>
    </div>
  );
}

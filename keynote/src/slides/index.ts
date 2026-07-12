import type { SlideDef } from "../engine/types";
import Slide01Title from "./Slide01Title";
import Slide02Work from "./Slide02Work";
import Slide03Artefacts from "./Slide03Artefacts";
import Slide04Value from "./Slide04Value";
import Slide05HeadOfUX from "./Slide05HeadOfUX";
import Slide06Pipeline from "./Slide06Pipeline";
import Slide07Levri from "./Slide07Levri";
import Slide08Intent from "./Slide08Intent";
import Slide09Governance from "./Slide09Governance";
import Slide10Growth from "./Slide10Growth";
import Slide11RAG from "./Slide11RAG";
import Slide12Sanctioned from "./Slide12Sanctioned";
import Slide12Future from "./Slide12Future";

const V = "var(--violet)";
const B = "var(--blue)";
const G = "var(--gold)";

// run of show: People (05-06) -> Levri proof (07) -> Ways of working (08-11)
// -> Tools (12) -> Close (13). Component names keep their original numbers.
export const slides: SlideDef[] = [
  { id: "s01", beats: 4, accent: V, accentGlow: "rgba(139,147,255,0.5)", Component: Slide01Title },
  { id: "s02", beats: 4, accent: B, accentGlow: "rgba(91,141,239,0.45)", Component: Slide02Work },
  { id: "s03", beats: 3, accent: V, accentGlow: "rgba(139,147,255,0.45)", Component: Slide03Artefacts },
  { id: "s04", beats: 3, accent: V, accentGlow: "rgba(139,147,255,0.45)", Component: Slide04Value },
  { id: "s05", beats: 3, accent: V, accentGlow: "rgba(139,147,255,0.45)", Component: Slide05HeadOfUX },
  { id: "s06", beats: 8, accent: V, accentGlow: "rgba(139,147,255,0.45)", Component: Slide10Growth },
  { id: "s07", beats: 6, accent: G, accentGlow: "rgba(203,171,116,0.45)", Component: Slide07Levri },
  { id: "s08", beats: 7, accent: B, accentGlow: "rgba(91,141,239,0.45)", Component: Slide06Pipeline },
  { id: "s09", beats: 4, accent: V, accentGlow: "rgba(139,147,255,0.45)", Component: Slide08Intent },
  { id: "s10", beats: 1, accent: V, accentGlow: "rgba(139,147,255,0.4)", Component: Slide09Governance },
  { id: "s11", beats: 5, accent: "var(--amber)", accentGlow: "rgba(224,178,95,0.4)", Component: Slide11RAG },
  { id: "s12", beats: 2, accent: B, accentGlow: "rgba(91,141,239,0.45)", Component: Slide12Sanctioned },
  { id: "s13", beats: 6, accent: B, accentGlow: "rgba(91,141,239,0.5)", Component: Slide12Future },
];

"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  CheckSquare,
  Compass,
  FileText,
  Flag,
  Gem,
  Heart,
  Lightbulb,
  Lock,
  PencilRuler,
  PenTool,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const deckTitle = "Designing the AI-Native Organisation";

type Direction = 1 | -1;
type TitleSize = "hero" | "standard" | "long" | "compact";

type PresenterNotes = {
  purpose: string;
  speakerNotes: string;
  keySentence: string;
  likelyQuestion: string;
  suggestedResponse: string;
  transition: string;
};

type Slide = {
  title: string;
  kicker?: string;
  subtitle?: string;
  titleSize?: TitleSize;
  scene: (active: boolean, buildStep?: number) => ReactNode;
  buildSteps?: number;
  notes: PresenterNotes;
};

const ease = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { y: 26, opacity: 0, filter: "blur(10px)" },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.12 + i * 0.055, duration: 0.72, ease },
  }),
};

const words = {
  hidden: { y: 64, opacity: 0, filter: "blur(16px)" },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.12 + i * 0.15, duration: 1.02, ease },
  }),
};

const makeNotes = (
  purpose: string,
  speakerNotes: string,
  keySentence: string,
  likelyQuestion: string,
  suggestedResponse: string,
  transition: string,
): PresenterNotes => ({
  purpose,
  speakerNotes,
  keySentence,
  likelyQuestion,
  suggestedResponse,
  transition,
});

const slides: Slide[] = [
  {
    kicker: "Macquarie Bank",
    title: "Designing the AI-Native Organisation",
    subtitle: "What building an AI company taught me about people, ways of working and tools",
    titleSize: "hero",
    scene: (active) => <OpeningScene active={active} />,
    notes: makeNotes(
      "Establish credibility and make clear this is not a speculative AI trend talk.",
      "Open by saying this talk comes from two worlds at once: leading enterprise design teams and building Levri as an AI-native product. Set the tone that the point is not tool enthusiasm. The point is how capability availability changes the design organisation itself.",
      "This is not a presentation about using AI. It is about designing organisations that can use AI responsibly and exceptionally well.",
      "Is Levri a side project or real evidence?",
      "I would describe Levri as evidence of lived operating-model change: product, platform, AI workflow and production constraints compressed into one build cycle. I will separate verified facts from placeholders.",
      "Move from credibility into the strategic shift: why this is not just productivity.",
    ),
  },
  {
    title: "AI does not just make the work faster. It changes who can do the work.",
    titleSize: "standard",
    scene: (active) => <ProductivityScene active={active} />,
    notes: makeNotes(
      "Make the strategic shift instantly understandable for product, HR and executives.",
      "Start with the simple point: AI is not only speeding up existing tasks. It changes who can move across design, software, research and data. That is why the organisational question matters.",
      "That changes the shape of the team.",
      "How is this different from normal automation?",
      "Automation speeds a defined task. This changes who can participate in the task and how much cross-disciplinary movement one person can credibly make.",
      "Use that to introduce the new unit of work.",
    ),
  },
  {
    title: "From producing deliverables to accelerating learning.",
    titleSize: "long",
    scene: (active) => <LearningLoopScene active={active} />,
    notes: makeNotes(
      "Replace the too-absolute collapsed-process claim with a credible learning-loop thesis.",
      "Walk through the old delivery chain, then the AI-native loop. Be explicit: this does not mean research, risk, legal or integration disappear. It means the time between an idea and usable evidence can shrink dramatically.",
      "The advantage is not producing more screens. It is learning which ideas deserve investment before the organisation commits to them.",
      "Are you saying delivery now takes hours?",
      "No. I am saying the cost of producing and testing an idea has collapsed. The cost of making a responsible decision has not.",
      "Now ground the thesis in Levri.",
    ),
  },
  {
    title: "Three months, one founder, multidisciplinary scope.",
    titleSize: "compact",
    scene: (active) => <LevriTimelineScene active={active} />,
    notes: makeNotes(
      "Use Levri as proof of scope without overstating what AI replaced.",
      "Set up the traditional build versus my build. The point is not that AI replaced all those roles. The point is that it gave me leverage across disciplines that would normally require a much larger team and a longer delivery runway.",
      "AI did not give me more hours. It gave me access to more disciplines.",
      "Could a bank reproduce this in three months?",
      "Not directly, and that is the point. Enterprise constraints are different. But the lesson about compressed loops, orchestration and decision quality does transfer.",
      "Move from timeline to concrete product scope.",
    ),
  },
  {
    title: "This was not a prototype. It became an operating product.",
    titleSize: "long",
    scene: (active) => <ArchitectureScene active={active} />,
    notes: makeNotes(
      "Demonstrate Levri as real product/platform scope rather than a vague claim.",
      "Keep the architecture readable. Show only what customers see, what makes it work, and what makes it real. The right side should be one large product evidence area, not multiple small placeholders.",
      "Levri matters here because it forced me to operate across product, design, engineering, AI and production risk at the same time.",
      "Where are the real product screenshots?",
      "Use a product evidence slot if a verified screenshot is not available yet. Do not fake product proof.",
      "Shift from what was built to how work actually happened.",
    ),
  },
  {
    title: "A real Levri incident changed how I think about AI work.",
    titleSize: "long",
    scene: (active) => <ClosedLoopScene active={active} />,
    notes: makeNotes(
      "Make the closed loop personal and memorable rather than generic.",
      "Describe the incident: credits were charged before an analysis completed. AI traced the charging path, inspected database functions, found mismatched run IDs, proposed an atomic refund flow, and helped implement tests. My role was to reject manual table edits, require an idempotent path, separate the follow-up issue and verify the customer outcome.",
      "I no longer ask AI for code. I direct an investigation and govern the outcome.",
      "Who owns quality if an agent writes code?",
      "The human and the organisation do. AI can assist search, synthesis and implementation, but accountability, risk thresholds and approval stay human.",
      "Next, make the boundary between acceleration and responsibility explicit.",
    ),
  },
  {
    title: "AI removed waiting. It did not remove responsibility.",
    titleSize: "standard",
    scene: (active) => <AccelerationScene active={active} />,
    notes: makeNotes(
      "Balance ambition with banking credibility.",
      "Use the two columns to show what sped up and what did not. Emphasise that AI increases range and pace, but customer problem selection, evidence quality, privacy, architecture trade-offs and shipping decisions still need judgement.",
      "AI increased my range. It did not outsource my judgement.",
      "What still slows teams down?",
      "The right things: customer access, risk, compliance, strategic prioritisation and quality thresholds. The opportunity is to remove avoidable waiting around those moments.",
      "This naturally leads to the role change from maker to orchestrator.",
    ),
  },
  {
    title: "AI is changing every part of the design practice.",
    titleSize: "compact",
    scene: (active, buildStep = 0) => <DesignPracticeScene active={active} buildStep={buildStep} />,
    buildSteps: 6,
    notes: makeNotes(
      "Translate the personal Levri case study into implications for the wider UXD organisation.",
      "Explain that the same pattern is appearing across discovery, definition, making, validation, delivery and learning. The point is not the tools themselves. The point is that the design loop is becoming more connected, with less friction between customer access, evidence, prototypes, testing and learning.",
      "AI gives teams access to specialist leverage, but it does not give them specialist judgement. The role of the design organisation is to connect these capabilities while protecting the integrity of the disciplines.",
      "Does this weaken specialist disciplines?",
      "It can if leaders treat AI output as expertise. The healthier model is supervised leverage: researchers, designers, content specialists, accessibility experts and design-system teams set standards, review quality and make the work safer to scale.",
      "Move from the practice-wide design loop into what this means for people and apprenticeship.",
    ),
  },
  {
    title: "Every designer now has access to specialist leverage.",
    titleSize: "compact",
    scene: (active) => <SpecialistLeverageScene active={active} />,
    notes: makeNotes(
      "Combine the people leverage idea with the apprenticeship tension.",
      "Use the phrase specialist leverage carefully. AI can help designers review semantics, cluster evidence, build functional prototypes and interpret data signals. But it does not make them specialists. Then raise the leadership problem: how do juniors develop judgement when AI performs work they once learned through?",
      "Not specialist expertise. Specialist leverage.",
      "How do designers know whether the output is good?",
      "Leaders need to keep apprenticeship but shift it toward critique, customer exposure, systems and verification, with supervised and transparent AI-assisted work.",
      "Move from people to the new working loops.",
    ),
  },
  {
    title: "The design process does not disappear. The loops become smaller.",
    titleSize: "compact",
    scene: (active) => <WaysOfWorkingScene active={active} />,
    notes: makeNotes(
      "Replace the old process-collapse claim with a mature operating model.",
      "Walk through discovery, making and delivery loops. Name where AI supports the loop and where human or customer input is mandatory. This is especially important in regulated environments.",
      "The aim is not to remove collaboration. It is to remove unnecessary waiting between moments of collaboration.",
      "What about legal and risk review?",
      "They become earlier and more structured inputs into the loop, not late-stage blockers. The point is to generate better evidence before those reviews.",
      "Next, show why the tool catalogue has to become a capability model.",
    ),
  },
  {
    title: "The tools are beginning to connect.",
    titleSize: "long",
    scene: (active) => <CapabilityModelScene active={active} />,
    notes: makeNotes(
      "Give the product leader the newer shift: AI features are becoming connected through shared context.",
      "Focus on MCP, queryable research repositories, Figma connected to design systems and code, Claude Code and Codex working in real repositories, and insights travelling into the moment where decisions are made.",
      "The next wave is not more isolated AI features. It is shared context moving between research, design, product and engineering.",
      "Which tool should Macquarie standardise on?",
      "The better question is which capability needs to be safe, integrated and measurable. Tool choices should follow from that.",
      "Move from tools into accountability.",
    ),
  },
  {
    title: "The risk is not speed. It is unclear accountability.",
    titleSize: "standard",
    scene: (active) => <GovernanceScene active={active} />,
    notes: makeNotes(
      "Make the leadership content credible for a regulated enterprise.",
      "Frame governance around three executive questions: what data is the model allowed to see, what decisions can it influence, and who remains accountable for the outcome. Green, amber and red then become supporting detail rather than the main idea.",
      "The risk is not that AI moves too fast. It is that accountability becomes unclear.",
      "How much autonomy should AI have?",
      "Autonomy should depend on data sensitivity, customer impact and reversibility. The higher the risk, the stronger the review, traceability and accountability required.",
      "Translate the framework into a practical 90-day plan.",
    ),
  },
  {
    title: "I would start by finding the design friction.",
    titleSize: "compact",
    scene: (active) => <RoadmapScene active={active} />,
    notes: makeNotes(
      "Show a practical first 90 days at Macquarie.",
      "Make the plan design-specific: find where designers wait, where engineering rebuilds prototypes, where synthesis is slow and where the design system is too weak to guide AI. Then prove three workflows before building the operating model.",
      "Start with friction, prove workflows, then scale the operating model.",
      "What would you do first?",
      "Map waiting, rework, synthesis delay and system readiness. Then choose pilots with design, product, engineering, risk and legal together.",
      "Close by returning to the organisational advantage.",
    ),
  },
  {
    title: "The future of design is not AI. It is organisations designed to use AI responsibly and exceptionally well.",
    titleSize: "compact",
    scene: (active) => <ClosingScene active={active} />,
    notes: makeNotes(
      "Land the final executive thesis with the existing cinematic animation style.",
      "Pause between each line. The point is not that AI is unimportant; it is that access to models will commoditise. The differentiator becomes judgement, systems and learning speed.",
      "The advantage will come from better judgement, stronger systems and faster learning.",
      "What differentiates us when everyone has the same tools?",
      "How responsibly and quickly the organisation learns: its systems, governance, talent model and decision quality.",
      "End cleanly and invite discussion.",
    ),
  },
];

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [buildStep, setBuildStep] = useState(0);
  const [overview, setOverview] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const inputLock = useRef(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 16 });
  const sy = useSpring(my, { stiffness: 45, damping: 16 });
  const glowX = useTransform(sx, [-0.5, 0.5], ["18%", "82%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["22%", "72%"]);

  const go = useCallback(
    (next: number) => {
      const bounded = Math.max(0, Math.min(slides.length - 1, next));
      if (bounded === index) {
        setOverview(false);
        return;
      }
      setDirection(bounded > index ? 1 : -1);
      setIndex(bounded);
      setBuildStep(0);
      setOverview(false);
      setBlackout(false);
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(bounded + 1));
      window.history.replaceState(null, "", url);
    },
    [index],
  );

  const moveBy = useCallback(
    (delta: Direction) => {
      if (inputLock.current || overview || blackout) return;
      inputLock.current = true;
      const maxBuildStep = slides[index].buildSteps ?? 0;
      if (delta > 0 && buildStep < maxBuildStep) {
        setBuildStep((value) => Math.min(maxBuildStep, value + 1));
        window.setTimeout(() => {
          inputLock.current = false;
        }, 620);
        return;
      }
      if (delta < 0 && buildStep > 0) {
        setBuildStep((value) => Math.max(0, value - 1));
        window.setTimeout(() => {
          inputLock.current = false;
        }, 620);
        return;
      }
      go(index + delta);
      window.setTimeout(() => {
        inputLock.current = false;
      }, 620);
    },
    [blackout, buildStep, go, index, overview],
  );

  const advance = useCallback(() => moveBy(1), [moveBy]);
  const retreat = useCallback(() => moveBy(-1), [moveBy]);

  useEffect(() => {
    const param = Number(new URLSearchParams(window.location.search).get("slide"));
    if (!Number.isFinite(param)) return;
    const next = Math.max(0, Math.min(slides.length - 1, param - 1));
    if (next > 0) {
      setDirection(1);
      setIndex(next);
      setBuildStep(0);
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        setBlackout((value) => !value);
        return;
      }
      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        setShowNotes((value) => !value);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        if (blackout) {
          setBlackout(false);
          return;
        }
        setOverview((value) => !value);
        return;
      }
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        advance();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        retreat();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24) return;
      event.deltaY > 0 ? advance() : retreat();
    };

    const onMove = (event: MouseEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", onMove);
    };
  }, [advance, blackout, mx, my, retreat]);

  const slide = slides[index];
  const progress = ((index + 1) / slides.length) * 100;

  return (
    <main
      className={`stage ${index === slides.length - 1 ? "final-stage" : ""}`}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button, a, [data-no-advance], .notes-panel")) return;
        if (!overview && !blackout) advance();
      }}
    >
      <motion.div
        className="ambient-glow"
        style={{ "--glow-x": glowX, "--glow-y": glowY } as CSSProperties}
      />
      <div className="noise" />
      <TopProgress progress={progress} />
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.section
          key={index}
          className={`slide slide-${index + 1} title-${slide.titleSize ?? "standard"}`}
          data-slide-index={index + 1}
          custom={direction}
          variants={{
            enter: (dir: Direction) => ({
              x: `${dir * 8}%`,
              opacity: 0,
              scale: 0.97,
              rotateY: dir * -4,
              filter: "blur(14px)",
            }),
            center: { x: "0%", opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" },
            exit: (dir: Direction) => ({
              x: `${dir * -9}%`,
              opacity: 0,
              scale: 1.02,
              rotateY: dir * 4,
              filter: "blur(16px)",
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.82, ease }}
        >
          <SlideHeader slide={slide} index={index} />
          <div className="scene">{slide.scene(true, buildStep)}</div>
        </motion.section>
      </AnimatePresence>
      <AnimatePresence>{overview ? <Overview current={index} onSelect={go} /> : null}</AnimatePresence>
      <AnimatePresence>{showNotes ? <NotesPanel slide={slide} index={index} /> : null}</AnimatePresence>
      <AnimatePresence>{blackout ? <Blackout /> : null}</AnimatePresence>
    </main>
  );
}

function SlideHeader({ slide, index }: { slide: Slide; index: number }) {
  if (index === 0 || index === 7 || index === slides.length - 1) return null;
  return (
    <header className="slide-header">
      <motion.p variants={rise} initial="hidden" animate="visible" className="kicker">
        {slide.kicker ?? `Act ${index < 3 ? "1" : index < 8 ? "2" : index < 13 ? "3" : "4"}`}
      </motion.p>
      <motion.h1 variants={rise} initial="hidden" animate="visible" className="slide-title">
        {slide.title}
      </motion.h1>
      {slide.subtitle ? (
        <motion.p variants={rise} custom={1} initial="hidden" animate="visible" className="slide-subtitle">
          {slide.subtitle}
        </motion.p>
      ) : null}
    </header>
  );
}

function TopProgress({ progress }: { progress: number }) {
  return (
    <div className="top-progress" aria-hidden="true">
      <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease }} />
    </div>
  );
}

function Overview({ current, onSelect }: { current: number; onSelect: (index: number) => void }) {
  return (
    <motion.div
      className="overview"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      onClick={(event) => event.stopPropagation()}
      data-no-advance
    >
      <div className="overview-grid">
        {slides.map((slide, i) => (
          <button className={`overview-card ${i === current ? "active" : ""}`} key={slide.title} onClick={() => onSelect(i)}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {slide.title}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function NotesPanel({ slide, index }: { slide: Slide; index: number }) {
  const rows = [
    ["Purpose", slide.notes.purpose],
    ["Speaker notes", slide.notes.speakerNotes],
    ["Land", slide.notes.keySentence],
    ["Likely question", slide.notes.likelyQuestion],
    ["Suggested response", slide.notes.suggestedResponse],
    ["Transition", slide.notes.transition],
  ];
  return (
    <motion.aside
      className="notes-panel"
      initial={{ x: 420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 420, opacity: 0 }}
      transition={{ duration: 0.42, ease }}
      data-no-advance
    >
      <strong>{String(index + 1).padStart(2, "0")} Presenter Notes</strong>
      {rows.map(([label, value]) => (
        <section key={label}>
          <h3>{label}</h3>
          <p>{value}</p>
        </section>
      ))}
    </motion.aside>
  );
}

function Blackout() {
  return (
    <motion.div
      className="blackout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      data-no-advance
    />
  );
}

function OpeningScene({ active }: { active: boolean }) {
  return (
    <div className="opening-scene">
      <motion.p variants={rise} initial="hidden" animate="visible" className="kicker">
        Macquarie Bank
      </motion.p>
      <h1 className="hero-title" aria-label={deckTitle}>
        {["Designing", "AI-Native", "Organisation"].map((item, i) => (
          <motion.span key={item} custom={i} variants={words} initial="hidden" animate="visible">
            {item}
          </motion.span>
        ))}
      </h1>
      <motion.div className="opening-copy" variants={rise} custom={3} initial="hidden" animate="visible">
        <p>What building an AI company taught me about people, ways of working and tools</p>
        <span>Lessons from building Levri while leading enterprise design teams</span>
      </motion.div>
      <FloatingConstellation active={active} />
    </div>
  );
}

function ProductivityScene({ active }: { active: boolean }) {
  return (
    <div className="two-level">
      <motion.article className="level-card subdued" variants={rise} initial="hidden" animate="visible">
        <span>Before</span>
        <h2>Capability sat inside functions.</h2>
        <ShiftPills from={["Designer creates design", "Engineer creates software", "Researcher creates evidence", "Analyst interprets data"]} muted />
      </motion.article>
      <motion.article className="level-card primary" variants={rise} custom={2} initial="hidden" animate="visible">
        <span>Now</span>
        <h2>A designer can move across all four - with AI support.</h2>
        <ShiftPills from={["Shape the experience", "Probe technical options", "Synthesize evidence", "Interrogate signals"]} />
      </motion.article>
      <motion.blockquote variants={rise} custom={4} initial="hidden" animate="visible">
        That changes the shape of the team.
      </motion.blockquote>
    </div>
  );
}

function ShiftPills({ from, muted }: { from: string[]; muted?: boolean }) {
  return (
    <div className={`shift-pills ${muted ? "muted" : ""}`}>
      {from.map((item) => <b key={item}>{item}</b>)}
    </div>
  );
}

function LearningLoopScene({ active }: { active: boolean }) {
  const old = ["Brief", "Research", "Wireframes", "Prototype", "Handoff", "Build"];
  const modern = ["Hypothesis", "Generate", "Critique", "Prototype", "Test", "Learn"];
  return (
    <div className="loop-scene">
      <ProcessTrack label="Traditional unit" items={old} dim />
      <ProcessTrack label="AI-native unit" items={modern} active={active} />
      <motion.p className="insight-line" variants={rise} custom={4} initial="hidden" animate="visible">
        AI compresses the time between an idea and evidence.
      </motion.p>
    </div>
  );
}

function ProcessTrack({ label, items, dim, active }: { label: string; items: string[]; dim?: boolean; active?: boolean }) {
  return (
    <motion.div className={`process-track ${dim ? "dim" : ""}`} variants={rise} initial="hidden" animate="visible">
      <span>{label}</span>
      {items.map((item, i) => (
        <motion.b key={item} variants={rise} custom={active ? i : 0} initial="hidden" animate="visible">
          {item}
        </motion.b>
      ))}
    </motion.div>
  );
}

function LevriTimelineScene({ active }: { active: boolean }) {
  const traditional = ["Product manager", "Designer", "2-4 engineers", "AI engineer", "QA", "DevOps", "Growth", "12-18 months"];
  const built = ["One founder", "AI-assisted across disciplines", "Production product", "Approximately three months"];
  const scope = ["Product proposition", "Authentication", "Payments", "AI analysis", "Browser automation", "Reports", "Monitoring", "Growth surfaces"];
  return (
    <div className="levri-timeline">
      <motion.article variants={rise} initial="hidden" animate="visible">
        <span>Traditional build</span>
        {traditional.map((item) => <p key={item}>{item}</p>)}
      </motion.article>
      <motion.article className="levri-proof" variants={rise} custom={1} initial="hidden" animate="visible">
        <span>My build</span>
        {built.map((item) => <p key={item}>{item}</p>)}
      </motion.article>
      <motion.article variants={rise} custom={2} initial="hidden" animate="visible">
        <span>Created underneath</span>
        {scope.map((item) => <p key={item}>{item}</p>)}
      </motion.article>
      <motion.blockquote variants={rise} custom={4} initial="hidden" animate="visible">
        AI did not give me more hours. It gave me access to more disciplines.
      </motion.blockquote>
    </div>
  );
}

function ArchitectureScene({ active }: { active: boolean }) {
  const layers = [
    ["What customers see", ["Analysis", "Funnels", "Experiments", "Reports"]],
    ["What makes it work", ["AI orchestration", "Browser automation", "Scoring", "Async jobs"]],
    ["What makes it real", ["Auth", "Payments", "Security", "Monitoring", "Deployment"]],
  ];
  return (
    <div className="architecture-scene">
      <div className="architecture-map">
        {layers.map(([label, items], i) => (
          <motion.article key={label as string} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{label}</span>
            <div>{(items as string[]).map((item) => <b key={item}>{item}</b>)}</div>
          </motion.article>
        ))}
      </div>
      <motion.aside className="screenshot-slots" variants={rise} custom={4} initial="hidden" animate="visible">
        <ScreenshotSlot title="Levri product evidence" detail="Add verified product screenshot here before the interview" />
        <p className="human-note">Product direction, quality and risk stayed with me.</p>
      </motion.aside>
    </div>
  );
}

function ScreenshotSlot({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="screenshot-slot">
      <FileText size={18} />
      <strong>{title}</strong>
      <span>{detail}</span>
    </div>
  );
}

function ClosedLoopScene({ active }: { active: boolean }) {
  const ai = ["Traced charging path", "Inspected database functions", "Found mismatched run IDs", "Proposed atomic refund flow", "Implemented tests"];
  const me = ["Rejected manual table edits", "Required idempotent fix", "Separated follow-up issue", "Verified customer outcome"];
  return (
    <div className="case-study">
      <motion.article className="incident-card" variants={rise} initial="hidden" animate="visible">
        <span>A real production incident</span>
        <h2>Credits were charged before an analysis completed.</h2>
      </motion.article>
      <motion.article className="case-card" variants={rise} custom={1} initial="hidden" animate="visible">
        <span>AI contribution</span>
        {ai.map((item) => <p key={item}>{item}</p>)}
      </motion.article>
      <motion.article className="case-card human" variants={rise} custom={2} initial="hidden" animate="visible">
        <span>My contribution</span>
        {me.map((item) => <p key={item}>{item}</p>)}
      </motion.article>
      <motion.blockquote variants={rise} custom={3} initial="hidden" animate="visible">
        I no longer ask AI for code. I direct an investigation and govern the outcome.
      </motion.blockquote>
    </div>
  );
}

function OwnershipSplit() {
  return (
    <div className="ownership-split">
      <article>
        <span>AI owns</span>
        {["Search", "Synthesis", "Implementation assistance", "Test execution", "Documentation"].map((item) => <p key={item}>{item}</p>)}
      </article>
      <article>
        <span>Human owns</span>
        {["Problem framing", "Trade-offs", "Risk", "Quality threshold", "Approval", "Accountability"].map((item) => <p key={item}>{item}</p>)}
      </article>
    </div>
  );
}

function AccelerationScene({ active }: { active: boolean }) {
  const accelerated = ["Codebase investigation", "Early concepts", "Research synthesis", "Documentation", "Test creation", "Prototype production", "Repetitive implementation", "Cross-disciplinary learning"];
  const judgement = ["Customer problem choice", "Evidence reliability", "Commercial priorities", "Experience quality", "Architecture trade-offs", "Security and privacy", "When not to ship", "Outcome accountability"];
  return <DualList leftTitle="Accelerated" rightTitle="Still required judgement" left={accelerated} right={judgement} />;
}

function DesignPracticeScene({ active, buildStep }: { active: boolean; buildStep: number }) {
  const pointOnCircle = (angle: number, radius: number, tangent = 0, offsetX = 0, offsetY = 0) => {
    const radians = angle * Math.PI / 180;
    return {
      "--x": `calc(50% + ${Math.cos(radians) * radius + -Math.sin(radians) * tangent + offsetX}px)`,
      "--y": `calc(50% + ${Math.sin(radians) * radius + Math.cos(radians) * tangent + offsetY}px)`,
    } as CSSProperties;
  };
  const phaseRadius = 145;
  const toolRadius = phaseRadius + 80;
  const stages = [
    ["Understand", "Discover", "Understand people and context", Search, -90],
    ["Frame", "Define", "Frame the right problem", Target, -30],
    ["Create", "Make", "Create and prototype solutions", PenTool, 30],
    ["Validate", "Validate", "Test with users and measure", CheckSquare, 90],
    ["Ship", "Deliver", "Ship and measure impact", Rocket, 150],
    ["Learn", "Learn", "Turn insights into better decisions", BarChart3, 210],
  ] as const;
  const toolClusters = [
    ["Discover", -90, "row", -99, -54, [
      ["Dovetail", "dovetail", "teal"],
      ["Askable", "askable", "blue"],
      ["Maze", "maze", "purple"],
    ]],
    ["Define", -30, "column", -13, -59, [
      ["Claude", "claude", "amber"],
      ["NotebookLM", "notebooklm", "white"],
    ]],
    ["Make", 30, "column", -8, -102, [
      ["Figma Make", "figma", "multi"],
      ["Figma AI", "figma", "purple"],
    ]],
    ["Validate", 90, "row", -97, -11, [
      ["Stark", "stark", "blue"],
      ["UserTesting", "usertesting", "blue"],
      ["Maze", "maze", "purple"],
    ]],
    ["Deliver", 150, "column", -32, 12, [
      ["Claude Code / Codex", "claude-code", "cream"],
    ]],
    ["Learn", 210, "column", -33, -58, [
      ["Contentsquare", "contentsquare", "multi"],
      ["FullStory", "fullstory", "white"],
    ]],
  ] as const;
  const finalStep = stages.length;
  const activeIndex = Math.min(buildStep, stages.length - 1);
  const isFinal = buildStep >= finalStep;
  const activeAngle = stages[activeIndex][4];
  const radians = activeAngle * Math.PI / 180;
  const cameraX = isFinal ? 0 : Math.cos(radians) * -32;
  const cameraY = isFinal ? 0 : Math.sin(radians) * -26;
  const cameraScale = isFinal ? 0.92 : 1.06;
  const accelerates = [
    ["Recruitment", Users],
    ["Synthesis", Sparkles],
    ["Exploration", Lightbulb],
    ["Prototyping", PenTool],
    ["Analysis", BarChart3],
    ["Documentation", FileText],
  ] as const;
  const accountable = [
    ["Research ethics", ShieldCheck],
    ["Customer empathy", Heart],
    ["Problem selection", Target],
    ["Interpretation", Search],
    ["Quality", Gem],
    ["Outcomes", Flag],
  ] as const;

  return (
    <div className="practice-ecosystem">
      <motion.div className="practice-thesis" variants={rise} custom={1} initial="hidden" animate="visible">
        <p className="kicker">Act 2</p>
        <h1>
          AI is changing
          <span>every part of the</span>
          <em>design practice.</em>
        </h1>
        <p>AI connects the entire design loop from the first customer question to measurable impact.</p>
        <i />
        <motion.blockquote className="practice-message" variants={rise} custom={7} initial="hidden" animate="visible">
          AI does not remove the design process.
          <span>It removes friction between the parts of it.</span>
        </motion.blockquote>
      </motion.div>
      <div className="practice-orbit">
        <motion.div
          className="practice-journey-camera"
          animate={{ x: cameraX, y: cameraY, scale: cameraScale }}
          transition={{ duration: 0.78, ease }}
        >
          <motion.div className="practice-core" variants={rise} initial="hidden" animate="visible">
            <Users />
            <strong>Customer problem</strong>
          </motion.div>
          <div className="practice-planet" aria-hidden="true" />
          {stages.map(([verb, stage, detail, Icon, angle], i) => {
            const status = isFinal ? "complete" : i === activeIndex ? "active" : i < activeIndex ? "visited" : "future";
            return (
              <motion.div
                key={stage}
                className={`practice-stage is-${status}`}
                style={pointOnCircle(angle, phaseRadius)}
                initial={false}
                animate={{
                  opacity: status === "active" ? 1 : status === "visited" ? 0.18 : isFinal ? 0.82 : 0.06,
                  scale: status === "active" ? 1 : status === "visited" ? 0.72 : isFinal ? 0.86 : 0.62,
                  filter: status === "active" || isFinal ? "blur(0px)" : "blur(2px)",
                }}
                transition={{ duration: 0.58, ease }}
              >
                <i><Icon /></i>
                <b>{verb}</b>
                <motion.em
                  initial={false}
                  animate={{ opacity: status === "future" ? 0 : status === "active" || isFinal ? 1 : 0.72 }}
                  transition={{ delay: status === "active" ? 0.48 : 0, duration: 0.38, ease }}
                >
                  {stage}
                </motion.em>
                <p>{detail}</p>
              </motion.div>
            );
          })}
          <AnimatePresence>
            {toolClusters.map(([stage, angle, layout, offsetX, offsetY, items], i) => {
              if (!isFinal && i > activeIndex) return null;
              const status = isFinal ? "complete" : i === activeIndex ? "active" : "visited";
              const clusterRadians = angle * Math.PI / 180;
              return (
          <motion.div
            key={stage}
            className={`practice-tool-cluster cluster-${layout} is-${status}`}
            style={{ ...pointOnCircle(angle, toolRadius, 0, offsetX, offsetY), "--float-delay": `${i * -0.6}s` } as CSSProperties}
            initial={{
              opacity: 0,
              scale: 0.82,
              x: Math.cos(clusterRadians) * -28,
              y: Math.sin(clusterRadians) * -22,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: status === "visited" ? 0.18 : 1,
              scale: status === "visited" ? 0.82 : isFinal ? 0.9 : 1,
              x: 0,
              y: 0,
              filter: status === "visited" ? "blur(1.5px)" : "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.7 }}
          >
            {items.map(([tool, mark, tone]) => (
              <div key={`${stage}-${tool}`} className={`practice-tool tool-${tone}`} title={`${tool} - ${stage}`}>
                <ToolLogo brand={mark} label={tool} />
                <b>{tool}</b>
              </div>
            ))}
          </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
      <motion.div className="accountability-band" variants={rise} custom={8} initial="hidden" animate="visible">
        <div>
          <strong>AI accelerates</strong>
          {accelerates.map(([label, Icon]) => <span key={label}><Icon />{label}</span>)}
        </div>
        <div>
          <strong>Humans remain accountable for</strong>
          {accountable.map(([label, Icon]) => <span key={label}><Icon />{label}</span>)}
        </div>
      </motion.div>
    </div>
  );
}

const simpleIconAssets: Record<string, string> = {
  askable: "/logos/askable.svg",
  dovetail: "/logos/dovetail.svg",
  maze: "/logos/maze.svg",
  claude: "/logos/claude.svg",
  "claude-code": "/logos/claude-code.svg",
  notebooklm: "/logos/notebooklm.svg",
  figma: "/logos/figma.svg",
  usertesting: "/logos/usertesting.svg",
};

function ToolLogo({ brand, label }: { brand: string; label: string }) {
  const src = simpleIconAssets[brand];
  if (!src) {
    return <span className="logo-missing"><abbr title={`${label} official SVG needed`}>{label.slice(0, 2)}</abbr></span>;
  }
  return <span><img src={src} alt="" aria-hidden="true" /></span>;
}

function RoleShiftScene({ active }: { active: boolean }) {
  const roles = [
    ["Maker", "Creates the artefact"],
    ["Manager", "Coordinates people and work"],
    ["Orchestrator", "Frames, constrains, critiques, connects and owns the outcome"],
  ];
  const domains = ["Product", "Design", "Engineering", "Research", "Data", "Growth", "Operations"];
  const domainPositions = [
    ["92%", "50%"],
    ["76%", "83%"],
    ["50%", "92%"],
    ["24%", "83%"],
    ["8%", "50%"],
    ["50%", "8%"],
    ["76%", "17%"],
  ];
  return (
    <div className="role-shift">
      <div className="role-stack">
        {roles.map(([role, detail], i) => (
          <motion.article key={role} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{role}</span>
            <p>{detail}</p>
          </motion.article>
        ))}
      </div>
      <motion.div className="domain-orbit" variants={rise} custom={3} initial="hidden" animate="visible">
        <div><Compass /> Outcome</div>
        {domains.map((domain, i) => (
          <b key={domain} style={{ "--x": domainPositions[i][0], "--y": domainPositions[i][1] } as CSSProperties}>
            {domain}
          </b>
        ))}
      </motion.div>
    </div>
  );
}

function SpecialistLeverageScene({ active }: { active: boolean }) {
  const items = [
    ["Accessibility", "reviews semantics, keyboard paths and contrast"],
    ["Research", "clusters evidence and surfaces contradictions"],
    ["Engineering", "builds functional prototypes against components"],
    ["Data", "turns signals into testable hypotheses"],
    ["UX writing", "drafts alternatives in product voice"],
    ["QA", "checks edge cases and regression paths"],
    ["Documentation", "captures decisions and reusable patterns"],
    ["Strategy", "maps options against business constraints"],
  ];
  return (
    <div className="specialist-scene">
      <motion.div className="designer-core" variants={rise} initial="hidden" animate="visible">
        <PencilRuler />
        <strong>Designer</strong>
      </motion.div>
      <div className="specialist-grid">
        {items.map(([name, action], i) => (
          <motion.article key={name} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{name}</span>
            <p>{action}</p>
          </motion.article>
        ))}
      </div>
      <motion.p className="warning-line" variants={rise} custom={8} initial="hidden" animate="visible">
        Not specialist expertise. Specialist leverage.
      </motion.p>
      <motion.div className="apprentice-note" variants={rise} custom={9} initial="hidden" animate="visible">
        <strong>Leadership problem</strong>
        <span>How do junior designers develop judgement if AI performs the work they once learned through?</span>
        <p>Keep apprenticeship - shift it toward critique, customer exposure, systems and verification.</p>
      </motion.div>
    </div>
  );
}

function CareerLadderScene({ active }: { active: boolean }) {
  const levels = [
    ["Emerging designer", "Learns craft, customers, systems and verification"],
    ["Senior designer", "Frames ambiguity, makes trade-offs and raises quality"],
    ["Design lead", "Orchestrates people and agents around product outcomes"],
    ["Design leader", "Builds environment, governance and organisational capability"],
  ];
  return (
    <div className="career-ladder">
      {levels.map(([level, detail], i) => (
        <motion.article key={level} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h2>{level}</h2>
          <p>{detail}</p>
        </motion.article>
      ))}
      <motion.blockquote variants={rise} custom={4} initial="hidden" animate="visible">
        Leaders must deliberately create new pathways for judgement.
      </motion.blockquote>
    </div>
  );
}

function WaysOfWorkingScene({ active }: { active: boolean }) {
  const loops = [
    ["Discovery loop", "Evidence - themes - hypotheses", ["AI: synthesis", "Human: problem selection"]],
    ["Making loop", "Concepts - prototypes - critique", ["AI: variation", "Human: quality threshold"]],
    ["Delivery loop", "Build - measure - improve", ["AI: checks", "Human: outcome ownership"]],
  ];
  return (
    <div className="work-loops">
      {loops.map(([name, flow, supports], i) => (
        <motion.article key={name as string} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{name}</span>
          <h2>{flow}</h2>
          {(supports as string[]).map((item) => <p key={item}>{item}</p>)}
        </motion.article>
      ))}
      <motion.p className="insight-line" variants={rise} custom={4} initial="hidden" animate="visible">
        Remove waiting between moments of collaboration.
      </motion.p>
    </div>
  );
}

function CapabilityModelScene({ active }: { active: boolean }) {
  const layers = [
    ["MCP", "AI connects to tools and organisational context instead of waiting inside chat."],
    ["Queryable research", "Research repositories become organisational memory that can surface inside live decisions."],
    ["Connected Figma", "Design systems, code packages and Make kits turn design intent into constrained working software."],
    ["Real repositories", "Claude Code and Codex investigate, plan, edit, test and verify inside actual codebases."],
    ["Decision context", "Insights travel into the moment product, design and engineering choose what to do next."],
  ];
  return (
    <div className="connected-tools">
      {layers.map(([name, capability], i) => (
        <motion.article key={name} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{name}</span>
          <p>{capability}</p>
        </motion.article>
      ))}
      <motion.blockquote variants={rise} custom={6} initial="hidden" animate="visible">
        Shared context is the next operating system for design work.
      </motion.blockquote>
    </div>
  );
}

function DesignSystemScene({ active }: { active: boolean }) {
  const layers = [
    ["Human-readable", ["Principles", "Patterns", "Content guidance", "Accessibility guidance"]],
    ["Machine-readable", ["Tokens", "Components", "Schemas", "Rules", "Examples", "Metadata"]],
    ["Executable", ["Generated prototypes", "Production components", "Automated checks", "Analytics", "Governed variation"]],
  ];
  return (
    <div className="system-layers">
      {layers.map(([name, items], i) => (
        <motion.article key={name as string} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{name}</span>
          {(items as string[]).map((item) => <b key={item}>{item}</b>)}
        </motion.article>
      ))}
      <motion.blockquote variants={rise} custom={4} initial="hidden" animate="visible">
        AI quality depends on organisational context.
      </motion.blockquote>
    </div>
  );
}

function GovernanceScene({ active }: { active: boolean }) {
  const questions = [
    ["Data", "What is the model allowed to see?"],
    ["Decisions", "What is it allowed to influence?"],
    ["Accountability", "Who remains accountable for the outcome?"],
  ];
  const zones = [
    ["GREEN", "Assisted", "Approved material - draft documentation - non-sensitive prototypes"],
    ["AMBER", "Controlled", "Research synthesis - generated interfaces - code changes - regulated content"],
    ["RED", "Restricted", "Sensitive customer data - unreviewed guidance - autonomous customer-impacting decisions"],
  ];
  return (
    <div className="governance-scene">
      <div className="accountability-questions">
        {questions.map(([label, question], i) => (
          <motion.article key={label} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{label}</span>
            <h2>{question}</h2>
          </motion.article>
        ))}
      </div>
      <div className="risk-zones">
        {zones.map(([zone, title, items], i) => (
          <motion.article className={`zone zone-${String(zone).toLowerCase()}`} key={zone as string} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{zone}</span>
            <h2>{title}</h2>
            <p>{items}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function RoadmapScene({ active }: { active: boolean }) {
  const steps = [
    ["30", "Find the friction", ["Where are designers waiting?", "Where does engineering rebuild prototypes?", "Where is synthesis slow?", "Where is the system too weak to guide AI?"]],
    ["60", "Prove three workflows", ["Research synthesis", "Design-system-connected functional prototyping", "Accessibility and quality review"]],
    ["90", "Build the operating model", ["Approved tools and data rules", "Role expectations", "Human-review requirements", "Reusable workflows", "Measurement"]],
  ];
  return (
    <div className="roadmap">
      {steps.map(([day, label, items], i) => (
        <motion.article className="road-step" key={day as string} variants={rise} custom={i} initial="hidden" animate="visible">
          <strong>{day}</strong>
          <h2>{label}</h2>
          {(items as string[]).map((item) => <p key={item}>{item}</p>)}
        </motion.article>
      ))}
    </div>
  );
}

function ClosingScene({ active }: { active: boolean }) {
  const lines = [
    "AI will not differentiate organisations for long.",
    "Access to the same models and tools will become commonplace.",
    "The advantage will come from better judgement, stronger systems and faster learning.",
  ];
  return (
    <div className="finale">
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: i < 2 ? [0, 1, 1, 0.3] : 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.72, duration: i < 2 ? 2.1 : 1, ease }}
        >
          {line}
        </motion.p>
      ))}
      <motion.h1 initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 1.05, ease }}>
        The future of design is not AI.
        <span>It is organisations designed to use AI responsibly and exceptionally well.</span>
      </motion.h1>
    </div>
  );
}

function DualList({ leftTitle, rightTitle, left, right }: { leftTitle: string; rightTitle: string; left: string[]; right: string[] }) {
  return (
    <div className="dual-list">
      {[["left", leftTitle, left], ["right", rightTitle, right]].map(([side, title, items], i) => (
        <motion.article className={`dual-card ${side}`} key={title as string} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{title}</span>
          {(items as string[]).map((item) => <p key={item}>{item}</p>)}
        </motion.article>
      ))}
    </div>
  );
}

function FloatingConstellation({ active }: { active: boolean }) {
  const icons = [Sparkles, Radar, ShieldCheck, Lock, Zap, BrainCircuit];
  return (
    <div className="constellation" aria-hidden="true">
      {icons.map((Icon, i) => (
        <motion.div
          className="constellation-node"
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: active ? [0.24, 0.68, 0.24] : 0, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.12, repeat: Infinity, duration: 3.8 + i * 0.28 }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
}

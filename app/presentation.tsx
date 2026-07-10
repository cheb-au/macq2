"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BrainCircuit,
  Compass,
  FileText,
  Lock,
  PencilRuler,
  Radar,
  ShieldCheck,
  Sparkles,
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
  scene: (active: boolean) => ReactNode;
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
    title: "This is not another productivity story.",
    titleSize: "standard",
    scene: (active) => <ProductivityScene active={active} />,
    notes: makeNotes(
      "Reframe the conversation from individual productivity to organisational design.",
      "Explain that the first-order effect is faster task completion, but the second-order effect is much larger: the unit of work changes, boundaries blur, and teams can form around learning loops rather than deliverable handoffs.",
      "The strategic question is not which AI tool should we buy. It is how should we redesign the organisation now that capability is available on demand.",
      "How is this different from normal automation?",
      "Automation usually optimises a known process. AI changes who can participate, what can be generated, and how quickly ideas can become evidence.",
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
    title: "Three months changed my view of what one person - and one team - can do.",
    titleSize: "compact",
    scene: (active) => <LevriTimelineScene active={active} />,
    notes: makeNotes(
      "Use Levri as proof of scope without overstating what AI replaced.",
      "Describe the breadth of work across product proposition, core platform, AI capability, production operations and growth surfaces. Keep the language careful: this breadth would traditionally require a multidisciplinary team and a longer runway.",
      "The breadth of product and platform capability created in approximately three months would traditionally have required a multidisciplinary team and a substantially longer delivery runway.",
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
      "Use the layered architecture to show customer experience, platform, AI automation, operations and human responsibility. Call out the screenshot placeholders honestly: they are slots for verified product evidence, not fabricated mockups.",
      "Levri matters here because it forced me to operate across product, design, engineering, AI and production risk at the same time.",
      "Where are the real product screenshots?",
      "The deck now labels the screenshot slots clearly. I would replace those with verified Levri captures before the interview rather than fake the evidence.",
      "Shift from what was built to how work actually happened.",
    ),
  },
  {
    title: "The breakthrough was not code generation. It was the closed loop.",
    titleSize: "long",
    scene: (active) => <ClosedLoopScene active={active} />,
    notes: makeNotes(
      "Explain the AI-native workflow as supervised collaboration rather than autonomy hype.",
      "Talk through the production loop: problem appears, agent investigates, proposes, human challenges, agent edits, tests run, PR is created, results are verified, deployment is observed. This is the practical difference from chat-based prompting.",
      "The model was not autonomous software development. It was tightly supervised, high-leverage collaboration.",
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
    title: "I moved from producing every answer to orchestrating the system.",
    titleSize: "compact",
    scene: (active) => <RoleShiftScene active={active} />,
    notes: makeNotes(
      "Position the user as a transformational design leader, not a tool user.",
      "Explain the evolution from maker to manager to orchestrator. Do not imply equal mastery of all disciplines; instead, show credible participation across product, design, engineering, research, data, growth and operations.",
      "The highest-leverage skill was not prompting. It was knowing what to ask, what to reject and what mattered next.",
      "Does this devalue craft?",
      "No. Craft becomes more important because it becomes the basis for critique, constraints and quality judgement when outputs are abundant.",
      "Now apply the lesson to designers more broadly.",
    ),
  },
  {
    title: "Every designer can now access a specialist team on demand.",
    titleSize: "compact",
    scene: (active) => <SpecialistLeverageScene active={active} />,
    notes: makeNotes(
      "Show how AI changes people and capability around each designer.",
      "Talk through the specialist capabilities as actions, not roles: reviewing semantics, clustering evidence, building prototypes, translating data into hypotheses. Then land the warning that access to capability is not the same as expertise.",
      "Capability on demand is not expertise on demand.",
      "How do designers know whether the output is good?",
      "They need stronger foundations in research, systems, accessibility, product thinking and verification. Leaders must build those muscles deliberately.",
      "That leads to the career ladder and HR implications.",
    ),
  },
  {
    title: "When production becomes easier, judgement becomes more visible.",
    titleSize: "compact",
    scene: (active) => <CareerLadderScene active={active} />,
    notes: makeNotes(
      "Make this relevant to HR and leadership, not just product tooling.",
      "Explain how expectations change by level. Emerging designers still need craft and verification. Senior designers make trade-offs. Leads orchestrate outcomes. Leaders build the environment and governance. Acknowledge the junior pathway issue directly.",
      "If AI performs entry-level production work, leaders must deliberately create new pathways for people to develop judgement.",
      "What happens to junior designers?",
      "We should not remove the apprenticeship. We should redesign it around critique, evidence, systems thinking and supervised use of AI outputs.",
      "Move to how the work process changes.",
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
    title: "The tools matter less than the capability they create.",
    titleSize: "long",
    scene: (active) => <CapabilityModelScene active={active} />,
    notes: makeNotes(
      "Turn the tools slide from a catalogue into a leadership framework.",
      "Use Think, Make, Connect and Operate. Explain that products will change fast, but these capability layers persist. This helps senior executives understand investment, governance and capability planning.",
      "A tool strategy expires quickly. A capability strategy survives the next model release.",
      "Which tool should Macquarie standardise on?",
      "The better question is which capability needs to be safe, integrated and measurable. Tool choices should follow from that.",
      "Move from tools into the design system as enterprise infrastructure.",
    ),
  },
  {
    title: "In an AI-native organisation, the design system is executable intent.",
    titleSize: "compact",
    scene: (active) => <DesignSystemScene active={active} />,
    notes: makeNotes(
      "Connect AI quality to design-system maturity and enterprise consistency.",
      "Explain human-readable, machine-readable and executable layers. This is where design leadership becomes infrastructure leadership: AI outputs are only as good as the organisational context they can access.",
      "Weak systems produce faster inconsistency. Strong systems let AI scale quality.",
      "How is this different from a normal design system?",
      "A normal design system helps people reuse patterns. An AI-native system also gives machines constraints, examples, rules and checks so generated work stays aligned.",
      "Now address governance head-on.",
    ),
  },
  {
    title: "AI can scale quality - or scale risk.",
    titleSize: "standard",
    scene: (active) => <GovernanceScene active={active} />,
    notes: makeNotes(
      "Make the leadership content credible for a regulated enterprise.",
      "Present this as an operating principle, not Macquarie policy. Green work is assisted, amber work is controlled, red work is restricted. Then add leadership controls: approved environments, role access, data classification, evaluations and named accountability.",
      "Speed without controls does not create transformation. It creates faster risk.",
      "How much autonomy should AI have?",
      "Autonomy should depend on data sensitivity, customer impact and reversibility. The higher the risk, the stronger the review, traceability and accountability required.",
      "Translate the framework into a practical 90-day plan.",
    ),
  },
  {
    title: "I would start with value, safety and evidence - not a company-wide tool rollout.",
    titleSize: "compact",
    scene: (active) => <RoadmapScene active={active} />,
    notes: makeNotes(
      "Show a practical first 90 days at Macquarie.",
      "Explain that the plan starts by understanding current use and constraints, then proving two or three measurable use cases, then scaling deliberately with playbooks, governance and design-system integration.",
      "The first 90 days should create evidence, safety and repeatable capability before scale.",
      "What would you do first?",
      "Map current use, identify high-friction workflows, assess design-system readiness and find internal practitioners already leading. Then choose pilots with product, design, engineering, risk and legal together.",
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
      go(index + delta);
      window.setTimeout(() => {
        inputLock.current = false;
      }, 620);
    },
    [blackout, go, index, overview],
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
          className={`slide title-${slide.titleSize ?? "standard"}`}
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
          <div className="scene">{slide.scene(true)}</div>
        </motion.section>
      </AnimatePresence>
      <AnimatePresence>{overview ? <Overview current={index} onSelect={go} /> : null}</AnimatePresence>
      <AnimatePresence>{showNotes ? <NotesPanel slide={slide} index={index} /> : null}</AnimatePresence>
      <AnimatePresence>{blackout ? <Blackout /> : null}</AnimatePresence>
    </main>
  );
}

function SlideHeader({ slide, index }: { slide: Slide; index: number }) {
  if (index === 0 || index === slides.length - 1) return null;
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
        <span>Level 1</span>
        <h2>AI helps individuals complete existing tasks faster.</h2>
        <ShiftPills from={["Assistance", "Deliverables", "Functional handoffs"]} muted />
      </motion.article>
      <motion.article className="level-card primary" variants={rise} custom={2} initial="hidden" animate="visible">
        <span>Level 2</span>
        <h2>AI changes the unit of work, boundaries and organisation shape.</h2>
        <ShiftPills from={["Agency", "Learning loops", "Orchestrated capability"]} />
      </motion.article>
      <motion.blockquote variants={rise} custom={4} initial="hidden" animate="visible">
        The strategic question is organisational design.
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
  const items = [
    ["Foundation", "Product proposition - customer problem - service architecture"],
    ["Core product", "Authentication - workspaces - analysis - reports - credits - payments"],
    ["AI capability", "Page analysis - recommendations - research - synthesis"],
    ["Production", "Database - security - browser automation - jobs - deployment"],
    ["Growth", "Acquisition pages - attribution - emails - referrals - analytics"],
  ];
  return (
    <div className="levri-timeline">
      <motion.div className="timeline-line" initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: 1.1, ease }} />
      {items.map(([label, detail], i) => (
        <motion.article key={label} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{label}</span>
          <p>{detail}</p>
        </motion.article>
      ))}
      <motion.blockquote variants={rise} custom={5} initial="hidden" animate="visible">
        Scope compressed. Accountability remained human.
      </motion.blockquote>
    </div>
  );
}

function ArchitectureScene({ active }: { active: boolean }) {
  const layers = [
    ["Customer experience", ["Analysis", "Funnels", "Experiments", "Signals", "Variant Studio", "Reports"]],
    ["Platform", ["Auth", "Workspaces", "Credits", "Payments", "Usage", "Attribution"]],
    ["AI + automation", ["Model orchestration", "Browser capture", "Pipelines", "Async jobs", "Scoring", "Generation"]],
    ["Operations", ["Supabase", "GitHub", "Deployment", "Monitoring", "Testing", "Security controls"]],
    ["Human responsibilities", ["Product direction", "Experience quality", "Architecture", "Risk", "Prioritisation", "Final approval"]],
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
        <ScreenshotSlot title="REPLACE_WITH_VERIFIED_DATA" detail="Levri analysis surface screenshot" />
        <ScreenshotSlot title="REPLACE_WITH_VERIFIED_DATA" detail="Reports or Variant Studio screenshot" />
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
  const steps = ["Problem", "Investigate", "Root cause", "Plan", "Challenge", "Edit", "Test", "PR", "Verify", "Deploy"];
  const stepPositions = [
    ["96%", "50%"],
    ["86%", "78%"],
    ["62%", "94%"],
    ["38%", "94%"],
    ["14%", "78%"],
    ["4%", "50%"],
    ["14%", "22%"],
    ["38%", "6%"],
    ["62%", "6%"],
    ["86%", "22%"],
  ];
  return (
    <div className="closed-loop">
      <div className="loop-ring" aria-hidden="true">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="loop-node"
            style={{ "--x": stepPositions[i][0], "--y": stepPositions[i][1] } as CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.72, ease }}
          >
            {step}
          </motion.div>
        ))}
        <motion.div className="loop-core" animate={{ scale: active ? [1, 1.04, 1] : 1 }} transition={{ repeat: Infinity, duration: 4 }}>
          <Workflow />
          Closed loop
        </motion.div>
      </div>
      <OwnershipSplit />
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
        Capability on demand is not expertise on demand.
      </motion.p>
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
    ["THINK", "Claude - ChatGPT - NotebookLM - Perplexity", "Research, synthesis, critique and decision support"],
    ["MAKE", "Figma Make - Codex - Claude Code - Cursor - V0", "Prototypes, interfaces, code and production changes"],
    ["CONNECT", "MCP - APIs - GitHub - Figma - Jira - Confluence", "Enterprise systems and shared context"],
    ["OPERATE", "Testing - Monitoring - Deployment - Documentation - Analytics", "Continuous delivery and learning"],
  ];
  return (
    <div className="capability-model">
      {layers.map(([name, tools, capability], i) => (
        <motion.article key={name} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{name}</span>
          <h2>{capability}</h2>
          <p>{tools}</p>
        </motion.article>
      ))}
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
  const zones = [
    ["GREEN", "Assisted work", ["Ideation", "Approved summaries", "Draft documentation", "Non-sensitive prototypes"]],
    ["AMBER", "Controlled work", ["Research synthesis", "Generated interfaces", "Code changes", "Analytics interpretation"]],
    ["RED", "Restricted work", ["Sensitive data in unapproved systems", "Unreviewed financial guidance", "Autonomous customer-impacting decisions"]],
  ];
  return (
    <div className="governance-scene">
      <div className="risk-zones">
        {zones.map(([zone, title, items], i) => (
          <motion.article className={`zone zone-${String(zone).toLowerCase()}`} key={zone as string} variants={rise} custom={i} initial="hidden" animate="visible">
            <span>{zone}</span>
            <h2>{title}</h2>
            {(items as string[]).map((item) => <p key={item}>{item}</p>)}
          </motion.article>
        ))}
      </div>
      <motion.div className="controls-strip" variants={rise} custom={4} initial="hidden" animate="visible">
        {["Approved environments", "Role access", "Data classification", "Evaluation + testing", "Named accountability"].map((item) => <b key={item}>{item}</b>)}
      </motion.div>
    </div>
  );
}

function RoadmapScene({ active }: { active: boolean }) {
  const steps = [
    ["30", "Understand", ["Map current use", "Find high-friction workflows", "Assess system readiness", "Baseline cycle time and confidence"]],
    ["60", "Prove", ["Select 2-3 use cases", "Pair design, product, engineering, risk and legal", "Run measurable pilots", "Capture failure modes"]],
    ["90", "Scale deliberately", ["Publish operating model", "Create role-specific playbooks", "Embed AI into design system", "Agree leadership metrics"]],
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
      <motion.div className="pilot-strip" variants={rise} custom={4} initial="hidden" animate="visible">
        {["Research synthesis", "System-connected prototyping", "Accessibility review", "Prototype-to-production", "Experiment documentation"].map((item) => <b key={item}>{item}</b>)}
      </motion.div>
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

"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  Check,
  Code2,
  Command,
  Database,
  FileText,
  GitBranch,
  GitPullRequest,
  KeyRound,
  Layers3,
  Lock,
  MessageSquare,
  MousePointer2,
  Network,
  Orbit,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Users,
  Zap,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const deckTitle = "Designing the AI-Native Organisation";

type Direction = 1 | -1;

type Slide = {
  kicker?: string;
  title: string;
  subtitle?: string;
  scene: (active: boolean) => ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

const word = {
  hidden: { y: 80, opacity: 0, filter: "blur(18px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.16 + i * 0.16, duration: 1.1, ease },
  }),
};

const rise = {
  hidden: { y: 36, opacity: 0, filter: "blur(10px)" },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.18 + i * 0.08, duration: 0.8, ease },
  }),
};

const slides: Slide[] = [
  {
    kicker: "Head of Design Interview | Macquarie Bank",
    title: "Designing the AI-Native Organisation",
    subtitle:
      "Lessons from building an AI company while leading enterprise design teams",
    scene: (active) => <TitleScene active={active} />,
  },
  {
    title: "The biggest change isn’t AI. It’s organisational design.",
    scene: (active) => <OperatingModelScene active={active} />,
  },
  {
    title: "What changed my perspective",
    scene: (active) => <PerspectiveScene active={active} />,
  },
  {
    title: "Three months changed my view of software forever.",
    scene: (active) => <TimelineScene active={active} />,
  },
  {
    title: "From copilots… to autonomous teammates.",
    scene: (active) => <TeammatesScene active={active} />,
  },
  {
    title: "Every designer now has a team.",
    scene: (active) => <OrbitScene active={active} />,
  },
  {
    title: "The design process has collapsed.",
    scene: (active) => <ProcessScene active={active} />,
  },
  {
    title: "The biggest bottleneck isn’t making. It’s deciding.",
    scene: (active) => <DecisionScene active={active} />,
  },
  {
    title: "The tools are changing faster than organisations.",
    scene: (active) => <ToolsScene active={active} />,
  },
  {
    title: "AI is leaving the chat window.",
    scene: (active) => <EcosystemScene active={active} />,
  },
  {
    title: "What this means for leaders.",
    scene: (active) => <LeadershipScene active={active} />,
  },
  {
    title: "If I joined Macquarie…",
    scene: (active) => <RoadmapScene active={active} />,
  },
  {
    title: "Success isn’t measured by AI usage.",
    scene: (active) => <MetricsScene active={active} />,
  },
  {
    title: "The future of design isn’t AI. It’s organisations designed for AI.",
    scene: (active) => <FinalScene active={active} />,
  },
];

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [overview, setOverview] = useState(false);
  const wheelLock = useRef(false);
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
      if (bounded === index) return;
      setDirection(bounded > index ? 1 : -1);
      setIndex(bounded);
      setOverview(false);
    },
    [index],
  );

  const moveBy = useCallback(
    (delta: Direction) => {
      if (inputLock.current) return;
      inputLock.current = true;
      go(index + delta);
      window.setTimeout(() => {
        inputLock.current = false;
      }, 680);
    },
    [go, index],
  );

  const advance = useCallback(() => moveBy(1), [moveBy]);
  const retreat = useCallback(() => moveBy(-1), [moveBy]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
      if (Math.abs(event.deltaY) < 18 || wheelLock.current) return;
      wheelLock.current = true;
      event.deltaY > 0 ? advance() : retreat();
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 860);
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
  }, [advance, retreat, mx, my]);

  const progress = ((index + 1) / slides.length) * 100;
  const slide = slides[index];

  return (
    <main className={`stage ${index === slides.length - 1 ? "final-stage" : ""}`} onClick={() => !overview && advance()}>
      <motion.div
        className="ambient-glow"
        style={{ "--glow-x": glowX, "--glow-y": glowY } as CSSProperties}
      />
      <div className="noise" />
      <TopProgress progress={progress} />
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.section
          key={index}
          className="slide"
          custom={direction}
          variants={{
            enter: (dir: Direction) => ({
              x: `${dir * 8}%`,
              opacity: 0,
              scale: 0.965,
              rotateY: dir * -5,
              filter: "blur(16px)",
            }),
            center: {
              x: "0%",
              opacity: 1,
              scale: 1,
              rotateY: 0,
              filter: "blur(0px)",
            },
            exit: (dir: Direction) => ({
              x: `${dir * -10}%`,
              opacity: 0,
              scale: 1.025,
              rotateY: dir * 4,
              filter: "blur(18px)",
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.92, ease }}
        >
          <SlideHeader slide={slide} index={index} />
          <div className="scene">{slide.scene(true)}</div>
        </motion.section>
      </AnimatePresence>
      <Footer index={index} />
      <AnimatePresence>
        {overview ? <Overview current={index} onSelect={go} /> : null}
      </AnimatePresence>
    </main>
  );
}

function SlideHeader({ slide, index }: { slide: Slide; index: number }) {
  if (index === 0 || index === slides.length - 1) return null;
  return (
    <header className="slide-header">
      {slide.kicker ? (
        <motion.p variants={rise} initial="hidden" animate="visible" className="kicker">
          {slide.kicker}
        </motion.p>
      ) : null}
      <motion.h1 variants={rise} initial="hidden" animate="visible" className="slide-title">
        {slide.title}
      </motion.h1>
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

function Footer({ index }: { index: number }) {
  return (
    <footer className="chrome">
      <div className="slide-count">{String(index + 1).padStart(2, "0")} / {slides.length}</div>
      <div className="shortcuts">
        <span><ArrowRight size={13} /> Space</span>
        <span>ESC overview</span>
      </div>
      <div className="deck-title">{deckTitle}</div>
    </footer>
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
    >
      <div className="overview-grid">
        {slides.map((slide, i) => (
          <button
            className={`overview-card ${i === current ? "active" : ""}`}
            key={slide.title}
            onClick={() => onSelect(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {slide.title}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function TitleScene({ active }: { active: boolean }) {
  const words = ["Designing", "AI-Native", "Organisation"];
  return (
    <div className="title-scene">
      <motion.p variants={rise} initial="hidden" animate="visible" className="kicker">
        Macquarie Bank | Head of Design
      </motion.p>
      <h1 className="hero-title" aria-label={deckTitle}>
        {words.map((item, i) => (
          <motion.span key={item} custom={i} variants={word} initial="hidden" animate="visible">
            {item}
          </motion.span>
        ))}
      </h1>
      <motion.div
        className="title-subtitle"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 28 }}
        transition={{ delay: 0.92, duration: 0.9, ease }}
      >
        <p>Lessons from building an AI company while leading enterprise design teams</p>
        <span>How AI is changing our people, ways of working and the tools we use.</span>
      </motion.div>
      <motion.div
        className="speaker"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
      >
        <strong>Cha Lee</strong>
        <span>Head of Experience Design</span>
      </motion.div>
      <FloatingConstellation active={active} />
    </div>
  );
}

function OperatingModelScene({ active }: { active: boolean }) {
  return (
    <div className="comparison">
      <motion.div
        className="model-card old"
        initial={{ x: -80, opacity: 0, scale: 0.9 }}
        animate={{ x: active ? -26 : -80, opacity: active ? 0.52 : 0, scale: active ? 0.92 : 0.9 }}
        transition={{ duration: 0.9, ease }}
      >
        <span>OLD</span>
        <h2>AI helps people work faster.</h2>
      </motion.div>
      <motion.div
        className="downshift"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease }}
      >
        <ArrowDown />
      </motion.div>
      <motion.div
        className="model-card new"
        initial={{ x: 90, opacity: 0, scale: 0.9 }}
        animate={{ x: active ? 0 : 90, opacity: active ? 1 : 0, scale: active ? 1.08 : 0.9 }}
        transition={{ delay: 0.42, duration: 1, ease }}
      >
        <span>NEW</span>
        <h2>AI changes how organisations operate.</h2>
        <motion.div className="expansion-ring" animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.65, 0.3] }} transition={{ repeat: Infinity, duration: 4.5 }} />
      </motion.div>
    </div>
  );
}

function PerspectiveScene({ active }: { active: boolean }) {
  const cards = [
    { label: "Leading enterprise design", detail: "Qantas", icon: Building2 },
    { label: "Building Levri", detail: "AI-native startup", icon: Sparkles, levri: true },
    { label: "Living inside AI every day", detail: "Claude Code · Codex · Cursor · Figma Make · MCP", icon: Command },
  ];
  return (
    <div className="perspective-grid">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.article className="perspective-card" key={card.label} variants={rise} custom={i} initial="hidden" animate="visible">
            <Icon />
            <h2>{card.label}</h2>
            <p>{card.detail}</p>
            {card.levri ? <LevriScreens /> : <div className="mini-lines" />}
          </motion.article>
        );
      })}
    </div>
  );
}

function LevriScreens() {
  return (
    <div className="levri-stack" aria-label="Levri product screenshots">
      <div className="levri-shot primary">
        <span>Levri</span>
        <div />
        <div />
        <div />
      </div>
      <div className="levri-shot secondary">
        <span>AI runway</span>
        <b>87%</b>
      </div>
    </div>
  );
}

function TimelineScene({ active }: { active: boolean }) {
  const milestones = [
    ["Day 1", "Product frame"],
    ["Week 2", "Production SaaS"],
    ["Month 1", "Payments · Auth · Database"],
    ["Month 2", "AI · Experiments · Browser automation"],
    ["Today", "Infrastructure · Marketing · Learning loop"],
  ];
  return (
    <div className="timeline-wrap">
      <motion.div className="timeline-line" initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: 1.3, ease }} />
      {milestones.map(([time, label], i) => (
        <motion.div className="milestone" key={time} custom={i} variants={rise} initial="hidden" animate="visible">
          <span>{time}</span>
          <p>{label}</p>
        </motion.div>
      ))}
      <motion.blockquote
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.25, duration: 0.9, ease }}
      >
        “Without AI this would’ve taken me well over a year.”
      </motion.blockquote>
    </div>
  );
}

function TeammatesScene({ active }: { active: boolean }) {
  const tools = [
    ["ChatGPT", ["Answers questions"], MessageSquare],
    ["Claude Code", ["Reads repositories", "Writes production code", "Runs tests", "Creates pull requests"], Code2],
    ["Codex", ["Understands codebases", "Plans implementation", "Builds features", "Fixes bugs"], Bot],
    ["Cursor", ["Agent mode", "Background execution"], MousePointer2],
  ] as const;
  return (
    <div className="teammate-layout">
      <div className="tool-column">
        {tools.map(([name, bullets, Icon], i) => (
          <motion.article className="tool-card" key={name} variants={rise} custom={i} initial="hidden" animate="visible">
            <Icon />
            <h2>{name}</h2>
            {bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
          </motion.article>
        ))}
      </div>
      <motion.div className="orchestration" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
        {[GitBranch, Terminal, TestTube2, GitPullRequest, Layers3, BrainCircuit].map((Icon, i) => (
          <motion.div
            className="node"
            key={i}
            animate={{ y: [0, i % 2 ? 10 : -10, 0], opacity: [0.72, 1, 0.72] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.3 }}
          >
            <Icon />
          </motion.div>
        ))}
        <Network className="network-core" />
      </motion.div>
    </div>
  );
}

function OrbitScene({ active }: { active: boolean }) {
  const agents = ["Researcher", "Copywriter", "Developer", "Accessibility", "Analyst", "Strategist", "QA", "UX Writer", "Engineer"];
  return (
    <div className="orbit-scene">
      <motion.div className="designer-core" animate={{ scale: active ? [1, 1.04, 1] : 1 }} transition={{ repeat: Infinity, duration: 4 }}>
        <PencilRuler />
        <strong>Designer</strong>
      </motion.div>
      <motion.div className="orbit-ring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 42, ease: "linear" }} />
      {agents.map((agent, i) => {
        const angle = (i / agents.length) * Math.PI * 2;
        return (
          <motion.div
            className="agent-pill"
            key={agent}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              x: Math.cos(angle) * 300,
              y: Math.sin(angle) * 174,
              scale: 1,
            }}
            transition={{ delay: 0.14 * i, duration: 0.9, ease }}
          >
            <Bot size={16} />
            {agent}
          </motion.div>
        );
      })}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>From individual contributor to AI-orchestrated capability.</motion.p>
    </div>
  );
}

function ProcessScene({ active }: { active: boolean }) {
  const old = ["Research", "Workshop", "Concept", "Wireframes", "Prototype", "Testing", "Engineering", "Launch"];
  const modern = ["Problem", "AI research", "20 concepts", "Prototype", "Synthetic testing", "Experiment", "Learn"];
  return (
    <div className="process-scene">
      <motion.div className="process-row old-process" initial={{ x: 0, opacity: 1 }} animate={{ x: active ? -120 : 0, opacity: active ? 0.38 : 1 }} transition={{ duration: 1.1, ease }}>
        <span>OLD · Weeks</span>
        {old.map((item) => <b key={item}>{item}</b>)}
      </motion.div>
      <motion.div className="process-row new-process" initial={{ scaleX: 0.62, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.45, duration: 1, ease }}>
        <span>NEW · Hours</span>
        {modern.map((item, i) => <motion.b key={item} variants={rise} custom={i} initial="hidden" animate="visible">{item}</motion.b>)}
      </motion.div>
    </div>
  );
}

function DecisionScene({ active }: { active: boolean }) {
  return (
    <div className="decision-scene">
      <div className="chart">
        <motion.div className="bar execution" initial={{ height: "72%" }} animate={{ height: active ? "18%" : "72%" }} transition={{ duration: 1.15, ease }}><span>Execution cost</span></motion.div>
        <motion.div className="bar judgement" initial={{ height: "28%" }} animate={{ height: active ? "82%" : "28%" }} transition={{ delay: 0.2, duration: 1.15, ease }}><span>Decision quality</span></motion.div>
      </div>
      <motion.blockquote variants={rise} initial="hidden" animate="visible">
        “When making becomes free, judgement becomes the competitive advantage.”
      </motion.blockquote>
    </div>
  );
}

function ToolsScene({ active }: { active: boolean }) {
  const tools = [
    ["Claude Code", "Production capability moves into the design loop"],
    ["Codex", "Whole-codebase change becomes a leadership workflow"],
    ["Cursor", "Prototypes become working software"],
    ["Figma Make", "Visual exploration accelerates"],
    ["OpenAI Agents", "Workflows become adaptive systems"],
    ["MCP", "Tools become interoperable"],
    ["NotebookLM", "Research synthesis compresses"],
    ["Perplexity", "Market intelligence gets continuous"],
    ["V0", "UI exploration becomes conversational"],
    ["Lovable", "Ideas turn into products"],
    ["Bolt", "Full-stack learning speeds up"],
  ];
  return (
    <div className="tools-grid">
      {tools.map(([name, impact], i) => (
        <motion.div className="flip-card" key={name} custom={i} variants={rise} initial="hidden" animate="visible">
          <div className="flip-inner">
            <div className="flip-front">{name}</div>
            <div className="flip-back">{impact}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function EcosystemScene({ active }: { active: boolean }) {
  const systems = [
    ["GitHub", GitBranch], ["Figma", PencilRuler], ["Slack", MessageSquare], ["Jira", Check],
    ["Confluence", FileText], ["Database", Database], ["Terminal", Terminal], ["Calendar", Users],
  ] as const;
  return (
    <div className="ecosystem">
      <motion.div className="ecosystem-core" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease }}>
        <BrainCircuit />
        <span>Claude</span>
      </motion.div>
      {systems.map(([name, Icon], i) => {
        const angle = (i / systems.length) * Math.PI * 2;
        return (
          <motion.div
            className="system-node"
            key={name}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: Math.cos(angle) * 310, y: Math.sin(angle) * 190 }}
            transition={{ delay: 0.12 * i, duration: 0.8, ease }}
          >
            <Icon />
            {name}
          </motion.div>
        );
      })}
      <motion.h2 variants={rise} initial="hidden" animate="visible">This is orchestration. Not prompting.</motion.h2>
    </div>
  );
}

function LeadershipScene({ active }: { active: boolean }) {
  const pillars = [
    ["Capability", ["AI literacy", "Prompt libraries", "Hiring"]],
    ["Governance", ["Safe experimentation", "Human accountability"]],
    ["Learning", ["Continuous improvement", "Communities"]],
    ["Culture", ["Performance", "Leadership cadence"]],
  ];
  return (
    <div className="pillars">
      {pillars.map(([name, items], i) => (
        <motion.article className="pillar" key={name} variants={rise} custom={i} initial="hidden" animate="visible">
          <h2>{name}</h2>
          {(items as string[]).map((item) => <p key={item}>{item}</p>)}
        </motion.article>
      ))}
    </div>
  );
}

function RoadmapScene({ active }: { active: boolean }) {
  const steps = [
    ["30", "Understand", ["Current maturity", "Quick wins", "Capability map"]],
    ["60", "Enable", ["Training", "Playbooks", "Pilot teams", "Governance"]],
    ["90", "Scale", ["Operating model", "Measurement", "Communities", "Leadership cadence"]],
  ];
  return (
    <div className="roadmap">
      <motion.div className="road-line" initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: 1.2, ease }} />
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

function MetricsScene({ active }: { active: boolean }) {
  const metrics = [
    ["Experiment velocity", 4.6],
    ["Decision speed", 3.2],
    ["Research turnaround", 7.8],
    ["Cycle time", 41],
    ["Accessibility", 96],
    ["Customer outcomes", 18],
    ["Employee engagement", 22],
    ["Business impact", 31],
  ];
  return (
    <div className="dashboard">
      {metrics.map(([label, value], i) => (
        <motion.article className="metric" key={label as string} variants={rise} custom={i} initial="hidden" animate="visible">
          <span>{label}</span>
          <motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 + i * 0.08 }}>
            {typeof value === "number" && value < 10 ? `${value}x` : `${value}%`}
          </motion.b>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: active ? Math.min(Number(value) / 100, 1) : 0 }} transition={{ delay: 0.35 + i * 0.05, duration: 0.8, ease }} />
        </motion.article>
      ))}
    </div>
  );
}

function FinalScene({ active }: { active: boolean }) {
  const lines = [
    "AI won’t replace designers.",
    "Designers using AI will replace those who don’t.",
    "AI won’t replace design leaders.",
    "Leaders who redesign their organisations around AI…",
    "will outperform those who simply introduce AI tools.",
  ];
  return (
    <div className="finale">
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: i < 3 ? [0, 1, 1, 0.22] : 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.7, duration: i < 3 ? 2.2 : 1, ease }}
        >
          {line}
        </motion.p>
      ))}
      <motion.h1 initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.1, duration: 1.1, ease }}>
        The future of design isn’t AI.
        <span>It’s organisations designed for AI.</span>
      </motion.h1>
    </div>
  );
}

function FloatingConstellation({ active }: { active: boolean }) {
  return (
    <div className="constellation" aria-hidden="true">
      {[Sparkles, Orbit, ShieldCheck, KeyRound, Lock, Zap].map((Icon, i) => (
        <motion.div
          className="constellation-node"
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: active ? [0.28, 0.76, 0.28] : 0, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.12, repeat: Infinity, duration: 3.6 + i * 0.35 }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
}

// Speaker notes for the presenter view (press P during the deck).
// Keyed by slide id. `beats[i]` is what to say on beat i - the presenter
// highlights the current beat. Empty string = nothing to say on that beat.
// Keep lines short and sayable. Reuse this file for future decks.
export interface SlideNote {
  title: string;
  beats: string[];
}

export const NOTES: Record<string, SlideNote> = {
  s01: {
    title: "Title",
    beats: [
      "A perspective on designing for a world where AI is native — not bolted on.",
      "I've been testing this in practice while leading enterprise design teams.",
      "The fundamentals haven't changed: judgement, empathy, taste and accountability.",
      "What has changed is speed. Ambiguity to evidence used to take weeks. Now it can take hours. That changes how we lead.",
    ],
  },
  s02: {
    title: "The shift",
    beats: [
      "Agile never removed the queues. It moved them inside the sprint. Every handoff still created waiting.",
      "AI collapses many of those handoffs. Research, synthesis, prototyping and learning become one continuous loop.",
      "So it compresses the organisation — particularly the waiting between specialists.",
      "It doesn't remove the people. It makes their judgement more consequential.",
    ],
  },
  s03: {
    title: "Where value moves",
    beats: [
      "For twenty years, design was often valued through its outputs: wireframes, specifications, prototypes and screens.",
      "",
      "AI makes those artefacts dramatically cheaper. So value moves to the decision behind them: what problem to solve, what trade-off to make, and what not to build. The artefact was never the real point.",
    ],
  },
  s04: {
    title: "Everyone gets the same AI",
    beats: [
      "Here's what the industry is underestimating. AI makes every organisation faster — but it can also make every organisation more similar. Every bank can access comparable models.",
      "If we give them similar context and similar prompts, we should expect similar answers.",
      "The difference isn't the model. It's the system surrounding it — what shapes the AI before the AI shapes the product.",
      "Your design system. Research. Customer insight. Governance. Brand. Leadership. That's the institutional advantage a model cannot invent.",
      "AI may become the engine. But the organisation still needs a steering system.",
    ],
  },
  s05: {
    title: "What becomes valuable?",
    beats: [
      "Execution used to be the floor — the unavoidable cost of producing the work. AI raises that floor for everyone.",
      "But raising the floor doesn't raise the ceiling. Judgement, taste, systems thinking and leadership still determine how good the outcome can become. That's where design leaders create value now.",
    ],
  },
  s06: {
    title: "The role, redefined",
    beats: [
      "The Head of Design role was often framed around delivery: allocate people, review screens and manage throughput.",
      "Now the role is to design the system, review the decisions, grow judgement and orchestrate capability. Same craft — operating at a higher altitude.",
      "And the honest answer on workforce is that headcount may not collapse overnight. But the shape will change: fewer roles centred only on production, and more people who can move between design, technology and decision-making.",
    ],
  },
  s07: {
    title: "Growing designers",
    beats: [
      "Here's the question almost nobody is asking. Junior designers learned by doing the foundational work. If AI absorbs that work, how does anyone become senior?",
      "We have to rebuild apprenticeship deliberately: critique, customer exposure, systems thinking, commercial context and verification. All of it should build better judgement.",
      "",
      "",
      "",
      "",
      "",
      "When execution becomes cheap, expertise becomes the constraint. Talent development stops being an HR activity and becomes a competitive strategy.",
    ],
  },
  s08: {
    title: "Levri (proof)",
    beats: [
      "I didn't want this to remain theoretical, so I built it. One person, from strategy to a production platform, in three months.",
      "The strategy became a product — not another presentation describing what might be possible.",
      "",
      "",
      "",
      "But the real experiment wasn't the product. It was the operating model behind it. The product simply proved that model could work.",
    ],
  },
  s09: {
    title: "AI-native operating model",
    beats: [
      "Customer signals that once took weeks can now emerge in hours. My job is to frame the real problem, not react to the loudest symptom.",
      "Hypotheses can appear in minutes. My job is to choose the one bet worth pursuing.",
      "Prototypes can appear in hours. My job is to shape the quality, the intent and the trade-offs.",
      "Evidence arrives faster. My job is to test whether it is reliable, sufficient and safe to act on. For high-impact decisions, a human stays accountable.",
      "Experiments can launch in days. My job is to align product, engineering and risk — and protect customers while we learn.",
      "Learning compounds quickly. My job is to convert it into standards, systems and capability the organisation can reuse.",
      "Every step became faster, but the leadership responsibility became larger. The work compresses. Accountability expands.",
    ],
  },
  s10: {
    title: "Division of labour",
    beats: [
      "On Levri, this was the division of labour.",
      "AI generated, investigated, suggested and automated. It accelerated the doing.",
      "I prioritised, directed, validated, protected and governed. And those final responsibilities cannot be delegated blindly — particularly in a bank.",
      "Execution moved toward the machine. Accountability didn't move at all.",
    ],
  },
  s11: {
    title: "Speed without judgement (THE TURN)",
    beats: [
      "Everything so far has been about speed. But speed without judgement creates a different kind of risk.",
      "Imagine high abandonment during a credit application.",
      "The AI identifies a fast answer: scarcity messaging could lift completion by 8 to 12 percent. And statistically, it may be correct.",
      "It proposes: “Apply now before this offer ends.” On a credit product. Potentially to customers already under financial pressure.",
      "That is manufactured urgency. Even before regulation enters the conversation, it fails the standard we should set for responsible customer outcomes.",
      "So we reject it. Not because the model failed — but because it optimised the wrong objective.",
      "We remove unnecessary friction instead of manufacturing pressure. We pursue the same commercial outcome without creating customer harm.",
      "The dangerous failure mode wasn't hallucination. It was competence aimed at the wrong target.",
      "AI found the fastest answer. Leadership chose the responsible one. That requires someone with the authority and judgement to say no.",
    ],
  },
  s12: {
    title: "How far should AI go?",
    beats: [
      "So where should the line sit? This is the model I use.",
      "Delegate execution: drafting, summarising, analysis and prototyping.",
      "Review outputs: people verify what the AI produces and challenge the assumptions behind it.",
      "Retain accountability: decisions affecting customers, money, risk or compliance remain owned by identifiable leaders.",
      "That means human oversight for consequential decisions, clear ownership across the lifecycle, and visibility of where AI is being used. Not because AI is inherently unsafe — because accountability cannot be automated.",
    ],
  },
  s13: {
    title: "Close",
    beats: [
      "AI will commoditise more of the execution. Leadership will determine whether that speed produces better outcomes or simply faster mistakes. That's the role I'm here to play.",
      "(Let it fade. Stop talking. Then open for questions.)",
    ],
  },
};

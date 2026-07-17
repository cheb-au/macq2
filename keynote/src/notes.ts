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
      "I've been building this in the open, while leading enterprise teams.",
      "Good design hasn't changed. Taste, judgement, empathy — same as ever.",
      "What's changed is speed. Ambiguity to evidence used to take weeks. Now hours. That changes how we lead.",
    ],
  },
  s02: {
    title: "The shift",
    beats: [
      "Even inside agile, we never killed the queues. We just moved them into the sprint. Every handoff is a wait.",
      "AI collapses the handoffs. Research to learning becomes one continuous loop.",
      "So it compresses the org — the waiting between people.",
      "It doesn't replace the people. The judgement still has to live somewhere.",
    ],
  },
  s03: {
    title: "Where value moves",
    beats: [
      "For twenty years we were paid for output. Wireframes, specs, prototypes — the artefacts.",
      "",
      "AI produces those almost for free now. So hundreds of artefacts collapse into the one thing that still matters: the decision. The artefact was never the point.",
    ],
  },
  s04: {
    title: "Everyone gets the same AI",
    beats: [
      "Here's what our industry is underestimating. AI makes us faster — but it also makes us more similar. Every bank has the same models.",
      "If we all prompt them the same way, we converge on the same answers.",
      "The difference isn't the model. It's everything around it — the system that shapes the AI before the AI shapes the product.",
      "Your design system. Research. Governance. Customer insight. Leadership. That's the moat a model can't invent.",
      "AI is becoming the engine. The design system becomes the steering wheel. Executives get that instantly.",
    ],
  },
  s05: {
    title: "What becomes valuable?",
    beats: [
      "Execution used to be the floor — the baseline cost of the work. AI raises that floor for everyone.",
      "But a rising floor doesn't lift the ceiling. Judgement, taste, systems, leadership — those are still raised by people. That's where leaders create value now.",
    ],
  },
  s06: {
    title: "The role, redefined",
    beats: [
      "The Head of Design job used to be: manage delivery, review screens, allocate people.",
      "Now it's: design the systems, review the decisions, grow judgement, orchestrate capability. Same craft, higher altitude.",
      "And the honest answer every exec is thinking: headcount doesn't collapse in year one. The shape changes — fewer pure production roles, more design engineers.",
    ],
  },
  s07: {
    title: "Growing designers",
    beats: [
      "Here's the question almost nobody's asking. Juniors learned by doing the grunt work. If AI does the grunt work — how does anyone become senior?",
      "You rebuild the apprenticeship on purpose: critique, real customer exposure, systems thinking, commercial context, verification. It all ladders up to decision quality.",
      "",
      "",
      "",
      "",
      "",
      "AI drops the cost of execution to near zero. So the edge becomes how fast your people build expertise. Talent development stops being HR — it becomes strategy.",
    ],
  },
  s08: {
    title: "Levri (proof)",
    beats: [
      "I didn't just theorise this. I built it. One person — strategy to a shipped production platform — in three months.",
      "Strategy became product. Not a deck — a working thing.",
      "",
      "",
      "",
      "The experiment was never the product. It was the operating model. The product just proved it works.",
    ],
  },
  s09: {
    title: "AI-native operating model",
    beats: [
      "Customer signal used to take weeks. Now hours. My job: frame the real problem, not the symptom.",
      "Hypotheses in minutes. My job: choose the one bet worth making.",
      "Prototypes in hours. My job: shape the quality and the trade-offs.",
      "Evidence, fast. My job: govern it — risk, bias, is it actually enough. On high-risk calls, a human stays in the loop.",
      "Experiments in days. My job: align engineering, product and risk — and protect customers while we learn.",
      "Learning compounds. My job: turn it into standards the whole org reuses.",
      "Notice what happened: every step got faster, and the leadership role got bigger — not smaller. The work compresses. Leadership expands.",
    ],
  },
  s10: {
    title: "Division of labour",
    beats: [
      "On Levri, this was the split.",
      "AI generated, investigated, suggested, automated. The doing.",
      "I prioritised, directed, validated, protected, governed. And two of those — protected and governed — you cannot hand to a model. Not in a bank.",
      "Execution moved to the machine. Accountability didn't move an inch.",
    ],
  },
  s11: {
    title: "Speed without judgement (THE TURN)",
    beats: [
      "Everything so far has been about speed. Here's the other side.",
      "Real scenario: high abandonment on an application.",
      "The AI finds an answer fast — scarcity messaging will lift completions 8 to 12 percent. And it's right.",
      "It proposes “apply now before this offer ends.” On a credit product. To people who may be in financial stress.",
      "That's false urgency. Twelve months from now, under the new Unfair Trading Practices law, that's not a taste question — it's a prohibited practice.",
      "So we reject it. Not because the model was wrong — because it optimised the wrong thing.",
      "We reduce friction instead of manufacturing pressure. Same goal, no harm.",
      "The failure mode wasn't hallucination. It was competence, pointed at the wrong objective.",
      "AI found the fastest answer. Leadership chose the right one. No model does that — only a person with the authority to say no.",
    ],
  },
  s12: {
    title: "How far should AI go?",
    beats: [
      "So where's the line? Here's the model I run.",
      "Delegate the execution — drafting, summarising, prototyping.",
      "Review the output — humans verify what the AI produces.",
      "But the decisions — customer, financial, risk, compliance — stay with leadership. Full stop.",
      "And this isn't my invention. Human oversight on high-risk decisions, ownership across the lifecycle, a register of AI use — that's APRA's stated minimum. I arrived at it independently.",
    ],
  },
  s13: {
    title: "Close",
    beats: [
      "Here's where I land it. AI commoditises execution — everyone gets that. Leadership differentiates outcomes. That's the job I'm here to do.",
      "(Let it fade. Stop talking. Then open for questions.)",
    ],
  },
};

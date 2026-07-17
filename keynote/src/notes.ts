// Speaker notes for the presenter view (press P during the deck).
// Keyed by slide id. Edit freely - `title` shows in the presenter, `notes`
// is your track. Reuse this file for future decks.
export interface SlideNote {
  title: string;
  notes: string;
}

export const NOTES: Record<string, SlideNote> = {
  s01: {
    title: "Title",
    notes:
      "Open calm, let it breathe.\n\n“AI isn't changing what good design is. It's changing how quickly we move from ambiguity to evidence.”\n\n~45s.",
  },
  s02: {
    title: "The shift",
    notes:
      "State 1 (straight line): even inside agile, we didn't remove the queues – they moved into the sprint.\nClick.\nState 2 (loop): signal to learning, closing continuously.\n\nLand: “AI compresses organisational handoffs. Not jobs.”\n\n~75s.",
  },
  s03: {
    title: "Where value moves",
    notes:
      "You used to be paid for producing artefacts (the cloud).\nClick – they collapse into one decision.\n\n“From producing artefacts to scaling decisions.” The artefact isn't the outcome; the decision is.\n\n~75s.",
  },
  s04: {
    title: "Everyone gets the same AI",
    notes:
      "“AI doesn't just make us faster – it makes us more similar. Every bank has the same frontier models. If we all prompt them the same way, we converge on the same answers.”\nClick – Macquarie comes alive. “The model didn't create the difference. The system did.”\nClick through the system (design system / research / governance / customer insight / leadership → customer experience).\nClose: “AI is becoming the engine. The design system becomes the steering wheel.”\n\n~60s.",
  },
  s05: {
    title: "What becomes valuable?",
    notes:
      "Execution is the floor – AI raises it (watch it pour in).\nClick: the floor rises and the ceiling appears – judgement, taste, systems, leadership.\n\n“AI raises the floor. Leaders raise the ceiling.”\n\n~60s.",
  },
  s06: {
    title: "The role, redefined",
    notes:
      "The craft doesn't disappear; the altitude of the work changes. Then → Now.\nAnswer the unspoken question before they ask it:\n“Headcount doesn't fall in year one. The shape does.” – fewer pure production roles, more design engineers, research synthesis at scale.\n\n~75s.",
  },
  s07: {
    title: "Growing designers",
    notes:
      "The smartest question in the deck – almost no other candidate raises it. Give it room.\nRoll through the capabilities to Decision quality.\n\n“How do we develop great designers when AI removes the apprenticeship?”\nThe advantage becomes how quickly people develop expertise. Don't rush.\n\n~90s.",
  },
  s08: {
    title: "Levri (proof)",
    notes:
      "From theory to production. With Levri.\n95+ teams – one person, from strategy to shipped product, production from day one.\nMilestones: strategy translated → design/eng aligned → constraints navigated → operating model proven.\n“The experiment was the operating model. The product was the proof.”\nPoint forward: everything on the next slide, I've actually run.\n\n~90s.",
  },
  s09: {
    title: "AI-native operating model",
    notes:
      "THE most hireable slide – spend the three minutes, don't rush the six clicks.\nFor each stage: what AI compresses (time recovered, measured on Levri) and what leadership does – Frame / Prioritise / Shape / Govern / Align / Scale.\nLand: “The work compresses. Leadership expands.”\n\n~3 min.",
  },
  s10: {
    title: "Division of labour",
    notes:
      "AI: generated / investigated / suggested / automated.\nLeadership: prioritised / directed / validated / protected / governed.\nProtected & Governed are not delegable – that's the whole argument in a bank.\n“Execution moved to AI. Accountability didn't.”\n\n~60s.",
  },
  s11: {
    title: "Speed without judgement (THE TURN)",
    notes:
      "The most important 40 seconds. Say it slowly on the judgement card:\n\n“The model wasn't hallucinating. It was RIGHT – scarcity messaging really would lift completed applications 8–12%. It optimised exactly the metric it was given.\nAnd it was proposing to manufacture urgency on a credit product, to people who may be in financial stress. Twelve months from now, that's not a taste question – it's a prohibited practice.\nThe failure mode isn't hallucination. It's competence, pointed at the wrong objective. And no model catches that – only a person with the authority to say no does.”\n\nLand: “AI found the fastest answer. Leadership chose the right one.” Move straight on – pause for questions AFTER the next slide.\n\n~2.5 min.",
  },
  s12: {
    title: "How far should AI go?",
    notes:
      "Clean control model: Delegate / Review / Decide.\nTell them it isn't your invention – it's APRA's minimum (human involvement on high-risk decisions, ownership across the AI lifecycle, a register of AI use).\n“AI accelerates execution. Leadership remains accountable.”\n\n~75s.",
  },
  s13: {
    title: "Close",
    notes:
      "“AI commoditises execution.” (pause) “Leadership differentiates outcomes.”\nHold ~2 seconds. Let it fade to black. Stop talking. NOW take questions.\n\n~45s.",
  },
};

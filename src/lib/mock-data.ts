// Placeholder content used by the UI shell until real data is wired up.
export type Framework = {
  id: string; name: string; definition: string; analogy: string; when_to_use: string;
  steps: string[]; example: string; practice_prompt: string;
};
export type Fallacy = { id: string; name: string; definition: string; examples: [string, string]; how_to_counter: string };

export const frameworks: Framework[] = [
  { id: "prep", name: "PREP", definition: "Point, Reason, Example, Point — a compact structure for any claim.",
    analogy: "A sandwich: your point is the bread on both sides.", when_to_use: "Short answers, rebuttals, opening lines.",
    steps: ["State your point", "Give the reason", "Offer an example", "Restate the point"],
    example: "Schools should start later. Teens' sleep cycles shift later. A district that moved to 8:30 saw grades rise. So later starts help students.",
    practice_prompt: "Use PREP to argue that cities should ban cars from downtown." },
  { id: "steelman", name: "Steelman", definition: "Restate the strongest version of your opponent's view before answering it.",
    analogy: "Fixing your opponent's bike before you race them.", when_to_use: "Heated topics, building credibility.",
    steps: ["Listen fully", "Restate their best case", "Ask if you got it right", "Respond to that version"],
    example: "You're saying remote work protects focus time and widens hiring — fair. My concern is mentoring junior staff…",
    practice_prompt: "Steelman the case for a four-day work week, then challenge it." },
  { id: "cer", name: "Claim–Evidence–Reasoning", definition: "Link every claim to evidence and explain why the evidence supports it.",
    analogy: "A bridge needs both pillars and the deck.", when_to_use: "Evidence-heavy debates.",
    steps: ["Make a claim", "Present evidence", "Explain the link"], example: "Claim: bike lanes cut injuries. Evidence: …",
    practice_prompt: "Argue for or against homework bans with CER." },
  { id: "five-whys", name: "Five Whys", definition: "Ask 'why' repeatedly to reach the root cause.",
    analogy: "Peeling an onion layer by layer.", when_to_use: "Problem analysis, policy debates.",
    steps: ["State the problem", "Ask why", "Repeat up to five times", "Name the root cause"], example: "Why are buses late? …",
    practice_prompt: "Use Five Whys on: 'Young people don't vote.'" },
];

export const fallacies: Fallacy[] = [
  { id: "strawman", name: "Straw man", definition: "Misrepresenting an argument to make it easier to attack.",
    examples: ["'You want less policing, so you want chaos.'", "'Vegans think nobody should own pets.'"], how_to_counter: "Restate your actual position calmly and ask them to address it." },
  { id: "ad-hominem", name: "Ad hominem", definition: "Attacking the person instead of the argument.",
    examples: ["'You're too young to understand.'", "'Of course a banker says that.'"], how_to_counter: "Redirect: 'Set me aside — what's wrong with the argument?'" },
  { id: "false-dilemma", name: "False dilemma", definition: "Presenting only two options when more exist.",
    examples: ["'Either ban phones or accept failing grades.'", "'You're with us or against us.'"], how_to_counter: "Name a third option." },
  { id: "slippery-slope", name: "Slippery slope", definition: "Claiming one step leads inevitably to an extreme.",
    examples: ["'Allow this and next it's anarchy.'", "'One snack leads to obesity.'"], how_to_counter: "Ask for evidence of each step in the chain." },
];

export const topics = [
  { id: "t1", title: "Social media does more harm than good for teenagers", category: "Society" },
  { id: "t2", title: "Cities should make public transport free", category: "Policy" },
  { id: "t3", title: "AI-generated art should be eligible for awards", category: "Tech" },
  { id: "t4", title: "Homework should be abolished in primary school", category: "Education" },
  { id: "t5", title: "Space exploration is worth the cost", category: "Science" },
];

export const rubric = ["clarity", "evidence", "logic", "counterarguments", "adaptability"] as const;
export type RubricKey = (typeof rubric)[number];

export const scoreTrend = [
  { week: "W1", clarity: 2.5, evidence: 2, logic: 2.8, counterarguments: 1.8, adaptability: 2.2 },
  { week: "W2", clarity: 2.9, evidence: 2.3, logic: 3, counterarguments: 2.1, adaptability: 2.5 },
  { week: "W3", clarity: 3.2, evidence: 2.7, logic: 3.1, counterarguments: 2.6, adaptability: 2.8 },
  { week: "W4", clarity: 3.6, evidence: 3.1, logic: 3.4, counterarguments: 2.9, adaptability: 3.2 },
];
export const sessionsPerWeek = [ { week: "W1", sessions: 2 }, { week: "W2", sessions: 4 }, { week: "W3", sessions: 3 }, { week: "W4", sessions: 5 } ];
export const frequentFallacies = [ { id: "strawman", count: 7 }, { id: "false-dilemma", count: 4 }, { id: "ad-hominem", count: 2 } ];
export const weakSpots = [
  { type: "rubric", ref: "counterarguments", severity: 0.8, note: "You rarely address the other side's best point." },
  { type: "fallacy", ref: "strawman", severity: 0.6, note: "Showed up in 3 of your last 5 debates." },
  { type: "framework", ref: "steelman", severity: 0.4, note: "Learned but not practised in 2 weeks." },
];
export const frameworkProgress = [ { id: "prep", mastery: 4, times: 9 }, { id: "steelman", mastery: 2, times: 3 }, { id: "cer", mastery: 3, times: 5 }, { id: "five-whys", mastery: 0, times: 0 } ];

export const todaysSession = { mode: "debate" as const, title: "Practise counterarguments", detail: "8-minute debate on free public transport, medium difficulty, with Steelman as your focus.", topicId: "t2" };

export const trainingPlan = [
  { day: "Mon", items: ["Debate: medium, Steelman focus", "Headline check ×5"] },
  { day: "Tue", items: ["Lesson: Claim–Evidence–Reasoning"] },
  { day: "Wed", items: ["Chart traps ×4", "Debate: easy, side swap"] },
  { day: "Thu", items: ["Lesson: Five Whys", "Pattern puzzles"] },
  { day: "Fri", items: ["Debate: hard", "Evidence board mystery"] },
  { day: "Sat", items: ["Review feedback cards"] },
  { day: "Sun", items: ["Rest"] },
];

// Placeholder content used by the UI shell until real data is wired up.
export type Framework = {
  id: string; name: string; definition: string; analogy: string; when_to_use: string;
  steps: string[]; example: string; practice_prompt: string;
  category: "problem-solving" | "communication";
};
export type Fallacy = { id: string; name: string; definition: string; examples: [string, string]; how_to_counter: string };

export const frameworks: Framework[] = [
  { id: "five-whys", name: "Five Whys", category: "problem-solving",
    definition: "Ask 'why' repeatedly to move past symptoms and reach a cause you can act on.",
    analogy: "Peeling an onion layer by layer.", when_to_use: "Recurring problems, delays and unexpected outcomes.",
    steps: ["Describe the specific problem", "Ask why it happened", "Test the answer with evidence", "Repeat until you reach an actionable cause"],
    example: "Orders arrived late because packing started late. Packing started late because the stock list was missing. The list was missing because nobody owned the closing check. Fix the closing check, not just the packing speed.",
    practice_prompt: "A houseplant keeps wilting even though you water it every week. Use Five Whys to list possible causes and what you would check." },
  { id: "issue-tree", name: "Issue tree", category: "problem-solving",
    definition: "Break a large question into smaller, distinct branches so you can investigate one part at a time.",
    analogy: "A map that turns one unknown destination into several clear routes.", when_to_use: "Broad, messy problems with several possible causes.",
    steps: ["Write the main question", "Split it into mutually exclusive branches", "Cover the important possibilities", "Investigate the highest-value branch first"],
    example: "Why did profit fall? Split it into revenue and costs. Split revenue into customers and spend per customer; split costs into fixed and variable costs.",
    practice_prompt: "Build an issue tree for: 'Why am I always short of time during the week?'" },
  { id: "first-principles", name: "First principles", category: "problem-solving",
    definition: "Separate facts from assumptions, then rebuild a solution from what must be true.",
    analogy: "Taking a model apart before building a different one.", when_to_use: "When convention or habit seems to limit the available solutions.",
    steps: ["State the assumed rule", "List the facts you can verify", "Question each remaining assumption", "Rebuild from the facts"],
    example: "Instead of assuming a team needs a longer meeting, start with the goal: everyone must make one decision and know their next task. A shared decision note may achieve that faster.",
    practice_prompt: "Use first principles to rethink how you could learn a new skill without signing up for a long course." },
  { id: "decision-matrix", name: "Decision matrix", category: "problem-solving",
    definition: "Compare options against criteria that matter, with weights that make trade-offs explicit.",
    analogy: "A set of scales with a separate pan for each priority.", when_to_use: "Choices with several plausible options and competing priorities.",
    steps: ["List realistic options", "Choose a few decision criteria", "Weight the criteria", "Score options and check the result against common sense"],
    example: "Choosing between two flats: weight commute 40%, monthly cost 40% and space 20%; score each flat rather than deciding on the first impression.",
    practice_prompt: "Create four criteria for choosing your next phone. Which criterion deserves the greatest weight, and why?" },
  { id: "inversion", name: "Inversion", category: "problem-solving",
    definition: "Ask what would guarantee a bad outcome, then work backwards to avoid it.",
    analogy: "Checking where a trail is dangerous before planning the hike.", when_to_use: "Planning, risk checks and decisions that are hard to reverse.",
    steps: ["Name the desired outcome", "Imagine a certain failure", "List what caused it", "Add safeguards for the most likely causes"],
    example: "To make a presentation fail: arrive unprepared, use unreadable slides and run out of time. Reverse those causes into a preparation checklist.",
    practice_prompt: "Invert this goal: 'I want to stick to a new exercise habit.' What would make quitting inevitable?" },
  { id: "cer", name: "Claim–Evidence–Reasoning", category: "problem-solving",
    definition: "Link a proposed answer to evidence and explain why that evidence supports it.",
    analogy: "A bridge needs both pillars and the deck.", when_to_use: "Evaluating explanations, recommendations and uncertain claims.",
    steps: ["Make a precise claim", "Present relevant evidence", "Explain the link", "Name what could change your mind"],
    example: "Claim: the later delivery window caused fewer missed parcels. Evidence: missed parcels fell after the change while order volume stayed flat. Reasoning: customers were more often home when drivers arrived.",
    practice_prompt: "Choose a change that improved your routine. Make a claim about why it worked and identify evidence that could test it." },
  { id: "prep", name: "PREP", category: "communication",
    definition: "Point, Reason, Example, Point — a compact structure for explaining a recommendation.",
    analogy: "A sandwich: your point is the bread on both sides.", when_to_use: "Short answers, recommendations and opening lines.",
    steps: ["State your point", "Give the reason", "Offer an example", "Restate the point"],
    example: "We should pilot the new rota. It could reduce handover errors. A two-week pilot would show whether gaps disappear. So a small trial is the safest next step.",
    practice_prompt: "Use PREP to recommend one practical improvement to your workplace, school or home." },
  { id: "steelman", name: "Steelman", category: "communication",
    definition: "Restate the strongest version of another view before answering it.",
    analogy: "Fixing the other bike before you race it.", when_to_use: "Disagreements, group decisions and optional debate practice.",
    steps: ["Listen fully", "Restate their best case", "Ask if you got it right", "Respond to that version"],
    example: "You're saying remote work protects focus time and widens hiring — fair. My concern is how new staff get informal coaching…",
    practice_prompt: "Steelman the case for a four-day work week, then identify the strongest evidence on each side." },
];

export const fallacies: Fallacy[] = [
  { id: "confirmation-bias", name: "Confirmation bias", definition: "Looking for evidence that supports what you already believe while overlooking contrary evidence.",
    examples: ["Reading only reviews that praise the phone you want.", "Remembering every time a shortcut worked but not the delays."], how_to_counter: "Actively search for the strongest evidence that would prove your preferred answer wrong." },
  { id: "sunk-cost", name: "Sunk cost trap", definition: "Continuing because of what you already spent, even when stopping is the better future choice.",
    examples: ["Finishing a bad film because the ticket was expensive.", "Keeping a failing project alive because it took months to build."], how_to_counter: "Ignore unrecoverable costs and compare only the future costs and benefits of each option." },
  { id: "correlation-causation", name: "Correlation ≠ causation", definition: "Assuming one thing caused another merely because they changed together.",
    examples: ["Ice cream sales and sunglasses sales rise together, so ice cream must cause sunglasses purchases.", "A team adopted new software as sales rose, so the software must deserve the credit."], how_to_counter: "Look for alternative explanations, timing and evidence from a controlled comparison." },
  { id: "false-dilemma", name: "False dilemma", definition: "Presenting only two options when more exist.",
    examples: ["Either cut the whole budget or do nothing.", "We must launch now or abandon the idea."], how_to_counter: "Name a third option, such as a smaller trial or a staged rollout." },
  { id: "strawman", name: "Straw man", definition: "Misrepresenting a position to make it easier to attack.",
    examples: ["'You want fewer meetings, so you don't want any coordination.'", "'You question the plan, so you must want it to fail.'"], how_to_counter: "Restate the actual position accurately and ask the other person to address it." },
  { id: "ad-hominem", name: "Ad hominem", definition: "Attacking the person instead of examining their idea or evidence.",
    examples: ["'You're too young to understand the budget.'", "'Of course someone from sales would suggest that.'"], how_to_counter: "Set the person aside and test the claim, assumptions and evidence directly." },
  { id: "slippery-slope", name: "Slippery slope", definition: "Claiming one step leads inevitably to an extreme without supporting the chain.",
    examples: ["'Allow one exception and soon there will be no rules.'", "'Miss one workout and the whole habit is doomed.'"], how_to_counter: "Ask for evidence at each step and identify safeguards that could break the chain." },
];

export const topics = [
  { id: "t1", title: "Social media does more harm than good for teenagers", category: "Society" },
  { id: "t2", title: "Cities should make public transport free", category: "Policy" },
  { id: "t3", title: "AI-generated art should be eligible for awards", category: "Tech" },
  { id: "t4", title: "Homework should be abolished in primary school", category: "Education" },
  { id: "t5", title: "Space exploration is worth the cost", category: "Science" },
];

// Debate-only rubric retained for the optional debate feedback card.
export const rubric = ["clarity", "evidence", "logic", "counterarguments", "adaptability"] as const;
export type RubricKey = (typeof rubric)[number];

export const skillRubric = ["problemFraming", "analysis", "evidence", "decisions", "adaptability"] as const;
export const skillLabels: Record<(typeof skillRubric)[number], string> = {
  problemFraming: "Problem framing", analysis: "Analysis", evidence: "Evidence", decisions: "Decisions", adaptability: "Adaptability",
};
export const scoreTrend = [
  { week: "W1", problemFraming: 2.5, analysis: 2.2, evidence: 2, decisions: 2.4, adaptability: 2.2 },
  { week: "W2", problemFraming: 2.9, analysis: 2.7, evidence: 2.3, decisions: 2.6, adaptability: 2.5 },
  { week: "W3", problemFraming: 3.2, analysis: 3, evidence: 2.7, decisions: 3.1, adaptability: 2.8 },
  { week: "W4", problemFraming: 3.6, analysis: 3.5, evidence: 3.1, decisions: 3.4, adaptability: 3.2 },
];
export const sessionsPerWeek = [ { week: "W1", sessions: 2 }, { week: "W2", sessions: 4 }, { week: "W3", sessions: 3 }, { week: "W4", sessions: 5 } ];
export const frequentFallacies = [ { id: "confirmation-bias", count: 7 }, { id: "correlation-causation", count: 4 }, { id: "sunk-cost", count: 2 } ];
export const weakSpots = [
  { type: "skill", ref: "problemFraming", severity: 0.8, note: "You sometimes jump to solutions before defining the exact problem." },
  { type: "thinking trap", ref: "confirmation-bias", severity: 0.6, note: "You rarely seek evidence against your first explanation." },
  { type: "technique", ref: "issue-tree", severity: 0.4, note: "Learned but not practised in two weeks." },
];
export const frameworkProgress = [
  { id: "five-whys", mastery: 4, times: 9 }, { id: "issue-tree", mastery: 2, times: 3 },
  { id: "first-principles", mastery: 3, times: 5 }, { id: "decision-matrix", mastery: 2, times: 4 },
  { id: "inversion", mastery: 1, times: 2 }, { id: "cer", mastery: 3, times: 5 },
  { id: "prep", mastery: 2, times: 3 }, { id: "steelman", mastery: 0, times: 0 },
];

export const todaysSession = { mode: "practice" as const, title: "Get to the root of the problem", detail: "A 10-minute Problem Lab: diagnose a café's falling weekend sales with Five Whys and an issue tree." };

export const trainingPlan = [
  { day: "Mon", items: ["Lesson: Five Whys", "Problem Lab: café sales"] },
  { day: "Tue", items: ["Lesson: Issue trees", "Evidence board mystery"] },
  { day: "Wed", items: ["Decision matrix drill", "Chart traps ×4"] },
  { day: "Thu", items: ["Lesson: Inversion", "Headline check ×5"] },
  { day: "Fri", items: ["Problem Lab: team delays", "Pattern puzzles ×3"] },
  { day: "Sat", items: ["Optional: structured debate", "Review reasoning traps"] },
  { day: "Sun", items: ["Rest"] },
];

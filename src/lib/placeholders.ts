// PLACEHOLDER FUNCTIONS — no voice, AI, or scoring logic lives here yet.
// Replace these with real implementations later; the UI already calls them.
import { fallacies } from "./mock-data";
import { getProblemLabLlmFeedbackServer } from "./problem-lab.functions";

export type DebateConfig = { topicId: string; side: "for" | "against"; difficulty: "easy" | "medium" | "hard"; sideSwap: boolean };
export type Turn = { speaker: "you" | "opponent"; text: string; round: number };
export type Feedback = {
  scores: Record<"clarity" | "evidence" | "logic" | "counterarguments" | "adaptability" | "overall", number>;
  fallacies: { fallacyId: string; quote: string }[];
  bestMoment: string;
  focusNext: string;
};

export type ProblemLabLlmFeedback = {
  score: number;
  strengths: string[];
  focusNext: string;
  nextPractice: string;
};

/** Browser-safe seam for the server-side LLM coach. */
export async function getProblemLabLlmFeedback(input: {
  correct: number;
  total: number;
  techniques: string[];
}): Promise<ProblemLabLlmFeedback> {
  return getProblemLabLlmFeedbackServer({ data: input });
}

/** PLACEHOLDER: would create a session row and start the opponent. */
export async function startDebate(config: DebateConfig): Promise<{ sessionId: string; config: DebateConfig }> {
  return { sessionId: `mock-${Date.now()}`, config };
}

/** PLACEHOLDER: would send the user's turn and return the opponent's reply. */
export async function submitTurn(_sessionId: string, turn: Turn): Promise<Turn> {
  return { speaker: "opponent", round: turn.round, text: "[Placeholder opponent reply] That's an interesting point, but what evidence supports it?" };
}

/** PLACEHOLDER: returns fixed mock feedback; no scoring is performed. */
export async function getFeedback(_sessionId: string): Promise<Feedback> {
  return {
    scores: { clarity: 3.5, evidence: 2.5, logic: 3, counterarguments: 2, adaptability: 3, overall: 2.8 },
    fallacies: [
      { fallacyId: fallacies.find((f) => f.id === "strawman")!.id, quote: "So you're saying nobody should ever pay for anything?" },
      { fallacyId: fallacies.find((f) => f.id === "false-dilemma")!.id, quote: "Either it's free or nobody will ride it." },
    ],
    bestMoment: "Round 2: you cited ridership numbers from Tallinn and tied them back to your main claim.",
    focusNext: "Steelman your opponent before rebutting — address their strongest point, not the weakest.",
  };
}

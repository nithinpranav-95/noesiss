// PLACEHOLDER FUNCTIONS — no voice, AI, or scoring logic lives here yet.
// Replace these with real implementations later; the UI already calls them.
import { fallacies } from "./mock-data";

export type DebateConfig = { topicId: string; side: "for" | "against"; difficulty: "easy" | "medium" | "hard"; sideSwap: boolean };
export type Turn = { speaker: "you" | "opponent"; text: string; round: number };
export type Feedback = {
  scores: Record<"clarity" | "evidence" | "logic" | "counterarguments" | "adaptability" | "overall", number>;
  fallacies: { fallacyId: string; quote: string }[];
  bestMoment: string;
  focusNext: string;
};

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
      { fallacyId: fallacies[0]!.id, quote: "So you're saying nobody should ever pay for anything?" },
      { fallacyId: fallacies[2]!.id, quote: "Either it's free or nobody will ride it." },
    ],
    bestMoment: "Round 2: you cited ridership numbers from Tallinn and tied them back to your main claim.",
    focusNext: "Steelman your opponent before rebutting — address their strongest point, not the weakest.",
  };
}

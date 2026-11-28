import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  correct: z.number().int().min(0),
  total: z.number().int().positive(),
  techniques: z.array(z.string()).min(1),
});

export const getProblemLabLlmFeedbackServer = createServerFn({ method: "POST" })
  .inputValidator(inputSchema)
  .handler(async ({ data }) => {
    const { generateProblemLabLlmFeedback } = await import("./llm.server");
    return generateProblemLabLlmFeedback(data);
  });
export const generateProblemLabChallengeServer = createServerFn({ method: "POST" })
  .inputValidator(z.object({ avoidTitles: z.array(z.string()).max(50) }))
  .handler(async ({ data }) => {
    const { generateProblemLabChallenge } = await import("./llm.server");
    const challenge = await generateProblemLabChallenge(data);
    return challenge ? { challenge, error: null } : { challenge: null, error: "Couldn't create a new challenge right now." };
  });

const text = z.string().trim().min(1).max(4000);
export const critiqueApproachServer = createServerFn({ method: "POST" })
  .inputValidator(z.object({ scenario: text, approach: z.string().trim().min(10, "Write a little more about your approach.").max(4000) }))
  .handler(async ({ data }) => {
    const { critiqueApproach } = await import("./llm.server");
    const critique = await critiqueApproach(data);
    return critique ? { critique, error: null } : { critique: null, error: "Couldn't review your approach right now. Please try again." };
  });
export const reviewTwistServer = createServerFn({ method: "POST" })
  .inputValidator(z.object({ scenario: text, approach: text, twist: text, revision: z.string().trim().min(10).max(4000) }))
  .handler(async ({ data }) => {
    const { reviewTwistResponse } = await import("./llm.server");
    const review = await reviewTwistResponse(data);
    return review ? { review, error: null } : { review: null, error: "Couldn't review your revision right now. Please try again." };
  });

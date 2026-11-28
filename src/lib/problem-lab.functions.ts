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
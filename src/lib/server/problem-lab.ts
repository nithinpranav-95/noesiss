import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateProblemLabLlmFeedback } from "@/lib/llm";

const inputSchema = z.object({
  correct: z.number().int().min(0),
  total: z.number().int().positive(),
  techniques: z.array(z.string()).min(1),
});

export const getProblemLabLlmFeedbackServer = createServerFn({ method: "POST" })
  .inputValidator(inputSchema)
  .handler(({ data }) => generateProblemLabLlmFeedback(data));

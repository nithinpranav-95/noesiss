import { z } from "zod";

export const ProblemLabLlmFeedbackSchema = z.object({
  score: z.number().min(1).max(5),
  strengths: z.array(z.string()).min(1).max(3),
  focusNext: z.string().min(1),
  nextPractice: z.string().min(1),
});

export type ProblemLabLlmFeedback = z.infer<typeof ProblemLabLlmFeedbackSchema>;
export type LlmProvider = "anthropic" | "openai";

type LlmRequest = {
  provider: LlmProvider;
  model: string;
  system: string;
  input: string;
};

const feedbackSystem = `You are a practical problem-solving coach. Evaluate the learner's completed Problem Lab exercise. Return only valid JSON with this shape: {"score": number from 1 to 5, "strengths": string[], "focusNext": string, "nextPractice": string}. Keep the feedback specific, encouraging and concise.`;

export async function generateProblemLabLlmFeedback(input: {
  correct: number;
  total: number;
  techniques: string[];
}): Promise<ProblemLabLlmFeedback> {
  for (const provider of configuredProviders()) {
    try {
      const raw = await callLlm({
        provider,
        model: provider === "anthropic" ? process.env["ANTHROPIC_MODEL"] ?? "claude-sonnet-4-5" : process.env["OPENAI_MODEL"] ?? "gpt-4o-mini",
        system: feedbackSystem,
        input: `The learner completed ${input.correct} of ${input.total} decisions correctly. Techniques practised: ${input.techniques.join(", ")}. Give feedback on the learning process, not intelligence or personality.`,
      });
      return ProblemLabLlmFeedbackSchema.parse(JSON.parse(extractJson(raw)));
    } catch (error) {
      console.error(`${provider} Problem Lab feedback failed`, error);
    }
  }
  return fallbackFeedback(input);
}

function configuredProviders(): LlmProvider[] {
  const requested = process.env["NOESIS_LLM_PROVIDER"] as LlmProvider | undefined;
  const available = ["anthropic", "openai"].filter((provider) => process.env[provider === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY"]) as LlmProvider[];
  if (requested && available.includes(requested)) return [requested, ...available.filter((provider) => provider !== requested)];
  return available;
}

async function callLlm(request: LlmRequest): Promise<string> {
  if (request.provider === "anthropic") {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": process.env["ANTHROPIC_API_KEY"]!, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: request.model, max_tokens: 400, system: request.system, messages: [{ role: "user", content: request.input }] }),
    });
    if (!response.ok) throw new Error(`Anthropic request failed with ${response.status}`);
    const body = await response.json() as { content?: { text?: string }[] };
    return body.content?.map((item) => item.text ?? "").join("") ?? "";
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env["OPENAI_API_KEY"]!}` },
    body: JSON.stringify({ model: request.model, temperature: 0.2, response_format: { type: "json_object" }, messages: [{ role: "system", content: request.system }, { role: "user", content: request.input }] }),
  });
  if (!response.ok) throw new Error(`OpenAI request failed with ${response.status}`);
  const body = await response.json() as { choices?: { message?: { content?: string } }[] };
  return body.choices?.[0]?.message?.content ?? "";
}

function extractJson(value: string): string {
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return (fenced?.[1] ?? value).trim();
}

function fallbackFeedback(input: { correct: number; total: number; techniques: string[] }): ProblemLabLlmFeedback {
  const score = Math.round((input.correct / Math.max(input.total, 1)) * 5 * 10) / 10;
  return {
    score,
    strengths: input.correct > 0 ? [`You made ${input.correct} evidence-based choice${input.correct === 1 ? "" : "s"}.`, `You practised ${input.techniques.join(", ")}.`] : ["You completed the exercise and exposed where the reasoning needs more practice."],
    focusNext: score >= 4 ? "Make your assumptions explicit before choosing a solution." : "Define the problem in observable terms before proposing a solution.",
    nextPractice: score >= 4 ? "Try the Issue Tree lesson and test your branches with evidence." : "Repeat this challenge, then write down what would change your mind.",
  };
}

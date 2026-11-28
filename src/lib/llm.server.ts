import { z } from "zod";
import { generateResponse } from "@lovable.dev/ai-gateway";

export const ProblemLabLlmFeedbackSchema = z.object({
  score: z.number().min(1).max(5),
  strengths: z.array(z.string()).min(1).max(3),
  focusNext: z.string().min(1),
  nextPractice: z.string().min(1),
});
export type ProblemLabLlmFeedback = z.infer<typeof ProblemLabLlmFeedbackSchema>;

export const GeneratedChallengeSchema = z.object({
  title: z.string().min(1),
  scenario: z.string().min(1),
  steps: z.array(z.object({
    stage: z.enum(["Define", "Diagnose", "Decide"]),
    prompt: z.string().min(1),
    technique: z.string().min(1),
    options: z.array(z.string().min(1)).length(3),
    answer: z.number().int().min(0).max(2),
    explanation: z.string().min(1),
  })).length(3),
});
export type GeneratedChallenge = z.infer<typeof GeneratedChallengeSchema>;

type JsonSchema = Record<string, unknown>;
const str = { type: "string" };
const feedbackJsonSchema: JsonSchema = {
  type: "object", additionalProperties: false, required: ["score", "strengths", "focusNext", "nextPractice"],
  properties: { score: { type: "number" }, strengths: { type: "array", items: str }, focusNext: str, nextPractice: str },
};
const challengeJsonSchema: JsonSchema = {
  type: "object", additionalProperties: false, required: ["title", "scenario", "steps"],
  properties: {
    title: str, scenario: str,
    steps: { type: "array", items: {
      type: "object", additionalProperties: false,
      required: ["stage", "prompt", "technique", "options", "answer", "explanation"],
      properties: { stage: { type: "string", enum: ["Define", "Diagnose", "Decide"] }, prompt: str, technique: str, options: { type: "array", items: str }, answer: { type: "integer" }, explanation: str },
    } },
  },
};

/** Provider chain: Lovable AI first, then OpenAI (OPENAI_API_KEY), then null so callers use a local fallback. */
async function generateJson<T>(opts: { name: string; system: string; input: string; schema: JsonSchema; parse: (v: unknown) => T }): Promise<T | null> {
  try {
    const response = await generateResponse({
      model: "openai/gpt-6-astra",
      instructions: opts.system,
      input: [{ role: "user", content: `${opts.input}\nRespond with JSON.` }],
      text: { format: { type: "json_schema", name: opts.name, schema: opts.schema, strict: true } },
    });
    return opts.parse(JSON.parse(extractResponseText(response)));
  } catch (error) {
    console.error(`Lovable AI ${opts.name} failed, trying OpenAI`, error);
  }
  const key = process.env["OPENAI_API_KEY"];
  if (key) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: process.env["OPENAI_MODEL"] ?? "gpt-4o-mini",
          response_format: { type: "json_schema", json_schema: { name: opts.name, schema: opts.schema, strict: true } },
          messages: [{ role: "system", content: opts.system }, { role: "user", content: opts.input }],
        }),
      });
      if (!res.ok) throw new Error(`OpenAI request failed with ${res.status}`);
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return opts.parse(JSON.parse(body.choices?.[0]?.message?.content ?? ""));
    } catch (error) {
      console.error(`OpenAI ${opts.name} failed, using local fallback`, error);
    }
  }
  return null;
}

function extractResponseText(response: unknown): string {
  const r = response as { output_text?: string; output?: { content?: { type?: string; text?: string }[] }[] };
  if (typeof r.output_text === "string" && r.output_text) return r.output_text;
  return (r.output ?? []).flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text ?? "").join("");
}

export async function generateProblemLabLlmFeedback(input: { correct: number; total: number; techniques: string[] }): Promise<ProblemLabLlmFeedback> {
  const result = await generateJson({
    name: "problem_lab_feedback",
    system: "You are a practical problem-solving coach. Evaluate the learner's completed Problem Lab exercise. score is 1-5; give 1-3 strengths. Keep feedback specific, encouraging and concise, about the process, not intelligence or personality.",
    input: `The learner completed ${input.correct} of ${input.total} decisions correctly. Techniques practised: ${input.techniques.join(", ")}.`,
    schema: feedbackJsonSchema,
    parse: (v) => ProblemLabLlmFeedbackSchema.parse(v),
  });
  return result ?? fallbackFeedback(input);
}

export async function generateProblemLabChallenge(input: { avoidTitles: string[] }): Promise<GeneratedChallenge | null> {
  return generateJson({
    name: "problem_lab_challenge",
    system: "You write short, realistic everyday problem-solving exercises (work, small business, home, community). Each has a 2-3 sentence scenario where someone is tempted to jump to a solution, and exactly 3 steps in order: Define, Diagnose, Decide. Each step has a question, a named technique (e.g. Problem framing, Issue tree, Five Whys, Decision matrix, Inversion, Small experiments), exactly 3 plausible options, the 0-based index of the best one (vary its position), and a one-to-two sentence explanation. No debate topics.",
    input: `Create one new challenge. Avoid these existing titles: ${input.avoidTitles.join("; ") || "none"}.`,
    schema: challengeJsonSchema,
    parse: (v) => GeneratedChallengeSchema.parse(v),
  });
}

function fallbackFeedback(input: { correct: number; total: number; techniques: string[] }): ProblemLabLlmFeedback {
  const score = Math.max(1, Math.round((input.correct / Math.max(input.total, 1)) * 5 * 10) / 10);
  return {
    score,
    strengths: input.correct > 0 ? [`You made ${input.correct} evidence-based choice${input.correct === 1 ? "" : "s"}.`, `You practised ${input.techniques.join(", ")}.`] : ["You completed the exercise and exposed where the reasoning needs more practice."],
    focusNext: score >= 4 ? "Make your assumptions explicit before choosing a solution." : "Define the problem in observable terms before proposing a solution.",
    nextPractice: score >= 4 ? "Try the Issue Tree lesson and test your branches with evidence." : "Repeat this challenge, then write down what would change your mind.",
  };
}

export const ApproachCritiqueSchema = z.object({
  score: z.number().min(1).max(5),
  strengths: z.array(z.string()).min(1).max(3),
  blindSpots: z.array(z.string()).min(1).max(3),
  technique: z.string().min(1),
  techniqueWalkthrough: z.array(z.string()).min(2).max(5),
  betterFirstMove: z.string().min(1),
  twist: z.string().min(1),
});
export type ApproachCritique = z.infer<typeof ApproachCritiqueSchema>;
const critiqueJsonSchema: JsonSchema = {
  type: "object", additionalProperties: false,
  required: ["score", "strengths", "blindSpots", "technique", "techniqueWalkthrough", "betterFirstMove", "twist"],
  properties: { score: { type: "number" }, strengths: { type: "array", items: str }, blindSpots: { type: "array", items: str }, technique: str, techniqueWalkthrough: { type: "array", items: str }, betterFirstMove: str, twist: str },
};

export const TwistReviewSchema = z.object({
  adaptabilityScore: z.number().min(1).max(5),
  whatImproved: z.string().min(1),
  stillMissing: z.string().min(1),
  keyLesson: z.string().min(1),
});
export type TwistReview = z.infer<typeof TwistReviewSchema>;
const twistJsonSchema: JsonSchema = {
  type: "object", additionalProperties: false, required: ["adaptabilityScore", "whatImproved", "stillMissing", "keyLesson"],
  properties: { adaptabilityScore: { type: "number" }, whatImproved: str, stillMissing: str, keyLesson: str },
};

export async function critiqueApproach(input: { scenario: string; approach: string }): Promise<ApproachCritique | null> {
  return generateJson({
    name: "approach_critique",
    system: "You are a demanding but kind problem-solving coach. The learner wrote, in their own words, their first approach to a scenario. Judge their actual text. score 1-5. strengths: 1-3 specific things they did well (quote or paraphrase them). blindSpots: 1-3 concrete gaps (e.g. jumped to a solution, untested assumption, symptom vs cause, missing data, confirmation bias). technique: the single most useful named technique (Problem framing, Issue tree, Five Whys, First principles, Decision matrix, Inversion, Small experiments). techniqueWalkthrough: 2-5 short steps applying that technique to THIS scenario concretely. betterFirstMove: one sentence describing a stronger first move. twist: one realistic new fact (1-2 sentences) that challenges their approach, ending with a question. If the text is empty or off-topic, score 1 and say so. Never write debate content.",
    input: `Scenario: ${input.scenario}\n\nLearner's approach:\n${input.approach}`,
    schema: critiqueJsonSchema,
    parse: (v) => ApproachCritiqueSchema.parse(v),
  });
}

export async function reviewTwistResponse(input: { scenario: string; approach: string; twist: string; revision: string }): Promise<TwistReview | null> {
  return generateJson({
    name: "twist_review",
    system: "You are a problem-solving coach. The learner gave a first approach, then got a new fact (the twist) and revised their plan. Judge how well they updated their thinking using their actual words. adaptabilityScore 1-5. whatImproved, stillMissing, keyLesson: one or two concrete sentences each.",
    input: `Scenario: ${input.scenario}\n\nFirst approach:\n${input.approach}\n\nTwist: ${input.twist}\n\nRevised approach:\n${input.revision}`,
    schema: twistJsonSchema,
    parse: (v) => TwistReviewSchema.parse(v),
  });
}

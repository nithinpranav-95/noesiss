import type * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { frameworks } from "@/lib/mock-data";

export const Route = createFileRoute("/learn/$frameworkId")({
  loader: ({ params }) => {
    const f = frameworks.find((x) => x.id === params.frameworkId);
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} lesson — Thinkwell` : "Lesson — Thinkwell";
    const d = loaderData?.definition ?? "Problem-solving technique lesson";
    return { meta: [
      { title: t }, { name: "description", content: d },
      { property: "og:title", content: t }, { property: "og:description", content: d },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
    ] };
  },
  component: Lesson,
});

const stepsOrder = ["Concept", "Analogy", "When to use", "Steps", "Example", "Practice"] as const;

function Lesson() {
  const f = Route.useLoaderData();
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const body: Record<(typeof stepsOrder)[number], React.ReactNode> = {
    Concept: <p className="text-xl">{f.definition}</p>,
    Analogy: <p className="font-display text-2xl italic">“{f.analogy}”</p>,
    "When to use": <p className="text-xl">{f.when_to_use}</p>,
    Steps: <ol className="space-y-3">{f.steps.map((s, i) => <li key={s} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-mono text-primary-foreground">{i + 1}</span><span className="pt-1 text-lg">{s}</span></li>)}</ol>,
    Example: <blockquote className="border-l-4 border-primary pl-4 text-lg">{f.example}</blockquote>,
    Practice: (
      <div className="space-y-3">
        <p className="text-lg font-medium">{f.practice_prompt}</p>
        <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your response…" className="min-h-[140px]" />
        <Button onClick={() => toast.success("Saved (placeholder) — feedback isn't connected yet.")} disabled={!answer.trim()}>Submit practice</Button>
      </div>
    ),
  };
  const key = stepsOrder[step]!;
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/learn" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />Library</Link>
      <p className="font-mono text-xs uppercase tracking-widest text-primary">Lesson · {step + 1} of {stepsOrder.length}</p>
      <h1 className="mb-4 text-4xl font-semibold">{f.name}</h1>
      <Progress value={((step + 1) / stepsOrder.length) * 100} className="mb-8" />
      <Card><CardContent className="min-h-[240px] space-y-4 p-8"><p className="text-sm font-medium text-muted-foreground">{key}</p>{body[key]}</CardContent></Card>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        {step < stepsOrder.length - 1 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fallacies, rubric } from "@/lib/mock-data";
import { getFeedback, type Feedback } from "@/lib/placeholders";

export const Route = createFileRoute("/feedback")({
  validateSearch: (s: Record<string, unknown>): { session: string } => ({ session: String(s["session"] ?? "mock") }),
  head: () => ({ meta: [
    { title: "Debate feedback — Noesis" },
    { name: "description", content: "Scores, reasoning traps and focus areas from your optional debate." },
    { property: "og:title", content: "Debate feedback — Noesis" },
    { property: "og:description", content: "Scores, reasoning traps and focus areas from your optional debate." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: FeedbackCard,
});

function FeedbackCard() {
  const { session } = Route.useSearch();
  const [fb, setFb] = useState<Feedback | null>(null);
  useEffect(() => { getFeedback(session).then(setFb); }, [session]);
  if (!fb) return <p className="text-muted-foreground">Loading feedback…</p>;

  return (
    <div>
      <PageHeader eyebrow="Feedback card" title="How you argued" description="Placeholder results — scoring isn't connected yet.">
        <div className="text-right"><p className="text-sm text-muted-foreground">Overall</p><p className="font-display text-5xl text-primary">{fb.scores.overall.toFixed(1)}<span className="text-xl text-muted-foreground">/5</span></p></div>
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Scores</h2>
          {rubric.map((k) => (
            <div key={k}><div className="mb-1 flex justify-between text-sm"><span className="capitalize">{k}</span><span className="font-mono">{fb.scores[k].toFixed(1)}</span></div>
            <Progress value={(fb.scores[k] / 5) * 100} /></div>
          ))}
        </CardContent></Card>
        <Card><CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Fallacies spotted</h2>
          {fb.fallacies.map((f, i) => {
            const fal = fallacies.find((x) => x.id === f.fallacyId);
            return (
              <div key={i} className="rounded-lg border-l-4 border-destructive bg-secondary p-4">
                <p className="font-medium">{fal?.name}</p>
                <blockquote className="mt-1 font-display italic text-muted-foreground">“{f.quote}”</blockquote>
                <p className="mt-2 text-sm"><b>Counter:</b> {fal?.how_to_counter}</p>
              </div>
            );
          })}
        </CardContent></Card>
        <Card className="border-success/40"><CardContent className="p-6"><Sparkles className="mb-3 h-5 w-5 text-success" /><h2 className="text-xl font-semibold">Best moment</h2><p className="mt-2">{fb.bestMoment}</p></CardContent></Card>
        <Card className="border-primary/40"><CardContent className="p-6"><Target className="mb-3 h-5 w-5 text-primary" /><h2 className="text-xl font-semibold">Focus for next time</h2><p className="mt-2">{fb.focusNext}</p></CardContent></Card>
      </div>
      <div className="mt-8 flex gap-3"><Button asChild><Link to="/debate">Debate again</Link></Button><Button asChild variant="outline"><Link to="/progress">View progress</Link></Button></div>
    </div>
  );
}

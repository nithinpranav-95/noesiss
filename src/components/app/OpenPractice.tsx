import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Lightbulb, RotateCcw, Send, Zap } from "lucide-react";
import { toast } from "sonner";
import { critiqueApproachServer, reviewTwistServer } from "@/lib/problem-lab.functions";
import type { ApproachCritique, TwistReview } from "@/lib/llm.server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const prompts = ["What is the real problem, in measurable terms?", "What are you assuming?", "What would you check first, and what would prove you wrong?"];

export function OpenPractice({ scenario, socratic, onNext }: { scenario: string; socratic: boolean; onNext: () => void }) {
  const critiqueFn = useServerFn(critiqueApproachServer);
  const twistFn = useServerFn(reviewTwistServer);
  const [approach, setApproach] = useState("");
  const [revision, setRevision] = useState("");
  const [critique, setCritique] = useState<ApproachCritique | null>(null);
  const [review, setReview] = useState<TwistReview | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      const r = await critiqueFn({ data: { scenario, approach } });
      if (r.critique) setCritique(r.critique); else toast.error(r.error ?? "Couldn't review your approach.");
    } catch { toast.error("Write at least a sentence or two, then try again."); } finally { setBusy(false); }
  }
  async function submitRevision() {
    if (!critique) return;
    setBusy(true);
    try {
      const r = await twistFn({ data: { scenario, approach, twist: critique.twist, revision } });
      if (r.review) setReview(r.review); else toast.error(r.error ?? "Couldn't review your revision.");
    } catch { toast.error("Write at least a sentence or two, then try again."); } finally { setBusy(false); }
  }
  function restart() { setApproach(""); setRevision(""); setCritique(null); setReview(null); }

  return (
    <div className="space-y-6">
      <Card><CardContent className="space-y-4 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Your first approach</p>
        <h2 className="text-2xl font-semibold leading-snug">How would you tackle this? Describe your first moves in your own words.</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">{prompts.map((p) => <li key={p} className="flex gap-2"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p}</li>)}</ul>
        <Textarea aria-label="Your approach" value={approach} onChange={(e) => setApproach(e.target.value)} disabled={!!critique || busy} rows={6} placeholder="First I would…" />
        {!critique && <div className="flex justify-end"><Button onClick={submit} disabled={busy || approach.trim().length < 10}><Send className="h-4 w-4" />{busy ? "Reviewing…" : "Get feedback"}</Button></div>}
      </CardContent></Card>

      {critique && <Card><CardContent className="space-y-5 p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4"><h2 className="text-2xl font-semibold">Coach's review</h2><p className="text-3xl font-semibold">{critique.score}<span className="text-base font-normal text-muted-foreground"> / 5</span></p></div>
        <Section title="What was sound" items={critique.strengths} />
        <Section title="Blind spots" items={critique.blindSpots} />
        <div className="rounded-lg border-l-4 border-primary bg-secondary p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Technique: {critique.technique}</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">{critique.techniqueWalkthrough.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <div><p className="font-medium">A stronger first move</p><p className="mt-1 text-sm text-muted-foreground">{critique.betterFirstMove}</p></div>
      </CardContent></Card>}

      {critique && socratic && <Card><CardContent className="space-y-4 p-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"><Zap className="h-4 w-4" />New information</p>
        <p className="text-lg leading-relaxed">{critique.twist}</p>
        <Textarea aria-label="Your revised approach" value={revision} onChange={(e) => setRevision(e.target.value)} disabled={!!review || busy} rows={5} placeholder="Given this, I would now…" />
        {!review && <div className="flex justify-end"><Button onClick={submitRevision} disabled={busy || revision.trim().length < 10}><Send className="h-4 w-4" />{busy ? "Reviewing…" : "Submit revision"}</Button></div>}
        {review && <div className="space-y-3 rounded-lg bg-secondary p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Adaptability {review.adaptabilityScore} / 5</p>
          <p className="text-sm"><span className="font-medium">What improved: </span>{review.whatImproved}</p>
          <p className="text-sm"><span className="font-medium">Still missing: </span>{review.stillMissing}</p>
          <p className="text-sm"><span className="font-medium">Key lesson: </span>{review.keyLesson}</p>
        </div>}
      </CardContent></Card>}

      {critique && (!socratic || review) && <div className="flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={restart}><RotateCcw className="h-4 w-4" />Try again</Button>
        <Button onClick={() => { restart(); onNext(); }}>Next challenge <ArrowRight className="h-4 w-4" /></Button>
      </div>}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return <div><p className="font-medium">{title}</p><ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul></div>;
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { frameworks, frameworkProgress, fallacies } from "@/lib/mock-data";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/learn/")({ head: () => meta("Technique library", "Practical techniques for analysing problems, making decisions and checking your reasoning."), component: Library });

function FrameworkCards({ category }: { category: "problem-solving" | "communication" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {frameworks.filter((f) => f.category === category).map((f) => {
        const m = frameworkProgress.find((p) => p.id === f.id)?.mastery ?? 0;
        return (
          <Link key={f.id} to="/learn/$frameworkId" params={{ frameworkId: f.id }}>
            <Card className="h-full transition-colors hover:border-primary"><CardContent className="flex h-full flex-col p-6">
              <p className="font-display text-2xl font-semibold">{f.name}</p>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.definition}</p>
              <div className="mt-4 flex items-center gap-1" aria-label={`Mastery ${m} of 5`}>
                {Array.from({ length: 5 }, (_, i) => <span key={i} className={i < m ? "h-1.5 w-6 rounded-full bg-primary" : "h-1.5 w-6 rounded-full bg-muted"} />)}
              </div>
            </CardContent></Card>
          </Link>
        );
      })}
    </div>
  );
}

function Library() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Learn" title="Problem-solving toolbox" description="Start with practical methods for breaking down problems, testing explanations and making better decisions." />
      <section>
        <div className="mb-4"><h2 className="text-2xl font-semibold">Core techniques</h2><p className="mt-1 text-sm text-muted-foreground">Use these on study, work and everyday challenges.</p></div>
        <FrameworkCards category="problem-solving" />
      </section>
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Thinking traps</h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">Common shortcuts that can distort a diagnosis or decision. Use the counter-move before committing to an answer.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {fallacies.map((f) => (
            <Card key={f.id}><CardContent className="p-5">
              <div className="flex items-center gap-2"><p className="font-display text-lg font-semibold">{f.name}</p><Badge variant="secondary">thinking trap</Badge></div>
              <p className="mt-1 text-sm text-muted-foreground">{f.definition}</p>
              <ul className="mt-2 list-disc pl-5 text-sm italic">{f.examples.map((e) => <li key={e}>{e}</li>)}</ul>
              <p className="mt-2 text-sm"><b>Counter:</b> {f.how_to_counter}</p>
            </CardContent></Card>
          ))}
        </div>
      </section>
      <section className="border-t pt-10">
        <div className="mb-4"><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Advanced · optional</p><h2 className="mt-1 text-2xl font-semibold">Communication & debate</h2><p className="mt-1 text-sm text-muted-foreground">Once the problem is clear, practise explaining your answer and engaging with other views.</p></div>
        <FrameworkCards category="communication" />
      </section>
    </div>
  );
}

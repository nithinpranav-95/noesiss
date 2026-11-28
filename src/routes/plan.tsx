import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { meta } from "@/components/app/GameShell";
import { frameworkProgress, frameworks, trainingPlan, weakSpots } from "@/lib/mock-data";
import { chooseNextActivity } from "@/lib/workflows";

export const Route = createFileRoute("/plan")({ head: () => meta("Training plan", "Your weekly practical problem-solving plan, with optional debate practice at the end."), component: Plan });

function Plan() {
  const nextActivity = chooseNextActivity({ sessionsCompleted: 5, frameworkProgress, weakSpots }, frameworks);
  return (
    <div>
      <PageHeader eyebrow="Training plan" title="This week" description="Sample plan — the planner isn't connected yet. Focus: defining problems and testing causes before choosing solutions." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trainingPlan.map((d, i) => (
          <Card key={d.day} className={i === 1 ? "border-primary" : ""}><CardContent className="p-5">
            <p className="font-display text-xl font-semibold">{d.day}{i === 1 && <span className="ml-2 text-xs font-sans text-primary">today</span>}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">{d.items.map((it) => <li key={it}>• {it}</li>)}</ul>
          </CardContent></Card>
        ))}
      </div>
      <Card className="mt-6 border-primary"><CardContent className="p-5"><p className="font-mono text-xs uppercase tracking-widest text-primary">Next recommended activity</p><h2 className="mt-2 text-2xl font-semibold">{nextActivity.title}</h2><p className="mt-1 text-sm text-muted-foreground">{nextActivity.description}</p></CardContent></Card>
      <p className="mt-6 text-sm text-muted-foreground">Debate appears at the end of the week as an optional way to apply your reasoning, not as the core of your training.</p>
    </div>
  );
}

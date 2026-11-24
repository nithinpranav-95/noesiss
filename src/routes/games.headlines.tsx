import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameShell, meta } from "@/components/app/GameShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/headlines")({ head: () => meta("Headline check", "Choose the headline that best matches the facts."), component: Headlines });

const pairs = [
  { fact: "A study of 40 people found coffee drinkers reported slightly better mood.", a: "Coffee CURES depression, scientists say", b: "Small study links coffee to modestly better mood", correct: "b" },
  { fact: "Unemployment fell from 4.2% to 4.0% last quarter.", a: "Unemployment dips slightly to 4%", b: "Jobs boom: unemployment crashes", correct: "a" },
];

function Headlines() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const p = pairs[i]!;
  return (
    <GameShell title="Headline check" description="Read the facts. Which headline is fair?">
      <Card className="mb-6 bg-secondary"><CardContent className="p-6"><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The facts</p><p className="mt-2 text-lg">{p.fact}</p></CardContent></Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {(["a", "b"] as const).map((k) => (
          <button key={k} onClick={() => setPick(k)} className={cn("rounded-lg border-2 bg-card p-6 text-left font-display text-2xl leading-snug transition-colors hover:border-primary",
            pick === k && (k === p.correct ? "border-success" : "border-destructive"))}>{p[k]}</button>
        ))}
      </div>
      {pick && <p className="mt-4">{pick === p.correct ? "Fair call — that one matches the scale of the evidence." : "That headline overstates what the facts show."}</p>}
      <Button variant="outline" className="mt-6" onClick={() => { setI((i + 1) % pairs.length); setPick(null); }}>Next pair</Button>
    </GameShell>
  );
}

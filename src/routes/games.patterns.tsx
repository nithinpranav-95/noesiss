import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Circle, Square, Triangle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameShell, meta } from "@/components/app/GameShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/patterns")({ head: () => meta("Pattern puzzles", "Find the rule and predict the next shape."), component: Patterns });

type Cell = { shape: "circle" | "square" | "triangle"; filled: boolean };
const icons: Record<Cell["shape"], LucideIcon> = { circle: Circle, square: Square, triangle: Triangle };
const puzzles: { seq: Cell[]; options: Cell[]; answer: number; rule: string }[] = [
  { seq: [{ shape: "circle", filled: true }, { shape: "square", filled: false }, { shape: "circle", filled: true }, { shape: "square", filled: false }],
    options: [{ shape: "square", filled: true }, { shape: "circle", filled: true }, { shape: "triangle", filled: false }], answer: 1, rule: "Alternates filled circle / empty square." },
  { seq: [{ shape: "triangle", filled: false }, { shape: "triangle", filled: true }, { shape: "square", filled: false }, { shape: "square", filled: true }],
    options: [{ shape: "circle", filled: false }, { shape: "square", filled: false }, { shape: "triangle", filled: true }], answer: 0, rule: "Each shape appears empty then filled, then the next shape." },
];

function Shape({ c, className }: { c: Cell; className?: string }) {
  const Icon = icons[c.shape];
  return <Icon className={cn("h-10 w-10 text-primary", c.filled && "fill-primary", className)} />;
}

function Patterns() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const p = puzzles[i]!;
  return (
    <GameShell title="Pattern puzzles" description="What comes next? (mock puzzles)">
      <Card><CardContent className="space-y-8 p-6">
        <div className="flex flex-wrap items-center gap-4">
          {p.seq.map((c, k) => <div key={k} className="grid h-20 w-20 place-items-center rounded-lg border bg-secondary"><Shape c={c} /></div>)}
          <div className="grid h-20 w-20 place-items-center rounded-lg border-2 border-dashed font-display text-3xl text-muted-foreground">?</div>
        </div>
        <div className="flex flex-wrap gap-3">
          {p.options.map((c, k) => (
            <button key={k} onClick={() => setPicked(k)} className={cn("grid h-20 w-20 place-items-center rounded-lg border-2 transition-colors",
              picked === k ? (k === p.answer ? "border-success bg-success/10" : "border-destructive bg-destructive/10") : "hover:border-primary")}>
              <Shape c={c} />
            </button>
          ))}
        </div>
        {picked !== null && <p className={picked === p.answer ? "text-success" : "text-destructive"}>{picked === p.answer ? "Correct! " : "Not quite. "}<span className="text-foreground">{p.rule}</span></p>}
        <Button variant="outline" onClick={() => { setI((i + 1) % puzzles.length); setPicked(null); }}>Next puzzle</Button>
      </CardContent></Card>
    </GameShell>
  );
}

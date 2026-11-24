import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameShell, meta } from "@/components/app/GameShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/evidence")({ head: () => meta("Evidence board", "Pin clues to suspects and solve a small mystery."), component: Evidence });

const suspects = ["Alex (chef)", "Bea (waiter)", "Cal (owner)"];
const clues = [
  { id: "c1", text: "Flour footprints lead to the back door." },
  { id: "c2", text: "The till was opened with a key, not forced." },
  { id: "c3", text: "Only the owner and the chef have keys." },
  { id: "c4", text: "The chef was on a delivery run at 9pm." },
];
const answer = 2;

function Evidence() {
  const [pins, setPins] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [accused, setAccused] = useState<number | null>(null);
  return (
    <GameShell title="Evidence board" description="The café till was emptied at 9pm. Pick a clue, then pin it to a suspect.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {clues.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={cn("w-full rounded-md border bg-card p-4 text-left shadow-sm transition -rotate-[0.5deg] odd:rotate-[0.5deg]",
              selected === c.id && "border-primary ring-2 ring-primary/30", pins[c.id] !== undefined && "opacity-60")}>
              <Pin className="mb-1 h-4 w-4 text-primary" />{c.text}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {suspects.map((s, k) => (
            <Card key={s} className={cn(accused === k && (k === answer ? "border-success" : "border-destructive"))}><CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg">{s}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={!selected} onClick={() => { if (selected) { setPins({ ...pins, [selected]: k }); setSelected(null); } }}>Pin clue</Button>
                  <Button size="sm" onClick={() => setAccused(k)}>Accuse</Button>
                </div>
              </div>
              {clues.filter((c) => pins[c.id] === k).map((c) => <p key={c.id} className="rounded bg-secondary px-2 py-1 text-sm">{c.text}</p>)}
            </CardContent></Card>
          ))}
          {accused !== null && <p className="text-sm">{accused === answer ? "Solved — key access plus the chef's alibi leaves the owner." : "Check the alibis and who holds keys."}</p>}
        </div>
      </div>
    </GameShell>
  );
}

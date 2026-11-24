import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GameShell, meta } from "@/components/app/GameShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/chart-traps")({ head: () => meta("Chart traps", "Spot how a chart is designed to mislead."), component: ChartTraps });

const data = [ { year: "2022", value: 96 }, { year: "2023", value: 98 }, { year: "2024", value: 101 } ];
const options = ["The y-axis doesn't start at zero", "The sample is too small", "The colours are biased", "Nothing is wrong"];

function ChartTraps() {
  const [full, setFull] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <GameShell title="Chart traps" description="Headline: “Crime has EXPLODED in three years!” What's the trap?">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card><CardContent className="p-6">
          <div className="h-72"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}><XAxis dataKey="year" stroke="var(--muted-foreground)" /><YAxis domain={full ? [0, 110] : [95, 102]} stroke="var(--muted-foreground)" /><Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer></div>
          <div className="mt-4 flex items-center gap-2"><Switch id="axis" checked={full} onCheckedChange={setFull} /><Label htmlFor="axis">Show the full axis</Label></div>
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          {options.map((o, k) => (
            <Button key={o} variant="outline" onClick={() => setPicked(k)} className={cn("w-full justify-start whitespace-normal text-left h-auto py-3",
              picked === k && (k === 0 ? "border-success bg-success/10" : "border-destructive bg-destructive/10"))}>{o}</Button>
          ))}
          {picked !== null && <p className="text-sm">{picked === 0 ? "Right — a truncated axis turns a 5% change into a towering jump. Flip the toggle to see it." : "Try again — look at where the axis starts."}</p>}
        </CardContent></Card>
      </div>
    </GameShell>
  );
}

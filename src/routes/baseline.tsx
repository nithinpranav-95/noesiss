import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/baseline")({ head: () => meta("Baseline assessment", "A short assessment to tailor your training plan."), component: Baseline });

const qs = [
  { q: "“If we let students use calculators, soon they won't learn anything.” Which fallacy is this?", opts: ["Slippery slope", "Straw man", "Ad hominem"] },
  { q: "Which best supports the claim “bike lanes reduce injuries”?", opts: ["A cyclist's opinion", "City injury data before and after lanes", "A popular tweet"] },
  { q: "Your opponent makes a strong point. What's the best first move?", opts: ["Change the subject", "Restate it fairly, then respond", "Question their motives"] },
];

function Baseline() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Record<number, string>>({});
  const q = qs[i]!;
  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Baseline · question {i + 1} of {qs.length}</p>
      <Progress value={((i + 1) / qs.length) * 100} className="mb-6" />
      <Card><CardContent className="space-y-6 p-8">
        <h1 className="text-2xl font-semibold leading-snug">{q.q}</h1>
        <RadioGroup value={ans[i] ?? ""} onValueChange={(v) => setAns({ ...ans, [i]: v })}>
          {q.opts.map((o) => <div key={o} className="flex items-center gap-3 rounded-md border p-3"><RadioGroupItem value={o} id={o} /><Label htmlFor={o} className="flex-1 cursor-pointer">{o}</Label></div>)}
        </RadioGroup>
      </CardContent></Card>
      <div className="mt-6 flex justify-end">
        {i < qs.length - 1
          ? <Button disabled={!ans[i]} onClick={() => setI(i + 1)}>Next</Button>
          : <Button disabled={!ans[i]} onClick={() => navigate({ to: "/plan" })}>See my training plan</Button>}
      </div>
    </div>
  );
}

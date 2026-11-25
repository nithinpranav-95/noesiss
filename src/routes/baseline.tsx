import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/baseline")({ head: () => meta("Baseline assessment", "A short assessment to tailor your problem-solving practice."), component: Baseline });

const qs = [
  { q: "A team keeps missing deadlines. What is the best first step?", opts: ["Choose a solution quickly", "Define exactly where and when the delays happen", "Ask for a bigger team"] },
  { q: "Two changes happened at the same time as sales rose. What should you conclude?", opts: ["The first change caused the rise", "Both changes caused the rise", "More evidence is needed before assigning cause"] },
  { q: "You have spent months on a plan that no longer looks worthwhile. What matters most now?", opts: ["The time already spent", "The future costs and benefits of each option", "Whether others will criticise the decision"] },
  { q: "A problem feels too broad to investigate. Which technique should you try first?", opts: ["Break it into distinct branches with an issue tree", "Pick the first available answer", "Avoid it until more information arrives"] },
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

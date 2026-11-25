import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/onboarding")({ head: () => meta("Welcome", "Set up your practical problem-solving training profile."), component: Onboarding });

const goals = ["Study & exams", "Work challenges", "Better decisions", "Everyday problems", "Clearer communication", "Optional debate practice"];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [minutes, setMinutes] = useState("10");
  const steps = [
    <div key="n" className="space-y-3"><h1 className="text-3xl font-semibold">What should we call you?</h1><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nithin" /></div>,
    <div key="g" className="space-y-3"><h1 className="text-3xl font-semibold">Where do you want to solve problems better?</h1><p className="text-sm text-muted-foreground">Pick any that apply. Your plan will emphasise practical techniques before debate.</p>
      <ToggleGroup type="multiple" variant="outline" value={picked} onValueChange={setPicked} className="flex-wrap justify-start">{goals.map((g) => <ToggleGroupItem key={g} value={g}>{g}</ToggleGroupItem>)}</ToggleGroup></div>,
    <div key="t" className="space-y-3"><h1 className="text-3xl font-semibold">How long per day?</h1>
      <ToggleGroup type="single" variant="outline" value={minutes} onValueChange={(v) => v && setMinutes(v)} className="justify-start">{["5", "10", "20"].map((m) => <ToggleGroupItem key={m} value={m} className="px-6">{m} min</ToggleGroupItem>)}</ToggleGroup></div>,
  ];
  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Onboarding · {step + 1} of {steps.length}</p>
      <Progress value={((step + 1) / steps.length) * 100} className="mb-6" />
      <Card><CardContent className="p-8">{steps[step]}</CardContent></Card>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        {step < steps.length - 1 ? <Button onClick={() => setStep(step + 1)}>Continue</Button> : <Button onClick={() => navigate({ to: "/baseline" })}>Take baseline assessment</Button>}
      </div>
    </div>
  );
}

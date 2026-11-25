import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, RotateCcw, Target } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/practice")({
  head: () => meta("Problem lab", "Practise defining problems, finding causes and choosing sensible next steps."),
  component: ProblemLab,
});

type ChallengeStep = { stage: string; prompt: string; options: string[]; answer: number; explanation: string; technique: string };
type Challenge = { id: string; title: string; scenario: string; steps: ChallengeStep[] };

const challenges: Challenge[] = [
  {
    id: "cafe", title: "The weekend sales dip",
    scenario: "A café's weekend revenue has fallen 20% for three weeks. Weekday sales are stable. The owner wants to cut every price by 15% immediately.",
    steps: [
      { stage: "Define", prompt: "Which question defines the problem most usefully?", technique: "Problem framing",
        options: ["How can we cut prices across the menu?", "What changed in weekend customer numbers or spending per visit?", "Who is responsible for the bad results?"], answer: 1,
        explanation: "Revenue depends on both customer volume and spending per visit. Defining those parts creates something specific to investigate." },
      { stage: "Diagnose", prompt: "Which evidence would best narrow down the cause?", technique: "Issue tree",
        options: ["Weekend footfall, average order value and local events before and after the dip", "The owner's three favourite explanations", "One negative review from last month"], answer: 0,
        explanation: "These measures separate demand, spending and outside changes. They test branches of the problem instead of confirming the first theory." },
      { stage: "Decide", prompt: "What is the most sensible next step?", technique: "Reversible decisions",
        options: ["Permanently cut all prices by 15%", "Change nothing until revenue recovers", "Test one weekend offer and track footfall, order value and profit"], answer: 2,
        explanation: "A small measured test limits downside and produces evidence. A permanent price cut assumes the cause before diagnosis." },
    ],
  },
  {
    id: "team", title: "The missed deadlines",
    scenario: "A small project team has missed its last four weekly deadlines. Everyone says they are busy, and the manager proposes adding a daily hour-long status meeting.",
    steps: [
      { stage: "Define", prompt: "What should the team establish first?", technique: "Problem framing",
        options: ["Which tasks slipped, by how long and at what handoff", "How to make every meeting longer", "Which person looks least busy"], answer: 0,
        explanation: "A pattern across tasks and handoffs is observable. It gives the team a concrete delay to analyse rather than a vague productivity judgement." },
      { stage: "Diagnose", prompt: "Which approach is most likely to reveal the root cause?", technique: "Five Whys",
        options: ["Assume motivation is the cause", "Trace one delayed task and ask why at each handoff, checking each answer", "Compare the team with an unrelated department"], answer: 1,
        explanation: "Tracing a real case connects each 'why' to evidence. It can reveal unclear ownership, missing inputs or unrealistic estimates." },
      { stage: "Decide", prompt: "Which response best tests a likely handoff problem?", technique: "Small experiments",
        options: ["Add a daily hour-long meeting for everyone", "For one week, give every handoff an owner and a written definition of done, then measure delays", "Stop setting any deadlines"], answer: 1,
        explanation: "The trial addresses the suspected cause directly and measures whether handoff delays improve without adding a large recurring cost." },
    ],
  },
];

function ProblemLab() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [complete, setComplete] = useState(false);
  const challenge = challenges[challengeIndex]!;
  const step = challenge.steps[stepIndex]!;

  function choose(index: number) {
    if (picked !== null) return;
    setPicked(index);
    if (index === step.answer) setCorrect((n) => n + 1);
  }

  function next() {
    if (stepIndex === challenge.steps.length - 1) setComplete(true);
    else { setStepIndex((n) => n + 1); setPicked(null); }
  }

  function reset(nextChallenge = false) {
    if (nextChallenge) setChallengeIndex((n) => (n + 1) % challenges.length);
    setStepIndex(0); setPicked(null); setCorrect(0); setComplete(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Problem lab" title="Solve before you jump" description="Practise a repeatable approach: define the real problem, test possible causes, then choose a measured next step." />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Challenge {challengeIndex + 1} of {challenges.length} · {challenge.title}</p>
        <p className="text-sm text-muted-foreground">{correct} correct so far</p>
      </div>
      <Progress value={complete ? 100 : ((stepIndex + 1) / challenge.steps.length) * 100} className="mb-6" />
      <Card className="mb-6 bg-secondary"><CardContent className="p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The situation</p>
        <p className="mt-2 text-lg leading-relaxed">{challenge.scenario}</p>
      </CardContent></Card>
      {complete ? (
        <Card><CardContent className="p-8 text-center">
          <Target className="mx-auto mb-4 h-9 w-9 text-primary" />
          <h2 className="text-3xl font-semibold">Challenge complete</h2>
          <p className="mt-2 text-muted-foreground">You made {correct} of {challenge.steps.length} sound problem-solving choices.</p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">The goal is not to guess the fastest answer. It is to make your assumptions visible and choose evidence that can change your mind.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => reset()}><RotateCcw className="h-4 w-4" />Try again</Button>
            <Button onClick={() => reset(true)}>Next challenge <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Step {stepIndex + 1} · {step.stage}</p>
            <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{step.technique}</span>
          </div>
          <h2 className="text-2xl font-semibold leading-snug">{step.prompt}</h2>
          <div className="space-y-3">
            {step.options.map((option, index) => {
              const isAnswer = index === step.answer;
              const isPicked = index === picked;
              return (
                <button key={option} onClick={() => choose(index)} disabled={picked !== null}
                  className={cn("flex w-full items-start gap-3 rounded-lg border-2 bg-card p-4 text-left transition-colors", picked === null && "hover:border-primary", picked !== null && isAnswer && "border-success bg-success/10", isPicked && !isAnswer && "border-destructive bg-destructive/10")}>
                  <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-xs", picked !== null && isAnswer && "border-success bg-success text-primary-foreground")}>{picked !== null && isAnswer ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          {picked !== null && <div className="rounded-lg border-l-4 border-primary bg-secondary p-4"><p className="font-medium">{picked === step.answer ? "Sound choice" : "A better approach is highlighted"}</p><p className="mt-1 text-sm text-muted-foreground">{step.explanation}</p></div>}
          <div className="flex justify-end"><Button onClick={next} disabled={picked === null}>{stepIndex === challenge.steps.length - 1 ? "See result" : "Next step"}<ArrowRight className="h-4 w-4" /></Button></div>
        </CardContent></Card>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">Want to understand the method? <Link to="/learn" className="text-primary underline">Explore the technique library</Link></p>
    </div>
  );
}

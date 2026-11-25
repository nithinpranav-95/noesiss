import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { meta } from "@/components/app/GameShell";
import { fallacies, frameworks, frameworkProgress, frequentFallacies, scoreTrend, sessionsPerWeek, skillLabels, skillRubric, weakSpots } from "@/lib/mock-data";

export const Route = createFileRoute("/progress")({ head: () => meta("Progress", "Problem-solving skill trends, thinking traps, streaks and techniques practised."), component: ProgressPage });

const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function ProgressPage() {
  const maxF = Math.max(...frequentFallacies.map((f) => f.count));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Progress" title="Your problem-solving dashboard" description="Sample data until sessions are recorded. See how your analysis and decisions improve over time." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Streak</p><p className="mt-1 flex items-center gap-2 font-display text-4xl"><Flame className="h-7 w-7 text-primary" />6 days</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Challenges this week</p><p className="mt-1 font-display text-4xl">5</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Techniques practised</p><p className="mt-1 font-display text-4xl">{frameworkProgress.filter((f) => f.times > 0).length}/{frameworks.length}</p></CardContent></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Problem-solving skill trends</h2>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={scoreTrend}>
            <CartesianGrid stroke="var(--border)" /><XAxis dataKey="week" stroke="var(--muted-foreground)" /><YAxis domain={[0, 5]} stroke="var(--muted-foreground)" /><Tooltip /><Legend formatter={(value) => skillLabels[value as keyof typeof skillLabels] ?? value} />
            {skillRubric.map((k, i) => <Line key={k} name={skillLabels[k]} dataKey={k} stroke={colors[i]} strokeWidth={2} dot={false} />)}
          </LineChart></ResponsiveContainer></div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Practice sessions per week</h2>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={sessionsPerWeek}>
            <XAxis dataKey="week" stroke="var(--muted-foreground)" /><YAxis allowDecimals={false} stroke="var(--muted-foreground)" /><Bar dataKey="sessions" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Recurring thinking traps</h2>
          {frequentFallacies.map((f) => (
            <div key={f.id}><div className="flex justify-between text-sm"><span>{fallacies.find((x) => x.id === f.id)?.name}</span><span className="font-mono">{f.count}</span></div>
            <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-destructive" style={{ width: `${(f.count / maxF) * 100}%` }} /></div></div>
          ))}
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Techniques</h2>
          {frameworkProgress.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 text-sm">
              <span>{frameworks.find((f) => f.id === p.id)?.name}</span>
              <span className="shrink-0 text-muted-foreground">{p.times}× · mastery {p.mastery}/5</span>
            </div>
          ))}
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Weak spots</h2>
          {weakSpots.map((w) => (
            <div key={w.ref} className="rounded-lg bg-secondary p-3">
              <div className="flex items-center gap-2"><Badge variant="outline">{w.type}</Badge><span className="text-sm font-medium">{skillLabels[w.ref as keyof typeof skillLabels] ?? frameworks.find((f) => f.id === w.ref)?.name ?? fallacies.find((f) => f.id === w.ref)?.name ?? w.ref}</span></div>
              <p className="mt-1 text-sm text-muted-foreground">{w.note}</p>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </div>
  );
}

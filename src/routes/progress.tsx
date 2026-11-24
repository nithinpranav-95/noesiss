import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { meta } from "@/components/app/GameShell";
import { fallacies, frameworks, frameworkProgress, frequentFallacies, rubric, scoreTrend, sessionsPerWeek, weakSpots } from "@/lib/mock-data";

export const Route = createFileRoute("/progress")({ head: () => meta("Progress", "Score trends, fallacies, streaks and weak spots."), component: ProgressPage });

const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function ProgressPage() {
  const maxF = Math.max(...frequentFallacies.map((f) => f.count));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Progress" title="Your dashboard" description="Sample data until sessions are recorded." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Streak</p><p className="mt-1 flex items-center gap-2 font-display text-4xl"><Flame className="h-7 w-7 text-primary" />6 days</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Sessions this week</p><p className="mt-1 font-display text-4xl">5</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Frameworks practised</p><p className="mt-1 font-display text-4xl">{frameworkProgress.filter((f) => f.times > 0).length}/{frameworks.length}</p></CardContent></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Rubric score trends</h2>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={scoreTrend}>
            <CartesianGrid stroke="var(--border)" /><XAxis dataKey="week" stroke="var(--muted-foreground)" /><YAxis domain={[0, 5]} stroke="var(--muted-foreground)" /><Tooltip /><Legend />
            {rubric.map((k, i) => <Line key={k} dataKey={k} stroke={colors[i]} strokeWidth={2} dot={false} />)}
          </LineChart></ResponsiveContainer></div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Sessions per week</h2>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={sessionsPerWeek}>
            <XAxis dataKey="week" stroke="var(--muted-foreground)" /><YAxis allowDecimals={false} stroke="var(--muted-foreground)" /><Bar dataKey="sessions" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Frequent fallacies</h2>
          {frequentFallacies.map((f) => (
            <div key={f.id}><div className="flex justify-between text-sm"><span>{fallacies.find((x) => x.id === f.id)?.name}</span><span className="font-mono">{f.count}</span></div>
            <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-destructive" style={{ width: `${(f.count / maxF) * 100}%` }} /></div></div>
          ))}
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Frameworks</h2>
          {frameworkProgress.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <span>{frameworks.find((f) => f.id === p.id)?.name}</span>
              <span className="text-muted-foreground">{p.times}× · mastery {p.mastery}/5</span>
            </div>
          ))}
        </CardContent></Card>
        <Card><CardContent className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Weak spots</h2>
          {weakSpots.map((w) => (
            <div key={w.ref} className="rounded-lg bg-secondary p-3">
              <div className="flex items-center gap-2"><Badge variant="outline">{w.type}</Badge><span className="text-sm font-medium capitalize">{w.ref}</span></div>
              <p className="mt-1 text-sm text-muted-foreground">{w.note}</p>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </div>
  );
}

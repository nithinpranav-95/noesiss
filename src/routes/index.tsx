import { createFileRoute, Link } from "@tanstack/react-router";
import { Puzzle, BookOpen, BarChart3, Flame, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { todaysSession } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Home — Noesis" },
    { name: "description", content: "Build practical problem-solving skills with daily challenges, techniques and reasoning games." },
    { property: "og:title", content: "Home — Noesis" },
    { property: "og:description", content: "Build practical problem-solving skills with daily challenges, techniques and reasoning games." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Home,
});

const quick = [
  { to: "/practice", label: "Problem lab", desc: "Work through real-life challenges", icon: Lightbulb },
  { to: "/games", label: "Reasoning games", desc: "Test patterns, clues and evidence", icon: Puzzle },
  { to: "/learn", label: "Technique library", desc: "Learn tools for better decisions", icon: BookOpen },
  { to: "/progress", label: "Progress", desc: "Skills, streaks and weak spots", icon: BarChart3 },
] as const;

function Home() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tuesday · Week 4</p>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Flame className="h-4 w-4 text-primary" />6-day streak</span>
      </div>
      <section className="relative overflow-hidden rounded-xl border bg-card p-6 sm:p-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Today's problem · picked by your planner</p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">{todaysSession.title}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{todaysSession.detail}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/practice" search={{ fresh: true }}>Throw me a problem <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/plan">See this week's plan</Link></Button>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 font-display text-[11rem] leading-none text-primary/10">?</div>
      </section>
      <section>
        <div className="mb-4"><p className="font-mono text-xs uppercase tracking-widest text-primary">Your core practice</p><h2 className="mt-1 text-2xl font-semibold">Think through it, step by step</h2></div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quick.map(({ to, label, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardContent className="p-5">
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <p className="font-display text-xl font-semibold">{label}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <p className="text-sm text-muted-foreground">New here? <Link to="/onboarding" className="text-primary underline">Start onboarding</Link></p>
    </div>
  );
}

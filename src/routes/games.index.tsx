import { createFileRoute, Link } from "@tanstack/react-router";
import { Shapes, BarChart2, Search, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/games/")({
  head: () => meta("Games", "Visual reasoning games: patterns, chart traps, evidence boards and headline checks."),
  component: Games,
});

const games = [
  { to: "/games/patterns", title: "Pattern puzzles", desc: "Find the rule, predict what comes next.", icon: Shapes },
  { to: "/games/chart-traps", title: "Chart traps", desc: "Spot how a chart misleads.", icon: BarChart2 },
  { to: "/games/evidence", title: "Evidence board", desc: "Pin clues and solve the mystery.", icon: Search },
  { to: "/games/headlines", title: "Headline check", desc: "Which headline matches the facts?", icon: Newspaper },
] as const;

function Games() {
  return (
    <div>
      <PageHeader eyebrow="Games" title="Train your eye" description="Short visual drills that build the habits good arguers rely on." />
      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(({ to, title, desc, icon: Icon }) => (
          <Link key={to} to={to}><Card className="h-full transition-colors hover:border-primary"><CardContent className="flex gap-4 p-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-6 w-6" /></div>
            <div><p className="font-display text-xl font-semibold">{title}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
          </CardContent></Card></Link>
        ))}
      </div>
    </div>
  );
}

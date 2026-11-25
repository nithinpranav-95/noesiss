import { createFileRoute, Link } from "@tanstack/react-router";
import { Shapes, BarChart2, Search, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Card, CardContent } from "@/components/ui/card";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/games/")({
  head: () => meta("Reasoning games", "Short visual drills for analysing clues, testing evidence and recognising patterns."),
  component: Games,
});

const games = [
  { to: "/games/evidence", title: "Evidence board", desc: "Connect clues, rule out explanations and solve a mystery.", icon: Search },
  { to: "/games/chart-traps", title: "Chart traps", desc: "Test whether a visual supports the claim being made.", icon: BarChart2 },
  { to: "/games/patterns", title: "Pattern puzzles", desc: "Find the rule, test it and predict what comes next.", icon: Shapes },
  { to: "/games/headlines", title: "Headline check", desc: "Separate what the facts show from what someone claims.", icon: Newspaper },
] as const;

function Games() {
  return (
    <div>
      <PageHeader eyebrow="Reasoning games" title="Train your investigative eye" description="Short drills for the habits behind good problem-solving: notice patterns, question evidence and test alternative explanations." />
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

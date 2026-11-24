import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shuffle } from "lucide-react";
import { PageHeader } from "@/components/app/AppNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { topics } from "@/lib/mock-data";
import { startDebate, type DebateConfig } from "@/lib/placeholders";

export const Route = createFileRoute("/debate/")({
  head: () => ({ meta: [
    { title: "Debate setup — Rebuttal" },
    { name: "description", content: "Pick a motion, side and difficulty for your next debate." },
    { property: "og:title", content: "Debate setup — Rebuttal" },
    { property: "og:description", content: "Pick a motion, side and difficulty for your next debate." },
  ] }),
  component: DebateSetup,
});

function DebateSetup() {
  const navigate = useNavigate();
  const [topicId, setTopicId] = useState(topics[0]!.id);
  const [side, setSide] = useState<DebateConfig["side"]>("for");
  const [difficulty, setDifficulty] = useState<DebateConfig["difficulty"]>("medium");
  const [sideSwap, setSideSwap] = useState(false);
  const topic = topics.find((t) => t.id === topicId)!;

  async function begin() {
    const { sessionId } = await startDebate({ topicId, side, difficulty, sideSwap });
    navigate({ to: "/debate/live", search: { session: sessionId, topic: topicId, side } });
  }

  return (
    <div>
      <PageHeader eyebrow="Debate" title="Set up your debate" description="Choose the motion and how hard your opponent pushes back." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card><CardContent className="space-y-8 p-6">
          <div className="space-y-2">
            <Label>Motion</Label>
            <div className="flex gap-2">
              <Select value={topicId} onValueChange={setTopicId}>
                <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>{topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}</SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setTopicId(topics[Math.floor(Math.random() * topics.length)]!.id)}>
                <Shuffle className="h-4 w-4" /><span className="hidden sm:inline">Random</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Your side</Label>
            <ToggleGroup type="single" variant="outline" value={side} onValueChange={(v) => v && setSide(v as DebateConfig["side"])} className="justify-start">
              <ToggleGroupItem value="for" className="px-6">For</ToggleGroupItem>
              <ToggleGroupItem value="against" className="px-6">Against</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <ToggleGroup type="single" variant="outline" value={difficulty} onValueChange={(v) => v && setDifficulty(v as DebateConfig["difficulty"])} className="justify-start">
              {(["easy", "medium", "hard"] as const).map((d) => <ToggleGroupItem key={d} value={d} className="px-6 capitalize">{d}</ToggleGroupItem>)}
            </ToggleGroup>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div><Label htmlFor="swap">Side swap</Label><p className="text-sm text-muted-foreground">Switch sides halfway through.</p></div>
            <Switch id="swap" checked={sideSwap} onCheckedChange={setSideSwap} />
          </div>
        </CardContent></Card>
        <Card className="h-fit bg-secondary"><CardContent className="space-y-4 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{topic.category}</p>
          <p className="font-display text-2xl leading-snug">“{topic.title}”</p>
          <p className="text-sm">You argue <b className="text-primary">{side}</b> · <span className="capitalize">{difficulty}</span>{sideSwap && " · swap"}</p>
          <Button className="w-full" size="lg" onClick={begin}>Start debate</Button>
        </CardContent></Card>
      </div>
    </div>
  );
}

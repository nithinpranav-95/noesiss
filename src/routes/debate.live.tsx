import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { topics } from "@/lib/mock-data";
import { submitTurn, type Turn } from "@/lib/placeholders";

type Search = { session: string; topic: string; side: "for" | "against" };

export const Route = createFileRoute("/debate/live")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    session: String(s["session"] ?? "mock"),
    topic: String(s["topic"] ?? "t1"),
    side: s["side"] === "against" ? "against" : "for",
  }),
  head: () => ({ meta: [
    { title: "Live debate — Rebuttal" },
    { name: "description", content: "Your live debate session with transcript and timer." },
    { property: "og:title", content: "Live debate — Rebuttal" },
    { property: "og:description", content: "Your live debate session with transcript and timer." },
  ] }),
  component: LiveDebate,
});

const TOTAL_ROUNDS = 3;

function LiveDebate() {
  const { session, topic, side } = Route.useSearch();
  const navigate = useNavigate();
  const title = topics.find((t) => t.id === topic)?.title ?? "Motion";
  const [micOn, setMicOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [round, setRound] = useState(1);
  const [draft, setDraft] = useState("");
  const [transcript, setTranscript] = useState<Turn[]>([
    { speaker: "opponent", round: 1, text: "[Placeholder] I'll open: this motion ignores the real-world costs involved." },
  ]);

  useEffect(() => { const id = setInterval(() => setSeconds((s) => s + 1), 1000); return () => clearInterval(id); }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  async function send() {
    if (!draft.trim()) return;
    const mine: Turn = { speaker: "you", round, text: draft.trim() };
    setTranscript((t) => [...t, mine]); setDraft("");
    const reply = await submitTurn(session, mine);
    setTranscript((t) => [...t, reply]);
    setRound((r) => Math.min(TOTAL_ROUNDS, r + 1));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Live · arguing {side}</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        </div>
        <Button variant="destructive" onClick={() => navigate({ to: "/feedback", search: { session } })}><Square className="h-4 w-4" />End session</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Round</p>
          <div className="mt-2 flex gap-2">{Array.from({ length: TOTAL_ROUNDS }, (_, i) => (
            <div key={i} className={cn("h-2 flex-1 rounded-full", i < round ? "bg-primary" : "bg-muted")} />))}</div>
          <p className="mt-2 font-display text-2xl">{round} / {TOTAL_ROUNDS}</p>
        </CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Timer</p><p className="mt-2 font-mono text-4xl">{mm}:{ss}</p></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-5">
          <button onClick={() => setMicOn((m) => !m)} aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            className={cn("relative grid h-14 w-14 place-items-center rounded-full", micOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
            {micOn && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
            {micOn ? <Mic className="relative h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>
          <div><p className="font-medium">{micOn ? "Listening (mock)" : "Mic off"}</p><p className="text-xs text-muted-foreground">Voice not connected yet</p></div>
        </CardContent></Card>
      </div>
      <Card><CardContent className="space-y-4 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Live transcript</p>
        <div className="max-h-[420px] space-y-3 overflow-y-auto">
          {transcript.map((t, i) => (
            <div key={i} className={cn("max-w-[85%] rounded-lg px-4 py-3", t.speaker === "you" ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary")}>
              <p className="mb-1 text-xs opacity-70">{t.speaker === "you" ? "You" : "Opponent"} · R{t.round}</p>{t.text}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your turn (stand-in for voice)…" className="min-h-[60px]" />
          <Button onClick={send} className="sm:self-end">Submit turn</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}

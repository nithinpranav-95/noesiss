import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/AppNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { meta } from "@/components/app/GameShell";

export const Route = createFileRoute("/settings/notifications")({ head: () => meta("Notifications", "Choose when Noesis reminds you to practise problem-solving."), component: Notifications });

function Notifications() {
  const [s, setS] = useState({ daily: true, streak: true, weekly: false, newContent: false });
  const [time, setTime] = useState("19:00");
  const rows: { key: keyof typeof s; label: string; desc: string }[] = [
    { key: "daily", label: "Daily reminder", desc: "Nudge to do today's session." },
    { key: "streak", label: "Streak at risk", desc: "Alert before your streak breaks." },
    { key: "weekly", label: "Weekly summary", desc: "Your progress every Sunday." },
    { key: "newContent", label: "New content", desc: "New frameworks and games." },
  ];
  return (
    <div className="max-w-2xl">
      <PageHeader eyebrow="Settings" title="Notifications" />
      <Card><CardContent className="divide-y p-0">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between p-5">
            <div><Label htmlFor={r.key}>{r.label}</Label><p className="text-sm text-muted-foreground">{r.desc}</p></div>
            <Switch id={r.key} checked={s[r.key]} onCheckedChange={(v) => setS({ ...s, [r.key]: v })} />
          </div>
        ))}
        <div className="flex items-center justify-between p-5"><Label htmlFor="time">Reminder time</Label><Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-32" /></div>
      </CardContent></Card>
      <Button className="mt-6" onClick={() => toast.success("Preferences saved (placeholder)")}>Save</Button>
    </div>
  );
}

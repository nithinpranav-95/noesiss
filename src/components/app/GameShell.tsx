import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "./AppNav";

export function GameShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div>
      <Link to="/games" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All games</Link>
      <PageHeader eyebrow="Reasoning game · prototype" title={title} description={description} />
      {children}
    </div>
  );
}

export function meta(title: string, description: string) {
  return { meta: [
    { title: `${title} — Noesis` }, { name: "description", content: description },
    { property: "og:title", content: `${title} — Noesis` }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] };
}

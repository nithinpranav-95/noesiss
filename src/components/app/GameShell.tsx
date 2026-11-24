import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "./AppNav";

export function GameShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div>
      <Link to="/games" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All games</Link>
      <PageHeader eyebrow="Visual game · prototype" title={title} description={description} />
      {children}
    </div>
  );
}

export function meta(title: string, description: string) {
  return { meta: [
    { title: `${title} — Rebuttal` }, { name: "description", content: description },
    { property: "og:title", content: `${title} — Rebuttal` }, { property: "og:description", content: description },
  ] };
}

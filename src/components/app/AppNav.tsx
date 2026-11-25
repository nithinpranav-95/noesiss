import type * as React from "react";
import { Link } from "@tanstack/react-router";
import { Home, Lightbulb, Mic, Puzzle, BookOpen, BarChart3, Settings } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Problem lab", icon: Lightbulb },
  { to: "/games", label: "Games", icon: Puzzle },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/debate", label: "Debate", icon: Mic },
] as const;

export function AppNav() {
  return (
    <>
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col border-r bg-sidebar px-4 py-6">
        <Link to="/" className="mb-1 px-2 font-display text-2xl font-semibold">Noesis<span className="text-primary">.</span></Link>
        <p className="mb-7 px-2 text-xs text-muted-foreground">Solve clearly. Decide wisely.</p>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent font-medium text-primary" }}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 text-sm">
          <Link to="/plan" className="rounded-md px-3 py-2 hover:bg-sidebar-accent" activeProps={{ className: "text-primary" }}>Training plan</Link>
          <Link to="/settings/notifications" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-sidebar-accent" activeProps={{ className: "text-primary" }}>
            <Settings className="h-4 w-4" />Notifications
          </Link>
        </div>
      </aside>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-6 border-t bg-card">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} activeOptions={{ exact: to === "/" }}
            className="flex flex-col items-center gap-1 px-1 py-2 text-[10px] text-muted-foreground"
            activeProps={{ className: "text-primary" }}>
            <Icon className="h-5 w-5" /><span className="max-w-full truncate">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {children}
    </header>
  );
}

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Keep callable server functions in client-safe `src/lib/*.functions.ts` modules and load secret-bearing `*.server.ts` helpers inside handlers. Why: browser imports must resolve to RPC stubs without bundling server-only code.
- All UI reads mock content from `src/lib/mock-data.ts`; swap to database reads per screen later. Why: the shell was built UI-first.
- `startDebate`, `submitTurn`, `getFeedback` live in `src/lib/placeholders.ts` as stubs; voice, AI and scoring must replace them there, not inline in routes. Why: one seam for backend work.
- Content tables are public-read; user tables are scoped to `auth.uid()` via RLS (scores/fallacy_events through their session). Why: content is shared, progress is private.
- AI calls go through `generateJson` in `src/lib/llm.server.ts`: Lovable AI gateway, then OpenAI via `OPENAI_API_KEY`, then a local fallback/null. Why: one provider-failover chain for every AI feature.

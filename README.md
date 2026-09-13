<div align="center">
<img alt="Portfolio" src="public/portfolio.png" width="1627">
</div>

# My Personal Portfolio

Crafted with [Astro](https://astro.build) islands, React, Tailwind,
[shadcn/ui](https://ui.shadcn.com/) and [magic ui](https://magicui.design/).

Deployed on GitHub Pages as a static build — nothing is rendered at request
time, and the only host the page talks to at runtime is the GitHub API, for the
star counts on the project cards.

```bash
bun install
bun run dev      # localhost:4321
bun run check    # astro check + eslint
bun run build    # static output in dist/
```

Available at [eduardoprofe666.github.io](https://eduardoprofe666.github.io)

## Architecture

The page is static HTML with React islands on top. Astro renders every section
to markup at build time — a crawler and a reader with no JavaScript both get the
whole page — and then hydrates each one separately:

| Section | Hydration | Why |
| --- | --- | --- |
| Hero, About, Work | `client:load` | Their entrance animation is part of the first paint. |
| Education → Contact | `client:visible` | Fetched a screen before they scroll in; never fetched if nobody scrolls. |
| Dock, ⌘K palette, back-to-top | `client:only` | None of them contribute anything to the prerendered document. |

Islands are separate React roots, so a context at the top of one is invisible to
the next. The two pieces of shared state live in module scope instead and are
read with `useSyncExternalStore`:

- `src/i18n/store.ts` — the locale, backed by a cookie.
- `src/lib/theme.ts` — the theme, backed by `localStorage`.

Both also export a small script that the layout inlines in `<head>`, so the
theme class and `<html lang>` are correct before the first paint rather than
after hydration.

## CV

`public/resume.pdf` is generated from `cv/Eduardo_Gonzalez_CV.yaml` with
[RenderCV](https://rendercv.com). Edit the YAML, never the PDF:

```bash
pip install "rendercv[full]"
rendercv render cv/Eduardo_Gonzalez_CV.yaml
```

The PDF is written straight to `public/resume.pdf`, which is what the dock's
résumé button links to.

## Skills

The grid in `src/components/main/skills.tsx` reads its brand marks from
`src/data/skill-icons.generated.ts`, which is built from the slugs in
`src/data/skills.ts`:

```bash
bun run skills
```

That fetches each mark from Simple Icons once and inlines the path data, so the
page ships its icons instead of asking a CDN for them at runtime. Re-run it
after editing the skill list. A slug Simple Icons has dropped fails the script
rather than shipping a hole — give that skill a `mono` instead.

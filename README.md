<div align="center">
<img alt="Portfolio" src="public/portfolio.png" width="1627">
</div>

# My Personal Portfolio

Crafted with Next.js, Tailwind, [shadcn/ui](https://ui.shadcn.com/) and [magic ui](https://magicui.design/). 

Deployed on Github Pages.

Available at [eduardoprofe666.github.io](https://eduardprofe666.github.io)

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

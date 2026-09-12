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

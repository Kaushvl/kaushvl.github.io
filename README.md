# kaushvl.github.io

Personal portfolio for Kaushal Shukla — ML engineer.

## Stack

Hand-written static site. No framework, no build step.

- HTML + CSS custom properties + a single small JS file
- Geist / Geist Mono via Google Fonts
- Deployed via GitHub Pages

## Structure

```
index.html              home
404.html                not found
about/                  about + experience + values
work/                   case study index
  enterprise-rag/       full case study
  audio-noise-reduction/full case study
  smart-voicemail-llm/  short case study
  employee-churn-predictor/
  ai-productivity-assistant/
writing/                posts list (placeholders)
uses/                   tools & gear
css/
  base.css              reset, tokens, typography
  site.css              all components
js/
  site.js               theme toggle, reveal, terminal animator, filters
data/
  projects.json         source of truth for work entries
  posts.json            source of truth for posts
images/                 assets + resume PDF
```

## Run locally

```powershell
python -m http.server 5500
```

Then open <http://localhost:5500/>.

## Theme

Light by default. Toggle in the header writes to `localStorage` under `ks-theme`. Falls back to `prefers-color-scheme`. All color tokens live as CSS variables in [css/base.css](css/base.css).

## Adding work

1. Edit [data/projects.json](data/projects.json).
2. Add a row in [work/index.html](work/index.html).
3. Create `work/<slug>/index.html` using an existing case study as a template.

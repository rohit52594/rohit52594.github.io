# Rohit Sahu — Portfolio

An elegant, editorial-style developer portfolio built with React and Vite. Content is sourced from `Rohit_Senior_Software_Engineer.pdf`.

## Design

- Warm paper palette with serif typography (Cormorant Garamond + Source Sans 3)
- Clean section numbering, horizontal rules, and restrained motion
- No 3D effects, neon styling, or monogram branding

## Tech Stack

- React 18 + Vite 6
- Tailwind CSS
- Framer Motion (subtle scroll reveals only)

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

### GitHub Pages (Actions)

1. Push to GitHub
2. **Settings → Pages → Source** → **GitHub Actions**
3. Push to `main` — workflow deploys automatically

### Manual

```bash
npm run deploy
```

## Updating Content

Edit `src/data/resume.js` when your resume changes.

## Structure

```
src/
├── components/   Navigation, Footer, SectionHeader
├── sections/     Hero, About, Experience, Skills, Projects, Contact
└── data/resume.js
public/
└── Rohit_Senior_Software_Engineer.pdf
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build      # Interactive: generate HTML + PDF from resume.json (or custom CV)
npm run start      # Live preview via resume serve
npm run lint       # ESLint
npm run pretty     # Prettier
npm test           # Jest visual regression tests

# Rebuild a specific generated file
node build.js ./generated/<Company>/<job-title>.json
```

## Architecture

This is a **JSON Resume theme** (`jsonresume-theme-macchiato`) with a custom build pipeline for job-application-specific CVs.

**Data flow**: `resume.json` → `index.js` (Handlebars render) → `resume.html` → Puppeteer → `resume.pdf`

**Key files**:
- `resume.json` — single source of truth for resume data
- `index.js` — theme entry: registers Handlebars helpers, compiles `src/resume.hbs` + `src/style.css` into HTML
- `src/resume.hbs` — two-column layout (left: skills/languages/certs; right: summary/work/projects/education)
- `src/partials/*.hbs` — one partial per resume section
- `src/style.css` — screen + print CSS; print media queries are critical for PDF quality
- `build.js` — interactive CLI: prompts for company/job, calls `https://api.anand-creations.com/webhook/resume/generate` to get AI-customized resume JSON, falls back to local `resume.json`, then writes to `generated/<Company>/<job-title>.{json,html,pdf}`

**Generated outputs** live in `generated/<CompanyName>/` — these are job-application-specific and not committed.

## Key Constraints

- Date fields in `resume.json` must be `YYYY-MM-DD` (or `YYYY` for year-only)
- `basics.name`, `basics.label`, `basics.email` are required
- PDF output quality is the primary deliverable — test print preview after any CSS/template change
- `formatDate` helper in `index.js` formats dates as `MM/YYYY`; year-only strings pass through unchanged

---
name: tailor-cv
description: Use when the user asks to generate a job-application-tailored CV from a job description. Reads resume.md for full candidate context, writes a tailored resume.json to generated/{Company}/{slug}.json, and runs the build script to produce HTML + PDF.
---

# Tailor CV for a job application

## Inputs needed (ask via AskUserQuestion if any are missing)

- **Company name** (required) — e.g. `Lakera`
- **Position title** (required) — e.g. `Senior Product Engineer`
- **Job description** (required) — pasted text or URL. If URL, fetch with WebFetch.
- **Job URL** (optional) — recorded as metadata
- **User notes** (optional) — emphasis hints, dealbreakers, recruiter context

Do NOT proceed with placeholders. Ask explicitly.

## Workflow

1. **Slugify position title** — exactly like `normalizeJobTitle` in `build.js`:
   - Lowercase
   - Replace non-`[a-z0-9\s]` with empty
   - Trim
   - Replace whitespace runs with single `-`
2. **Create folder** `./generated/{Company}/` (preserve original case + spaces) if missing.
3. **Target path** = `./generated/{Company}/{slug}.json`. If it exists, confirm overwrite.
4. **Read context**:
   - `./resume.md` — the source-of-truth life narrative; pull additional detail from here (projects, bullets, achievements not yet in resume.json)
   - `./resume.json` — current curated baseline; start from this structure
5. **Tailor the JSON** — see rules below.
6. **Write** the tailored JSON to the target path. Add a `_jobApplication` block at the bottom with `{ company, jobTitle, jobUrl, jobDescription, notes, createdAt }` (matches what build.js writes).
7. **Build** by running `node build.js ./generated/{Company}/{slug}.json` — generates `.html` and `.pdf` in the same folder.
8. **Report** the three output paths back to the user.

## Tailoring rules

### What to tailor

- **`basics.summary`** — rewrite (3 to 4 sentences max) to position the candidate for THIS role. Lead with the metric or experience the JD weighs most. Do not duplicate the label.
- **`basics.label`** — adjust to match the role's seniority/focus (e.g. `Senior AI Engineer | Production LLM Systems | Technical Lead`).
- **`work[].highlights`** — reorder so the most JD-relevant bullets come first. Lightly reword to surface verbs/nouns the JD uses (no fabrication). Trim weak bullets if a section runs long. Pull additional bullets from `resume.md` if they're more relevant than what's in the json.
- **`work[].keywords`** — every work entry MUST have keywords. Reorder to lead with technologies the JD names. Add techs the user actually used (verify against `resume.md`) that the baseline json missed.
- **`projects[]`** — reorder by JD relevance. Drop or trim projects clearly off-topic.

### Schema rules (do NOT add)

- **No global `skills` array.** The user removed it as redundant; per-work `keywords` cover the tech stack signal. Don't reintroduce a `skills` block in tailored CVs.
- **No `keywords` on projects.** Projects communicate via name, description, and highlights only. Don't add a `keywords` array to any project entry.
- **Every work entry must have `keywords`** (this is the only place tech stacks live). If a baseline work entry lacks them, infer from `resume.md` and the role's actual tech.

### Never change

- Dates, company names, position titles, education
- Metrics in `basics.metrics` — those are factual
- Anything not supported by `resume.md` or `resume.json`. NO fabrication.

### Voice

Match the existing resume's voice:

- Terse, metric-led, customer-outcome framing
- Every bullet has a number, named system, or concrete outcome
- Avoid filler: "dynamic", "passionate", "results-oriented", "synergize"

### Punctuation rules (STRICT)

- **NEVER use em-dashes (`—`) or en-dashes (`–`).** They read as AI-written and are an instant tell to recruiters who are scanning for AI-generated content.
- Replace em-dash usage with: **periods** (start a new sentence), **commas**, **colons** (when the second clause expands the first), **semicolons**, or **parentheses**. Pick whichever flows most naturally for that sentence.
- For numeric ranges (e.g. "2 to 3 hours"), spell out "to" instead of using "2–3".
- Regular hyphens in compound modifiers (`AI-powered`, `end-to-end`, `production-grade`, `high-touch`) are fine and should be kept.
- Before writing the JSON, scan your output for `—` and `–` and rewrite any occurrences.

## Output report format

After build succeeds, report exactly:

```
Tailored CV ready for {Company} — {Position}:
  JSON: ./generated/{Company}/{slug}.json
  HTML: ./generated/{Company}/{slug}.html
  PDF:  ./generated/{Company}/{slug}.pdf
```

Then call out (in 1–3 bullets) WHAT you tailored — e.g. "Reordered Beekeeper bullets to lead with LLM pipeline work" — so the user can sanity-check before sending.

## Example invocation

User: `/tailor-cv Lakera, Senior Product Engineer, JD: <pasted text or URL>`

Agent: parses → company=`Lakera`, position=`Senior Product Engineer`, slug=`senior-product-engineer`, fetches JD if URL, tailors, writes, builds, reports.

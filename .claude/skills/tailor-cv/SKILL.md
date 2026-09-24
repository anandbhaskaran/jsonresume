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
5. **Fit check** — before tailoring, assess job fit. See "Fit check" below. If NOT a strong fit, use AskUserQuestion to confirm before proceeding.
6. **Tailor the JSON** — see rules below.
7. **Write** the tailored JSON to the target path. Add a `_jobApplication` block at the bottom with `{ company, jobTitle, jobUrl, jobDescription, notes, createdAt }` (matches what build.js writes).
8. **Build** by running `node build.js ./generated/{Company}/{slug}.json` — generates `.html` and `.pdf` in the same folder.
9. **Verify 2-page fit** (HARD requirement). Check the page count and, if over 2, trim and rebuild until it fits. See "Page-fit enforcement" below.
10. **Report** the three output paths back to the user.

## Fit check

Before writing any JSON, assess the job against the candidate's actual profile. A strong fit means: recent work (last 3 to 5 years) aligns with the core JD requirements, seniority matches (Lead / Staff / Principal / Senior AI Engineer level), domain trajectory continues forward, and location is workable from Zurich / Olten (remote, hybrid Zurich, or Swiss cities within ~1 hour).

**Red flags that make it NOT a strong fit** (any single one triggers confirmation):

- **Domain mismatch:** recent 4+ years are cloud LLM / agentic / backend, but JD centres on firmware, embedded C/C++, hardware, RFID, robotics, low-level systems, or another stack he has not touched since Dronistics / EPFL.
- **Seniority mismatch:** JD title is Specialist / Junior / Mid, or the role is clearly a step down in scope from Lead AI Engineer. Also flag if it demands staff/principal with deep expertise in a domain he does not have.
- **Trajectory reversal:** role pulls away from his current agentic AI / forward-deployed engineering path (e.g. back to pure frontend, pure ops, pure hardware).
- **Location friction:** office in French Switzerland (Lausanne, Geneva, Orbe, Vevey), Ticino, or abroad with no remote option; commute from Olten over ~1.5 hours; explicit on-site 5 days.
- **Missing hard requirement:** JD lists a specific credential or skill as required that he does not have (e.g. PhD in specific field, transformer industry experience, native French, specific regulated-industry clearance).

**If any red flag triggers, use AskUserQuestion to confirm.** Present the assessment compactly:

- 1 line: overall verdict (partial fit / weak fit / strong fit)
- 2 to 3 bullets: strong matches
- 2 to 3 bullets: weak points / red flags
- Then ask: proceed with tailoring anyway, skip, or tailor with a specific angle (e.g. lean harder on academic background)?

Options for the AskUserQuestion:
- **Proceed** — tailor and build the CV as normal
- **Skip** — abort, do not create the file
- **Tailor with different angle** — user provides angle notes, then proceed

If the fit IS strong (no red flags), skip the check silently and proceed to step 6.

## Tailoring rules

### What to tailor

- **`basics.summary`** — rewrite (3 to 4 sentences max) to position the candidate for THIS role. Lead with the metric or experience the JD weighs most. Do not duplicate the label.
- **`basics.label`** — adjust to match the role's seniority/focus (e.g. `Senior AI Engineer | Production LLM Systems | Technical Lead`).
- **LumApps `work[].position`** — base title is `Lead AI Engineer`. This one title (unlike other companies) may be adapted slightly per JD (e.g. `Lead Applied AI Engineer`, `Lead Machine Learning Engineer`) if it better mirrors the target role's language, as long as it stays truthful to the actual job (technical AI leadership, not a title implying skills not held).
- **`work[]` order** — **NEVER reorder the work entries themselves.** Keep strict reverse-chronological order (most recent `startDate` first), matching the baseline `resume.json` spine (LumApps → Beekeeper → Dronistics → EPFL, with concurrent side roles like Tenity slotted the same way the baseline has them). JD relevance only affects *which* entries you include/drop and *which highlights* you pick within an entry, never the entry ordering. Double-check dates before writing: a role that ended earlier must not appear above one that ended later.
- **`work[].summary`** — **do NOT include.** The Handlebars template only renders `highlights`; a `summary` field is dead weight, wastes tokens, and adds nothing to the PDF. Omit it entirely from tailored JSON. If the baseline `resume.json` still has one, drop it in the tailored copy.
- **`work[].demoUrl`** — optional. If a role has a public demo video (see baseline `resume.json`), keep this field. The template renders a purple `▶ Watch demo` pill next to the role title (via `.demo-pill` in `src/style.css`). Drop the pill for a given tailored CV only if the demo is irrelevant to the JD; otherwise preserve it. Never fabricate a URL.
- **`work[].highlights`** — reorder so the most JD-relevant bullets come first. Lightly reword to surface verbs/nouns the JD uses (no fabrication). Pull additional bullets from `resume.md` if they're more relevant than what's in the json. **Enforce these caps to keep the CV scannable on two pages:**
  - Current/most-recent primary role (LumApps): 3
  - Beekeeper (long, multi-project tenure): 4
  - Tenity: 2
  - Dronistics: 2
  - EPFL: 3
  - Default for any new/unlisted role: 3 max
  - Pick the highest-signal bullets for the specific JD; do not exceed the cap even if more bullets are available.
- **`work[].keywords`** — every work entry MUST have keywords. Reorder to lead with technologies the JD names. Add techs the user actually used (verify against `resume.md`) that the baseline json missed.
- **`projects[]`** — reorder by JD relevance. Drop or trim projects clearly off-topic. **Every entrepreneurial project is description-only: no `highlights` array, ever.** Fold any highlight-worthy signal straight into the `description` text (this applies to all of Anand Creations, SwissNRI, Proplab, PulseView alike, not just SwissNRI/PulseView).
- **`publications[]`** — reorder by JD relevance. **8 entries is a ceiling, not a target.** Include as many genuinely relevant publications/talks as fit the 2-page budget; don't trim below what's relevant just to hit a lower round number. Drop only the least relevant (off-topic talks, duplicates, weak summaries) and only as far as page-fit forces you to.

### Schema rules (do NOT add)

- **No global `skills` array.** The user removed it as redundant; per-work `keywords` cover the tech stack signal. Don't reintroduce a `skills` block in tailored CVs.
- **No `keywords` on projects.** Projects communicate via name, description, and highlights only. Don't add a `keywords` array to any project entry.
- **Every work entry must have `keywords`** (this is the only place tech stacks live). If a baseline work entry lacks them, infer from `resume.md` and the role's actual tech.

### Never change

- Dates, company names, position titles (except LumApps, see above), education
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

## Page-fit enforcement (2 pages max)

The PDF MUST be 2 pages or fewer. This is a hard requirement, not a guideline. After building, verify the page count and trim if it overflows.

**Check page count.** Prefer `pdfinfo` (poppler) if available, it's the most reliable:

```bash
pdfinfo "./generated/{Company}/{slug}.pdf" | grep Pages
```

If `pdfinfo` isn't installed, fall back to `mdls` (macOS), but note it often returns `(null)` right after a build because Spotlight hasn't indexed the file yet. The node regex fallback below can **overcount** (it can match `/Type /Pages` substrings as extra page hits) — treat it as a last resort and verify visually with `pdftoppm` if the count looks suspicious:

```bash
P="./generated/{Company}/{slug}.pdf"
N=$(mdls -name kMDItemNumberOfPages -raw "$P" 2>/dev/null)
if [ "$N" = "(null)" ] || [ -z "$N" ]; then N=$(node -e "const s=require('fs').readFileSync('$P','latin1');const m=s.match(/\/Type\s*\/Page[^s]/g);console.log(m?m.length:'unknown');"); fi
echo "Pages: $N"
```

**If over 2 pages, trim in this order, rebuilding and re-checking after each change, until it fits.** Publications are the public-voice signal and the user's stated preference is to preserve them; they come near the end of the trim list, not the start.

1. **Simplify a work highlight first** — if the PDF is 3 pages, the first move is ALWAYS to tighten the longest / most verbose highlight in a work entry rather than dropping content. Rewrite it in fewer words, keep the metric, keep the named system, cut filler clauses ("in order to", "which allowed us to", "at scale", "end to end", stacked prepositional phrases). Target: one line shorter per pass. Re-check page count; if still 3, repeat on the next-longest highlight before moving to step 2.
2. **Prose tightening (elsewhere)** — tighten `basics.summary` to 3 sentences; shorten any project `description` over 2 sentences; strip filler adjectives from remaining highlights.
3. **Bullets** — drop the single lowest-signal highlight from the longest roles first (Beekeeper 4 to 3, then any role from 3 to 2).
4. **Projects** — keep at most 3 (Anand Creations plus the 2 most relevant); drop the rest.
5. **Work entries** — drop the least JD-relevant role (usually EPFL, then any concurrent/side role added for this JD).
6. **Publications (last resort)** — only cut if steps 1 to 5 still leave overflow. Drop the least JD-relevant first; keep all conference talks unless the JD is purely non-public-facing.

Prefer tightening prose over dropping content, and dropping the lowest-signal content over cramming. Do NOT report success until the page count is confirmed to be 2 or fewer.

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

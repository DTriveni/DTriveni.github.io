# Website plan

## 1. Strategy and positioning

**Job of the site:** let anyone who finds Triveni through a CV, LinkedIn, GitHub or an application see what she has actually done and how she thinks, and check the evidence for themselves.

**Positioning:** *I turn fragmented data into evidence people can act on.* The headline names the recurring pattern across every role, rather than a job title, so the site can support analyst, engineer, consulting and data-science applications without contradicting any of them.

**Career story:** physics → enterprise systems integration → education data and automation → owning a data and evaluation function → advanced statistics, NLP and AI. The About page tells it chronologically; the home page shows it through four before/after pairs.

**Relationship to the CVs:** the site is the complete record. CVs are selections. The footer and CV page both say so.

**Credibility rules built into the structure:**
- Scope numbers and result numbers are displayed separately on every case study.
- Every project has a status: built, designed (proposed), group, or ongoing.
- Group work names the team as the owner of results.
- Unconfirmed content is visibly marked and machine-checkable (`npm run gaps`).
- Skills are listed with the work where they were used, not as a keyword cloud.

## 2. Site map

The home page is a single story, read top to bottom.

```
/                                   Home
  #about        Hero: headline, portrait, introduction, current facts
  #story        The story so far: four chapters (Foundations, Systems,
                Education data, Data science), each with its roles and years
  #what-i-do    Data engineering, Analytics and evaluation, Data science and AI
  #work         Selected work: six case studies as a table of contents
  #impact       Beyond the data: education and social-impact work
  #toolkit      Tools by capability, each linked to evidence
  #education    Education and recognition
  #contact      Email, LinkedIn, GitHub
/projects/<case-study>/             Six case-study pages
/404.html, /sitemap-index.xml
```

Navigation: About, The story, Work, Contact.

## 3. Visual design system: Editorial

**Direction:** a well-made magazine about one person's work. Off-white paper, a reading serif, thin rules instead of boxes, and a single deep-blue accent. Calm, professional and easy to read at length.

**Colour**

| Token | Hex | Use |
| --- | --- | --- |
| paper / paper-2 | `#FBFAF7` / `#F3F1EC` | Page, opened diagram stages, photo frame |
| ink / ink-2 / body | `#1A1A1A` / `#2C2B28` / `#3B3A36` | Headlines, lead text, body text |
| muted | `#5F5E5A` | Labels, metadata |
| rule / rule-strong | `#E3E1DB` / `#1A1A1A` | Hairlines; section openers |
| accent | `#1D3F8F` | Labels, years, numerals, links on hover |
| result | `#2F6F61` | Result metrics and "built" status |
| saffron | `#F2B233` | Unconfirmed content, local preview only |

**Typography**
- Newsreader (variable, optical sizes): headlines and all reading text.
- Geist: navigation, labels, years, metadata, tables and fact lists.

**Signature elements**
- *Portrait beside the headline*, framed at 4:5 with a caption. If `public/images/portrait.jpg` is missing, the published site lets the headline span the page; local preview shows where the photo goes.
- *The story in four chapters*, with large roman numerals, a sticky chapter title on the left and that chapter's roles on the right; "More detail" opens the full record for each role.
- *Selected work as a table of contents*, numbered, with type, year and status.
- *Case-study artwork*: generated SVG motifs in ink, blue and green; counts shown are real.

**Motion:** sections fade gently into view once; nothing else moves; disabled under reduced-motion settings.

**Responsive behaviour:** navigation collapses to a Menu button below 52rem; hero, chapters and two-column sections stack below 56 to 60rem; the case-study sidebar moves above the text below 64rem.

**Accessibility:** semantic landmarks and headings; skip link; visible focus; 44px touch targets on menu and disclosure controls; native `<details>`; WCAG AA contrast on the paper background.

## 4. Content architecture

| Content | Stored in | Format |
| --- | --- | --- |
| Case studies | `src/content/projects/*.md` | Markdown with validated frontmatter |
| Journey | `src/data/journey.ts` | Typed data |
| Role details | `src/data/experience.ts` | Typed data |
| Skills and evidence links | `src/data/skills.ts` | Typed data |
| Education, awards, development | `src/data/education.ts` | Typed data |
| Other work | `src/data/otherWork.ts` | Typed data (`draft` supported) |
| Identity and navigation | `src/data/site.ts` | Typed data |
| Home page story copy | `src/pages/index.astro` | Page file |

**Case-study fields** (enforced by `src/content.config.ts`): title, shortTitle, summary, type, year, role, status, tags, order, metrics (scope/result), flows, stack, links, optional reflection, openQuestions (local preview only), draft.

**Case-study body sections:** Context, Problem, Objective, My role, Data, Approach, Technical implementation, Results, Evidence, Challenges, Decisions and trade-offs, Limitations, and What I learned (from `reflection`).

**Content markers:** highlighted in local preview, removed from the published build (`src/lib/remark-gaps.mjs`, `src/lib/text.ts`).

## 5–6. Copy and case studies

All copy lives in the page, data and content files:
- Home page story: `src/pages/index.astro` and `src/data/journey.ts`
- Case studies: `src/content/projects/`

## 7. Technical architecture

**Why Astro:** it outputs plain static HTML (fast, search-friendly, free to host on GitHub Pages), keeps content in Markdown files that are easy to edit, validates each project's fields at build time, and needs almost no JavaScript in the browser. The syntax is close to HTML, and TypeScript is available where needed.

**Stack**
- Astro 7, static output, trailing-slash URLs
- `@astrojs/sitemap` for the sitemap
- `@astrojs/markdown-remark` plus a small custom plugin (`src/lib/remark-gaps.mjs`) that highlights content markers
- Self-hosted fonts via Fontsource (Newsreader, Geist)
- No UI framework; a small amount of vanilla JavaScript (menu toggle and scroll reveal)
- Project artwork generated at build time as inline SVG (`src/components/ProjectArt.astro`)

**SEO:** unique title and description per page; canonical URLs; Open Graph and Twitter card tags with a shared social image; sitemap and robots.txt; descriptive URLs such as `/projects/household-deprivation/`.

**Deployment:** `.github/workflows/deploy.yml` installs dependencies, lists content gaps, builds and publishes to GitHub Pages on every push to `main`.

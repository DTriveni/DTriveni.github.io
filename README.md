# Triveni Dhamdhere — portfolio website

A static website built with [Astro](https://astro.build) and published on GitHub Pages.
The site is the full record of my work; the targeted CVs select from it and never add to it.

- `docs/WEBSITE_PLAN.md`: strategy, site map, design system, content and technical architecture
- `docs/CONTENT_GAPS.md`: everything that must be confirmed before publishing

---

## 1. Run it on your computer

You need **Node.js 22 or newer** ([nodejs.org](https://nodejs.org), choose the LTS installer) and **Git**.

```bash
npm install        # once, installs dependencies
npm run dev        # starts a local preview at http://localhost:4321
```

The preview reloads as you edit files. Stop it with `Ctrl+C`.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the finished site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm run gaps` | Lists every `[NEEDS CONFIRMATION]`-style marker, with file and line |
| `npm run gaps:strict` | Same, but fails if any remain (use before publishing) |

---

## 2. Where everything lives

The site is one scrolling story (home page) plus a detailed page for each case study.

```
src/
  pages/index.astro     the home page story: hero with portrait, The story so far
                        (four chapters), What I do, Selected work, Beyond the data,
                        Toolkit, Education, Contact
  pages/projects/       the case-study page template
  content/projects/     one Markdown file per case study  ← most edits happen here
  data/
    site.ts             name, email, links, navigation
    journey.ts          the four chapters and the roles in each (oldest first)
    experience.ts       role details shown under "More detail" in the story
    skills.ts           the Toolkit chapter (each tool links to its evidence)
    education.ts        education, scholarships, professional development
    otherWork.ts        smaller work (kept for reference)
  components/           Flow diagrams, Metrics, ProjectArt (artwork per project),
                        Header, Footer
  layouts/Base.astro    page shell, SEO tags, scroll reveal
  styles/global.css     the whole design system
  content.config.ts     the fields every case study must have
public/                 favicon, social image
```

## 3. Editing content

### Add a new project

1. Copy an existing file in `src/content/projects/`, e.g. `akanksha-school-data.md`, and rename it. The file name becomes the URL: `my-new-project.md` → `/projects/my-new-project/`.
2. Edit the frontmatter (the block between the `---` lines):
   - `status.kind`: `built`, `designed` (a proposed method), `group` (team result) or `ongoing`.
   - `metrics`: mark each number `scope` (how big the work was) or `result` (what changed). Never label a scale number as a result.
   - `flows`: stages of a pipeline or architecture. Each stage can have a `detail` that readers can open.
   - `order` sets its position in the Selected work chapter.
   - `draft: true` shows it in local preview only.
3. Write the body under the usual headings: Context, Problem, Objective, My role, Data, Approach, Technical implementation, Results, Evidence, Challenges, Decisions and trade-offs, Limitations, What I learned.

If a required field is missing, `npm run dev` shows an error naming it.

New projects show a plain dark panel until you add a motif for them in `src/components/ProjectArt.astro` (add an `if (id === 'your-file-name')` block, copying one of the existing ones).

### Mark something you haven't confirmed

Write one of these anywhere in content or data files:

```
[NEEDS CONFIRMATION: what needs checking]
[NEEDS PERSONAL STORY: what you need to write]
[DETAILS REQUIRED BEFORE PUBLICATION: what is missing]
```

**In local preview (`npm run dev`)** they appear highlighted in saffron, and each case study shows a "To confirm before publishing" box. **On the published site they are removed automatically**, together with any paragraph left empty, so visitors only see confirmed content. `npm run gaps` lists them all. Resolve an item by replacing the marker with the confirmed fact, or deleting the claim.

Write text so it still reads well if a marker is removed: put the marker at the end of a sentence or on its own line, never in the middle of one.

### Add a "What I learned" section

Add a `reflection:` line to a case study's frontmatter, for example
`reflection: 'Integrating the data took longer than modelling it, and ...'`. It appears as the final section of that case study.

### Add your photo

Save a portrait photo as `public/images/portrait.jpg` (4:5, for example 800 x 1000 pixels, head and shoulders, plain or softly blurred background). It appears beside the headline automatically. Without it, the published site lets the headline span the full width.

### Add images

Put images in `public/images/` and reference them in Markdown as `![Descriptive alt text](/images/file.png)`. Always write alt text that says what the image shows.

---

## 4. Publish on GitHub Pages (first time)

### Step 1: create the repository

1. Sign in to GitHub as **DTriveni**.
2. Create a new repository named exactly **`DTriveni.github.io`**. Make it **Public**. Don't add a README, licence or .gitignore (this project already has them).

A repository with this exact name publishes at `https://dtriveni.github.io`. If you use any other name, see "Using a different repository name" below.

### Step 2: push the code

In a terminal, inside this folder:

```bash
git add .
git commit -m "Publish portfolio site"
git push -u origin main
```

If Git asks for a password, use a GitHub personal access token (GitHub → Settings → Developer settings → Personal access tokens), or sign in with GitHub Desktop instead.

### Step 3: turn on GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

### Step 4: watch it deploy

Open the **Actions** tab. The "Deploy to GitHub Pages" workflow runs on every push to `main`. When it shows a green tick, the site is live at `https://dtriveni.github.io`. The first run takes two to three minutes.

The build log also lists every open content marker. To block publishing while any remain, change `npm run gaps` to `npm run gaps:strict` in `.github/workflows/deploy.yml`.

### Using a different repository name

If the repository is called, say, `portfolio`, the site lives at `https://dtriveni.github.io/portfolio/`. Edit `astro.config.mjs`:

```js
site: 'https://dtriveni.github.io',
base: '/portfolio/',
```

Also update the sitemap line in `public/robots.txt`. Internal links in pages and data files adapt automatically. Links written directly inside Markdown (for example `/#impact` in the ProblemSolvers Lab case study) need the prefix added by hand.

---

## 5. Updating the site

Edit files, check with `npm run dev`, then:

```bash
git add .
git commit -m "Describe the change"
git push
```

The site republishes automatically. You can also edit a file directly on github.com and commit it there.

---

## 6. Custom domain (optional)

1. Buy a domain from any registrar.
2. In the repository, **Settings → Pages → Custom domain**, enter the domain (e.g. `trivenidhamdhere.com`) and save.
3. At your registrar, add DNS records:
   - For the bare domain, four **A** records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - For `www`, a **CNAME** record pointing to `dtriveni.github.io`.
4. Wait for GitHub to verify the domain (minutes to a few hours), then tick **Enforce HTTPS**.
5. In `astro.config.mjs`, set `site: 'https://yourdomain.com'` and keep `base: '/'`. Update `public/robots.txt` to match.

GitHub's own guide: *Managing a custom domain for your GitHub Pages site* in GitHub Docs.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| Pages load without styling after deployment | `base` in `astro.config.mjs` doesn't match the repository name |
| Workflow fails at `npm ci` | Commit `package-lock.json`; it must be in the repository |
| GitHub warns an action version is deprecated | Bump the version number in `.github/workflows/deploy.yml` (e.g. `@v4` → `@v5`) |
| Build error naming a field in a project file | That field is missing or misspelled in the frontmatter; compare with another project file |
| `npm run gaps:strict` fails the build | Resolve the listed markers, or switch back to `npm run gaps` |

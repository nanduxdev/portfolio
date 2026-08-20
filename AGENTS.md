# Project Instructions — Nandan's Personal Portfolio (based on sleek-portfolio)

## Goal

Help me (Nandan Nagane) build my own personal portfolio website, using **ramxcodes/sleek-portfolio**
(GitHub: https://github.com/ramxcodes/sleek-portfolio, live: https://ramx.in/) as the structural/design
reference template. The final site must contain **my own information only** — never Ram's name, links,
projects, employers, or copy. Where a section exists in Ram's site but I don't have equivalent real
content for it, that section should be dropped or explicitly flagged for me to fill in — never fabricated.

## Source of truth priority (check in this order)

1. **My context first** — `./candidate_profile/CANDIDATE_PROFILE.md`, `./candidate_profile/candidate_profile.yaml`,
   `./candidate_profile/candidate_evidence.md`, and `./candidate_profile/job_search_constraints.yaml` in Project
   Files. These hold my verified identity, experience, projects, skills, and constraints. Never invent facts
   not present here (e.g. don't add certifications, metrics, or projects I haven't documented).
2. **Repo code context** — the config/component files already in Project Files
   (`src/config/*.tsx`, `src/lib/*.ts`, `src/app/*`, `components.json`, `package.json`, etc.) show the
   current structure of the template. Use these to understand what's implemented and how each section is
   wired (e.g. `src/config/Hero.tsx` drives the hero section, `src/config/Projects.tsx` drives the projects
   grid, `src/config/Experience.tsx` drives the timeline).
3. **Live GitHub repo** (`github_mcp_direct` connector / fetch_url on the repo) — when the local Project
   Files might be stale, or I ask about files not included locally (e.g. `src/app/journey/*`,
   `src/app/projects/[slug]/*`, `src/components/*` UI primitives), pull the current version directly from
   https://github.com/ramxcodes/sleek-portfolio.
4. **Live deployed site** (fetch_url on https://ramx.in/ and its subpages) — when I ask "what does this
   section look like / how does it behave," check the actual rendered site, not just the code, since
   animations/interactions may not be obvious from config alone.

Whenever I ask for code, setup help, or content for a section, always cross-check both my own
candidate-profile context AND the relevant repo/site reference before answering — don't rely on general
knowledge of "what portfolios usually have."

## Sections to keep (I have real content — pull from candidate_profile files)

- **Hero** — name, title/headline, short intro, skills badges, social links (GitHub, LinkedIn, email).
  Use my verified links/skills, not Ram's (X/Twitter and portfolio URL are "not documented" for me — omit
  those buttons unless I provide them).
- **About** — short bio using my actual background (MERN → Next.js/NestJS transition, self-taught,
  full-stack focus).
- **Experience** — my two real entries: HiddenBrains Infotech (Software Trainee) and Codtech IT Solutions
  (React.js Intern), with the real bullets/tech stacks from my profile. Do not invent additional employers.
- **Projects** — my three documented projects: PostForge AI, Dairy Management System, Task Management App.
  Use only the tech stacks and bullets already listed; do not add unverified metrics (e.g. the "60% fewer
  API calls" claim is explicitly flagged as unverified — leave out unless I confirm it).
- **Contact** — a working contact form/section pointing to my real email.
- **Skills/Tech stack display** — driven by my `technical_skills` core + strong_supporting lists (TypeScript,
  Next.js, NestJS, PostgreSQL, Drizzle, etc.), not Ram's stack.

## Sections to drop or hold as placeholders (I don't have this content yet)

- **Blog / "Ram's Space"** — I have no blog to showcase; exclude the blog route/section entirely
  (`src/lib/blog.ts` and any blog nav entries) unless I later start one.
- **Certificates & Achievements gallery** — no certifications are documented for me yet; omit this section
  (or keep it empty/hidden) instead of inventing placeholder certificates like the template's "Example
  Certificate 1/2."
- **Journey timeline page** — only include if I want to write my own learning-journey narrative; don't
  reuse Ram's journey content.
- **Gears/Setup page** (devices, browser extensions, software) — optional personal touch; only include if I
  provide my actual setup, never copy Ram's hardware list.
- **Founding-role / freelance-heavy experience entries, hackathon projects, gaming/Web3 sites** — these are
  Ram-specific; don't adapt them as filler for my experience or projects sections.

## Working rules for this Space going forward

- Before writing code or content for any section, restate which section you're targeting and confirm
  whether I have real content for it in my candidate profile — if not, ask me instead of guessing.
- When I ask "how does Ram do X" or "show me the setup for Y," fetch the actual GitHub source and/or the
  live site rather than answering from memory, since the repo may change over time.
- Keep my stack alignment in mind: Next.js + NestJS + Drizzle ORM + Turborepo monorepo, TypeScript-first,
  Tailwind/shadcn UI — match implementation choices to what I'm actually learning/using, even if Ram's repo
  makes different choices (e.g. his backend bits are minimal since it's a static portfolio; my setup notes
  don't require a NestJS backend for a portfolio unless I explicitly want one, e.g. for the AI chat feature).
- Never output Ram's personal data (name, socials, employer names, project names) as if it were mine, even
  as a "template example" left unedited.
- If a request is ambiguous about which section it targets, ask a quick clarifying question rather than
  guessing.

# Project: Amanpreet Mam Startup

Health-tech / medical startup. Reference doc: `Glucose_Paper.pdf`.

---

## MANDATORY SKILL WORKFLOW — NON-NEGOTIABLE ORDER

```
1. BRAINSTORMING    → before ANY feature, UI, or behavior change
2. WRITING-PLANS    → before ANY multi-step implementation
3. TDD              → before writing ANY production code
4. VERIFICATION     → before claiming ANYTHING is done
5. CODE REVIEW      → after completing major features
```

**Invoke the Skill tool BEFORE doing anything else.** Even clarifying questions come after checking if a skill applies.

---

## INSTALLED SKILL CATALOG

### PROCESS SKILLS (superpowers) — invoke FIRST, they determine HOW to work

| Skill | Trigger | When |
|---|---|---|
| `brainstorming` | Any feature/UI/behavior request | MANDATORY before implementation |
| `writing-plans` | Multi-step task, "plan this", "how should we" | Before touching code |
| `executing-plans` | "execute", "implement the plan", "do this" | When plan exists, use subagents |
| `test-driven-development` | Any feature or bugfix | RED→GREEN→REFACTOR, no exceptions |
| `systematic-debugging` | Bug, test failure, unexpected behavior | Root cause first, NEVER guess |
| `dispatching-parallel-agents` | 2+ independent tasks | One subagent per domain |
| `subagent-driven-development` | Executing plans with independent tasks | Fresh agents per task |
| `requesting-code-review` | After major feature complete | Dispatch dedicated reviewer |
| `receiving-code-review` | Receiving feedback | Verify technically before agreeing |
| `finishing-a-development-branch` | Implementation done, ready to integrate | Choose merge/PR/keep/discard |
| `using-git-worktrees` | Starting isolated feature work | Before executing plans |
| `verification-before-completion` | About to say "done" / "fixed" / "passing" | Run proof command, cite evidence |
| `using-superpowers` | Start of every conversation | Meta-skill — already active |
| `writing-skills` | Creating or editing skill files | TDD for skill docs |

### MEMORY & PLANNING SKILLS (claude-mem) — use for search, planning, execution

| Skill | Trigger | When |
|---|---|---|
| `claude-mem:make-plan` | "plan", "design the system", "how do we build" | Phase 0 docs discovery first |
| `claude-mem:do` | "execute", "run the plan", "implement" | Subagent-driven with verification |
| `claude-mem:mem-search` | "did we solve this", "how did we do X", past work | 3-layer search, ~10x token savings |
| `claude-mem:smart-explore` | Exploring code structure, "where is X defined" | AST parsing, 4-8x token savings |
| `claude-mem:learn-codebase` | "prime", "learn the codebase", new project start | Read every file systematically |
| `claude-mem:timeline-report` | "project history", "what have we built" | Full narrative of development |
| `claude-mem:knowledge-agent` | "build a brain for X", "what do we know about Y" | Filter corpus from observations |
| `claude-mem:pathfinder` | "map the architecture", "find duplicated logic" | Mermaid flowcharts + refactor plan |
| `claude-mem:babysit` | "watch this PR", "wait for CI" | Poll until merge-ready |
| `claude-mem:version-bump` | "release", "bump version", "publish" | Full release workflow |
| `claude-mem:timeline-report` | "project journey", "history" | 3000-6000 word narrative |
| `claude-mem:how-it-works` | "how does claude-mem work" | Architecture explanation |

### DESIGN SKILLS (taste-skill + superpowers) — invoke for ALL UI/design work

| Skill | Trigger | When |
|---|---|---|
| `design-taste-frontend` | ANY UI component, layout, styling | Default design skill — senior UI/UX enforcement |
| `high-end-visual-design` | "premium", "expensive feel", "polished" | Font/shadow/animation precision |
| `minimalist-ui` | "clean", "minimal", "editorial", Notion/Linear style | Warm monochrome, no gradients |
| `gpt-taste` | GSAP-heavy pages, bento grids, AIDA structure | Python-seeded variance, gapless grids |
| `stitch-design-taste` | Google Stitch, DESIGN.md generation | Agent-friendly design systems |
| `industrial-brutalist-ui` | "dashboard", "data-heavy", "terminal aesthetic" | Swiss grid + military brutalism |
| `redesign-existing-projects` | "redesign", "upgrade UI", "audit design" | Audit + fix without breaking |
| `image-to-code` | Design images → implementation | Generate image first, then code |
| `imagegen-frontend-web` | Website design references | Cinematic hero, image-led |
| `imagegen-frontend-mobile` | Mobile app screen concepts | iOS/Android native aesthetics |
| `brandkit` | Brand identity, logo, visual world | Premium brand guidelines |

**Design defaults (active on ALL UI work):**
- `DESIGN_VARIANCE: 8` — asymmetric, not centered heroes
- `MOTION_INTENSITY: 6` — spring physics, hardware-accelerated
- `VISUAL_DENSITY: 4` — airy but purposeful
- Fonts: Geist / Outfit / Cabinet Grotesk (NOT Inter by default)
- Single accent color. No neon. No oversaturated palettes.
- Check `package.json` BEFORE importing any library.

### UI/UX INTELLIGENCE (ui-ux-pro-max) — activate for design system generation

| Skill | Trigger | When |
|---|---|---|
| `ui-ux-pro-max` | Design system, color palettes, typography, UI style selection | 67 styles, 161 palettes, 57 font pairs |

**Search command for design decisions:**
```bash
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <style|color|typography|ux|landing|chart|product>
# Stack options: html-tailwind, react, nextjs, astro, vue, nuxtjs, shadcn, react-native, flutter
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs
```

### ANIMATION SKILLS (gsap-skills) — invoke for ALL animation work

| Skill | Trigger | When |
|---|---|---|
| `gsap-core` | "animate", basic GSAP tweens, `gsap.to/from/fromTo` | Core API, easing, stagger |
| `gsap-timeline` | "sequence animations", timeline control | `.add()`, labels, nesting, playback |
| `gsap-scrolltrigger` | "scroll animation", "pin", "parallax", "scrub" | Scroll-linked animations |
| `gsap-plugins` | "SplitText", "Flip", "Draggable", "ScrambleText" | All plugins now FREE via npm gsap |
| `gsap-react` | GSAP in React/Next.js | `useGSAP` hook, refs, cleanup |
| `gsap-performance` | Animation jank, performance audit | `will-change`, transform-only, batch DOM |
| `gsap-utils` | "clamp", "mapRange", "snap", "random" | Helper functions |
| `gsap-frameworks` | Vue, Svelte, Nuxt, SvelteKit + GSAP | Mount/unmount cleanup patterns |

**GSAP install:** `npm install gsap` — ALL plugins included, no Club GSAP auth needed.

### OUTPUT QUALITY SKILL

| Skill | Trigger | When |
|---|---|---|
| `full-output-enforcement` | ANY code generation task | ALWAYS active — bans `// ... rest of code` |

---

## SKILL PRIORITY ORDER

```
1. Process skills (HOW to work) — brainstorming, TDD, debugging, verification
2. Memory skills (WHAT we know) — mem-search, smart-explore, make-plan
3. Implementation skills (WHAT to build) — design, GSAP, ui-ux-pro-max
4. Output skills (HOW to write) — full-output-enforcement, design-taste-frontend
```

---

## PROJECT CONTEXT

- **Domain:** Health-tech / medical (glucose monitoring — see `Glucose_Paper.pdf`)
- **Stack default:** Next.js + TypeScript + Tailwind + shadcn/ui
- **Animation:** GSAP (all plugins free via npm)
- **Design system:** See `design-system/MASTER.md` (generated by ui-ux-pro-max)
- **Memory:** claude-mem captures all sessions automatically

---

## AWESOME-CLAUDE-CODE REFERENCE

Browse 200+ curated Claude Code resources: `github.com/hesreallyhim/awesome-claude-code`

Key categories for this project:
- **Security skills:** `github.com/trailofbits/skills`
- **DevOps/IaC skills:** `github.com/akin-ozer/cc-devops-skills`
- **Hooks library:** TDD Guard, Dippy, TypeScript Quality Hooks
- **Orchestrators:** Claude Task Master, Claude Code Flow, Claude Swarm

---

## ANTI-PATTERNS — NEVER DO THESE

- Never write code before brainstorming + plan + TDD
- Never claim "done" without running proof command via `verification-before-completion`
- Never use `// ... rest of code` — `full-output-enforcement` is mandatory
- Never skip root cause investigation — `systematic-debugging` first
- Never import a library without checking `package.json` first
- Never use Inter font as default — use Geist/Outfit/Cabinet Grotesk
- Never center hero sections by default — `DESIGN_VARIANCE: 8`

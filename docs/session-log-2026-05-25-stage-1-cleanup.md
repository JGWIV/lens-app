# Lens Session Log — May 25, 2026

## Stage 1 Cleanup Before Session 19

### Purpose

This session was a structural cleanup of Stage 1 before beginning Stage 2 (Session 19 onward). The session uncovered and addressed significant drift between the project bible, the codebase, and stated locked-language decisions. Two new placeholder stories were also identified to fill out the Science and Space topics added during this session.

### Starting state

- 12 placeholder stories in `/src/data/stories.ts`
- 10 topics in `/src/data/topics.ts`
- App live at `www.thelens.media`
- Claude Code at v2.1.114, Opus 4.7 xhigh, `--enable-auto-mode`
- `project-bible.md` did NOT exist in `/docs/` at session start — discovered Claude Code had been working from session prompts alone for all of Stage 1, with no canonical reference file
- Switched terminal from Command Prompt to Windows Terminal (PowerShell)

### Key discoveries

1. **Missing project bible**: Every Stage 1 session prompt referenced `/docs/project-bible.md`. The file never existed. Claude Code built sessions 1-18 from prompt-level context alone, without the cross-cutting product context. App works structurally; some drift accumulated in copy, content, and editorial voice.

2. **Locked language never in bible**: The three locked phrases ("reconstruct" not "rebuild," "facts that survive across sources" not "verified facts," "There are plenty of platforms" not "There are other platforms") existed only in memory, not in any project document.

3. **"BLACK AND WHITE ONLY" rule was too strict**: Session 1 of the original bible specified pure black/white. The app used navy. Decision: black-and-white-only applies to brand mark (◎ lens mark and "lens." wordmark) only. App uses restrained palette with functional color where it earns its place.

4. **No Science or Space placeholder stories existed**: The 12 placeholders covered all other topics but neither of these. Topic split (see below) created the gap.

### Decisions made

**Color palette (S3)**
- Brand mark (◎ lens mark, "lens." wordmark in lowercase serif with trailing period): pure black-and-white only
- App body: warm white #fafafa background, pure black #000 text, medium gray #666 secondary
- Functional color allowed: confidence green/amber, Coverage Map red, tap-to-define and "What We Don't Know" accents
- Navy (#1a1a2e, #2d2d4a) explicitly removed from palette

**Wordmark status**
- Current canonical: "lens." (lowercase, serif, trailing period)
- In development: hand-drawn vintage spectacles paired with "lens." in vintage typewriter type
- New mark replaces current when illustrator delivers final art

**Onboarding topic selection (M3)**
- All topics pre-selected by default (opt-out model)
- User deselects topics they're not interested in
- Reasoning: defaults including unfamiliar topics expose users (especially children) to news they wouldn't have chosen, supporting Lens's anti-filter-bubble mission

**Topic split**
- "Science & Space" split into two separate topics: Science (🔬 microscope) and Space (🚀 rocket)
- Reasoning: combined topic undersold both categories; kids interested in space ≠ kids interested in cell biology; separation supports cleaner story tagging in Stage 2
- New topic count: 11 (up from 10)
- Grid changed from 2-column to 3-column for cleaner 11-topic layout

**Topic icons confirmed**
- Government & Politics 🏛, World News 🌍, Science 🔬, Space 🚀, Technology 💻, Sports ⚽, Animals & Nature 🐾, Business & Money 💰, Health 🏥, Arts & Entertainment 🎭, Environment 🍃

**Confidence badge label**
- Standardized to "High Confidence" everywhere (was inconsistent: "Verified" in Home/Search, "High Confidence" in StoryDetail)
- "Verified" framing was rejected because it implies authority-based verification, contradicting Lens's bias-filter approach

### Code changes executed

**Bible alignment (Phase 1)**
- Added "Locked Language Decisions" section
- Replaced "verified facts" → "facts that survive across sources" globally
- Updated Coverage Map color spec (red is canonical, deliberate exception for visibility)
- Replaced "BLACK AND WHITE ONLY" rule with new COLOR PALETTE section
- Updated Daily Brief naming (19 instances across the bible) to "Daily Brief" / "Lens Daily Brief"
- Topic icons: 🔭 telescope → 🔬 microscope for Science; sprout → 🍃 leaf for Environment
- Wordmark amendment: ◎ lens mark + "lens." wordmark, with transition note about hand-drawn spectacles plan
- Topic split: 10 topics → 11 topics, propagated through 11 bible locations

**Code fixes (Phase 2, 7 changes)**
- `belowTheRadar` field added to Story interface and all 12 stories; Cuba and North Korea flagged as BTR candidates
- Confidence badge label standardized to "High Confidence"
- Daily Brief subtitle restored ("5 stories · ~8 minutes")
- Settings "About Lens" copy restored to bible Session 7 wording
- Navy removed from CSS variables (replaced with pure black and dark gray, token names retained for backwards compatibility)
- Topic icons fixed (telescope, leaf)
- Onboarding changed to opt-out (all topics pre-selected)

**Topic split (Phase 3)**
- "Science & Space" entry in topics.ts replaced with two separate entries
- No existing stories needed re-tagging (none used "Science & Space")
- All consuming files (Home, Search, Settings, Onboarding) inherit changes automatically from TOPICS constant

**Four follow-ups (Phase 4)**
- "Below the Radar" section added to Home.tsx, conditional rendering, max 3 stories, force yellow badge
- Onboarding subtitle updated for opt-out language
- "Select All" toggle made no-op when all topics selected, with disabled visual state
- Grid changed to 3 columns across Onboarding, Search, Settings

**Three more follow-ups (Phase 5)**
- Settings "All Topics" toggle parity (matches Onboarding behavior)
- Search ResultCard forces yellow on BTR stories (matches Home logic)
- "Below the Radar" banner added to StoryDetail.tsx for BTR stories

**One more follow-up (Phase 6)**
- Native title-attribute hover tooltip on "Below the Radar" section header, with aria-label for accessibility
- No tooltip library added — zero new dependencies

### Open work — stories

During an audit, Claude Code revealed it had already added two new stories in an earlier turn that I (the chat Claude) had missed: `patagonia-dinosaur-discovery-2026` and `artemis-ii-lunar-flyby-2026`. Total story count went from 12 to 14.

After review, decision made to replace both with stronger picks:

- **Replacement Story 1 (Science)**: NIH-funded CRISPR breakthrough (Al3Cas12f). UT Austin team, Nature Structural & Molecular Biology, April 13, 2026. Compact Cas12f enzyme small enough to fit in AAV vectors for in-body delivery. Real applications: cancer, ALS, atherosclerosis. Real research team (David Taylor, UT Austin), real funder (NIH), real journal publication.

- **Replacement Story 2 (Space)**: Dandelion drones for Mars lava tubes. Space.com, May 25, 2026. Mostafa Hassanalian (associate professor, New Mexico Tech). Pillbug-inspired "roly-poly" deployment robot releases thousands of wind-propelled biomimetic micro-sensors into Martian lava tubes. Real scientist, real concept, real lab.

Decision: 30-day news peg rule relaxed for Stage 1 demo stories (the rule applies to Stage 2 engine output; demo stories may be slightly older if significant).

Stories to be drafted from scratch in a new Claude conversation (this conversation) because:
- Claude Code's existing two stories had editorial issues (Tralkasaurus argentinensis was actually described in 2020, not "over the past three years"; Young Reader voice was uneven)
- Writing creative content from scratch in chat is faster and higher quality than retrofitting Claude Code's output
- Source-volume retrofit for all 14 stories is a separate technical task that follows story drafting

### Open work — source list

The canonical 194-source, 13-tier active source list ("Source Architecture v2") does not exist as a markdown file in `/docs/`. References to it appear in the bible's Section 5 but the full enumerated list lives elsewhere — possibly in a `.docx`, possibly only in old Claude conversations.

Three paths offered by Claude Code:
1. Reconstruct the list from bible Section 5 + general knowledge → working `/docs/source-architecture.md`
2. Skip enumeration, draw from named sources + general knowledge, flag what's canonical vs inferred
3. Locate the actual artifact, add it to `/docs/`, retrofit against the real list

Path 3 is the most principled. Path 1 is the practical fallback. Decision deferred to the next session.

### Open work — Settings "All Topics" toggle

Confirmed parity in this session. No further work needed.

### Verification state at session end

- TypeScript: zero errors (verified after every change)
- Dev server: boots clean in ~2-3 seconds (verified multiple times)
- No deployment to Vercel performed
- Local review not yet performed (deferred to next session, after story drafting completes)

### Outstanding before Session 19

1. Draft Story 1 (CRISPR) — three reading levels, perspectives, sources, JSON
2. Draft Story 2 (dandelion drones) — same structure
3. Hand Claude Code a clean prompt replacing the existing Patagonia and Artemis JSON with the new stories
4. Resolve source list question (path 3 if findable, path 1 if not)
5. Retrofit source volumes across all 14 stories to realistic coverage from curated list
6. Local review in Chrome at localhost:5173
7. Deploy to Vercel
8. Begin Session 19

### Notes for future sessions

- Stage 2 sessions will involve longer pastes (API keys, Railway config, database schemas). Use Windows Terminal, not Command Prompt.
- Claude Code in `--enable-auto-mode` does not bypass bash command permissions — every `taskkill`, `awk`, etc. still asks. Use option 1 ("Yes") for one-time approvals; avoid blanket permissions on destructive commands.
- The session-start verification pattern works: "Confirm you can read /docs/project-bible.md and /docs/build-guide-sessions-19-45.md. List the first heading of each." This prevents silent file-not-found situations.
- Claude Code's `Sautéed for X` / `Cooked for X` / `Churned for X` are status indicators showing how long the last operation ran. Useful for sanity-checking whether a long-silent terminal is hung or thinking.
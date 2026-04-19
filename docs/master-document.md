Lens — Master Document v1.1

**Lens**

Complete Master Document

Project Bible v3.1 + Build Guide v3.1

Version 1.1 — Combined Master

Last Updated: April 18, 2026

Founders: Rebecca Rosen and Jackson Weiss

Entity: Lens Media, Public Benefit Corporation (Delaware)

Website: thelens.media   ·   Contact: hello@thelens.media

# How to Use This Document

This is the single source of truth for building Lens. It combines the Project Bible (what Lens is) and the Build Guide (how to build it) into one master reference that Claude Code can read in full.

The document is organized in two parts:

- **Part I: Project Bible v3.1** — product design, UX, editorial decisions, source architecture, challenges and solutions. This tells Claude Code what to build and why.

- **Part II: Build Guide v3.1** — session-by-session prompts for Claude Code, in order, from Session 1 through Session 45+. This tells Claude Code how to build it.

### What is new in v3.1

Three features have been added to the MVP:

- **Search** — a full search feature in the bottom nav. Keyword search across the story library, plus topic-based timeline search.

- **Coverage Mapping** — inside "How We Know," a toggle between a U.S. state map and a world map showing which regions' papers covered the story.

- **Below the Radar** — a separate section on the home feed surfacing stories that hit the detection threshold (3+ sources) but did not reach the publication threshold (5+ across 2+ editorial perspectives) within 24 hours, where at least one source is Tier 1 (AP or Reuters).

Each is flagged with a "NEW in v3.1" callout the first time it appears in a section, and has dedicated build sessions in Part II.

### For Claude Code

Save this document to your project folder (e.g., /docs/project-bible.md) so Claude Code can reference it in every session. The session prompts in Part II assume this file is present and readable.

### For Rebecca and Jackson

Use Part I to align on product decisions. Use Part II to run build sessions with Claude Code — each session has a copy-paste prompt, a plain-English description of what is being built, and a "what done looks like" checkpoint.

# Part I — Project Bible v3.1

What Lens Is, How It Works, and What Ships in the MVP

## Section 1: The Concept

### What Lens Is

Lens pulls reporting from more than a hundred sources across the media spectrum, identifies the facts, and separates them from the framing. Users get a clear summary of what happened, the perspectives different sources bring, and full transparency into how every story was built. It is not a news publisher. It does not tell you what to think. It gives you the information to decide for yourself.

### Core Philosophy

- Give people the information they need to decide for themselves.

- Be radically transparent about methodology and sources.

- Serve everyone.

### The Name

Lens, clean and simple. The metaphor: a lens does not add anything to what you are looking at. It just helps you see it clearly.

**Brand tagline: **The news without the noise.

### Logo Direction

Black and white only. The primary marks are the ◎ lens icon and the "lens." wordmark in a clean serif. No navy. No color accents in the brand mark itself. The feel is calm, trustworthy, modern — not flashy, not childish, not corporate.

## Section 2: User Experience

### Onboarding Flow

- **"Who are you?" **— User picks reading level: Young Reader (7–10), Teen Reader (11–17), Adult Reader (18+). Adjustable anytime. Controls language complexity, sentence length, vocabulary.

- **"What do you care about?" **— User selects topics from a visual grid: Government & Politics, World News, Science & Space, Technology, Sports, Animals & Nature, Business & Money, Health, Arts & Entertainment, Environment. All on by default, user narrows. Changeable anytime.

- **"How do you want your news?" **— Read It, Hear It, or Both.

- **"Pick your voice" **— User chooses from personality-driven AI narrator voices. Each voice is a distinct character with a name, personality description, and tone.

#### Launch voice lineup

- **The Anchor **— Confident, clear, classic news voice.

- **The Narrator **— Warm, storytelling tone.

- **The Big Sister **— Casual, smart, relatable.

- **Mrs. M **— Soothing, crisp, clear, British. Inspired by Jackson's nursery school teacher. Voice clone (Option A) preferred; Rebecca is seeking permission with flat-fee payment. If permission is not granted, fall back to Option B (design a voice matching those qualities in ElevenLabs without cloning).

- **The Coach **— Energetic, encouraging.

**Voice technology: **AI-generated voices (ElevenLabs). Each voice is designed once with specific personality, tone, pacing, and accent parameters; the engine then generates audio for every story automatically. Potential premium revenue: base app includes 2–3 voices free, additional characters available as paid upgrades.

### Home Screen: "Your Daily Briefing"

- Personalized greeting with user's name

- **"Your Morning News Show" **— Audio player card. Compiles top stories into a 5–10 minute audio briefing read by the chosen voice, structured like a real news broadcast without bias.

- **"Today's Stories" **— Personalized feed of story cards based on topic selections.

- **"Below the Radar" **— A secondary section below "Today's Stories" surfacing stories other outlets are under-covering. See Section 3.

- **"Bias Filter ON" **badge, always visible, reinforcing the core value prop.

- Each story card shows: headline, one-sentence summary, topic tag with icon, confidence badge (Green = high confidence; Yellow = developing).

### Bottom Navigation

Three tabs, always visible:

- **Home **— Daily briefing and today's stories.

- **Search **— Full search across the story library. See Section 3.

- **Settings **— Reading level, topics, format, voice, account.

### Story Page Structure

Each story has four tabs:

**Tab 1: "What Happened" **— The factual core. Only includes claims confirmed by 2+ sources with different editorial perspectives, or directly verifiable from primary sources. Written at user's reading level. No adjectives that carry judgment. No emotional framing.

**Tab 2: "Why It Matters" **— Context and significance. Why should the reader care? How does this connect to bigger trends? Factual about impact without being editorial about whether impact is good or bad.

**Tab 3: "What People Think" **— Major perspectives presented neutrally. Rules:

- Always present at least two (sometimes more) meaningfully different viewpoints.

- Label neutrally: "People who support this say…" / "People who oppose this say…"

- Give each perspective its strongest, most reasonable version.

- Do not indicate which is "correct."

- Rotate order to avoid subtle bias (order randomized once at story generation, locked and stored).

- Can include more than two perspectives when warranted (minimum 2, maximum 5).

**Tab 4: "What We Don't Know" **— Open questions, unconfirmed claims, developing aspects, areas where sources disagree on facts. Explicit about uncertainty. Teaches intellectual humility.

### Additional Features

**"How We Know" button**: Hidden by default. Tap to reveal which sources confirmed each fact, the full source list used for that story, methodology notes, and the Coverage Map (see Section 3). Provides credibility and radical transparency.

**"Tap to Define"**: Words that might be unfamiliar at the user's reading level are subtly underlined. Tapping a word shows a popup tooltip with a plain-language definition. The AI identifies 5–10 words per story and generates context-aware definitions in the same API call that writes the story. For Young Readers, more words are defined; for Adult Readers, only highly technical or legal terms.

**"Go Deeper"**: Links to primary sources (bill text, transcripts, data, official statements). Links open in the device's default browser, not inside the app.

**"Report a Problem"**: Button on every story page. Tapping opens a simple form. Submission sends an email to Rebecca via Resend with story title, story ID, and the user's message. Rate limited: maximum 5 submissions per day per user.

**"I Have a Question" button**: Deferred to V2. Cut from MVP due to cost concerns.

**Confidence Badges**: Visible on every story card and story page. See confidence badge definitions below.

**Family and Classroom Sharing**: Multi-profile account structure in MVP provides basic family sharing. True collaborative features, shared feeds, and classroom tools deferred to V2.

**Bias Radar (future feature)**: Optional learning tool showing how the same story was covered differently across sources, making media literacy interactive. Deferred to V2.

### Confidence Badges (Fact-Stability Model)

**GREEN — High Confidence. **ALL of the following are true:

- Every factual claim in "What Happened" is confirmed by at least 2 sources with different editorial perspectives.

- No sources in the engine's dataset contradict any claim in "What Happened."

- The story has not had a factual correction in the last 6 hours.

- Primary source verification exists for key claims where applicable (official statement, court document, government data, bill text).

**YELLOW — Developing. **ANY of the following are true:

- One or more factual claims in "What Happened" are supported by only a single source (including primary-source-only claims from Congress.gov/GovInfo.gov not yet confirmed by reporting sources).

- Two or more sources contradict each other on any claim included in "What Happened."

- The story was first detected within the last 3 hours (too early for full confirmation cycle).

- A previous version of the story required a factual correction.

- The story relies heavily on unnamed sources or unverified reports.

- Key facts come from sources with a direct interest in the outcome without independent verification.

Badge is recalculated every time the engine processes an update. Stories can move between Yellow and Green in either direction. Changes are logged in "How We Know." QC layer verifies badge assignment against these criteria.

### Reading Level Specifications

**Standard: **Lexile (not Flesch-Kincaid).

**Young Reader (ages 7–10): **Lexile 400–800L

- Sentences under 15 words on average

- One idea per sentence

- No subordinate clauses

- Define concepts inline (e.g., "Congress — the group of people who make laws in the United States")

- Concrete language over abstract

- Active voice only

**Teen Reader (ages 11–17): **Lexile 800–1100L

- Sentences 15–25 words

- Subordinate clauses okay

- Assume basic civic/geographic knowledge but explain specialized terms

- Some abstract concepts allowed if grounded in examples

**Adult Reader (ages 18+): **Lexile 1100–1400L

- No sentence length restriction

- Full vocabulary

- Assume general knowledge of government/geography/economics

- Technical terms used with brief context rather than full definitions

QC layer includes Lexile verification check to ensure output matches target range.

### Content Age-Gating System

**Principle: **Lens does not sanitize the news. It age-gates it. Facts stay intact for the appropriate audience. Younger users simply do not see stories they are not ready for. No watered-down versions are ever published.

**Classification step: **Runs after the story is written but before publishing. The engine has already written all three reading level versions. The age gate evaluates the factual core in "What Happened" and assigns a minimum reading level.

#### Three classifications

**ALL AGES (default): **Story is appropriate for all reading levels. Covers the vast majority of stories — government policy, international diplomacy, science, sports, business, weather, most world events.

**TEEN AND ABOVE: **Story involves content that requires maturity to process but is part of the normal news landscape. Includes: death by violence (factual, non-graphic), war combat and casualties (numbers without graphic description), mass casualty events, criminal conduct, drug policy, major fraud or corruption, stories involving weapons or terrorism (non-graphic).

**ADULT ONLY: **Story involves content inappropriate for minors. Includes: sexual abuse or exploitation, human trafficking, suicide or self-harm, graphic violence details, detailed descriptions of torture or atrocities, child exploitation, sexual misconduct, content where even a neutral factual account would be disturbing to a young teenager.

#### How it works

- TEEN AND ABOVE stories do not appear in Young Reader feeds or audio briefings.

- ADULT ONLY stories do not appear for Young Reader or Teen Reader users.

- Daily briefing builder checks age gate before including a story; gated stories are replaced with the next-highest-ranking eligible story.

- Gating is completely invisible to the user — no indication that stories were removed.

- FAQ/About section of the app documents that age-appropriate content filtering is active.

- Conservative default: if the engine is unsure, it gates up (classifies higher rather than lower).

- QC layer reviews age classification on every story.

- Family Plan with parent-facing visibility into age-gating activity deferred to V2.

### Time References (Editorial Rule — Jackson's Note)

Every story requires a news peg — something that occurred within the last 30 days that makes it timely. Background and context within a story may draw from older sources. Audio scripts and written content should use accurate time language ("recently," "scientists announced," "a new study found") rather than "today" unless the event literally occurred that day. This applies to all five voices and all three reading levels. Search results (see Section 3) must show publication dates prominently to prevent old stories from being mistaken for current news.

### Design Principles

Clean, not cluttered. Calm colors, good typography, lots of white space. Brand message: "We respect your intelligence." For younger users, slightly warmer and friendlier without being childish. For older users, more streamlined. Same app, same engine, different presentation based on settings.

## Section 3: New Features in v3.1 — Search, Coverage Mapping, Below the Radar

*NEW in v3.1 — **All three features below are part of the MVP (Stage 1 demo app), not V2. They are built in dedicated sessions in Part II (Sessions 13a, 13b, and 16a).*

### 3.1 Search

**What it is: **A full search feature accessed via the Search tab in the bottom navigation bar. Replaces the placeholder from Session 6.

**What it does:**

- **Keyword search **across the story library — searches headlines, summaries, "What Happened" text, and topic tags. Returns story cards, newest first by default, with a toggle to sort by relevance.

- **Topic-based timeline search **— tapping a topic in the search view returns every Lens story on that topic in chronological order, so a user can see how a story developed over time. Useful for school projects and for following ongoing stories like an election, a trial, or a policy rollout.

- **Date-stamped results **— every result card shows the publication date prominently (e.g., "Published March 4, 2026"), not just a relative time like "2 weeks ago." This prevents a young reader from mistaking an older story for current news.

- **Age-gated **— results respect the user's reading level. Young Readers never see Teen or Adult gated stories in results; Teen Readers never see Adult gated stories.

- **Empty state **— if a search returns nothing, show: "No Lens stories match that search yet. Try a broader topic, or browse by category below." Then surface the 10 topic tiles for browsing.

**Editorial principle: **Search surfaces old stories. An old story pulled up via search carries a clear date stamp and, if older than 60 days, a "This story was published on [date]" note at the top of the story page so a young reader does not mistake a six-month-old piece for current news.

### 3.2 Coverage Mapping

**What it is: **A visual map inside the "How We Know" panel on every story page, showing which regions' press covered the story and which did not.

**Why it exists: **Lens's 125+ source architecture includes 57 U.S. regional papers covering all 50 states and D.C., plus ~17 international sources. The Coverage Map makes that architecture visible to the user — showing, for a given story, whether coverage is concentrated in one region or spread across the country, and which international press picked it up.

**Two views, toggleable:**

- **U.S. state map **— a map of the 50 states plus D.C., with each state shaded if any of its regional papers covered the story. Tapping a state shows which paper(s) covered it and links to the source list.

- **World map **— a world map with countries shaded if any of the international sources from that country covered the story. Tapping a country shows which source(s).

**Where it lives: **Inside the expanded "How We Know" panel on any story page. A toggle at the top of the map switches between U.S. and World views. Default view is U.S. for stories where most sources are U.S.-based, and World for international stories. Engine picks the default based on where the majority of covering sources are located.

**What it does NOT include: **No demographic inference (reader demographics, political lean of regions, etc.). The map shows only what is verifiable: which sources covered the story, where they are based. Interpretation is left to the user.

**Editorial principle: **The map is a media-transparency tool, not a significance signal. A story covered in only three states is not necessarily less important than one covered in all fifty. Copy inside the panel makes this clear: "Coverage Map shows where this story was reported. It is not a measure of how important the story is."

### 3.3 Below the Radar

**What it is****: **A secondary section on the home feed, below "Today's Stories," that surfaces stories other outlets are under-covering.

**What qualifies:**

- Story hit the detection threshold (3+ sources) but did NOT reach the publication threshold (5+ sources across 2+ editorial perspectives) within 24 hours.

- AND at least one source is Tier 1 (AP or Reuters). This is the quality gate — we are only surfacing under-covered stories that have wire-service confirmation, not fringe claims.

**How it appears:**

- Clearly labeled "Below the Radar" section header with brief explanatory copy: "Stories other outlets are under-covering. Fewer sources have reported these, so facts may still be developing."

- Each story card carries a YELLOW (Developing) confidence badge automatically — since by definition these have fewer than 5 confirming sources.

- Limit: maximum 3 stories shown at a time. If there are more eligible, rotate daily.

- Same age-gating rules apply: Young Readers do not see Teen or Adult gated stories here.

- "How We Know" on these stories makes the lower source count visible rather than hiding it.

**Editorial principle: **This is the "what's being missed" feature, not a "trending" feature. It is the inverse of coverage volume: low volume + credible source(s) = story worth knowing about. This is Lens's answer to the Ground News "Blindspot" feed, but focused on under-coverage rather than partisan coverage gaps.

**Stage 1 vs. Stage 2: **In the Stage 1 demo app, Below the Radar is populated from the pre-written story batch — 2–3 stories are written specifically as Below the Radar candidates to demonstrate the feature. In Stage 2 (live engine), the detection logic runs automatically as part of the clustering pipeline.

## Section 4: The Bias Filter Engine

### Three Filters (One User-Facing Toggle: "Bias Filter: ON")

**Filter 1: Political Spin Detector **— Scans for framing that favors left or right perspectives. Checks whether the source leads with an angle that serves one political side. Strips it down to what actually happened.

**Filter 2: Emotional Language Scrubber **— Catches words designed to make you feel something instead of know something. Words like "slammed," "destroyed," "radical," "crisis," "nightmare," "heroic." Replaces with neutral equivalents.

**Filter 3: Opinion/Fact Separator **— Identifies when a source presents opinion or interpretation as established fact. Moves opinions to "What People Think." Keeps "What Happened" strictly factual.

### Full Bias Detection Checklist

- **Loaded Language: **Words chosen to trigger emotion. Strip and replace with neutral equivalents.

- **F****raming Bias: **Which angle does the source lead with? Note without adopting.

- **Selection Bias: **What does this source include/exclude vs. others?

- **Attribution Bias: **Who is quoted? How are they described?

- **Omission Bias: **What is not mentioned? Compare across sources to find gaps.

- **Narrative Bias: **Is the source telling a story with heroes/villains? Strip narrative arc, report events.

- **Headline vs. Content Mismatch: **Go by reported facts, not headline.

### System Prompt

Full system prompt is stored in a separate artifact titled "The Bias Filter Engine: System Prompt v1."

## Section 5: Source List

### Source Selection Principles

- We do not want "unbiased" sources (they do not exist). We want sources whose biases are known and varied, so the AI can triangulate truth.

- Sources are tagged by TYPE and PERSPECTIVE. A source can have multiple tags.

- More sources make the engine better, not more complicated.

- Every source is vetted and tagged with a reliability rating. Sources known for misinformation are excluded.

- Geographic, demographic, and linguistic diversity is a priority. No single region, country, or perspective should be disproportionately represented.

### Two Functional Source Groups

**Clustering sources (~60–70): **National papers, wire services, broadcast, international, digital/policy, business/financial. These drive story detection. The detection threshold (3+ sources) and publication threshold (5+ sources across 2+ editorial perspectives) are evaluated against this group.

**Enrichment sources (~55–60): **Regional papers (57), community media, investigative/fact-check. These add depth, local angles, and additional perspectives after a story is detected. They do not affect whether a story is detected or published, but they DO drive the Coverage Map (Section 3.2).

### Full Source Architecture

The complete, detailed source list with 125+ sources organized by tier, including editorial decisions and reasoning, is maintained in a separate artifact titled "Lens: Complete Source Architecture v2." The full state-by-state regional newspaper list is maintained in a separate artifact titled "Lens: U.S. Regional Newspaper Source List — Top Paper by State."

### Summary of Source Categories

**Factual Backbone: **AP (API, paid/licensed), Reuters (API, paid/licensed), Congress.gov (API, free with key), GovInfo.gov (API + RSS, free), government primary sources, court filings, UN (~8 sources). C-SPAN deferred to V2 (no developer API available). Agency press releases are excluded.

**U.S. Broadcast: **NBC, ABC, CBS, CNN, MSNBC, Fox, Newsmax, PBS NewsHour (8 sources)

**U.S. National Newspapers: **NY Times, Washington Post, WSJ, LA Times, NY Post, USA Today, NY Daily News (7 sources)

**U.S. Regional Newspapers: **57 papers — the largest daily newspaper by circulation in each of the 50 states and D.C., with a two-paper exception in six states (California, Florida, Illinois, New York, Pennsylvania, Texas). Ownership note: Multiple papers share corporate ownership (Gannett: 12, Lee Enterprises: 5, Advance Local: 4, Alden Global Capital: 3, McClatchy/Chatham: 3). This does not affect the bias filter engine.

**U.S. Digital/Policy: **Politico, Axios, The Hill, Reason, The Dispatch (5 sources)

**U.S. Business/Financial: **CNBC, Bloomberg, Fox Business, MarketWatch, Forbes, Fortune, Yahoo Finance, Nikkei Asia (8 sources)

**U.S. Community/Underrepresented: **The Root, Univision/Telemundo, The 19th, Indian Country Today, The Grio (5 sources)

**U.S. Investigative/Fact-Check/Research: **ProPublica, AP Fact Check, PolitiFact, FactCheck.org, Pew Research (5 sources)

**International: **AFP, BBC, The Economist, The Guardian, Financial Times, Al Jazeera, Deutsche Welle, NHK World, ABC Australia, France 24, SCMP (with caveat), Haaretz, Middle East Eye, Kyiv Independent, Meduza, Daily Maverick, The Straits Times, The Hindu (~17 sources)

**Future Non-English: **El País, La Nación, El Universal, Folha de S.Paulo, Le Monde, Der Spiegel, and others (~9 sources, V2)

**Total source count: 125+**

### Key Editorial Decisions

- **Israel: **One source (Haaretz) rather than two, balanced by Middle East Eye and Al Jazeera.

- **China: **SCMP kept with ownership caveat and extra scrutiny on sensitive topics.

- **Ukraine/Russia: **Kyiv Independent kept with perspective tag; Meduza added for independent Russian perspective; no Russian state media.

- **U.S. Regional: **57 papers covering all 50 states and D.C. to eliminate East Coast/Beltway dominance.

- **Spanish: **Planned for V2 (output translation first, then Spanish-language source integration).

- **Agency press releases: **Excluded.

## Section 6: How a Lens Story Gets Written (Step by Step)

**Step 1: Story Detection **— Engine monitors incoming feeds every 15 minutes, 24/7. Looks for clustering: when 3+ clustering sources publish about the same event. Groups articles by specific event, not by actor or topic. Rolling 24-hour detection window.

**Step 2: Source Gathering **— When publication threshold is met (5+ sources across 2+ editorial perspectives), pulls in all available material from across the full source list including enrichment sources. Factual backbone provides core facts; angle detection layer identifies framing via headlines, RSS summaries, and available text.

**Step 3: Fact Extraction **— AI cross-references all sources and builds a fact table. Claims confirmed by 2+ sources with different editorial perspectives = high confidence → "What Happened." Single-source or contested claims → "What We Don't Know." Primary source verification preferred.

**Step 4: Perspective Mapping **— AI identifies genuinely different ways of understanding the same event (not just "left vs. right"). Presents as many meaningfully distinct perspectives as exist (minimum 2, maximum 5). Each perspective given its strongest, most reasonable version.

**Step 5: Writing and Calibration **— AI writes summary at all three reading levels. Applies all three bias filters. Separate verification layer checks every factual claim against source material to prevent hallucination.

**Step 6: Age-Gating **— Engine classifies each story as ALL AGES, TEEN AND ABOVE, or ADULT ONLY based on the factual core content.

**Step 7: QC Pipe****line **— Seven automated checks run before publishing (fact verification, bias filter verification, plagiarism check, reading level verification, age-gate classification, perspective balance, completeness). Stories that pass all checks publish automatically based on confidence tier.

**Step 8: Coverage Map Generation **— Once sources are locked in, engine tags each source with its geographic location (U.S. state or country) and generates the Coverage Map data structure for the story. Engine picks default map view (U.S. or World) based on where the majority of covering sources are located.

**Step 9: Below-the-Radar Evaluation **— For stories that hit the detection threshold (3+ sources) but did NOT reach the publication threshold (5+ across 2+ perspectives) within 24 hours, AND have at least one Tier 1 (AP or Reuters) source, the engine writes an abbreviated Lens story and publishes it to the Below the Radar section with an automatic YELLOW badge.

## Section 7: Critical Evaluation — Known Challenges and Solutions

**Challenge ****1: Story Selection Bias **— Problem: If Lens only covers stories many sources cover, it misses important stories others ignore. Solution: "Below the Radar" section (Section 3.3) surfaces under-covered stories that have at least one wire-service source, promoted from V2 to MVP in v3.1.

**Challenge 2: Algorithm vs. Human Curation **— Algorithmic detection with published, transparent editorial framework. Small editorial team reviews output for quality without choosing stories.

**Challenge 3: Paywall Limitations **— Use wire services and primary sources for facts. Use headlines/RSS/social media for angle detection from paywalled sources. Pursue licensing long-term. Be transparent about limitation in "How We Know."

**Challenge 4: Source List Bias **— Acknowledge openly in v1. Expand deliberately over time to include diverse linguistic and cultural perspectives.

**Challenge 5: AI Hallucination **— Verification layer checks every claim against sources. QC pipeline runs on every story. Human editor reviews flagged stories.

**Challenge 6****: Contested "Facts" **— "What Happened" uses only the most neutral, verifiable descriptors. Interpretive framing goes to "What People Think."

**Challenge 7: False Balance **— Indicate breadth of support for each perspective without endorsing either. Note when perspectives are held by parties with direct interest in the outcome. Present more than two perspectives when warranted.

**Challenge 8: Binary Framing **— Present as many meaningfully distinct perspectives as exist (minimum 2, maximum 5), not a forced binary.

**Ch****allenge 9: AI Training Data Bias **— Regular auditing by reviewers across the political spectrum. Periodic published "bias audits." Continuous prompt and methodology adjustment.

**Challenge 10: Neutral = Boring **— Neutral does not mean boring; it means clear and precise. "Why It Matters" section provides genuine significance. Audio format adds warmth. Jackson as beta user tests engagement constantly.

**Challenge 11: Who Watches the Watchers **— Radical transparency: publish source list, methodology, filter definitions, editorial framework, regular bias audits. Advisory board spanning political spectrum. "How We Know" button on every story.

**Challenge 12 (new in v3.1): Coverage Map as Popularity Signal **— Risk: users may interpret a sparsely shaded map as "this story is less important." Solution: explicit copy inside the map panel stating that coverage breadth is not a measure of significance. Map is a transparency tool, not a ranking tool.

**Challenge 13 (new in v3.1): Search Surfacing Stale Stories **— Risk: a search for "Ukraine" returns stories from eight months ago mixed with stories from last week; a young reader mistakes old for current. Solution: prominent publication dates on every result card; "This story was published on [date]" banner on any story opened from search that is more than 60 days old.

## Section 8: Data Sourcing and Costs

### Technical Architecture

**Tier 1 (Full access): **AP/Reuters API (paid, licensed), Congress.gov API (free with key), GovInfo.gov (API + RSS, free), non-paywalled international sources (free via RSS/API)

**Tier 2 (Angle detection): **RSS feed summaries from all sources, Google News API or aggregation tools, media monitoring services, social media framing

**Tier 3 (Enrichment): **NewsAPI.org or similar, fact-checking databases, academic/think tank publications

### Hosting & Services Stack

- **Frontend: **Vercel (React PWA, automatic SSL/HTTPS, automatic deploys)

- **Backend: **Railway (engine services, scheduled jobs for 15-minute polling cycle)

- **Database: **PostgreSQL on Railway (persistent data: stories, users, profiles, source material, fact tables, QC logs, search index)

- **Caching: **Redis on Railway (feeds, briefing lists, active stories)

- **Audio storage: **Cloudflare R2 (no egress fees, cheap storage, fast serving)

- **Email: **Resend (QC alerts, daily digest, password reset, pre-launch email sequence)

- **AI engine: **Anthropic Claude API (bias filter, story writing, QC, tap-to-define)

- **Voice gen****eration: **ElevenLabs API

### Copyright Framework

- Facts are not copyrightable

- Synthesis and analysis are protected activity

- Never reproduce more than a few words of original language

- Never reproduce structure/narrative arc of specific articles

- Always create original synthesis

- Comply with API terms of service

### Estimated MVP Monthly Costs

- AP/Reuters API: $500–$2,000+

- NewsAPI or similar: $50–$450

- AI processing (Claude API): $500–$2,000

- ElevenLabs (voice generation): $100–$500

- Hosting (Vercel + Railway): $100–$500

- Cloudflare R2 (audio storage): $10–$50

- Resend (email): Free tier (3,000/month)

**Total estimated range: **$1,250–$5,500/month (before development costs)

## Section 9: Proof of Concept

### Test Story #1: Jimmy Lai Sentencing

The Jimmy Lai sentencing story (Feb 9, 2026) was run through the bias filter engine at Young Reader level. Sources used: AP, Reuters, CNN, NPR, NBC, ABC, PBS, CNBC, BBC, Al Jazeera, Washington Post, Hong Kong Free Press, Washington Times, Amnesty International, and official government statements from China, Hong Kong, U.S., U.K., EU, Australia, and Taiwan. The test demonstrated the engine working across all four content sections plus the source transparency feature.

### Test Story #2: DHS Shutdown

The DHS shutdown story (Feb 13, 2026) was run through the bias filter engine at Teen Reader level. The test demonstrated the engine finding three distinct perspectives (not just two), adjusting reading level from the first test, and integrating primary government sources. Jackson caught a bias in the third perspective section (only Republican voices cited for a supposedly bipartisan view), which was corrected — validating the need for the automated balance check in the QC layer.

## Section 10: Landing Page

The landing page is live at thelens.media, deployed on Vercel. Approved copy (Session 5, February 16, 2026):

**Nav bar: **lens. | THE NEWS WITHOUT THE NOISE

**Headline: **The same story, told differently everywhere. Lens gives you the facts to decide for yourself.

**Subheadline: **For every major news story, Lens pulls coverage from across the media spectrum, identifies the verified facts, and separates them from the framing. You get clarity. You decide what to think.

**Quote: **"Why is it so hard to just get the facts?" — Jackson, age 9, co-founder of Lens

## Section 11: Technical Development Overview

Full session-by-session build plan is in Part II of this document. Summary:

- **Stage 1 (Sessions 1–18): **Demo app with pre-loaded stories. ~3 weeks.

- **Stage 2 (Sessions 19–45+): **Live engine connecting to automated story pipeline. ~7 weeks.

**Key Technical Decisions:**

- **MVP approach: **Progressive Web App (PWA) first, native app later

- **Frontend: **Vercel (React PWA)

- **Backend: **Railway (Node.js/Express, scheduled jobs)

- **Database: **PostgreSQL on Railway

- **Caching: **Redis on Railway

- **Audio storage: **Cloudflare R2

- **Email service: **Resend

- **AI engine: **Anthropic Claude API

- **Voice generation: **ElevenLabs API

- **Source ingestion: **RSS feeds + NewsAPI.org for MVP, AP/Reuters API licensing for scale

- **Government data: **Congress.gov API (free), GovInfo.gov (API + RSS, free)

- **Development tool: **Claude Code

- **Analytics: **Internal dashboard only (privacy/COPPA compliance)

- **Authentication: **Email/password + Google sign-in + Apple sign-in

- **Daily API cost cap: **$50/day with automatic pause

**Estimated Monthly Operating Cost: **$1,250–$5,500

**Estimated Time to MVP: **~10 weeks

## Section 12: Grant and Funding Materials

### Documents Prepared

- Knight Foundation Application (v8 draft) — Letter of Inquiry + Full Proposal Framework

- General Grant/Investor Document (v3)

- Entity Structure Decision Memo (v2) — Delaware PBC confirmed

- Lens Media PBC Founding Narrative

- Funding Needs Analysis & Entity Strategy

- Complete Legal Requirements Checklist

- Competitive Intelligence Report (February 2026)

### Key Information for All Applications

- **Founders: **Rebecca Rosen and Jackson Weiss (age 9)

- **Entity: **Lens Media, Public Benefit Corporation (Delaware)

- **Website: **thelens.media

- **Contact: **hello@thelens.media

- **Funding range sought: **$50,000–$250,000 (grant dependent)

- **Break-even: **~750–1,000 paying subscribers

## Section 13: V2 and Future Features (Deferred from MVP)

Features part of the Lens vision but not included in MVP v3.1. Nothing here is abandoned — it is sequenced.

### Content & Engine

- **C-SPAN Integration **— Video links in "Go Deeper" for congressional hearings. Requires a developer API or partnership.

- **Bias Radar **— Interactive learning tool showing how the same story was covered differently across sources.

- **"I Have a Question" In-Story Chat **— Cut from MVP due to unpredictable API cost scaling. Revisit when revenue supports it.

### Language & International

- **Spanish-language output **— Translate Lens stories into Spanish. Output translation first, then Spanish-language source integration.

- **Non-English ****source integration **— ~9 planned non-English sources. Requires translation layer in ingestion pipeline.

### Features

- **User-facing Lexile calibration **— Allow users (especially students) to input their specific Lexile level. Strong school/classroom selling point.

- **Lexile badge on stories **— Display Lexile level of each story version.

- **Extended archive browsing **— Calendar view, advanced filters beyond MVP search.

- **Family Plan **— Family Sharing with parent-facing visibility into age-gating activity.

- **Family and Classroom S****haring **— Teacher dashboards, shared feeds with discussion.

- **Breaking News Push Notifications **— Alerts for major breaking stories (10+ sources within 1 hour, max 3/day).

# Part II — Build Guide v3.1

Session-by-Session Prompts for Claude Code

## Claude Code Defaults

Unless a specific session says otherwise, every build session in this guide should be run with these Claude Code settings:

**Model: Opus 4.7. **The most capable model available. Lens is a complex build — architecture decisions, multi-file changes, and reasoning about the bias filter engine benefit from the strongest available model.

**Thinking: xhigh. **Extended thinking at the highest level. Gives Claude Code room to reason carefully before writing code, which reduces bugs and avoids the need to re-prompt.

**Mode: Auto. **Lets Claude Code run files, install packages, and make multi-step changes without stopping to ask permission for every action. Faster and less interruptive.

Set these once at the start of each session. If Claude Code resets to different defaults between sessions, reconfigure before pasting the session prompt.

## How to Use This Guide

Each session is designed to fit in a 1–2 hour block. Some sessions are shorter. If you have a longer block, do two sessions back to back.

Every session includes:

- What you are building (plain English)

- The exact Claude Code prompt to use (copy and paste)

- What "done" looks like (so you know when to stop)

- If something goes wrong (what to try)

- Jackson's task (where applicable — his contribution for that session)

The prompts are written to be pasted directly into Claude Code. They reference this Master Document — keep it in your project folder so Claude Code can read it. Before you start any session: Open your terminal, navigate to your Lens project folder, and start Claude Code.

**Rule of thumb: **If Claude Code produces something that does not work or look right, do not debug it yourself. Describe what is wrong to Claude Code and let it fix it. Your job is to describe problems clearly, not to read code.

## What Happens After You Paste a Prompt

Every session follows the same cycle:

- **Paste the prompt. **Copy the prompt from this document and paste it into Claude Code. Hit enter.

- **Watch Claude Code work. **It will start writing files, creating folders, and generating code. You will see it narrate what it is doing — things like "Creating src/components/Onboarding.tsx" or "Installing tailwindcss." Let it run. This can take a few minutes. Do not interrupt unless it asks you a question.

- **Claude Code tells you how to see your work. **When done, it usually says "Run npm run dev to see the app locally" or similar. Follow those instructions. Open the URL in your browser (Chrome is best). Open the app on your phone too (same URL if on the same wifi, or deploy to Vercel first).

- **Check against "what done looks like." **Every session has a "what done looks like" description. Compare what you see to that description.

- **One of three things happens:**

- **It works. **Great. Move on, or deploy to Vercel. To deploy, tell Claude Code: "Deploy this to Vercel."

- **It mostly works but something looks wrong. **Tell Claude Code what is wrong in plain English. Be specific. You do NOT need to say anything about code, files, or technical details. Just describe what you see vs. what you expected.

- **It errors out. **You will see red text in the terminal. Select the entire error message, paste it to Claude Code, and say "I got this error. Please fix it." May take 2–3 rounds. Normal.

- **Save your progress. **At the end of every session, tell Claude Code: "Deploy this to Vercel." This pushes your latest version live so you can see it on your phone and so your work is saved.

### Tips

- If Claude Code asks you a question ("A or B?"), it is fine to say "Whichever you think is better."

- If confused about what Claude Code did, ask: "Explain what you just did in plain English."

- If a session is going badly and nothing works after 3–4 attempts, stop. Start a new Claude Code session (type /clear or close and reopen) and try the prompt again fresh.

- If you finish a session early, move on to the next one. Sessions are designed as stopping points, not minimum time requirements.

- Jackson can follow this exact same workflow. The prompts work the same regardless of who pastes them.

## Stage 1: The Demo App

A real, polished, working Lens app with pre-loaded stories and real narrator voices. Timeline: ~3 weeks (Sessions 1–18).

The Demo App is not a mockup. It is a real PWA that anyone can open on their phone. It runs on pre-written stories rather than a live engine. A grant reviewer or investor using it gets the full Lens experience — onboarding, personalized feed, tabbed story pages, real AI narrator voices, source transparency, Coverage Map, Below the Radar, and full Search. The only thing that is not live yet is the automated story pipeline.

*What is new in Stage 1 v3.1: Three new sessions — 13a (Search), 13b (Coverage Map), 16a (Below the Radar) — plus updates to Sessions 6 (home screen now includes Below the Radar placeholder), 11 (How We Know now includes Coverage Map placeholder), 14 (story** batch now includes Below the Radar candidates), and 17 (polish includes all three new features).*

### Phase 0: Project Setup (Sessions 1–2)

#### Session 1: Create the Lens app project

**What you are building: **A new React app in your project folder, connected to Vercel for deployment, with the basic file structure Claude Code needs to build everything else.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

I already have a landing page deployed on Vercel. Now I need to create the actual app as a separate project.

 

Create a new React PWA project called "lens-app" with the following setup:

- React with TypeScript

- Tailwind CSS for styling

- React Router for page navigation

- PWA configuration (service worker, manifest.json with app name "Lens")

- The app should be deployable to Vercel

 

For the design system, set up these foundational styles:

- Clean, calm, modern aesthetic — lots of white space

- Primary font: a clean serif for the "lens." wordmark, clean sans-serif for body text

- Color palette: BLACK AND WHITE ONLY. No navy, no colors. Pure black (#000) for headers and text, warm white (#fafafa) for backgrounds, medium gray (#666) for secondary text. The only accent permitted is a subtle green dot for the confidence badge (Green = high confidence, Yellow = developing).

- The overall feel should communicate: "We respect your intelligence"

 

Don't build any screens yet — just the project skeleton, routing structure, and design system.

 

Set up routes for:

- /onboarding (4-step onboarding flow)

- /home (main feed)

- /story/:id (individual story page)

- /search (search results page) — NEW in v3.1

- /settings (user settings)

 

Create a placeholder component for each route that just shows the route name.

**What "done" looks like: **You can run the app locally and see a basic page. You can click between routes. The app has the right fonts and black/white color palette. Nothing fancy yet — just the skeleton.

**After the prompt: **Claude Code will create files and folders. When done, it will tell you how to start the app. Follow its instructions. Open the URL in your browser. Try going to /onboarding, /home, /story/1, /search, /settings. Each should show its placeholder name. If you see an error or blank page, paste the error back to Claude Code.

**If something goes wrong: **Tell Claude Code "The app will not start. Here is the error:" and paste whatever you see in the terminal.

#### Session 2: Deploy to Vercel and set up the data layer

**What you are building: **Getting the app live on a URL (even though it is just placeholder pages), and creating the data structure that will hold pre-loaded stories.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Two things this session:

 

1. Deploy this app to Vercel. I already have Vercel set up from a previous project (my landing page). Create a new Vercel project for the app.

 

2. Create the local data layer for pre-loaded stories. I'm building a demo version of the app first using pre-written stories, then connecting to a live engine later.

 

Create a file called /src/data/stories.ts that exports an array of story objects. Each story should have this structure:

{

  id: string,

  headline: string,

  summary: string (one sentence),

  topic: string (one of: "Government & Politics", "World News", "Science & Space", "Technology", "Sports", "Animals & Nature", "Business & Money", "Health", "Arts & Entertainment", "Environment"),

  topicIcon: string (emoji for the topic),

  confidenceBadge: "green" | "yellow",

  publishedAt: ISO date string,

  ageGate: "all" | "teen" | "adult",

  belowTheRadar: boolean,  // NEW in v3.1 — true for Below the Radar stories

  readingLevels: {

    young: {

      whatHappened: string,

      whyItMatters: string,

      whatPeopleThink: array of { perspective: string, content: string },

      whatWeDontKnow: string,

      tapToDefine: array of { word: string, definition: string }

    },

    teen: { same structure },

    adult: { same structure }

  },

  sources: {

    confirming: array of { 

      name: string, 

      type: string,

      location: {   // NEW in v3.1 — powers the Coverage Map

        country: string,  // ISO-3166 alpha-2 code, e.g., "US", "GB", "IL"

        usState: string | null  // US state code (e.g., "CA", "TX") for US sources, null for non-US

      }

    },

    methodology: string

  },

  goDeeper: array of { label: string, url: string },

  audio: {

    young: { anchor: string, narrator: string, bigSister: string, mrsM: string, coach: string },

    teen: { anchor: string, narrator: string, bigSister: string, mrsM: string, coach: string },

    adult: { anchor: string, narrator: string, bigSister: string, mrsM: string, coach: string }

  }

}

 

The audio field maps reading level + voice to an MP3 file path. We'll populate these after generating audio in a later session.

 

The belowTheRadar flag defaults to false. Stories flagged true will appear in the Below the Radar section of the home feed (to be built in Session 16a).

 

The location field on each source powers the Coverage Map feature (built in Session 13b). Every source must have a country code; U.S. sources must also have a state code.

 

Pre-populate it with 2 placeholder stories so I can test the screens as I build them. Use realistic content — make up a story about a scientific discovery and one about a government policy, with all three reading levels filled in. Include realistic source locations for each.

**What "done" looks like: **The app is live on a Vercel URL (something like lens-app.vercel.app). The data file exists with 2 placeholder stories. You can still see the placeholder route pages.

**After the prompt: **Claude Code will walk you through the Vercel deployment. Follow its instructions. When it gives you a URL, open it on your phone. You should see the same thing you saw locally. Bookmark this URL — it is your live app.

### Phase 1: Onboarding (Sessions 3–5)

#### Session 3: Onboarding — Reading level and topic selection

**What you are building: **The first two steps of the onboarding flow: picking a reading level and selecting topics.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the first two screens of the Lens onboarding flow at /onboarding.

 

Screen 1 — "Who are you?"

- Header: "Who are you?"

- Three large, tappable cards:

  - "Young Reader" with subtitle "Ages 7–10"

  - "Teen Reader" with subtitle "Ages 11–17"

  - "Adult Reader" with subtitle "Ages 18+"

- Tapping a card selects it (visual highlight — subtle gray fill since we're black-and-white) and enables a "Next" button

- Store the selection in React state (we'll add persistence later)

- Design: clean, spacious, welcoming. Not childish but approachable.

 

Screen 2 — "What do you care about?"

- Header: "What do you care about?"

- Visual grid of topic cards, each with an emoji icon and label:

  - 🏛 Government & Politics

  - 🌍 World News

  - 🚀 Science & Space

  - 💻 Technology

  - ⚽ Sports

  - 🐾 Animals & Nature

  - 💰 Business & Money

  - 🏥 Health

  - 🎭 Arts & Entertainment

  - 🌿 Environment

- ALL topics are selected by default (highlighted). User taps to DESELECT topics they don't want.

- At least 1 topic must remain selected

- "Next" button to proceed

- "Back" button to return to Screen 1

 

Both screens should feel like part of a smooth flow — consistent styling, animation between screens. Store all selections in a React context or state management so other components can access them.

**What "done" looks like: **You can walk through both screens. Tapping works. Selections are visually clear. The flow feels smooth and polished.

**After the prompt: **Run the app and go to /onboarding. Walk through both screens on your computer AND on your phone. Check: Do the cards feel big enough to tap on a phone? Is the text readable? Do the topic icons look right? Does "Next" stay disabled until selection? Does "Back" work? Tell Claude Code about anything that looks off.

*🎯** Jackson's task — Onboarding Language** Review: After this session, hand Jackson the phone and let him go through both screens. Ask: Does "Who are you?" make sense? Are the topic names clear — would a kid his age know what "Business **&** Money" covers? Is anything confusing or feel like it's for l**ittle kids? Note his feedback for the next session.*

#### Session 4: Onboarding — News format and voice selection

**What you are building: **Steps 3 and 4 of onboarding: choosing Read/Hear/Both and picking a narrator voice.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build onboarding screens 3 and 4, continuing the flow from the previous screens.

 

Screen 3 — "How do you want your news?"

- Header: "How do you want your news?"

- Three options as large tappable cards:

  - "Read It" — "Stories in text, at your pace"

  - "Hear It" — "Listen to your daily news briefing"

  - "Both" — "Read and listen — the full experience"

- Single selection, "Next" button, "Back" button

 

Screen 4 — "Pick your voice"

- Header: "Pick your voice"

- Only show this screen if user selected "Hear It" or "Both" on Screen 3. If they chose "Read It," skip directly to the home screen.

- Five voice character cards, each with:

  - Character name

  - One-line personality description

  - A small "Preview" button (non-functional for now — we'll add audio previews later)

- The five voices:

  - "The Anchor" — Confident, clear, classic news voice. The person you trust to tell you what happened.

  - "The Narrator" — Warm, storytelling tone. Like someone reading you a great book about the world.

  - "The Big Sister" — Casual, smart, relatable. Like an older sibling explaining things over dinner.

  - "Mrs. M" — Soothing, crisp, clear, British. Like a beloved teacher reading a story.

  - "The Coach" — Energetic, encouraging. Makes even complicated news feel like something you can handle.

- Single selection, "Get Started" button that navigates to /home

 

After completing onboarding, store all user preferences (reading level, topics, format, voice) in localStorage.

 

Add a small progress indicator (dots or a bar) across all 4 onboarding screens so users know where they are.

**What "done" looks like: **The full onboarding flow works end to end — pick a reading level, select topics, choose format, pick a voice, land on the home screen. Preferences are saved.

#### Session 5: Onboarding polish and the "already onboarded" flow

**What you are building: **Making sure returning users skip onboarding, and polishing the overall flow.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Two things:

 

1. If a user has already completed onboarding (preferences exist in localStorage), navigating to /onboarding should redirect to /home. The app should always start on /home for returning users.

 

2. Polish the onboarding flow:

- Add a simple fade or slide transition between screens

- Make sure the "lens." wordmark appears at the top of every onboarding screen in a clean serif font

- Add the tagline "The news without the noise" below the wordmark on the first screen only

- Make sure everything looks good on mobile screen sizes (375px wide) — this is primarily a phone app

- Test that the Back buttons work correctly on every screen

- Make sure the progress indicator updates correctly

 

3. Add a way to reset onboarding in /settings so I can test the flow repeatedly. Just a simple "Reset Onboarding" button that clears preferences and redirects to /onboarding.

**What "done" looks like: **The onboarding flow is smooth and polished. Returning users go straight to the home screen. You can reset and re-test.

### Phase 2: Home Screen (Sessions 6–8)

#### Session 6: Home screen — Story feed + Below the Radar placeholder

**What you are building: **The main home screen with a personalized greeting, story cards, and a placeholder for Below the Radar (wired up fully in Session 16a).

*NEW in v3.1: Home screen now includes a "Below the Radar" section below "Today's Stories," and the bottom nav now has Search as a real tab (will be built out in Session 13a).*

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the home screen at /home.

 

Layout from top to bottom:

 

1. Header area:

- "lens." wordmark top left

- "Bias Filter ON" badge top right — small, always visible, black text with thin border. This is a core brand element.

 

2. Greeting:

- "Good morning" (or afternoon/evening based on time of day)

- Greeting is not personalized in MVP (onboarding does not collect a name)

 

3. "Your Morning News Show" card:

- A visually distinct card at the top of the feed

- Shows: "Your Daily Briefing" as title, "5 stories · ~8 minutes" as subtitle

- A large play button

- Non-functional for now — we'll add audio in Session 12. Tapping should show a brief "Coming soon" toast for now.

 

4. "Today's Stories" section:

- Header: "Today's Stories"

- Feed of story cards, one per story, pulled from the stories data file where belowTheRadar === false

- Filter stories based on the user's selected topics from onboarding

- Filter stories based on age-gating: if user is Young Reader, hide "teen" and "adult" gated stories; if Teen, hide "adult" gated stories

- Each story card shows:

  - Headline (bold)

  - One-sentence summary

  - Topic tag with emoji icon

  - Confidence badge: small green dot for "green", small yellow/amber dot for "yellow"

  - Time since published (e.g., "2 hours ago")

- Tapping a story card navigates to /story/:id

- Cards should have subtle shadows and rounded corners — clean, modern card design

 

5. "Below the Radar" section (NEW in v3.1):

- Header: "Below the Radar"

- Subheader copy below the header in smaller gray text: "Stories other outlets are under-covering. Fewer sources have reported these, so facts may still be developing."

- Feed of story cards from stories data where belowTheRadar === true (same filters as above: topics, age gate)

- Same card design as Today's Stories but all cards here automatically show the yellow confidence badge

- Maximum 3 stories shown at a time; if more exist, pick the 3 most recent

- If there are no Below the Radar stories matching the user's filters, HIDE the section entirely (don't show an empty section)

- For this session: this section will be empty since our 2 placeholder stories don't have belowTheRadar:true. That's fine. We'll add Below the Radar stories in Session 16a.

 

6. Bottom navigation bar:

- Three tabs: Home (active), Search, Settings

- Home = /home, Search = /search (still a placeholder page — we'll build it out in Session 13a), Settings = /settings

 

Sort Today's Stories by publishedAt date, newest first. Sort Below the Radar by publishedAt date, newest first. The feed should scroll naturally.

**What "done" looks like: **The home screen shows story cards from your data file, filtered by the user's onboarding preferences. It looks and feels like a real news app. Tapping a card goes to the story page (still a placeholder at this point). The Below the Radar section is either hidden (no qualifying stories yet) or correctly shown with the explanatory copy.

*🎯** Ja**ckson's task — Home Screen First Impression: After this session, hand Jackson the phone without instructions. Watch what he taps first, what he reads, what he skips. Then ask: What did you think this screen was showing you? What would you tap first? Does a**nything look cluttered or confusing? Does it feel like a real app?*

#### Session 7: Settings screen

**What you are building: **The settings page where users can change their preferences.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the settings screen at /settings.

 

Layout:

1. Header: "Settings" with back navigation to /home

2. "Your Profile" section:

  - Reading Level: show current selection, tappable to change (same three options as onboarding)

  - When reading level changes, it immediately affects which story version is shown and which stories are visible (age gating)

3. "Your Topics" section:

  - Show the same topic grid as onboarding step 2

  - Current selections highlighted

  - User can add/remove topics, changes take effect immediately on the home feed

4. "Your News Format" section:

  - Show current selection (Read It / Hear It / Both)

  - Tappable to change

5. "Your Voice" section:

  - Show current voice selection

  - Tappable to change (same voice picker as onboarding)

  - Only visible if format is "Hear It" or "Both"

6. "About Lens" section:

  - Brief text: "Lens pulls reporting from more than a hundred sources across the media spectrum, identifies the facts, and separates them from the framing. You get clarity. You decide what to think."

  - "Age-appropriate content filtering is active for Young Reader and Teen Reader profiles."

7. "Reset" button at bottom (for testing) — clears all preferences, returns to onboarding

 

All changes save to localStorage immediately. Bottom navigation bar consistent with home screen.

**What "done" looks like: **You can change all your preferences and see the home feed update accordingly. Switching reading level changes which story content you see.

#### Session 8: Home screen polish

**What you are building: **Polish the home screen and overall app navigation.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Polish the home screen and overall app navigation:

 

1. The "Bias Filter ON" badge should have a subtle pulse animation on first load — just once, to draw attention without being annoying.

2. Add pull-to-refresh behavior on the home feed (even though stories are pre-loaded, the gesture should work for when we connect to a live backend).

3. Make sure the bottom navigation bar highlights the active tab.

4. Add a loading state — a brief skeleton screen that shows for 500ms when the app first loads, so the transition from splash to content feels polished.

5. Make sure all story cards have consistent spacing and alignment, including the Below the Radar section when it has stories. The feed should feel calm and organized, not cluttered.

6. Test everything at mobile width (375px). Fix anything that looks broken or cramped on a phone screen.

7. The app should have a proper favicon — use a simple circle/lens shape in black.

**What "done" looks like: **The home screen feels polished. Animations are subtle, navigation is responsive, mobile looks great.

### Phase 3: Story Pages (Sessions 9–13b)

#### Session 9: Story page — Tab structure and "What Happened"

**What you are building: **The individual story page with the four-tab structure.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the story detail page at /story/:id.

 

The page loads the story matching the :id parameter from the stories data file. It displays the story content at the user's selected reading level.

 

Layout:

1. Top bar:

  - Back arrow to return to /home

  - Story topic tag with emoji

  - Confidence badge (green or yellow dot with label: "High Confidence" or "Developing")

 

2. Publication date banner (NEW in v3.1):

  - If the story's publishedAt is more than 60 days old, show a subtle banner at the top of the page:

    "This story was published on [formatted date]. Information may have developed since."

  - If within 60 days, show no banner

  - This handles cases where stories are opened via search, to prevent young readers from mistaking old stories for current news

 

3. Story headline — large, bold, clear

 

4. Tab bar with four tabs:

  - "What Happened" (active by default)

  - "Why It Matters"

  - "What People Think"

  - "What We Don't Know"

 

5. Tab content area:

  - For this session, build only the "What Happened" tab content

  - Display the whatHappened text from the story data at the user's reading level

  - Clean, readable typography — generous line height, comfortable margins

  - No adjectives that carry judgment, no emotional framing (this is enforced by the content, not by code)

 

6. Bottom of the story page (below tabs, always visible):

  - "How We Know" button — collapsed by default

  - "Go Deeper" button

  - "Report a Problem" link

 

The tab switching should feel instant — no loading state needed since all content is pre-loaded.

**What "done" looks like: **Tapping a story card on the home screen opens the story page. You see the headline, confidence badge, topic tag, and "What Happened" tab content at your current reading level. The other tabs are visible but empty.

#### Session 10: Story page — Remaining tabs

**What you are building: **The content for the remaining three tabs.

**Prompt for Claude Code****:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the content for the remaining three tabs on the story page:

 

Tab 2: "Why It Matters"

- Display the whyItMatters text from the story data at the user's reading level

- Same clean typography as "What Happened"

 

Tab 3: "What People Think"

- Display each perspective from the whatPeopleThink array

- Each perspective gets:

  - A label in a subtle banner (alternating very light gray backgrounds to visually distinguish perspectives — remember we're black/white only)

  - The perspective text below

- Perspectives are displayed in the order they appear in the data (the order was randomized when the story was written)

- No indication of which perspective is "correct"

 

Tab 4: "What We Don't Know"

- Display the whatWeDontKnow text

- Slightly different visual treatment — maybe a subtle background color (very light gray) or a small question-mark icon that conveys "this is uncertain"

- This tab should feel honest and humble, not alarming

 

Make sure tab switching is smooth and the active tab is clearly indicated. All four tabs should work at all three reading levels.

**What "done" looks like: **All four tabs render correctly at all three reading levels. Tab switching is smooth. "What People Think" shows multiple perspectives without indicating which is right.

*🎯** Jackson's task — Tab Usage Study: After Sessions 9–11 are done, Jackson reads 3 stories all the way through. For each: Which tab did you read first? Did you read all four? Which was most interesting? Which was least interesting? Did **"What People Think" feel fair?*

#### Session 11: "How We Know" panel (with Coverage Map placeholder), Tap to Define, Go Deeper, Report a Problem

**What you are building: **The expandable "How We Know" panel (including a placeholder for the Coverage Map, which will be built in Session 13b), plus Tap to Define, Go Deeper, and Report a Problem.

*NEW in v3.1: How We Know now includes a Coverage Map placeholder section. The actual map is built in Session 13b.*

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build four features on the story page:

 

1. "How We Know" expandable panel:

- Tapping the "How We Know" button expands a panel below the story content

- Panel contents, in order:

  a. "Sources for this story" — list of source names from story.sources.confirming, each with its type tag (e.g., "AP — Wire Service"). Show total source count at the top (e.g., "This story was built from 14 sources").

  b. "Coverage Map" section — for this session, show a placeholder that says "Coverage Map (coming in next session)" — we'll build the real map in Session 13b.

  c. "Methodology" — the story.sources.methodology text, which explains how the facts were confirmed

- Tapping again collapses the panel

- The panel should feel informative but not overwhelming — clean list, not a wall of text

 

2. "Tap to Define" feature:

- In all tab content (What Happened, Why It Matters, What People Think, What We Don't Know), scan the text for words that match the tapToDefine array for the current reading level

- Underline those words with a subtle dotted underline

- When a user taps/clicks an underlined word, show a small popup tooltip with the plain-language definition

- Tapping anywhere else dismisses the tooltip

- Style the tooltip: rounded corners, slight shadow, white background, readable text

- The tooltip should feel like a helpful whisper, not a disruptive popup

 

3. "Go Deeper" button:

- Tapping shows a list of primary source links from story.goDeeper

- Each link shows a label and opens the URL in a new browser tab (not inside the app)

- Small external link icon next to each URL to signal the user is leaving Lens

 

4. "Report a Problem" link:

- For the demo, tapping opens a simple text area with a "Submit" button

- On submit, show a "Thank you — we'll look into this" confirmation message

- Non-functional in demo (no email sent) — we'll connect to Resend in Stage 2

**What "done" looks like: **You can expand "How We Know" and see the source list and methodology (with a Coverage Map placeholder). Tap to Define works on underlined words. Go Deeper opens external links. Report a Problem shows a confirmation.

*🎯** Jackson's task — Tap to Define Audit: Read **every story at Young Reader level. Are the right words underlined? Any words he does not know that ARE NOT underlined? Any words underlined that he already knows? Are the definitions helpful?*

#### Session 11.5: Set up ElevenLabs voices

**What you are building: **The five Lens narrator voices in ElevenLabs, ready to generate audio for demo stories.

**Before this session: **Create an ElevenLabs account at elevenlabs.io. The Starter plan ($5/month) may be sufficient; Creator plan ($22/month) gives more character quota if needed. You only need the paid plan for one month — long enough to generate all demo audio files.

**What to do (in ElevenLabs, not Claude Code):**

Design five voices in the ElevenLabs Voice Design or Voice Library tool. Match these descriptions:

- **The Anchor **— Confident, clear, classic news voice. (American, authoritative but warm, moderate pace)

- **The Narrator **— Warm, storytelling tone. (American, rich and expressive, slightly slower pace)

- **The Big Sister **— Casual, smart, relatable. (American, conversational, natural inflection, slightly faster pace)

- **Mrs. M **— Soothing, crisp, clear, British. (British, warm but precise, measured pace). If voice clone permission has been granted, use Option A. Otherwise, design a voice matching these qualities (Option B).

- **The Coach**** **— Energetic, encouraging. (American, upbeat, motivating tone, clear enunciation)

For each voice: generate a test clip using a sample paragraph from one of your demo stories. Listen and adjust settings until the voice matches the character description. Save the voice and note its ElevenLabs voice ID.

**What "done" looks like: **You have five saved voices in your ElevenLabs account, each sounding distinct and matching the character descriptions.

*🎯** Jackson's task — Voice Character Judging: Jackson designed these** characters. He approves how they sound. For each voice, thumbs up or thumbs down with notes on what does not sound right ("The Coach sounds too slow" or "The Big Sister sounds too old"). His voice approval is final.*

#### Session 12: Story page — Audio player with ElevenLabs voices

**What you are building: **Real audio narration for every demo story, using the five ElevenLabs voices across all three reading levels.

**Before this session: **Complete Session 11.5. Have your ElevenLabs API key ready and the voice IDs for all five characters.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the audio system for the Lens demo app using ElevenLabs text-to-speech API.

 

This has three parts:

 

PART 1: Audio generation script

Create a standalone Node.js script (separate from the app — I run it once to generate audio files) that:

- Reads all stories from the stories data file

- For each story, for each reading level (young/teen/adult), for each of the 5 voices:

  - Sends the "What Happened" text to the ElevenLabs API

  - Saves the returned audio as an MP3 file

  - Names it: {story-id}_{reading-level}_{voice-id}.mp3

- Stores all audio files in a /public/audio/ folder

- That's 5 voices × 3 levels × [number of stories] files total

- Add a progress indicator so I can see it working

- Include error handling and retry logic for API rate limits

 

I'll provide my ElevenLabs API key as an environment variable: ELEVENLABS_API_KEY

 

The five voice IDs are:

- The Anchor: [VOICE_ID_1]

- The Narrator: [VOICE_ID_2]

- The Big Sister: [VOICE_ID_3]

- Mrs. M: [VOICE_ID_4]

- The Coach: [VOICE_ID_5]

 

(I'll fill in the actual voice IDs before running the script.)

 

PART 2: Audio player on story pages

At the top of the story page, below the headline and above the tabs, add a "Listen to this story" audio player:

- Shows the selected voice character name (e.g., "🎧 Listen · The Anchor")

- Play/pause button

- Progress bar

- Time remaining

- Loads the correct MP3 based on: story ID + user's reading level + user's voice preference from Settings

- If the audio file doesn't exist for some reason, show "Audio unavailable for this story" gracefully

 

PART 3: Daily briefing player on home screen

Update the "Your Morning News Show" card:

- Make it functional — tapping play starts the briefing

- The briefing plays the "What Happened" audio for the top 3-5 stories (filtered by user's topics and age gate)

- Uses the user's selected voice and reading level

- Plays stories sequentially with a brief pause between them

- Shows: play/pause, progress bar, current story title, "Story 2 of 5" indicator

- Background playback should work (audio continues if user scrolls or navigates)

 

The audio player UI should be polished — this is a real feature, not a placeholder.

**What "done" looks like: **Every story has a working audio player that reads the story in the user's chosen voice. The daily briefing plays a sequence of top stories. Switching voices in Settings changes which audio plays.

**After the prompt: **You will need to run the audio generation script before audio works in the app. The script sends text to ElevenLabs and saves MP3 files — takes a few minutes to run through all combinations. Once files are generated, the audio player works immediately.

#### Session 13: Story page polish and mobile testing

**What you are building: **Final polish on the story page — reading progress indicator, tappable confidence badge, mobile fit-and-finish, share button, scroll position preservation, and a full pass through all five voices on a real story.

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Polish the story page and test everything on mobile:

 

1. Add a subtle reading progress indicator — a thin black bar at the very top of the screen that fills as the user scrolls through the story content.

2. Make sure tab content areas have a minimum height so short content doesn't look awkward.

3. The confidence badge should be tappable — tapping shows a brief explanation:

  - Green: "High Confidence — Every fact confirmed by multiple sources with different perspectives."

  - Yellow: "Developing — Some details still being confirmed or sources disagree"

4. Test the entire story page experience at 375px width:

  - Is the headline readable without being truncated?

  - Do the tabs fit on one line or do they need to scroll?

  - Is the "How We Know" panel readable?

  - Do "Tap to Define" tooltips position correctly (not cut off at screen edges)?

  - Does the audio player look good?

5. Add a "Share" button on the story page (copy link to clipboard functionality).

6. Make sure the back button returns to the home screen and preserves the user's scroll position.

7. Test all five voices on at least one story — does each audio file play correctly?

8. Switch voices in Settings and verify the audio player updates to the new voice.

9. Test the daily briefing — does it play the right stories in the right voice?

 

Fix any issues you find. Prioritize mobile experience — this is a phone-first app.

**What "done****" looks like: **The story page feels polished on mobile. Everything fits, everything works, five voices all play correctly.

#### Session 13a: Build the Search feature (NEW in v3.1)

**What you are building: **The Search tab in the bottom navigation, with keyword search and topic-based timeline search. This replaces the Search placeholder from Session 6.

*NEW in v3.1 — This is one of the three features added to MVP v3.1. See Part I, Section 3.1 for full product spec.*

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context — particularly Section 3.1 on the Search feature.

 

Build the Search feature at /search.

 

LAYOUT:

1. Header area:

  - "lens." wordmark top left

  - "Bias Filter ON" badge top right

2. Search bar at the top:

  - Large, prominent text input with placeholder "Search stories..."

  - Magnifying glass icon inside the input on the left

  - X icon on the right to clear the input when text is entered

  - Input autofocuses when the user lands on /search

3. "Browse by topic" section (shown when search input is empty):

  - Header: "Browse by topic"

  - The 10 topic tiles in a 2-column grid, each with emoji and name

  - Tapping a topic runs a topic-based timeline search (see below)

4. Results area (shown when search input has text):

  - Header: "Results" with result count (e.g., "8 results")

  - Sort toggle on the right: "Newest" (default) | "Most relevant"

  - Scrollable list of result cards

5. Bottom navigation bar — same as other screens, Search tab active

 

SEARCH LOGIC:

 

A. Keyword search (when user types in the search bar):

  - Debounce input by 300ms

  - Search across: headline, summary, whatHappened text (at user's reading level), topic, and tapToDefine words

  - Case-insensitive, match partial words (e.g., "vot" matches "voting")

  - Return matching stories

  - Apply age-gating: Young Readers never see teen/adult gated stories; Teen Readers never see adult gated stories

  - Respect topic preferences? NO — search should find stories across all topics even if user has deselected them. (Explain to Claude Code: search is for finding things, not curating the feed.)

  - Default sort: newest first by publishedAt

  - Relevance sort (when toggled): rough scoring — headline match weighted 3x, summary match 2x, body match 1x

 

B. Topic-based timeline search (when user taps a topic tile):

  - Return all stories with that topic, chronologically oldest-to-newest (opposite of normal sort — this shows how a story developed over time)

  - Header changes to show "[Topic Name] — Timeline"

  - A back button returns to the topic grid

 

RESULT CARD DESIGN:

- Same visual design as home feed story cards, PLUS:

- PROMINENT publication date on every card — show both the relative time ("2 weeks ago") AND the absolute date ("March 4, 2026") because search surfaces old stories and we don't want young readers mistaking old for current

- Tapping a card navigates to /story/:id

 

EMPTY STATE:

If keyword search returns zero results:

- Show: "No Lens stories match that search yet. Try a broader topic, or browse by category below."

- Then show the 10 topic tiles below

 

DATA PERSISTENCE:

- Store the last search query in sessionStorage so the user can navigate away and back without losing their search

- Don't store search history long-term in MVP (privacy, and it's not worth the complexity yet)

**What "done" looks like: **The Search tab works. You can type a keyword and see results, date-stamped. You can tap a topic tile and see a chronological timeline of all stories on that topic. Age gating is respected. Search finds stories across all topics even if the user has deselected some.

**After the prompt: **Test with your 2 placeholder stories — try searching for words you know are in them. Test topic tiles. Test the empty state by searching for something like "zzzzz." Test on mobile.

*🎯** Jackson's task — Search Test: After this ses**sion, hand Jackson the phone. Ask him to find specific stories he remembers reading. Can he find them easily? Does the date stamp help or confuse him? Is the topic timeline interesting or boring? Note what he says.*

#### Session 13b: Build the Coverage Map (NEW in v3.1)

**What you are building: **The Coverage Map feature inside the "How We Know" panel, with two toggleable views: U.S. state map and world map.

*NEW in v3.1 — This is one of the three features added to MVP v3.1. See Part I, Section 3.2 for full product sp**ec.*

**Before this session: **Every source in your stories.ts data file needs a location field (country code, and U.S. state code for U.S. sources). This was added to the data structure in Session 2. Verify your placeholder stories have this field populated.

**Pr****ompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context — particularly Section 3.2 on Coverage Mapping.

 

Build the Coverage Map feature inside the "How We Know" expandable panel on the story page. This replaces the placeholder text from Session 11.

 

TECHNICAL APPROACH:

- Use react-simple-maps for the map rendering (it's lightweight and works well with SVG topojson data)

- Install: npm install react-simple-maps

- Topojson data files: use the standard US states topojson and world countries topojson from Natural Earth (include these in /public/maps/)

 

THE PANEL:

 

Inside the "How We Know" panel, in the "Coverage Map" section:

 

1. Section header: "Coverage Map"

2. Brief explanatory copy (small gray text): "Shows where this story was reported. Not a measure of how important the story is."

3. Toggle at the top of the map: two buttons side by side — "U.S." and "World"

4. Default view logic:

  - Count sources by location from story.sources.confirming

  - If majority of sources are U.S.-based (usState is not null), default to U.S. view

  - Otherwise default to World view

5. The map:

  - U.S. view: a map of the 50 states + D.C. States with covering sources are shaded black (or dark gray). States without covering sources are light gray with a thin outline.

  - World view: a world map. Countries with covering sources are shaded black. Countries without are light gray.

  - Tapping a shaded state/country shows a small tooltip listing which source(s) covered the story from that location (e.g., "Los Angeles Times" or "BBC")

  - Tapping a non-shaded region does nothing

6. Below the map, a summary line: "X of Y Lens sources covered this story" where X is the number of sources that covered this specific story and Y is the total (125+).

 

MOBILE:

- Maps must render correctly at 375px width

- Tooltips must not get cut off at screen edges

- Tap targets on small states (like Rhode Island) need to be at least 40px — if the map scale is too small, add a fallback: a text list below the map of "States that covered this story" and "States that did not"

 

EDGE CASES:

- If a story has zero sources in location data (shouldn't happen but handle gracefully), hide the Coverage Map section entirely and show "Coverage Map data unavailable for this story" instead

- If all sources are in a single country (e.g., all U.S.), the World view just shows that one country shaded — that's fine, it's accurate

**What "done" look****s like: **Expand "How We Know" on any story. See the Coverage Map section with the U.S./World toggle. Both views render correctly. Tapping a shaded region shows which source covered the story from there. The summary line below shows the coverage ratio.

**If so****mething goes wrong: **react-simple-maps sometimes has issues with specific topojson data. If the map does not render, tell Claude Code: "The map is not rendering. Here is what I see:" and describe what's wrong. It may need to try alternative topojson sources.

*🎯** Jackson's task — Map Feedback: Show Jackson the Coverage Map on a story. Ask: Do you understand what the map is showing? Does the word "coverage"** make sense, or should we call it something else? Does the U.S./World toggle make sense? Is there anything confusing?*

### Phase 4: Content Loading (Sessions 14–16a)

This is where you write real Lens stories and load them into the app. You will do this work in Claude (the chat interface), not in Claude Code.

#### Session 14: Write your story batch (including Below the Radar candidates)

**What you are doing: **Writing 10–14 real Lens stories using the bias filter methodology. You do this in conversation with Claude (here), not in Claude Code.

*NEW in v3.1: Story batch now includes 2–3 Below the Radar candidates — stories that a wire service (AP or Reuters) has covered but that few other outlets have picked up. These demonstrate the Below the Radar feature.*

*🎯** Jackson's task** — Story Topic Selection: Before writing stories, Jackson and Rebecca look at the week's news together and Jackson picks stories he thinks are important and interesting. The goal is diversity across the 10 topics. Jackson has equal say here — these stories** represent what Lens is.*

**How to do it:**

Come to this chat (or a new Claude conversation) with a current news story you want to cover. Say:

I need you to write a Lens story about [topic]. Use the Bias Filter Engine methodology from the system prompt. Search for current reporting on this story from multiple sources across the media spectrum.

 

Then produce the complete story in this exact JSON structure, at all three reading levels:

 

{

  id: "[short-kebab-case-id]",

  headline: "[factual, neutral headline]",

  summary: "[one sentence summary]",

  topic: "[one of the 10 Lens topics]",

  topicIcon: "[emoji]",

  confidenceBadge: "green" or "yellow",

  publishedAt: "[today's date ISO]",

  ageGate: "all" or "teen" or "adult",

  belowTheRadar: false,  // set true ONLY for Below the Radar candidates (see below)

  readingLevels: {

    young: {

      whatHappened: "...",

      whyItMatters: "...",

      whatPeopleThink: [

        { perspective: "People who support this say...", content: "..." },

        { perspective: "People who oppose this say...", content: "..." }

      ],

      whatWeDontKnow: "...",

      tapToDefine: [

        { word: "...", definition: "..." }

      ]

    },

    teen: { same structure },

    adult: { same structure }

  },

  sources: {

    confirming: [

      { name: "AP", type: "Wire Service", location: { country: "US", usState: null } },

      { name: "BBC", type: "International", location: { country: "GB", usState: null } },

      { name: "Los Angeles Times", type: "US Regional", location: { country: "US", usState: "CA" } }

    ],

    methodology: "This story was built from [X] sources across [Y] editorial perspectives. Key facts confirmed by..."

  },

  goDeeper: [

    { label: "Full bill text", url: "https://..." }

  ]

}

 

Follow the reading level specs from the Bible:

- Young Reader: Lexile 400–800L, sentences under 15 words, one idea per sentence, define concepts inline

- Teen Reader: Lexile 800–1100L, sentences 15–25 words, assume basic civic knowledge

- Adult Reader: Lexile 1100–1400L, full vocabulary, assume general knowledge

 

Follow the word count targets:

- "What Happened": Young 150–250, Teen 200–350, Adult 300–500

- "Why It Matters": Young 100–150, Teen 150–250, Adult 200–350

- "What People Think": Young 75–125, Teen 100–175, Adult 125–225 per perspective

- "What We Don't Know": All levels 50–150

 

Include 5–10 tap-to-define words per reading level, with context-aware definitions.

Present at least 2 (up to 5) meaningfully distinct perspectives, each given its strongest version.

For EVERY source in "confirming," include accurate location data (country code, plus US state for US sources).

**Aim for diversity across the 10 topics.** A good initial batch might be:

- 2–3 Government & Politics stories

- 2 World News stories

- 1 Science & Space

- 1 Technology

- 1 Business & Money

- 1 Health or Environment

- 1 Sports or Arts & Entertainment

- 1 story that should be age-gated TEEN AND ABOVE (to test the age-gating)

- **2–3 Below the Radar candidates **(NEW in v3.1) — stories that have a wire service source (AP or Reuters) but that most other outlets have not picked up. Set belowTheRadar: true. These should use 3–4 sources total (not the full 10+). Confidence badge will be yellow.

You already have the Jimmy Lai and DHS Shutdown stories from earlier sessions — convert those to this JSON format and include them.

*🎯** Jackson's task — Story Quality Review: After the stories are written, Jackson reads each one at Young Reader level before they go into the app. **He's checking: Does it make sense? Is it interesting? Does it feel too long, too short, or just right? Are there any sentences hard to understand? Does it feel biased? Per story: "Good to go" or specific feedback.*

*🎯** Jackson's task — Bias Detector (Most Im**portant Job): Read every story at Young Reader level and answer ONE question: Does this story feel like it's trying to make me think a certain way? If yes: What way? Which words or sentences made it feel that way? This is Jackson's superpower — the reason **Lens exists.*

#### Session 15: Load stories into the app

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

I have [12–14] real Lens stories to load into the app. I'm going to paste the story data into the stories.ts file.

 

[Paste your story JSON array here]

 

Replace the placeholder stories with these real stories. Make sure:

1. All stories render correctly on the home screen cards

2. Stories where belowTheRadar is true appear in the Below the Radar section (not in Today's Stories)

3. Stories where belowTheRadar is false appear in Today's Stories

4. All stories render correctly on the story detail pages at all three reading levels

5. The topic filtering works (stories only show for selected topics)

6. Age gating works (Young Reader doesn't see teen/adult stories, Teen doesn't see adult stories)

7. Confidence badges display correctly (green vs yellow)

8. "How We Know" shows the right sources for each story

9. The Coverage Map inside "How We Know" renders correctly for each story (U.S. view for U.S.-heavy stories, World view for international)

10. "Tap to Define" words are properly underlined and definitions appear

11. "Go Deeper" links point to real URLs

12. Search (at /search) finds these stories correctly across all topics

 

Also update the daily briefing card on the home screen to reference the actual top stories by source count.

 

After loading stories, re-run the audio generation script from Session 12 to generate ElevenLabs audio for all the new stories.

**What "done" looks like: **All your real stories are in the app. Today's Stories, Below the Radar, search, and Coverage Map all show correct content. Audio plays for every story.

#### Session 16: Content review with Jackson

**This is not a Claude Code session — this is Jackson's first real test of the complete app.**

Open the app on a phone (use the Vercel URL). Set the profile to Young Reader. Hand it to Jackson.

**Watch what he does. Note:**

- Does he understand the onboarding without help?

- Can he navigate the home screen? Does he notice the Below the Radar section?

- Does he try the Search tab?

- Does he read the stories? Which tabs does he use?

- Does he tap any "Tap to Define" words?

- Does he open "How We Know" and look at the Coverage Map?

- Does he try the audio? Does the voice sound right?

- Does anything confuse him?

- Does he say any story "feels biased" or "sounds like it's taking a side"?

Whatever he flags, bring it to the next Claude Code session as fixes.

*🎯** Jackson's task — The Full Beta: This is his session. His specific checklist:*

- Go through onboarding from scratch — is it smooth?

- Browse the home feed — do the story cards make you want to tap?

- Check Below the Radar — do you understand what it is?

- Use Search — can you find a story you remember reading?

- Read at least 5 stories cover to cover (all four tabs)

- Use Tap to Define on every story

- Listen to at least 3 stories using the audio player

- Listen to the Daily Briefing all the way through

- Try switching voices in Settings — does the new voice play?

- Try "How We Know" on at least 3 stories — including the Coverage Map. Does it make sense?

- Try "Report a Problem" — is it easy to use?

- Overall: does this feel like something you'd actually use every morning?

#### Session 16a: Below the Radar polish (NEW in v3.1)

**What you are building: **Refinements to the Below the Radar section based on how the real stories look in it, plus edge-case handling.

*NEW in v3.**1 — The Below the Radar section was scaffolded in Session 6. This session is for polish once real Below-the-Radar stories are in the app (from Session 15).*

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context — particularly Section 3.3 on Below the Radar.

 

Now that real Below the Radar stories are loaded, polish the section:

 

1. Visual hierarchy:

  - The "Below the Radar" section header should be slightly smaller than "Today's Stories" header — about 80% the size — to signal it is secondary

  - Add a thin horizontal divider line above the Below the Radar section to separate it from Today's Stories

  - Slight top padding/margin above the divider

 

2. Section copy:

  - Under the "Below the Radar" header, show: "Stories other outlets are under-covering. Fewer sources have reported these, so facts may still be developing."

  - Next to the header, add a small info icon (ⓘ). Tapping it shows a popup that says:

    "Why these are here: Lens tracks stories across 125+ sources. When a credible wire service (AP or Reuters) reports something but few other outlets pick it up, we include it here so you don't miss it. Source counts are lower, so we mark every story here as Developing."

 

3. Empty state handling:

  - If the user has age/topic filters that result in zero Below the Radar stories, HIDE the entire section (don't show an empty header)

  - This already works from Session 6 — verify it still works with real data

 

4. Maximum 3 stories:

  - If more than 3 eligible Below the Radar stories exist for a user, show the 3 most recent

  - Rotate daily if possible (for MVP, just sorting by publishedAt is fine)

 

5. Story card treatment:

  - Every card in Below the Radar automatically shows the yellow (Developing) confidence badge

  - Below the badge, add subtle text: "Few sources" in small gray

  - Tapping the card opens the story page normally

 

6. On the story page for a Below the Radar story:

  - Add a small banner at the top (above the headline) that says: "Below the Radar — fewer sources have reported this story"

  - The banner should be subtle, not alarming

 

Test with Young Reader, Teen Reader, and Adult Reader profiles. Test with and without topic filters.

**What "done" looks like: **Below the Radar feels visually distinct from Today's Stories but still belongs in the same app. The info icon explains the concept. Users who open a Below the Radar story see the banner and understand why coverage is limited.

*🎯** Jackson's task — Below the Radar Feedback: Show Jackson a Below the Radar story. Ask: Do you understand why this story is here and not in the main feed? Does the yellow badge make sense? Wou**ld you trust a story with fewer sources? His honest answer matters — if a 9-year-old finds it confusing, we need clearer copy.*

### Phase 5: Demo Polish (Sessions 17–18)

#### Session 17: Fix Jackson's feedback + visual polish

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Jackson tested the app and here's his feedback:

 

[Paste Jackson's specific feedback here]

 

Please fix these issues.

 

Also, general polish:

1. Add a splash screen when the app first loads — the "lens." wordmark centered on a white background, visible for 1–2 seconds. Make it feel premium.

2. Make sure the PWA install prompt works — when someone visits the URL on their phone, they should be able to add Lens to their home screen.

3. Add proper page titles and meta descriptions for SEO.

4. Make sure the app works offline — cached stories should be viewable without an internet connection. Search should work on cached stories offline.

5. Test on both an iPhone and an Android phone if possible. Fix any issues.

6. Verify all three new-in-v3.1 features polish correctly across profiles:

  - Search (works, results age-gated, dates prominent)

  - Coverage Map (renders, toggle works, mobile-friendly)

  - Below the Radar (visible when stories exist, hidden when none match filters)

**What "done" looks like: **Jackson's specific feedback is addressed. The app has splash screen, offline support, PWA install. All three new v3.1 features polish cleanly.

#### Session 18: Final demo review and deploy

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Final review of the Lens demo app before I share it publicly:

 

1. Walk through the entire user flow and check for any broken links, missing content, or visual issues:

  - Fresh user: onboarding → home → browse stories → read a story → all four tabs → How We Know (with Coverage Map) → Go Deeper → Tap to Define → listen to audio → daily briefing → settings

  - Below the Radar: visible, stories open correctly, banner shows on story page

  - Search: tab works, keyword search returns results, topic timeline works, dates are prominent

 

2. Check that these edge cases work:

  - User with only 1 topic selected (thin feed is OK)

  - Young Reader seeing only age-appropriate stories across feed, Below the Radar, AND search

  - Switching between reading levels on the same story

  - Every story card links to the correct story page

  - All five voices play correctly on every story

  - Coverage Map renders for stories with all-US sources, all-international sources, and mixed

 

3. Make sure the deployed Vercel version matches what I see locally.

 

4. Add a small "Beta" badge in the corner of the app — very subtle, just to signal this is a preview.

 

Deploy the final version to Vercel.

**What "done" looks like: **You have a live URL you can share with anyone. They open it on their phone, go through onboarding, and experience Lens with real stories, real narrator voices, Search, Coverage Map, and Below the Radar. This is your prototype. This is what you show the Knight Foundation.

*🎯** Ja**ckson's task — The "Show a Friend" Test: Show the app to one friend (with parent permission). Do not explain anything — just hand them the phone. Note: Can they figure out onboarding alone? Do they read a story? Do they try Search? Do they notice Below the** Radar? Do they seem interested or bored? What do they say? Report back.*

### Pause Point: Demo App Complete

At this point you have a working demo app and can:

- Apply for grants with a live product URL (Knight Foundation application can now be submitted)

- Show it to potential advisors and investors

- Share it with teachers for the school/classroom angle

- Use it as a recruiting tool for a technical co-founder

- Continue testing with Jackson and collecting feedback

You can also continue adding new stories anytime by writing them in Claude and pasting them into the data file (then re-running the audio generation script for new stories).

**Take a breath. You and Jackson built something real.**

## Stage 2: The Live Engine

Connecting the app to an automated story pipeline. Timeline: ~7 weeks (Sessions 19–45+).

Stage 2 replaces the pre-loaded stories with a live, automated system. This is the harder engineering work. The sessions below are less prescriptive than Stage 1 because backend development is more iterative — you will hit issues that require back-and-forth with Claude Code. But the sequence and prompts give you a clear path.

*Important: Stage 2 is where having a developer (even part-time) would help most. If grant fundi**ng comes through during Stage 1, consider hiring someone for this phase. The prompts below assume you are doing it yourself with Claude Code, but they are also a solid spec for handing to a developer.*

*NEW in v3.1 for Stage 2: Sessions 24, 26, 28, and 29 no**w include references to Coverage Map generation, Below the Radar detection logic, and Search index maintenance. See callouts within those sessions.*

### Phase 6: Database and Infrastructure (Sessions 19–22)

#### Session 19: Set up Railway and PostgreSQL

**What you are**** building: **The backend server and database that will store stories, users, and all app data.

**Before this session: **Create a Railway account at railway.app (free tier available).

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

I need to set up the backend infrastructure for Lens on Railway.

 

Create a Node.js/Express backend service with:

- PostgreSQL database on Railway

- Redis cache on Railway

- The following database tables:

 

STORIES table:

- id (primary key)

- headline

- summary

- topic, topic_icon

- confidence_badge (green/yellow)

- age_gate (all/teen/adult)

- below_the_radar (boolean)  -- NEW in v3.1

- published_at (timestamp)

- source_count (integer)

- editorial_perspective_count (integer)  -- NEW in v3.1, for Below the Radar logic

- is_published (boolean)

- coverage_map_default_view (text, 'us' or 'world')  -- NEW in v3.1

- created_at, updated_at

 

STORY_CONTENT table:

- id (primary key)

- story_id (foreign key to stories)

- reading_level (young/teen/adult)

- what_happened, why_it_matters, what_we_dont_know (text)

- tap_to_define (JSON array)

- created_at, updated_at

 

PERSPECTIVES table:

- id (primary key)

- story_id (foreign key), reading_level

- perspective_label, content (text)

- display_order (integer)

 

SOURCES table:  -- extended in v3.1 with location for Coverage Map

- id (primary key)

- story_id (foreign key)

- source_name, source_type

- source_country (text, ISO-3166 alpha-2)

- source_us_state (text, nullable)

- confirmed_claims (text)

 

STORY_METADATA table:

- id (primary key)

- story_id (foreign key)

- methodology (text)

- go_deeper_links (JSON array)

- qc_status (passed/flagged/rejected)

- qc_flags (JSON array)

- correction_history (JSON array)

 

USERS table:

- id (primary key)

- email (encrypted), password_hash (bcrypt)

- coppa_consent_record (encrypted, nullable)

- created_at

 

PROFILES table:

- id (primary key), user_id (foreign key)

- name, reading_level

- selected_topics (JSON array)

- news_format (read/hear/both), voice_preference

- created_at, updated_at

 

Also create a PostgreSQL full-text search index on stories.headline, stories.summary, and story_content.what_happened — this powers the Search feature.

 

Set up the Express server with basic API routes:

- GET /api/stories (list published stories, filterable by topic, age gate, and belowTheRadar)

- GET /api/stories/:id (get full story with content at specified reading level)

- GET /api/search?q=... (full-text search across published stories)

- GET /api/topics/:topic/timeline (all stories for a topic, oldest-first)

- POST /api/auth/register

- POST /api/auth/login

 

Deploy the backend to Railway and confirm it's accessible.

#### Session 20: Connect the frontend to the backend

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Connect the Lens frontend app to the new Railway backend API.

 

1. Replace the local /src/data/stories.ts data with API calls to the backend

2. The home screen should fetch stories from GET /api/stories with topic, age-gate, and belowTheRadar filters (one call for Today's Stories with belowTheRadar=false, one call with belowTheRadar=true for Below the Radar section)

3. The story page should fetch full story content from GET /api/stories/:id with the user's reading level

4. The search page should call GET /api/search?q=... for keyword search and GET /api/topics/:topic/timeline for topic timeline

5. Coverage Map data comes from the story's sources array (already in the story response) — no separate API call needed

6. Keep the local data file as a fallback — if the API is unreachable, show cached/local stories

7. Add loading states for when data is being fetched

8. Add error states for when the API is down ("Unable to load stories. Showing cached content.")

 

Migrate the existing pre-loaded stories from the data file into the PostgreSQL database so the API serves real content immediately.

 

Update the Vercel deployment to point to the Railway backend URL.

#### Sessions 21–22: User authentication

**Session 21 prompt:**

Build the user authentication system for Lens.

 

Registration flow:

- Sign up with email + password

- Password hashed with bcrypt before storage — never store plain text

- Email verification via Resend (send a verification link)

- After verification, user can create their first profile and go through onboarding

- Rate limit: maximum 3 account registrations per IP per day

 

Login flow:

- Email + password login

- Return a JWT token for session management

- Token stored in httpOnly cookie (not localStorage for security)

 

Password reset:

- "Forgot password" sends reset email via Resend with unique token (1 hour expiration)

- Token is single-use

- Rate limit: maximum 3 reset requests per hour per email

 

For the Google and Apple sign-in integrations, create placeholder buttons that show "Coming soon" — we'll implement these after core auth is working.

 

Move onboarding preferences from localStorage to the user's profile in the database.

**Session 22 prompt:**

Build the multi-profile system for Lens.

 

One account (adult email) can have multiple reader profiles:

- Each profile has: name, reading level, selected topics, news format, voice preference

- Profile switching: dropdown or tap on the profile name to switch

- The home feed, story content, and age gating all update immediately when switching profiles

 

A parent with an Adult profile, a teen on Teen Reader, and a child on Young Reader should all work under one account login.

 

If any profile is set to Young Reader, trigger the COPPA consent flow:

- Show a screen explaining that parental consent is needed

- Parent enters a separate email address

- Resend sends a verification email to the parent

- Parent clicks to confirm

- Consent record stored encrypted with timestamp

- Block the Young Reader profile from being used until consent is confirmed

 

This is a legal requirement — it must work before launch.

### Phase 7: The Bias Filter Engine (Sessions 23–30)

This is the core of Lens — the automated system that detects stories, gathers sources, extracts facts, and writes bias-filtered stories.

#### Session 23: RSS feed parser and source monitoring

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the source monitoring service for Lens. This service runs as a scheduled job every 15 minutes, 24/7.

 

For MVP, it monitors sources via RSS feeds and the NewsAPI.org API.

 

1. Create an RSS parser that fetches feeds from the Lens clustering source list. Start with these 10 core sources:

  - AP News RSS (location: US)

  - Reuters RSS (location: GB)

  - BBC News RSS (location: GB)

  - CNN RSS (location: US)

  - NPR RSS (location: US)

  - PBS NewsHour RSS (location: US)

  - Fox News RSS (location: US)

  - The Hill RSS (location: US)

  - Al Jazeera RSS (location: QA)

  - The Guardian RSS (location: GB)

 

Each source has known country + (for US) state location — store this in a SOURCE_REGISTRY table so we can attach it to feed items automatically.

 

2. Also integrate NewsAPI.org for broader coverage.

 

3. For each incoming article, store in FEED_ITEMS:

  - Source name, source type, source country, source US state (nullable)

  - Headline, summary/description, URL, published timestamp

  - Topic classification (use Claude API to classify into the 10 Lens topics)

 

4. Set up the scheduled job on Railway to run every 15 minutes.

 

5. Error handling: if a source feed is down, skip silently and retry next cycle. Log errors internally. Flag in logs if a source is down for 24+ hours. Never show errors to users.

#### Session 24: Story clustering + Below the Radar detection

*NEW in v3.1: Clustering service now explicitly tracks clusters that hit detection threshold but not publication threshold, taggin**g them for Below the Radar evaluation.*

**Prompt for Claude Code:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the story clustering service. After each RSS polling cycle, this service groups incoming articles into story clusters — articles covering the same specific event.

 

Rules from the Lens Bible:

- Cluster by specific event, not by actor or topic

- Two actions by the same person on the same day are SEPARATE events if they produce different outcomes or are covered in separate wire service stories

- Rolling 24-hour detection window

 

Implementation:

1. After each polling cycle, take all new feed items from the last 24 hours

2. Send them to the Claude API with this prompt:

"You are a news clustering engine. Group these articles by specific event. Each cluster should represent one distinct event. Return cluster IDs, event descriptions, and article assignments."

3. Track cluster sizes:

  - DETECTION threshold: 3+ clustering sources covering the same event → start tracking

  - PUBLICATION threshold: 5+ sources across 2+ editorial perspectives → queue for full story generation

  - BELOW THE RADAR: cluster hit detection threshold (3+) but did NOT reach publication threshold within 24 hours, AND at least one source is Tier 1 (AP or Reuters) → queue for Below the Radar generation

4. Store clusters in STORY_CLUSTERS table with:

  - cluster_id, event_description

  - source_count, editorial_perspective_count

  - status (detected/publication_ready/below_the_radar_ready/published/archived)

  - first_detected_at, last_updated_at

  - has_tier1_source (boolean — for Below the Radar qualification)

5. When a cluster crosses the publication threshold → trigger full story generation pipeline (next session)

6. When a cluster hits 24 hours in detected state with has_tier1_source=true → trigger Below the Radar generation (abbreviated pipeline — see Session 26)

 

Editorial perspective counting: for now, tag each source in SOURCE_REGISTRY with a perspective category (left/center-left/center/center-right/right/international/wire/other) and count distinct categories present in a cluster.

#### Sessions 25–26: Story generation pipeline (including Below the Radar pipeline)

**Session 25 prompt — Fact Extraction:**

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build the story generation pipeline — the service that takes a story cluster that has crossed the publication threshold and produces a complete Lens story.

 

The Bias Filter Engine System Prompt is in /docs/bias-filter-prompt.md — read it now. This is the most important document in the project.

 

This pipeline has three steps. Build Step 1 (Fact Extraction) this session:

 

Step 1: Fact Extraction

- Gather all source material for the cluster (headlines, summaries, available text)

- Send to Claude API with the Bias Filter Engine System Prompt

- Claude extracts a structured fact table:

  {

    confirmed_facts: [

      { claim: "...", confirming_sources: ["AP", "Reuters", "BBC"], confidence: "high" }

    ],

    contested_facts: [

      { claim: "...", source_for: "...", source_against: "...", confidence: "low" }

    ],

    perspectives: [

      { viewpoint: "...", strongest_version: "...", held_by: "..." }

    ],

    open_questions: ["..."],

    primary_source_references: [

      { type: "bill", reference: "H.R. 1234", url: "https://congress.gov/..." }

    ]

  }

- Store the fact table in a FACT_TABLES table linked to the story

 

This is the most critical step — the quality of the fact extraction determines everything downstream.

**Session 26 prompt — Story Writing + Primary Source Linking + Below the Radar pipeline + Coverage Map:**

*NEW in v3.1: Session 26 also builds the abbreviated Below the Radar story pipeline and the Coverage Map data generation.*

CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context.

 

Build Steps 2 and 3 of the story generation pipeline, plus the Below the Radar pipeline and Coverage Map generation.

 

Step 2: Story Writing (full stories)

- Take the structured fact table from Step 1

- Send to Claude API with a story writing prompt that specifies:

  - Write at all three reading levels (Young, Teen, Adult)

  - Follow the Lexile specs

  - Follow the word count targets

  - Apply all three bias filters

  - Identify 5–10 tap-to-define words per reading level with context-aware definitions

  - Randomize perspective order and lock it

  - Assign confidence badge (green or yellow) based on the fact-stability criteria

  - Assign age gate (all/teen/adult) based on the content criteria

- Parse the response and store in STORY_CONTENT, PERSPECTIVES, STORIES tables

 

Step 3: Primary Source Linking

- Extract bill numbers, regulation references, executive order numbers from the fact table

- Query Congress.gov API and GovInfo.gov to generate "Go Deeper" links

- Also capture primary source URLs from the source articles

- Store in STORY_METADATA

 

Step 4: Coverage Map generation (NEW in v3.1)

- For each source in the story's SOURCES table, confirm country + usState are populated (from SOURCE_REGISTRY)

- Count sources by country and by US state

- Set the story's coverage_map_default_view field:

  - If >= 70% of sources are US-based, default to 'us'

  - Otherwise default to 'world'

- No separate map data to store — the frontend renders the map from the SOURCES table directly

 

Step 5: Below the Radar pipeline (NEW in v3.1)

For clusters flagged with status='below_the_radar_ready' (from Session 24), run an ABBREVIATED version of Steps 1–3:

- Step 1 (Fact Extraction): same as above, but from fewer sources (3–4 typical)

- Step 2 (Story Writing): same, but:

  - Confidence badge is automatically set to 'yellow' (fewer sources = developing by definition)

  - below_the_radar field set to TRUE on the story

  - Still writes all three reading levels

  - Still applies bias filters

- Step 3 (Primary Source Linking): same

- Step 4 (Coverage Map): same — even Below the Radar stories get a Coverage Map

- Publish these to the Below the Radar section of the home feed (not Today's Stories)

 

Reference /docs/build-document.md for reading level specs, word count targets, confidence badge criteria, and age-gating rules.

#### Sessions 27–28: QC Pipeline

**Session 27 prompt — QC Pipeline (7 checks):**

Build the automated QC pipeline. Every story must pass all 7 checks before publishing.

 

Check 1: Fact Verification

- Every claim in "What Happened" must trace back to 2+ confirming sources with different editorial perspectives (for full stories; Below the Radar stories have a relaxed check of 1+ Tier 1 source)

- Claims that can't be verified are moved to "What We Don't Know"

 

Check 2: Bias Filter Verification

- SEPARATE Claude API call — a fresh-eyes check that reads the finished story with no knowledge of the sources

- Prompt: "Read this news story. Does it contain loaded language, emotional framing, opinion presented as fact, or unbalanced perspectives? Flag specific passages."

 

Check 3: Plagiarism Check

- Fuzzy string matching comparing story text against source material

- Flag passages that are too close to original source language

 

Check 4: Reading Level Verification

- Automated Lexile estimate of the output

- Flag if outside target range for the reading level

 

Check 5: Age-Gate Classification

- Verify the assigned age gate matches the criteria (ALL AGES / TEEN AND ABOVE / ADULT ONLY)

 

Check 6: Perspective Balance

- Count perspectives in "What People Think" — minimum 2

- Check that no perspective gets significantly more word count than others (no perspective should exceed 150% of the shortest perspective's word count)

 

Check 7: Completeness

- All four tabs have content

- Confidence badge is assigned

- Source list is populated for "How We Know"

- Definitions are generated for "Tap to Define"

- Methodology note exists

- Coverage Map data is populated (NEW in v3.1 — verify every source has location data)

 

Store QC results in STORY_METADATA. Return pass/fail with specific flags.

**Session 28: Fix whatever Session 27 QC pipeline reveals. Iterate.**

#### Sessions 29–30: Publishing, dashboard, integration testing

**Session 29 prompt:**

Build the publishing logic and confidence tier system.

 

After QC:

- HIGH confidence (all checks pass, high fact confidence): publish automatically. Log in dashboard, no notification.

- MEDIUM confidence (all checks pass, some facts medium confidence): publish automatically. Send email to Rebecca via Resend with story title and link.

- LOW confidence (any QC check fails): HOLD from publishing. Send email to Rebecca via Resend with story title, flag reasons, and link to dashboard.

- BELOW THE RADAR (NEW in v3.1): always publishes with yellow badge, goes to Below the Radar section only. Email notification to Rebecca on the first Below the Radar story of the day, then batch subsequent ones.

 

Build the Circuit Breaker:

- If more than 30% of stories in a single day fail any QC check, automatically pause all publishing

- Send alert email: "Lens paused: unusual number of QC flags today"

- Nothing publishes until Rebecca unpauses via the dashboard or the next day's cycle starts clean

 

Build the Rebecca Dashboard:

- Internal web page (password-protected, accessible only to Rebecca)

- Shows: queue of flagged stories with QC reasons, list of all published stories (Today's Stories + Below the Radar, filterable), QC pass/fail rates

- Actions on each story: approve, edit, reject

- Unpause button for the circuit breaker

- Daily digest: summary of previous day's activity — stories published (Today's Stories + Below the Radar counts separately), stories flagged, auto-approval rate

 

NEW in v3.1: Maintain the search index

- After every story is published or edited, update the PostgreSQL full-text search index

- Ensure Below the Radar stories are included in search results (they should appear, marked as Developing)

 

Set up the daily morning digest email via Resend — sent at 7:00 AM ET with the previous day's summary.

**Session 30: End-to-end pipe****line test.**

Run the full pipeline end to end with a single real news event.

 

1. Trigger the RSS polling service manually

2. Let it detect a story cluster

3. Let the cluster cross the publication threshold (or not — also test a cluster that should go to Below the Radar)

4. Let the story generation pipeline produce a complete story at all three reading levels

5. Let the QC pipeline run all 7 checks

6. Let the publishing logic decide what to do with it

7. Verify Coverage Map renders for the generated story

8. Verify story appears in Search

 

Show me the output at each step so I can verify:

- Is the clustering correct?

- Is the fact extraction accurate?

- Are the three reading levels appropriately different?

- Did the bias filters catch anything?

- Did QC pass or flag anything?

- Is the published story correct in the database?

- Does it appear correctly in the frontend app — Today's Stories, Below the Radar, or held in the dashboard?

- Does the Coverage Map render correctly?

- Does Search find it?

 

This is the most important test. Take it slowly and show me everything.

### Phase 8: Audio (Sessions 31–34)

#### Session 31: ElevenLabs integration for live stories

**Before this session: **Your ElevenLabs account and five voice characters are already set up from Session 11.5. This session connects them to the live pipeline.

**Prompt for Claude Code:**

Build the audio generation service for the live engine.

 

When a story is published (including Below the Radar stories), the backend should:

1. Send the story text to the ElevenLabs API for each voice character at each reading level

2. 5 voices × 3 reading levels = 15 audio files per story

3. Store audio files in Cloudflare R2

4. Link audio file URLs to the story in the database

 

Before this session, I need to set up a Cloudflare R2 bucket. Help me configure:

- R2 bucket creation

- API credentials for uploading from the backend

- Public URL configuration for serving audio to the app

 

The audio generation should happen asynchronously — don't block story publishing while audio is being generated.

 

Use the shared caching model: audio is generated once per voice per reading level and shared across all users.

#### Sessions 32–33: Daily briefing builder + frontend audio connection

**Session 32 prompt:**

Build the Daily Briefing system.

 

Generation logic:

1. Runs at 6:00 AM in the user's local time zone

2. Selects top 5–7 stories by source count (most-covered = most significant) from Today's Stories (belowTheRadar = false)

3. Filters by user's selected topics

4. PLUS top 1–2 stories of the day regardless of topic selection (biggest news everyone should hear)

5. Checks age gate before including each story — if a story is gated above the user's reading level, pull the next eligible story

6. Does NOT include Below the Radar stories in the main briefing (they have their own section — keep the morning briefing focused on the most-confirmed stories)

7. Compiles the "What Happened" text of each selected story into a single script

8. Adds brief transitions between stories ("Next..." or "In other news...")

9. Sends the compiled script to ElevenLabs in the user's chosen voice at their reading level

10. Stores the compiled audio in Cloudflare R2

11. Updates the "Your Morning News Show" card on the home screen with the new briefing

 

Target length: 5–12 minutes depending on news volume.

 

Because briefing is personalized (different topic selections), multiple briefing versions may need to be generated. Optimize for the most common topic combinations.

**Session 33 prompt — Frontend audio connection:**

Connect the real ElevenLabs audio to the frontend:

1. On the home screen, the "Your Morning News Show" card should now play the actual daily briefing audio from Cloudflare R2

2. On story pages (including Below the Radar), the "Listen to this story" player should play the real ElevenLabs audio in the user's chosen voice at their reading level

3. The audio player UI should remain the same — play/pause, progress bar, time remaining

4. Add a loading state for when audio is still being generated ("Audio generating — check back shortly")

5. Handle the edge case where audio generation failed — show "Audio unavailable for this story" gracefully

*🎯** Jackson's task — Voice Quality Tester: Listen to the same story in all five voices. Do they all sound natural? Does any **voice stumble on certain words or sound robotic on specific sentences? Per voice: sounds good / sounds weird on [specific story or phrase].*

#### Session 34: Audio polish

**Prompt for Claude Code:**

Polish the audio experience:

1. Background audio playback — the audio should continue playing if the user switches to another app or locks their phone.

2. The daily briefing should remember where the user left off if they pause and come back later.

3. Add a playback speed option (1x, 1.25x, 1.5x) on the audio player.

4. Make sure the voice selection in Settings actually changes which audio files are served.

5. Test all five voices on a real story — do they all generate correctly from ElevenLabs?

### Phase 9: Email and Notifications (Sessions 35–36)

#### Session 35: Resend email system

**Prompt for Claude Code:**

Build the email system using Resend.

 

1. Transactional emails (triggered by events):

  - Account verification email (on registration)

  - Password reset email

  - COPPA parental consent email

  - "Report a Problem" submission forwarded to hello@thelens.media

 

2. QC notification emails (automated):

  - MEDIUM confidence story published: email to Rebecca with story title, link to dashboard

  - LOW confidence / QC flag: email to Rebecca with story title, flag reasons, link to dashboard

  - Circuit breaker triggered: alert email

  - First Below the Radar story of the day: email to Rebecca (batch subsequent ones)

  - Daily morning digest at 7:00 AM ET (Today's Stories count + Below the Radar count separately)

 

3. Push notification (daily briefing):

  - "Your morning briefing is ready" — sent when the user's daily briefing audio is generated

  - Opt-in only

  - Implement via PWA service worker push notification

 

All emails should be clean, minimal, branded with the "lens." wordmark. No marketing fluff.

#### Session 36: Pre-launch email sequence

**Prompt for Claude Code:**

Build the pre-launch email sequence for landing page signups.

 

Connect to the existing landing page email signup form (already deployed on Vercel). When someone signs up, they enter a 4-email drip sequence:

 

Email 1 — Immediate confirmation:

Subject: "You're on the list."

Body: Brief, clean. "Thanks for signing up for Lens. We'll let you know when it's ready. In the meantime — the news keeps happening, and we're building something to help you see it clearly."

 

Email 2 — One week after signup:

Subject: "How Lens works"

Body: Brief explanation of the three-step process (Aggregate → Analyze → Clarify). Clean, informative, builds confidence.

 

Email 3 — Two weeks after signup:

Subject: "We're getting close"

Body: Teaser — "We're in final testing. Here's a preview of what a Lens story looks like." Include a screenshot or a sample story summary.

 

Email 4 — Launch day (triggered manually):

Subject: "Lens is live"

Body: Direct link to the app. Brief, exciting, not over the top.

 

Set these up as a drip sequence in Resend — Email 1 sends immediately, Emails 2 and 3 on delay. Email 4 is triggered manually when we're ready to launch.

### Phase 10: Cost Monitoring and Security (Sessions 37–38)

#### Session 37: Cost monitoring

**Prompt for Claude Code:**

Build the cost monitoring system.

 

Add to the Rebecca Dashboard:

1. Daily cost tracker showing spend by service:

  - Anthropic Claude API (track tokens used and estimated cost)

  - ElevenLabs (track characters generated and estimated cost)

  - NewsAPI (track API calls)

  - Railway compute

  - Cloudflare R2 storage and bandwidth

2. Alert system via Resend:

  - Email at 75% of daily budget cap

  - Email at 90% of daily budget cap

3. Hard daily cap: $50/day

  - If reached, pause new story generation

  - Serve cached/existing content — app still works, users see published stories

  - Auto-resume next day or manual unpause via dashboard

4. Show 7-day and 30-day cost trends as simple charts in the dashboard

#### Session 38: Security review

**Prompt for Claude C****ode:**

Security review and hardening for Lens.

 

1. Confirm all passwords are bcrypt hashed, never stored in plain text

2. Confirm all API keys are in environment variables, never in code

3. Confirm HTTPS only (Vercel handles this for frontend, verify for Railway backend)

4. Confirm database encryption at rest is enabled on Railway

5. Confirm COPPA consent records and parent emails are AES-256 encrypted at the application level

6. Add rate limiting to all API endpoints:

  - Account creation: max 3 per IP per day

  - Login attempts: max 10 per IP per hour

  - Report a Problem: max 5 per user per day

  - Password reset: max 3 per email per hour

  - Search: max 60 per user per minute (prevent scraping)

7. Add CORS configuration — only allow requests from the Vercel frontend domain

8. Add input sanitization on all user inputs (especially the Search input)

9. Review for any exposed secrets or debug endpoints

 

List everything you check and confirm, and flag anything that needs fixing.

### Phase 11: Testing and Launch (Sessions 39–45)

#### Session 39: Jackson's full beta test

**Not a Claude Code session. This is Jackson testing the complete app with live stories.**

*🎯** Jackson's task — Full Week Beta: Use the complete app** every day for one week. His checklist: read every story — does it feel unbiased? Test all three reading levels. Use tap-to-define on every story. Listen to the Daily News Show in each voice. Check "What People Think" on every story — are perspectives bala**nced? Try "How We Know" including the Coverage Map on multiple stories. Check the Below the Radar section daily — do the stories there feel different from Today's Stories? Use Search at least once a day. Find things that are wrong and write them down. Dura**tion: One full week of daily use.*

#### Sessions 40–42: Fix Jackson's findings

Use Claude Code to fix whatever Jackson flags. These sessions are reactive — the prompts depend on what he finds.

**General format:**

Jackson tested the full Lens app for a week. Here are his findings:

 

[Paste Jackson's specific feedback]

 

Please fix these issues. For each fix, explain what you changed so I understand what happened.

#### Session 43: Soft launch preparation

**Prompt for Claude Code:**

Prepare Lens for soft launch (first 100–200 users from the landing page email list).

 

1. Verify the app handles multiple simultaneous users — test with simulated concurrent requests

2. Make sure the daily briefing generation works across different time zones

3. Verify the "Report a Problem" submissions arrive at hello@thelens.media correctly

4. Confirm all 10 topic categories are receiving stories (some will be thinner than others — that's OK)

5. Verify the circuit breaker and cost monitoring are working

6. Verify Below the Radar is populating daily (should have at least 1–3 stories/day from live engine)

7. Verify Search performs well under load (full-text search across full story archive)

8. Check that the app loads fast on a mobile connection (target: under 3 seconds)

9. Set up basic uptime monitoring — alert Rebecca if the backend goes down

 

Run through the complete user journey one more time:

New user → register → verify email → onboarding → home feed (Today's Stories + Below the Radar) → read story → all four tabs → How We Know + Coverage Map → Go Deeper → Tap to Define → listen to story → daily briefing → Search (keyword + topic timeline) → settings → change reading level → verify content updates

#### Sessions 44–45: Launch

**Session 4****4: **Send the launch email (Email 4) to your signup list. Monitor the dashboard for the first 24 hours. Watch for: error rates, cost spikes, QC flag rates, user registration numbers.

**Session 45: **Fix anything that breaks on day one. There will be something. That is normal.

*🎯** Jackson's task — V2 Feature Priorities: After using the live app for a few weeks, Jackson ranks the V2 features by what he wants most: "I Have a Question" (ask the AI about a story); Bias Radar; Spanish language version; Breaking news pus**h notifications; Classroom sharing features; Something else he thinks of. One sentence per feature explaining why. This shapes the V2 roadmap. (Note: Below the Radar and Search are no longer on this list — they shipped with MVP in v3.1.)*

### Jackson's Research Tasks (Can Be Done Anytime)

These are independent tasks Jackson can work on outside the build sessions.

#### School Research

Talk to his teacher (or a few teachers) and ask: Do you ever use news in the classroom? What is hard about it? If there was an app that gave kids unbiased news at their reading level, would you use it? What would make it useful for a classroom?

*Why it matt**ers: A real teacher expressing real interest is a quote for the Knight Foundation application.*

#### Competitive Research

Search the App Store for other news apps aimed at kids. Download any free ones. For each: What is it called? Does it feel biased? What does Lens do better? What does it do that Lens should consider?

*Why it matters: Knowing the competitive landscape strengt**hens every grant application and investor conversation.*

#### Kid Focus Group

After the demo is working, show Lens to 3–5 friends (with parent permission). Do not explain anything. Note: Can they figure it out? Do they seem interested? What do they say?

*Why it m**atters: Even 3–5 kids' reactions are real user research data.*

### Pending Decisions

- **Cross-device sync: **For PWA, handled by the database when logged in. Offline changes need a sync strategy. Can defer to post-launch.

- **Email signup flow details: **Landing page signup is built. Drip sequence covered in Session 36. Decide: should signups auto-create an account, or just join the email list?

- **Google and Apple sign-in: **Build after core email auth is working. Not required for soft launch.

### Accounts Rebecca Needs to Create

**B****efore Stage 1: **Vercel (already set up), Domain thelens.media (already registered)

**Before Stage 1, Phase 3 (Sessions 11.5–12): **ElevenLabs account — elevenlabs.io (Starter $5/month or Creator $22/month for one month)

**Before Stage 2, Phase 6: **Railway account — railway.app; Resend account — resend.com (verify thelens.media domain)

**Before Stage 2, Phase 7: **NewsAPI.org account; Congress.gov API key — api.congress.gov (free); Anthropic API key — console.anthropic.com (for the live engine — separate from using Claude in conversation)

**Before Stage 2, Phase 8: **Cloudflare R2 account — cloudflare.com

**Not needed until post-MVP native app: **Apple Developer Account ($99/year); Google Play Developer Account ($25 one-time)

### Estimated Costs

**Stage 1 (Demo App): ~$25–$50**

- Vercel hosting: free tier

- ElevenLabs: $5–$22 for one month (generate all demo audio, then downgrade or cancel)

- Your time: ~22 sessions × 1–2 hours = 22–44 hours over ~3 weeks (includes Sessions 11.5, 13a, 13b, and 16a)

**Stage 2 (Live Engine): **$1,250–$5,500/month once running. See cost breakdown in Part I, Section 8.

**One-time costs:**

- Legal (trademark, COPPA, privacy policy, ToS, PBC formation): $7,000–$10,000

- Logo design: $0–$2,000 (likely $0 — black/white wordmark already approved)

- Developer help if hired: $5,000–$15,000

### Documents in the Lens Build System

This Master Document (v1.1) supersedes and combines the following previously separate documents:

- Project Bible v3.0 → now Part I above, updated to v3.1

- Build Guide v3.0 → now Part II above, updated to v3.1

- Consolidated Build Document v1 — technical decisions merged into Part I Section 11 and throughout Part II

- V2 and Future Features — updated and included as Part I Section 13

The following documents remain separate and should be uploaded to the project alongside this Master Document:

- Bias Filter Engine System Prompt v1

- Regional Newspaper Source List — state-by-state with methodology

- Source Selection Methodology Note

- Knight Foundation Application v8

- General Grant/Investor Document v3

- Entity Structure Memo v2 (PBC confirmed)

- Lens Media PBC Founding Narrative

- Funding Needs Analysis & Entity Strategy

- Complete Legal Requirements Checklist

- Jackson's Build Contribution Plan

- Competitive Intelligence Report — February 2026

## Version Notes

**v1.1 — April 18, 2026: **Added "Claude Code Defaults" section at the top of Part II establishing Opus 4.7, xhigh thinking, and Auto Mode as defaults for every build session. Fixed four inconsistencies: Tab 4 name standardized to "What We Don't Know" (was inconsistently labeled "What We Don't Know Yet" in three places in Part I); added missing "What you are building" line to Session 13; corrected Stage 1 session count in Estimated Costs from 21 to 22 (the count had missed Sessions 11.5, 13a, 13b, and 16a); removed the "Reader" greeting placeholder on the home screen since onboarding does not collect a user name.

**v1.0 — April 18, 2026: **Initial combined master document. Merges Project Bible v3.0 and Build Guide v3.0 into a single file. Adds three new MVP features (Search, Coverage Mapping, Below the Radar) with integrated spec and dedicated build sessions (13a, 13b, 16a, plus updates throughout Stage 2). Updates logo direction to black/white only. Moves Below the Radar from V2 to MVP. Reflects the PBC entity conversion.

**Session tracking as of last update: **Sessions 1–13 complete; app live at https://lens-app-brown.vercel.app; GitHub repo at https://github.com/JGWIV/lens-app. Next session: 13a (Search).

*Last updated: April 18, 2026*

Page 2
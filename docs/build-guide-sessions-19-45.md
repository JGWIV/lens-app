Lens Build Guide
Sessions 19–45: Stage 2 (Live Engine) — Revised
Version dated May 3, 2026

What changed in this revision
This revision replaces Sessions 19 through 45 of the Build Guide v3.0. Stage 1 (Sessions 1–18) is unchanged and is not reproduced here — keep using the original Build Guide for those. The decisions below were made on May 3, 2026, before opening the Railway account, after a fresh review of what's matured since the original spec was written.
Summary of decisions
•	Backend split: Supabase handles data, authentication, and row-level security. Railway handles the engine (RSS polling, AI calls, audio orchestration). The frontend reads stories directly from Supabase; Railway only writes.
•	News API: Swapped NewsAPI.org for NewsMesh. NewsMesh handles ingestion and entity tagging across 90,000+ sources. Lens still does its own clustering using Claude — that part is editorial and stays in-house.
•	AI model routing: Per-step model selection instead of one model for everything. Haiku for cheap classification and definitions, Sonnet for story writing and QC, Opus for fact extraction. Estimated 50–70% reduction in AI cost vs. one-model approach.
•	Audio generation: Lazy generation instead of pre-generating all 15 versions per story. Generate audio on first request, cache forever in R2. Pre-generate only the Daily News Show, since that's pushed to users.
•	Redis: Dropped from MVP. Add back if profiling shows it's needed. Supabase Postgres with connection pooling is sufficient at this scale.
•	Search: PostgreSQL full-text search retained. Adequate for MVP scale; revisit only if it becomes a bottleneck.
•	Capacitor: Post-MVP path from PWA to native iOS/Android. No Stage 2 build changes needed — the PWA architecture is already Capacitor-compatible.
•	Other: Vercel (frontend), Cloudflare R2 (audio), Resend (email), ElevenLabs (voice), Anthropic Claude API, Congress.gov, GovInfo.gov — all unchanged.
Note on Anthropic API credits
The Anthropic Startup Program (anthropic.com/startups) requires VC backing through partner firms, so Lens does not qualify under the standard path until after a first round of funding. Three reachable paths exist now: (1) the automatic $5 new-account credit on platform.claude.com — take it, but it's only enough for development testing; (2) AWS Activate credits, which can be used to access Claude through AWS Bedrock — apply directly, no VC requirement; (3) direct outreach to Anthropic once the Knight Foundation grant is in motion, since Lens's PBC structure and journalism mission are mission-aligned. Reapply to the Startup Program after first VC funding. In the meantime, the daily $50 cost cap (Session 37) and per-step model routing keep direct API spend within budget.

Accounts and accounts-only changes
Before Session 19, set up these accounts. The list below replaces the original "Before Stage 2" list.
Before Session 19 (database + engine infrastructure)
•	Supabase — supabase.com (free tier is sufficient through soft launch; Pro is $25/month when needed)
•	Railway — railway.app (engine host; Hobby plan $5/month covers initial usage)
•	Resend — resend.com (verify thelens.media domain)
Before Session 23 (engine launch)
•	NewsMesh — newsmesh.co (start on free tier for development; $29/month entry-level for production)
•	Congress.gov API key — api.congress.gov (free)
•	Anthropic API key — console.anthropic.com (separate from using Claude in conversation)
Before Session 31 (audio for live stories)
•	Cloudflare R2 — cloudflare.com (already planned)
Already set up
•	Vercel
•	Domain — thelens.media
•	ElevenLabs (Session 11.5)
Not needed until post-MVP native app
•	Apple Developer Account ($99/year)
•	Google Play Developer Account ($25 one-time)
These will be used with Capacitor to wrap the PWA when going native. No architecture changes are needed in Stage 2 to enable this — Capacitor wraps existing PWAs.

Phase 6: Database and Infrastructure (Sessions 19–22)
Session 19: Set up Supabase + Railway
What you are building: The data layer (Supabase: Postgres database with row-level security, plus authentication) and the engine host (Railway: a Node.js service that will run RSS polling, AI calls, and the bias filter pipeline).
Before this session: Create a Supabase account at supabase.com and a Railway account at railway.app.
Part A — Supabase setup
Prompt for Claude Code:
CONTEXT: I'm building Lens, a news app that strips bias from reporting. Read /docs/project-bible.md for full context. We're using Supabase for the database, authentication, and row-level security, and Railway for the story engine.

Set up the Supabase project for Lens.

1. Create the database schema with these tables:

STORIES table:
- id (uuid primary key, default gen_random_uuid())
- headline (text)
- summary (text)
- topic (text), topic_icon (text)
- confidence_badge (text: 'green' or 'yellow')
- age_gate (text: 'all', 'teen', 'adult')
- below_the_radar (boolean, default false)
- published_at (timestamptz)
- source_count (integer)
- editorial_perspective_count (integer)
- is_published (boolean, default false)
- coverage_map_default_view (text: 'us' or 'world')
- created_at, updated_at (timestamptz, default now())

STORY_CONTENT table:
- id (uuid primary key)
- story_id (uuid, foreign key to stories with cascade delete)
- reading_level (text: 'young', 'teen', 'adult')
- what_happened, why_it_matters, what_we_dont_know (text)
- tap_to_define (jsonb)
- created_at, updated_at

PERSPECTIVES table:
- id (uuid primary key)
- story_id (uuid, foreign key with cascade delete)
- reading_level (text)
- perspective_label (text), content (text)
- display_order (integer)

SOURCES table:
- id (uuid primary key)
- story_id (uuid, foreign key with cascade delete)
- source_name (text), source_type (text)
- source_country (text, ISO-3166 alpha-2)
- source_us_state (text, nullable)
- confirmed_claims (text)

STORY_METADATA table:
- id (uuid primary key)
- story_id (uuid, foreign key with cascade delete)
- methodology (text)
- go_deeper_links (jsonb)
- qc_status (text: 'passed', 'flagged', 'rejected')
- qc_flags (jsonb)
- correction_history (jsonb)

PROFILES table (for the multi-profile system, separate from auth.users):
- id (uuid primary key)
- user_id (uuid, foreign key to auth.users with cascade delete)
- name (text)
- reading_level (text: 'young', 'teen', 'adult')
- selected_topics (jsonb)
- news_format (text: 'read', 'hear', 'both')
- voice_preference (text)
- is_young_reader (boolean, default false) -- triggers COPPA flow
- created_at, updated_at

COPPA_CONSENT table:
- id (uuid primary key)
- profile_id (uuid, foreign key to profiles with cascade delete)
- parent_email_encrypted (text) -- AES-256 encrypted
- consent_confirmed_at (timestamptz, nullable)
- verification_token (text)
- verification_token_expires_at (timestamptz)
- created_at

SOURCE_REGISTRY table (for the engine):
- id (uuid primary key)
- source_name (text, unique)
- source_type (text)
- source_country (text)
- source_us_state (text, nullable)
- editorial_perspective (text: 'left', 'center-left', 'center', 'center-right', 'right', 'international', 'wire', 'other')
- tier (integer) -- 1 = AP/Reuters wire services
- rss_url (text, nullable)

STORY_CLUSTERS table (for the engine):
- id (uuid primary key)
- event_description (text)
- source_count (integer)
- editorial_perspective_count (integer)
- has_tier1_source (boolean)
- status (text: 'detected', 'publication_ready', 'below_the_radar_ready', 'published', 'archived')
- first_detected_at, last_updated_at

FEED_ITEMS table (for the engine):
- id (uuid primary key)
- source_name, source_country, source_us_state
- headline, summary, url, published_at
- topic (text)
- entity_tags (jsonb) -- from NewsMesh
- cluster_id (uuid, foreign key to story_clusters, nullable)
- created_at

FACT_TABLES table:
- id (uuid primary key)
- cluster_id (uuid, foreign key)
- confirmed_facts (jsonb)
- contested_facts (jsonb)
- perspectives (jsonb)
- open_questions (jsonb)
- primary_source_references (jsonb)
- created_at

2. Create a PostgreSQL full-text search index on stories.headline, stories.summary, and story_content.what_happened.

3. Set up Row-Level Security (RLS) policies:

For PROFILES:
- A user can only SELECT, UPDATE, DELETE rows where profiles.user_id = auth.uid()
- A user can INSERT only with user_id = auth.uid()

For COPPA_CONSENT:
- A user can only SELECT or UPDATE rows where the linked profile.user_id = auth.uid()
- The parent_email_encrypted column should never be returned in client queries — restrict via column-level policy or a security-definer function

For STORIES, STORY_CONTENT, PERSPECTIVES, SOURCES, STORY_METADATA:
- Public SELECT for is_published = true
- INSERT/UPDATE/DELETE only via service_role (the Railway engine)

For all engine tables (SOURCE_REGISTRY, STORY_CLUSTERS, FEED_ITEMS, FACT_TABLES):
- service_role only — no client access

4. Configure Supabase Auth:
- Enable email/password authentication
- Enable Google OAuth (we'll get credentials in Session 21)
- Enable Apple OAuth (we'll get credentials in Session 21)
- Set up Resend as the SMTP provider for auth emails (verification, password reset)
- Customize email templates with the Lens "lens." wordmark and minimal branding

5. Generate two API keys:
- The anon key (for the frontend)
- The service_role key (for the Railway engine — never exposed to the client)

Show me the SQL for all tables and RLS policies before applying so I can verify.
Part B — Railway setup
Prompt for Claude Code (after Part A is complete):
CONTEXT: Same as before. Supabase is now set up. Now create the Railway-hosted engine service.

Set up a Node.js/Express service on Railway that will run the Lens engine.

1. Initialize a Node.js project in /lens-engine with these dependencies:
   - express
   - @supabase/supabase-js
   - @anthropic-ai/sdk
   - rss-parser
   - dotenv
   - axios

2. Set environment variables on Railway:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY (NOT the anon key — the engine writes to all tables)
   - ANTHROPIC_API_KEY
   - NEWSMESH_API_KEY (we'll add this in Session 23)

3. Create a basic Express server with health-check endpoints:
   - GET /health (returns 200)
   - GET /engine/status (returns last poll time, last story published, queue depth)

4. Create the Supabase client wrapper at /lib/supabase.js using the service_role key.

5. Set up Railway's cron/scheduled jobs feature — we'll use this in Session 23 for the 15-minute polling cycle.

6. Deploy the service to Railway and confirm /health returns 200.

Note: This service does NOT serve user-facing API endpoints. The frontend reads stories directly from Supabase. This service exists only to write to the database — it polls news sources, runs the bias filter pipeline, and publishes finished stories.
🎯 Architectural note: This is the key change from the original guide. The Railway engine writes; the frontend reads from Supabase directly. There is no Express API serving the frontend. This eliminates an entire layer of code (API routes, CORS handling, JWT validation, custom rate limiting) and lets us use Supabase's row-level security as the single source of truth for who can access what.
Session 20: Connect the frontend to Supabase
Prompt for Claude Code:
CONTEXT: I'm building Lens. Supabase and Railway are now set up. Connect the frontend (the Vercel-hosted PWA from Stage 1) to Supabase.

1. Install @supabase/supabase-js in the frontend project.

2. Create a Supabase client at /src/lib/supabase.js using the anon key (NOT the service_role key — the anon key respects RLS).

3. Replace the local /src/data/stories.ts data with Supabase queries:

   - Home screen "Today's Stories": 
     supabase.from('stories').select('*, story_content(*), sources(*)').eq('is_published', true).eq('below_the_radar', false).order('published_at', { ascending: false })

   - Home screen "Below the Radar":
     same as above but .eq('below_the_radar', true)

   - Story page: 
     supabase.from('stories').select('*, story_content(*), perspectives(*), sources(*), story_metadata(*)').eq('id', storyId).single()
     Then filter story_content and perspectives by the user's reading_level on the client.

   - Search:
     supabase.from('stories').select('*').textSearch('fts', userQuery).eq('is_published', true)
     (Use a PostgreSQL generated column or RPC function for full-text search across headline + summary + what_happened.)

   - Topic timeline:
     supabase.from('stories').select('*').eq('topic', topicName).eq('is_published', true).order('published_at', { ascending: true })

4. Coverage Map data comes from the story's sources array (already in the story response). No separate query needed.

5. Add loading states on every screen that queries Supabase.

6. Add error states ("Unable to load stories. Check your connection.") for query failures.

7. Keep the local /src/data/stories.ts file as a fallback for offline display.

8. Migrate the existing pre-loaded Stage 1 stories into the Supabase stories/story_content/perspectives/sources tables. Use the Supabase Studio SQL editor or write a one-time migration script.

9. Update the Vercel project's environment variables to include NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

10. Deploy to Vercel and verify the home screen, a story page, Search, and Coverage Map all work with live Supabase data.
Session 21: User authentication via Supabase Auth
What you are building: Email/password sign-up, email verification, login, password reset, Google sign-in, and Apple sign-in. All of this comes built into Supabase Auth — we configure it, we don't build it from scratch.
Before this session: Set up Google OAuth credentials (console.cloud.google.com — create OAuth client, add Supabase redirect URL) and Apple Sign In credentials (developer.apple.com — requires Apple Developer Account, $99/year, only do this if shipping social login at launch). If skipping Apple for now, that's fine — email + Google is sufficient for soft launch.
Prompt for Claude Code:
CONTEXT: I'm building Lens. Supabase is set up with email/password auth enabled. Configure social login and build the auth UI.

1. In Supabase Studio:
   - Add Google OAuth credentials (Client ID and Secret)
   - Add Apple OAuth credentials if available (skip if not yet)
   - Configure email templates: verification email, password reset email — use the Lens "lens." wordmark and minimal copy
   - Set the redirect URL to https://thelens.media/auth/callback

2. Build the auth UI screens (replace any localStorage-based pseudo-auth from Stage 1):

   - /signup: email + password fields, a "Sign up with Google" button, a "Sign up with Apple" button (if Apple is configured), and a link to /login
   - /login: email + password fields, social login buttons, a "Forgot password?" link, a link to /signup
   - /auth/callback: handles the OAuth redirect and the email verification redirect
   - /forgot-password: email field + submit button
   - /reset-password: new password field (after clicking the reset link)
   - /verify-email: shown after signup with "Check your email"

3. Use supabase.auth.signUp(), supabase.auth.signInWithPassword(), supabase.auth.signInWithOAuth({ provider: 'google' }), supabase.auth.resetPasswordForEmail(), and supabase.auth.updateUser() — these are all built in.

4. Add a Supabase auth listener at the top of the app:
   supabase.auth.onAuthStateChange((event, session) => { ... })
   Use this to update the app's auth state and redirect as needed.

5. Move onboarding preferences from localStorage into the profiles table. After a user signs up and verifies their email, take them through onboarding (already built in Stage 1) and on completion, INSERT a row into the profiles table with their name, reading_level, selected_topics, news_format, and voice_preference.

6. Add a session persistence check: on app load, call supabase.auth.getSession(). If the user is logged in but has no profile yet, route them to onboarding. If they have a profile, route them to the home screen.

7. Add a Sign Out button in Settings that calls supabase.auth.signOut().

NOTE: We are NOT building bcrypt password hashing, JWT generation, httpOnly cookie management, password reset token logic, email verification logic, or rate limiting on auth endpoints. Supabase Auth handles all of this. Our job is to wire up the UI and call the SDK methods.
🎯 Time saved vs. original plan: This session is meaningfully shorter than the original Sessions 21–22 combined, because we're configuring built-in features instead of writing them. Google and Apple sign-in ship at launch instead of being deferred as 'Coming soon' placeholders.
Session 22: Multi-profile system + COPPA consent flow
What you are building: One Supabase auth user (the parent's email) can have multiple Lens profiles (parent, teen, child). The COPPA consent flow runs whenever a Young Reader profile is created.
Prompt for Claude Code:
CONTEXT: I'm building Lens. Supabase Auth is wired up. Build the multi-profile system and COPPA consent flow.

PART A — Multi-profile system

1. After login, fetch all profiles for the current user:
   supabase.from('profiles').select('*').eq('user_id', user.id)

2. Profile switcher UI:
   - In the header or settings, show a dropdown with the active profile name
   - Tap to switch profiles
   - Selected profile is stored in app state (use React context or similar) AND in localStorage for persistence within a session
   - Switching profiles immediately updates the home feed, story content, and age gating

3. "Create new profile" flow:
   - Accessible from Settings > Profiles
   - Goes through the same onboarding flow (name, reading level, topics, format, voice)
   - On completion, INSERT a new row into profiles with user_id = current auth user
   - If reading_level = 'young', set is_young_reader = true and trigger the COPPA consent flow (Part B)

4. The home feed query, story content fetching, and age gating all use the active profile's reading_level and selected_topics — not the auth user's. There can be multiple active profiles per auth user.

5. Block any Young Reader profile from being used until the linked COPPA_CONSENT row has consent_confirmed_at set. Show a "Waiting for parental consent" screen instead.

PART B — COPPA consent flow

When a profile is created with is_young_reader = true:

1. Show a screen explaining that parental consent is required.

2. Ask the parent (the logged-in adult) to enter a separate parental email (it MUST be different from the account email — the COPPA rule is verifiable parental consent through a distinct verification channel).

3. Generate a verification token (random UUID) with a 7-day expiration.

4. AES-256 encrypt the parent email using a server-side key (call a Supabase Edge Function or a Railway endpoint to do the encryption — the key must NEVER be in the frontend).

5. INSERT a row into coppa_consent with profile_id, parent_email_encrypted, verification_token, verification_token_expires_at.

6. Send the parent a verification email via Resend (triggered by a Supabase database trigger or a Railway endpoint). Email content:
   - Subject: "Approve [child's profile name] for Lens"
   - Body: clear explanation that their child wants to use Lens; what data Lens will collect (minimal — name, reading level, topic selection, profile preferences); a verify link with the token
   - Include a link to the Lens privacy policy

7. The verify link goes to /coppa-verify?token=...
   - Decrypt the email server-side, confirm the token is valid and unexpired
   - Set consent_confirmed_at = now()
   - Show a confirmation page: "Thanks. [Child's name] can now use Lens."

8. Once consent_confirmed_at is set, the Young Reader profile becomes usable.

9. Add an audit log entry to coppa_consent.correction_history (or a separate audit table) for every consent grant.

10. The parent can revoke consent from their account settings — UPDATE coppa_consent to clear consent_confirmed_at, which immediately blocks the Young Reader profile.

This is a legal requirement and must work before launch. Do not skip the audit trail.

NOTE: Row-Level Security policies set up in Session 19 already prevent users from seeing other users' profiles or COPPA records. Verify this works by trying to query another user's data and confirming it returns nothing.

Phase 7: The Bias Filter Engine (Sessions 23–30)
This is the core of Lens — the automated system that detects stories, gathers sources, extracts facts, and writes bias-filtered stories. It runs entirely on the Railway-hosted engine. The frontend reads finished stories from Supabase but never talks to the engine directly.
Session 23: NewsMesh ingestion + RSS supplement
Before this session: Sign up for NewsMesh at newsmesh.co. Start on the free tier for development. Get an API key.
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the source monitoring service on Railway. We use NewsMesh as the primary ingestion + entity tagging service, supplemented by direct RSS feeds for sources NewsMesh doesn't cover well.

Read /docs/project-bible.md and the source list document for context.

1. Build the NewsMesh poller:
   - Runs every 15 minutes via Railway's cron feature
   - Calls NewsMesh's API for articles published in the last 30 minutes (with overlap to avoid gaps)
   - Filters to topics aligned with the 10 Lens topics
   - For each article, NewsMesh returns: headline, summary, url, published_at, source_name, source_country, topic, entity_tags (people/orgs/places)
   - INSERT into feed_items table with all fields

2. Build the supplemental RSS poller for sources NewsMesh may not cover:
   - Same 15-minute schedule
   - Pull from these RSS feeds directly: AP News, Reuters, BBC, NPR, PBS NewsHour, The Hill, Al Jazeera, The Guardian
   - For each item, look up the source in the source_registry table to attach country and US state
   - Use Claude Haiku for topic classification ONLY for items where NewsMesh didn't already classify them — this minimizes AI cost

3. Deduplication:
   - Before inserting, check feed_items for an existing row with the same url OR the same headline within the last 24 hours
   - Skip duplicates

4. Error handling:
   - If NewsMesh returns 5xx, retry once with exponential backoff, then skip and log
   - If an RSS feed is down, skip silently and retry next cycle
   - If a source is down for 24+ hours, log a warning (do not fail the cycle, do not alert users)

5. Populate the source_registry table on first run with all sources from /docs/source-list.md, including:
   - source_name (unique)
   - source_country, source_us_state
   - editorial_perspective (left/center-left/center/center-right/right/international/wire/other)
   - tier (1 for AP/Reuters wire services, higher numbers for other tiers)
   - rss_url (where applicable)

NOTE: NewsMesh handles topic classification and entity tagging for most articles, which is the AI-cost-heavy part. We only use Claude Haiku for the few articles NewsMesh doesn't classify, and even then it's the cheapest model. This is intentional — the original plan called Claude on every article, which would be wasteful.
Session 24: Story clustering + Below the Radar detection
Clustering stays in-house — the editorial rules from the Project Bible ("two actions by the same person on the same day are SEPARATE events if they produce different outcomes") are too specific for a general clustering API. We use Claude Haiku for the clustering call to keep cost low.
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the story clustering service. After each NewsMesh + RSS poll cycle, this service groups incoming articles into story clusters using Lens's editorial clustering rules.

Rules from the Lens Bible:
- Cluster by specific event, not by actor or topic
- Two actions by the same person on the same day are SEPARATE events if they produce different outcomes or are covered in separate wire service stories
- Rolling 24-hour detection window

Implementation:

1. After each polling cycle, fetch all feed_items from the last 24 hours that aren't already assigned to a cluster.

2. Use Claude Haiku 4.5 (model: claude-haiku-4-5-20251001) for clustering. Send the feed_items in batches (~50 articles per call to stay within context limits) with this system prompt:

"You are a news clustering engine for Lens. Group these articles by SPECIFIC EVENT, not by actor or topic. Two actions by the same person on the same day are SEPARATE events if they produce different outcomes. Use the entity_tags to help group articles about the same people/places. Return JSON: { clusters: [{ event_description: '...', article_ids: ['...'] }] }"

3. For each cluster returned, UPSERT into story_clusters and UPDATE the feed_items rows with cluster_id.

4. Track cluster sizes and editorial perspectives:
   - source_count = number of distinct sources in the cluster
   - editorial_perspective_count = number of distinct editorial_perspective values from source_registry
   - has_tier1_source = true if any source has tier = 1

5. Update cluster status based on thresholds:
   - DETECTION threshold (3+ sources): status = 'detected'
   - PUBLICATION threshold (5+ sources across 2+ editorial perspectives): status = 'publication_ready' → trigger Session 25 fact extraction
   - BELOW THE RADAR (24 hours since first_detected_at, status still 'detected', has_tier1_source = true): status = 'below_the_radar_ready' → trigger abbreviated pipeline (Session 26)

6. Archive clusters that are 7+ days old and have not reached publication threshold.

NOTE: We use Haiku here, not Sonnet or Opus. Clustering is a structured, repeated task that doesn't need the most powerful model. Estimated cost: ~$0.10 per polling cycle, ~$10/day at the maximum polling rate.
Sessions 25–26: Story generation pipeline
Session 25 — Fact extraction (use Claude Opus 4.7)
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the fact extraction service. This is Step 1 of the story generation pipeline.

The Bias Filter Engine System Prompt is in /docs/bias-filter-prompt.md — read it now. This is the most important document in the project.

1. When a cluster transitions to status = 'publication_ready' (from Session 24), trigger this service.

2. Gather all source material for the cluster:
   - Fetch all feed_items for the cluster
   - Get headlines, summaries, source names, urls, published_at

3. Send to Claude Opus 4.7 (model: claude-opus-4-7) with the Bias Filter Engine System Prompt + the source material.

4. Claude returns a structured fact table:
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

5. INSERT the fact table into fact_tables linked to the cluster.

6. Update cluster status = 'fact_extracted' so the next step (Session 26 — story writing) can pick it up.

WHY OPUS 4.7 HERE: Fact extraction is the most critical step in the entire pipeline. The quality of everything downstream — story writing, perspective balancing, QC — depends on this step being accurate. We use the strongest model and accept the higher cost. Estimated cost: ~$0.30 per story.
Session 26 — Story writing + primary source linking + Below the Radar pipeline + Coverage Map (use Claude Sonnet 4.6)
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build Steps 2 and 3 of the story generation pipeline, plus the Below the Radar pipeline and Coverage Map generation.

STEP 2 — Story writing (full stories)

1. When a cluster has status = 'fact_extracted', trigger story writing.

2. Use Claude Sonnet 4.6 (model: claude-sonnet-4-6) — strong enough for high-quality writing, much cheaper than Opus.

3. Send the fact table + a story-writing prompt that specifies:
   - Write at all three reading levels (Young, Teen, Adult)
   - Follow the Lexile specs from /docs/build-document.md
   - Follow the word count targets
   - Apply all three bias filters from the Bias Filter Engine System Prompt
   - Identify 5–10 tap-to-define words per reading level with context-aware definitions (use Haiku for the definitions in a separate cheaper call if it saves cost)
   - Randomize perspective order and lock it for the story
   - Assign confidence badge (green or yellow) based on the fact-stability criteria
   - Assign age gate (all/teen/adult) based on the content criteria

4. Parse Claude's response and INSERT into stories, story_content (one row per reading level), and perspectives (one row per perspective per reading level) tables.

STEP 3 — Primary source linking

1. Extract bill numbers, regulation references, executive order numbers from the fact table's primary_source_references.

2. Query Congress.gov API and GovInfo.gov to enrich the references with canonical URLs.

3. Capture primary source URLs from the source articles.

4. INSERT into story_metadata.go_deeper_links.

STEP 4 — Coverage Map generation

1. For each source in the story's sources table, confirm country and us_state are populated (from source_registry).

2. Count sources by country and by US state.

3. Set coverage_map_default_view:
   - If 70%+ of sources are US-based, default to 'us'
   - Otherwise default to 'world'

4. No separate map data to store — the frontend renders the map from the sources table directly.

STEP 5 — Below the Radar pipeline

For clusters with status = 'below_the_radar_ready' (from Session 24), run an ABBREVIATED version:

1. Step 1 (Fact Extraction): same as full stories, but accept fewer sources (3–4 typical). Still use Opus 4.7 — accuracy still matters, even with fewer sources.

2. Step 2 (Story Writing): same as full stories, but:
   - confidence_badge = 'yellow' automatically (fewer sources = developing by definition)
   - below_the_radar = true on the story
   - Still write all three reading levels
   - Still apply bias filters

3. Step 3 (Primary Source Linking): same.

4. Step 4 (Coverage Map): same — even Below the Radar stories get a Coverage Map.

5. Publish to the Below the Radar section only (not Today's Stories).

After each story is written and stored, update cluster status = 'qc_pending' so Session 27's QC pipeline can pick it up.

Reference /docs/build-document.md for reading level specs, word count targets, confidence badge criteria, and age-gating rules.
Sessions 27–28: QC Pipeline
Session 27 — QC Pipeline (7 checks; use Claude Sonnet 4.6 for the bias check)
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the automated QC pipeline. Every story must pass all 7 checks before publishing.

Check 1: Fact Verification (no AI call needed — pure data check)
- Every claim in "What Happened" must trace back to 2+ confirming sources with different editorial perspectives (for full stories)
- For Below the Radar: relaxed to 1+ Tier 1 source
- Claims that can't be verified are moved to "What We Don't Know"

Check 2: Bias Filter Verification (USE CLAUDE SONNET 4.6)
- This is a SEPARATE Claude API call — a fresh-eyes check that reads the finished story with NO knowledge of the sources or the prior pipeline output
- System prompt: "Read this news story. Does it contain loaded language, emotional framing, opinion presented as fact, or unbalanced perspectives? Flag specific passages."
- This is the most important QC check because it catches bias the writing step missed. Sonnet is the right model here — Haiku is too shallow for nuanced bias detection, Opus is overkill.

Check 3: Plagiarism Check (no AI call needed)
- Fuzzy string matching (use the 'string-similarity' npm package or similar) comparing story text against source material
- Flag any passage that matches 8+ consecutive words from a source

Check 4: Reading Level Verification (no AI call needed)
- Use a Lexile estimation library (or a simple readability formula like Flesch-Kincaid as a first-pass approximation)
- Flag if outside target range for the reading level

Check 5: Age-Gate Classification (no AI call needed — rule-based)
- Verify the assigned age gate matches content criteria (look for keywords/topic flags)

Check 6: Perspective Balance (no AI call needed)
- Count perspectives in "What People Think" — minimum 2
- No perspective exceeds 150% of the shortest perspective's word count

Check 7: Completeness (no AI call needed)
- All four tabs have content
- Confidence badge is assigned
- Source list is populated for "How We Know"
- Definitions are generated for "Tap to Define"
- Methodology note exists
- Coverage Map data is populated (every source has location data)

Store QC results in story_metadata.qc_status and story_metadata.qc_flags. Return pass/fail with specific flags.

If a story passes all 7 checks → cluster status = 'qc_passed' (Session 29 picks it up for publishing).
If a story fails any check → cluster status = 'qc_failed' (notification to Rebecca via Session 35 email system).

NOTE: Only Check 2 uses Claude. The other six are pure code. Estimated cost: ~$0.05 per story for QC.
Session 28 — Iterate on QC findings
Run Session 27's QC pipeline against several test stories. Whatever it flags, fix. This session is reactive — the prompt depends on what Session 27 reveals. Common issues: false-positive plagiarism flags from quoted material, Lexile estimates being too strict for Young Reader level, perspective-balance check failing because one perspective genuinely is the consensus.
Sessions 29–30: Publishing, dashboard, integration testing
Session 29 — Publishing logic, circuit breaker, Rebecca's dashboard
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the publishing logic, circuit breaker, and Rebecca's dashboard.

PUBLISHING LOGIC

When a cluster has status = 'qc_passed':

- HIGH confidence (all checks pass, all facts marked high confidence): UPDATE stories.is_published = true. Auto-publish. Log only.
- MEDIUM confidence (all checks pass, some facts medium confidence): UPDATE stories.is_published = true. Auto-publish + email Rebecca with title and dashboard link.
- LOW confidence (any QC check fails): Hold from publishing. Email Rebecca with title, flag reasons, and dashboard link.
- BELOW THE RADAR: Always publish with yellow badge to the Below the Radar section. Email Rebecca on the first one of the day, batch subsequent ones.

CIRCUIT BREAKER

- If 30%+ of stories in a single calendar day fail any QC check, automatically pause publishing
- Send alert email: "Lens paused: unusual number of QC flags today"
- Nothing publishes until Rebecca unpauses via dashboard or the next day's cycle starts clean

REBECCA DASHBOARD

Build an internal admin web page (password-protected, accessible only via a Supabase auth user marked admin):

- Queue of flagged stories with QC reasons
- List of all published stories (Today's Stories + Below the Radar, filterable by date, topic, badge color, confidence tier)
- QC pass/fail rates over time (chart)
- For each story: approve / edit / reject buttons
- Unpause button for the circuit breaker
- Daily digest preview (what tomorrow's 7 AM digest email will say)

DAILY DIGEST EMAIL

- Sent at 7:00 AM ET via Resend
- Summary of previous day: stories published (Today's Stories count + Below the Radar count, separately), stories flagged, auto-approval rate, total AI cost spent

SEARCH INDEX MAINTENANCE

- After every story is published or edited, the Postgres full-text search index updates automatically (it's on a generated column)
- Verify Below the Radar stories are included in search results, marked as Developing
Session 30 — End-to-end pipeline test
Run the full pipeline end-to-end with a single real news event. This is the most important test in Stage 2.
1.	Trigger the NewsMesh + RSS poll manually.
2.	Watch a story cluster form.
3.	Force a cluster across the publication threshold (or, for a separate test, let one go to Below the Radar).
4.	Watch the fact extraction (Opus) produce a fact table.
5.	Watch the story writing (Sonnet) produce all three reading levels.
6.	Watch the QC pipeline run all 7 checks.
7.	Watch the publishing logic decide what to do with the story.
8.	Verify the story appears correctly in the Vercel frontend (home screen, story page, all three reading levels, Coverage Map, Search).
9.	Verify the dashboard shows the story correctly.
Show me the output at each step. Take it slowly. This is the most important test.

Phase 8: Audio (Sessions 31–34)
Session 31: ElevenLabs integration with lazy generation
Before this session: Your ElevenLabs account and five voice characters are already set up from Session 11.5. Cloudflare R2 account and bucket also need to be set up — see steps below.
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the audio generation service for the live engine, using LAZY GENERATION (not pre-generation). Audio is generated on first request and cached in R2 forever.

CLOUDFLARE R2 SETUP

1. Create an R2 bucket named "lens-audio".
2. Create R2 API credentials (Access Key ID + Secret Access Key) and add them to Railway environment variables: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET, R2_PUBLIC_URL.
3. Configure the bucket for public read access via a custom subdomain (e.g., audio.thelens.media) — this is how the frontend will fetch audio files.

LAZY AUDIO GENERATION

Audio file naming convention: {story_id}_{reading_level}_{voice_id}.mp3 (e.g., abc123_young_voice2.mp3).

Build a Railway endpoint POST /audio/generate-story that accepts { story_id, reading_level, voice_id } and:

1. Check if the audio file already exists in R2 (HEAD request to the public URL).
2. If yes: return the URL immediately.
3. If no:
   a. Fetch the story_content for that story_id + reading_level from Supabase.
   b. Send the "what_happened" text to ElevenLabs API with the specified voice_id.
   c. Receive the audio buffer.
   d. Upload to R2 with the canonical filename.
   e. Return the public URL.

This endpoint is called by the frontend when the user taps "Listen to this story" — see Session 33.

NOTE: We are NOT pre-generating all 15 versions per story. We generate on demand and cache forever. This dramatically reduces ElevenLabs cost — most stories will only ever be listened to in 1–2 voice/level combinations, not all 15.

ASYNC PRE-GENERATION FOR DAILY NEWS SHOW ONLY

The Daily News Show is different — it's pushed to users, not pulled. For the Daily News Show, pre-generate audio at 6:00 AM in the user's local time zone. See Session 32 for the briefing builder.

ERROR HANDLING

- If ElevenLabs returns 5xx, retry once. If still failing, return a 503 to the frontend so the player shows "Audio temporarily unavailable."
- If the user's chosen voice fails, do NOT silently fall back to a different voice. Tell the user.
- Track ElevenLabs character count per request and log to a costs table for the cost monitoring dashboard (Session 37).
🎯 Cost note: Original plan generated 15 audio files per story (5 voices × 3 reading levels). At 10–20 stories/day, that's 150–300 ElevenLabs generations daily, plus the briefing. With lazy generation, we generate audio only when actually requested. For a soft launch with low concurrent listeners, this could reduce ElevenLabs spend by 70–90% in early months.
Sessions 32–33: Daily Briefing + frontend audio connection
Session 32 — Daily Briefing system (pre-generated)
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the Daily Briefing system. Unlike story audio (which is lazy-generated), briefings ARE pre-generated because they're pushed to users.

GENERATION LOGIC

1. Runs at 6:00 AM in each user's local time zone (use the user's profile time zone, default to America/New_York if not set).

2. For each active user/profile, build a personalized briefing:
   - Top 5–7 stories by source_count from Today's Stories (below_the_radar = false), filtered by the profile's selected_topics
   - PLUS top 1–2 stories of the day regardless of topic (highest source_count, age-gate-appropriate)
   - Skip any story whose age_gate is above the profile's reading_level
   - Do NOT include Below the Radar stories in the briefing — they have their own section

3. Compile the "What Happened" text of selected stories into a single script. Add brief transitions ("Next..." / "In other news...").

4. Send to ElevenLabs with the profile's chosen voice at the profile's reading_level.

5. Store the audio in R2 with filename: briefing_{profile_id}_{date}.mp3.

6. Update the "Your Morning News Show" card on the home screen with the new briefing URL and length.

7. Target length: 5–12 minutes depending on news volume.

OPTIMIZATION

Many profiles will have similar topic combinations. Identify groups of profiles with identical (selected_topics, reading_level, voice) tuples and generate the briefing ONCE per group, then assign the same R2 URL to all profiles in that group. This reduces ElevenLabs cost substantially.

CLEANUP

Delete briefings older than 7 days from R2 to control storage costs.
Session 33 — Frontend audio connection
Prompt for Claude Code:
CONTEXT: I'm building Lens. Connect the real ElevenLabs audio to the frontend.

1. Daily Briefing card on the home screen: play the pre-generated briefing URL stored on the profile.

2. Story page "Listen to this story" player:
   - When tapped, call POST /audio/generate-story with { story_id, reading_level (from profile), voice_id (from profile) }
   - Show a loading state ("Preparing audio...") while waiting (typical first-time generation: 5–15 seconds)
   - On success, play the returned URL
   - The audio file is now cached in R2 — subsequent taps will be instant

3. Audio player UI: play/pause, scrub bar, time remaining, playback speed (1x, 1.25x, 1.5x).

4. Edge case: audio generation failed → show "Audio unavailable for this story" gracefully.

5. Background playback: the audio continues if the user switches apps or locks their phone (PWA service worker handles this).

6. Resume position: if a user pauses and comes back, the briefing resumes where they left off (store position in profile or local storage).
🎯 Jackson's task — Voice Quality Tester: Listen to the same story in all five voices. Do they all sound natural? Does any voice stumble on certain words or sound robotic on specific sentences? Per voice: sounds good / sounds weird on [specific story or phrase].
Session 34: Audio polish
Prompt for Claude Code:
Polish the audio experience:

1. Confirm background audio playback works on iOS Safari, Android Chrome, and desktop browsers.
2. Confirm Daily Briefing remembers playback position across sessions.
3. Confirm playback speed (1x, 1.25x, 1.5x) works on both story audio and briefings.
4. Verify voice selection in Settings actually changes which audio files are served.
5. Test all five voices on a real story — do they all generate correctly from ElevenLabs?
6. Test the audio player in PWA installed mode (added to home screen on iOS/Android) — confirm playback continues with screen locked.

Phase 9: Email and Notifications (Sessions 35–36)
Session 35: Resend email system
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the email system using Resend.

NOTE: Some auth-related emails (verification, password reset) are handled by Supabase Auth using Resend as the SMTP provider. That's already configured in Session 19. This session covers transactional and notification emails Lens sends directly.

1. Transactional emails (triggered by application events):
   - COPPA parental consent email (Session 22 already builds the trigger)
   - "Report a Problem" submission forwarded to hello@thelens.media

2. Engine notification emails (automated):
   - MEDIUM confidence story published: title + dashboard link
   - LOW confidence / QC flag: title + flag reasons + dashboard link
   - Circuit breaker triggered: alert
   - First Below the Radar story of the day: notification (batch subsequent ones)
   - Daily morning digest at 7:00 AM ET (Today's Stories count + Below the Radar count separately)

3. PWA push notification — daily briefing ready:
   - "Your morning briefing is ready" — sent when the profile's daily briefing audio is generated
   - Opt-in only (per profile)
   - Implement via PWA service worker push notification

All emails should be clean, minimal, branded with the "lens." wordmark. No marketing fluff.
Session 36: Pre-launch email sequence
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the pre-launch email sequence for landing page signups.

Connect to the existing landing page email signup form (already deployed on Vercel). When someone signs up, they enter a 4-email drip sequence:

Email 1 — Immediate confirmation:
Subject: "You're on the list."
Body: Brief, clean. "Thanks for signing up for Lens. We'll let you know when it's ready. In the meantime — the news keeps happening, and we're building something to help you see it clearly."

Email 2 — One week after signup:
Subject: "How Lens works"
Body: Brief explanation of the three-step process (Aggregate → Analyze → Clarify). Clean, informative, builds confidence.

Email 3 — Two weeks after signup:
Subject: "We're getting close"
Body: Teaser. "We're in final testing. Here's a preview of what a Lens story looks like." Include a screenshot or sample story summary.

Email 4 — Launch day (triggered manually):
Subject: "Lens is live"
Body: Direct link to the app. Brief, exciting, not over the top.

Set these up as a drip sequence in Resend — Email 1 sends immediately, Emails 2 and 3 on delay. Email 4 is triggered manually when we're ready to launch.

Phase 10: Cost Monitoring and Security (Sessions 37–38)
Session 37: Cost monitoring
Prompt for Claude Code:
CONTEXT: I'm building Lens. Build the cost monitoring system.

Add to the Rebecca Dashboard:

1. Daily cost tracker showing spend by service:
   - Anthropic Claude API, broken down by model:
     * Opus 4.7 (fact extraction)
     * Sonnet 4.6 (story writing + bias QC)
     * Haiku 4.5 (clustering, classification, definitions)
     Track input tokens and output tokens separately for accurate cost calculation.
   - ElevenLabs (track characters generated, broken down by story audio vs briefing audio)
   - NewsMesh (track API calls — easy to monitor since most plans are request-based)
   - Railway compute (estimated from Railway's billing page)
   - Cloudflare R2 storage and bandwidth

2. Alert system via Resend:
   - Email at 75% of daily budget cap
   - Email at 90% of daily budget cap

3. Hard daily cap: $50/day
   - If reached, pause new story generation (cluster status updates skip qc_pending → publish)
   - The app keeps serving published stories — users see the existing content
   - Auto-resume next day or manual unpause via dashboard

4. Show 7-day and 30-day cost trends as simple charts.

5. Per-step cost breakdown chart: how much each pipeline step (clustering, fact extraction, story writing, QC, audio) cost over the last 30 days. This helps identify if one step is consuming disproportionate budget and should be re-tuned.
Session 38: Security review
Prompt for Claude Code:
CONTEXT: I'm building Lens. Conduct a security review.

Most authentication-related security is handled by Supabase Auth (bcrypt-equivalent password hashing, JWT signing, session management, password reset tokens, email verification). Confirm those are in place but focus our manual review on what we built ourselves.

CONFIRM (Supabase-handled):
1. Password storage uses Supabase Auth's bcrypt-equivalent hashing (verified by the fact that Supabase Auth is enabled)
2. JWT-based sessions with proper expiration
3. Password reset tokens are single-use with appropriate expiration
4. Email verification is enforced

REVIEW MANUALLY (what we built):
1. All API keys (Anthropic, ElevenLabs, NewsMesh, Resend, R2) are in Railway environment variables, never in code, never in the frontend bundle.
2. The Supabase service_role key is ONLY on Railway, never in the frontend.
3. The Supabase anon key is in the frontend, but RLS policies prevent it from accessing anything it shouldn't.
4. HTTPS only:
   - Vercel handles this for the frontend
   - Railway handles this for the engine endpoints
   - Supabase enforces HTTPS by default
5. COPPA consent records: parent_email_encrypted is AES-256 encrypted at the application level (Session 22).
6. Encryption key for COPPA emails is in Railway env vars, NOT in code, NOT in the frontend.
7. Rate limiting on Lens-specific endpoints:
   - POST /audio/generate-story: max 30 per profile per hour (prevent abuse)
   - "Report a Problem": max 5 per user per day
   - Search queries to Supabase: rate-limited via Supabase's built-in protection
8. CORS on Railway endpoints: only allow requests from thelens.media (and lens-app-brown.vercel.app for staging).
9. Input sanitization: any user input that ends up in a database query (Search input, profile name, etc.) — Supabase parameterized queries handle SQL injection, but verify no raw string concatenation exists anywhere.
10. RLS policies: actually try to query another user's profile from the frontend with the anon key. Confirm it returns nothing.
11. No exposed debug endpoints or test routes in production.
12. The Rebecca dashboard is gated behind an admin role check — only Supabase auth users with the admin flag can access it.

List everything you check, confirm what's good, flag anything that needs fixing.
🎯 Note: This session is shorter than the original Session 38 because Supabase Auth handles roughly half the original checklist. The remaining items are all things we genuinely built and need to verify.

Phase 11: Testing and Launch (Sessions 39–45)
Session 39: Jackson's full beta test
Not a Claude Code session. This is Jackson testing the complete app with live stories.
🎯 Jackson's task — Full Week Beta: Use the complete app every day for one week. His checklist: read every story — does it feel unbiased? Test all three reading levels. Use tap-to-define on every story. Listen to the Daily News Show in each voice. Check "What People Think" on every story — are perspectives balanced? Try "How We Know" including the Coverage Map on multiple stories. Check the Below the Radar section daily — do those stories feel different from Today's Stories? Use Search at least once a day. Find things that are wrong and write them down. Duration: one full week of daily use.
Sessions 40–42: Fix Jackson's findings
Reactive sessions — the prompts depend on what Jackson finds.
General format:
Jackson tested the full Lens app for a week. Here are his findings:

[Paste Jackson's specific feedback]

Address each issue. Where it's a code fix, fix it. Where it's a content issue (e.g., a specific story felt biased), explain whether the issue is in the writing pipeline (Sonnet) or the bias QC pipeline (Sonnet) and propose a prompt adjustment to /docs/bias-filter-prompt.md.
Session 43: Soft launch preparation
Prompt for Claude Code:
Final pre-launch checklist:

1. Confirm the production domain (thelens.media) is fully wired:
   - Vercel deployment is live and healthy
   - Supabase project is the production project (not staging)
   - Railway engine is running and polling every 15 minutes
   - All environment variables in production (separate from any staging values)

2. Confirm the legal items are in place:
   - Privacy policy live at /privacy
   - Terms of Service live at /terms
   - COPPA-specific privacy notice live and reviewed by lawyer
   - Data retention policy documented

3. Confirm cost monitoring is active:
   - $50/day cap is enforced
   - Alert emails work at 75% and 90%
   - Circuit breaker tested (force-trigger it on staging, confirm pause + alert work, confirm unpause works)

4. Confirm the dashboard works for real:
   - Rebecca can log in
   - Approve / edit / reject buttons all work
   - Daily digest email sends correctly

5. Confirm at least 50 published stories exist in production:
   - Run the engine for several days before launch to seed the database
   - Don't launch on a cold database — early users should see a populated home feed

6. Run the launch-day email (Email 4 of the drip sequence) on a test address first, confirm it looks right, then queue it for the real list.
Sessions 44–45: Launch
Session 44 — launch:
10.	Send the launch-day email.
11.	Monitor the dashboard for the first 24 hours. Watch for: error rates, cost spikes, QC flag rates, user registration numbers.
12.	Watch Sentry / Railway logs / Supabase logs for errors.
13.	Have Claude Code open and ready for hot fixes.
Session 45 — fix anything that breaks on day one. There will be something. That is normal.
🎯 Jackson's task — V2 Feature Priorities: After using the live app for a few weeks, Jackson ranks the V2 features by what he wants most: 'I Have a Question' (ask the AI about a story); Bias Radar; Spanish language version; Breaking news push notifications; Classroom sharing features; Something else he thinks of. One sentence per feature explaining why. This shapes the V2 roadmap.

Pending Decisions and Future Considerations
Cross-device sync
Handled by Supabase when logged in (the active profile is server-side, not local). Offline changes need a sync strategy. Can defer to post-launch.
Email signup flow
Landing page signup is built. Decide: should signups auto-create a Supabase auth account, or just join the email list? Recommendation: just join the email list. Auth account creation should happen when the user actively signs up to use the app.
Native iOS/Android apps (post-MVP)
Use Capacitor (capacitorjs.com) to wrap the existing PWA in native iOS and Android shells. Capacitor wraps web apps with minimal code changes — the existing Vercel PWA codebase will work as-is. The Apple Developer Account ($99/year) and Google Play Developer Account ($25 one-time) are needed for distribution. No Stage 2 architecture changes are needed to enable this — the PWA is already Capacitor-compatible.
Search migration (only if needed)
PostgreSQL full-text search via Supabase is sufficient for MVP scale (likely up to ~10,000 stories). If Search becomes a power-user feature with sophisticated queries, or if performance degrades, consider migrating to Typesense or Meilisearch. Do not preemptively switch.
Anthropic API credits (apply when traction is real)
Three reachable paths: (1) AWS Activate credits → use Claude through Bedrock — apply directly without VC backing; (2) Direct outreach to Anthropic citing Lens's PBC structure and Knight Foundation alignment — best done after Knight responds; (3) Anthropic Startup Program (anthropic.com/startups) — requires VC backing through partner firms, so reapply after first round of funding. The $5 new-account credit at platform.claude.com is automatic on signup but only enough for development testing.

Appendix: Estimated Costs (Stage 2)
Per-month operating cost — recalculated with the new architecture
Conservative scenario (low traffic, optimized model routing, lazy audio):
•	Anthropic API (per-step routing, mostly Haiku and Sonnet, Opus only for fact extraction): ~$300/month
•	ElevenLabs (lazy generation, briefings only pre-generated): ~$50–150/month
•	NewsMesh entry tier: $29/month
•	Railway (engine compute): ~$20–50/month
•	Supabase Pro: $25/month (free tier sufficient through soft launch)
•	Cloudflare R2 (audio + bandwidth): ~$10/month early
•	Resend (transactional + drip): free tier through ~3,000 emails/month, then $20/month
•	Vercel: free tier
•	Total: ~$450–600/month
Moderate scenario (growing usage):
•	Total: ~$1,000–1,500/month
Aggressive scenario (steady-state production):
•	Total: ~$2,500–4,000/month
These estimates are meaningfully lower than the original plan's $1,250–$5,500/month range, primarily because of the model-routing and lazy-audio decisions. The $50/day API cost cap (Session 37) is enforced regardless and prevents runaway spend.
One-time costs
•	Legal (trademark, COPPA, privacy policy, ToS, LLC): $7,000–$10,000
•	Logo design: $0–$2,000
•	Developer help if hired for Stage 2: $5,000–$15,000

End of revised Sessions 19–45. Save the original Build Guide v3.0 for the unchanged Sessions 1–18.

/**
 * Audio Generation Script for Lens
 *
 * Reads stories from src/data/stories.ts via esbuild, then generates
 * TTS audio for each story x reading-level x voice using ElevenLabs.
 *
 * Usage (Windows):
 *   set ELEVENLABS_API_KEY=sk_...
 *   node scripts/generate-audio.mjs
 *
 * Usage (bash):
 *   ELEVENLABS_API_KEY=sk_... node scripts/generate-audio.mjs
 *
 * Output: public/audio/{story-id}_{reading-level}_{voice-id}.mp3
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const AUDIO_DIR = join(ROOT, "public", "audio");

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Error: Set ELEVENLABS_API_KEY environment variable.");
  process.exit(1);
}

// ── Voice mapping ──────────────────────────────────────────────
const VOICES = [
  { id: "anchor", elevenLabsId: "PaWOWJFejYVBnsSPvwPy", name: "The Anchor" },
  { id: "narrator", elevenLabsId: "c5NAV2A2awC8fZtelF9G", name: "The Narrator" },
  { id: "bigSister", elevenLabsId: "xlrHDSJYmvu4ydA3IFOx", name: "The Big Sister" },
  { id: "mrsM", elevenLabsId: "g4B4V29wdi6CYDDbtGQd", name: "Mrs. M" },
  { id: "coach", elevenLabsId: "QuoRXh4I3ZoFgOh88qQa", name: "The Coach" },
];

const READING_LEVELS = ["young", "teen", "adult"];

// ── Load stories by compiling TS with esbuild ─────────────────
async function loadStories() {
  const srcFile = join(ROOT, "src", "data", "stories.ts");
  const tmpFile = join(ROOT, "scripts", "_stories_tmp.mjs");

  // Compile TS → ESM JS
  execSync(
    `npx esbuild "${srcFile}" --bundle --format=esm --outfile="${tmpFile}" --platform=node`,
    { cwd: ROOT, stdio: "pipe" }
  );

  const { stories } = await import(`file://${tmpFile.replace(/\\/g, "/")}`);

  // Clean up temp file
  try { unlinkSync(tmpFile); } catch { /* ignore */ }

  return stories;
}

// ── ElevenLabs TTS call with retry ────────────────────────────
async function generateAudio(text, voiceId, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.0,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (response.status === 429) {
        const wait = Math.pow(2, attempt) * 1000;
        console.log(`    Rate limited. Waiting ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error ${response.status}: ${errText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outputPath, buffer);
      return true;
    } catch (err) {
      if (attempt === retries) {
        console.error(`    FAILED after ${retries} attempts: ${err.message}`);
        return false;
      }
      const wait = Math.pow(2, attempt) * 1000;
      console.log(`    Attempt ${attempt} failed. Retrying in ${wait / 1000}s...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  return false;
}

// ── Progress bar helper ───────────────────────────────────────
function progressBar(current, total, width = 30) {
  const pct = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);
  return `[${bar}] ${pct}% (${current}/${total})`;
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  console.log("Loading stories...");
  const stories = await loadStories();
  if (!stories || stories.length === 0) {
    console.error("No stories found.");
    process.exit(1);
  }

  const totalJobs = stories.length * READING_LEVELS.length * VOICES.length;
  let completed = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`\nLens Audio Generator`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Stories: ${stories.length}`);
  console.log(`Levels:  ${READING_LEVELS.length} (young, teen, adult)`);
  console.log(`Voices:  ${VOICES.length}`);
  console.log(`Total:   ${totalJobs} audio files to generate\n`);

  for (const story of stories) {
    console.log(`\n-- ${story.headline} [${story.id}]`);

    for (const level of READING_LEVELS) {
      const text = story.readingLevels?.[level]?.whatHappened;
      if (!text) {
        console.log(`  [!] No whatHappened text for "${level}", skipping...`);
        skipped += VOICES.length;
        completed += VOICES.length;
        continue;
      }

      for (const voice of VOICES) {
        const filename = `${story.id}_${level}_${voice.id}.mp3`;
        const outputPath = join(AUDIO_DIR, filename);

        // Skip if file already exists (resume support)
        if (existsSync(outputPath)) {
          completed++;
          skipped++;
          console.log(`  [cached] ${filename}`);
          continue;
        }

        process.stdout.write(
          `  ${progressBar(completed, totalJobs)} ${voice.name} (${level})...`
        );

        const ok = await generateAudio(text, voice.elevenLabsId, outputPath);
        completed++;

        if (ok) {
          process.stdout.write(` done\n`);
        } else {
          failed++;
          process.stdout.write(` FAILED\n`);
        }

        // Small delay between requests to be polite to the API
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Complete!`);
  console.log(`  Generated: ${completed - skipped - failed}`);
  console.log(`  Cached:    ${skipped}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Total:     ${completed}/${totalJobs}`);

  if (failed > 0) {
    console.log(`\nSome files failed. Re-run the script to retry (cached files are skipped).`);
    process.exit(1);
  }

  // Update stories.ts audio paths
  console.log(`\nUpdating stories.ts audio paths...`);
  updateStoryAudioPaths(stories);
  console.log(`Audio paths updated in src/data/stories.ts`);
}

function updateStoryAudioPaths(stories) {
  const storiesPath = join(ROOT, "src", "data", "stories.ts");
  let content = readFileSync(storiesPath, "utf-8");

  for (const story of stories) {
    for (const level of READING_LEVELS) {
      for (const voice of VOICES) {
        const filename = `${story.id}_${level}_${voice.id}.mp3`;
        const filePath = `/audio/${filename}`;

        // Replace empty-string audio paths with actual file paths
        const searchPattern = new RegExp(
          `(id:\\s*"${story.id}"[\\s\\S]*?audio:\\s*\\{[\\s\\S]*?${level}:\\s*\\{[\\s\\S]*?${voice.id}:\\s*)""`
        );
        content = content.replace(searchPattern, `$1"${filePath}"`);
      }
    }
  }

  writeFileSync(storiesPath, content);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

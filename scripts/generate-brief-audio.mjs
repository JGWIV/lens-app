/**
 * Generate short Daily Brief audio for each story's summary text.
 *
 * Usage:
 *   set ELEVENLABS_API_KEY=sk_...
 *   node scripts/generate-brief-audio.mjs
 *
 * Output: public/audio/{story-id}_brief_{voiceId}.mp3
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
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

const VOICES = [
  { id: "anchor", elevenLabsId: "PaWOWJFejYVBnsSPvwPy", name: "The Anchor" },
  { id: "narrator", elevenLabsId: "c5NAV2A2awC8fZtelF9G", name: "The Narrator" },
  { id: "bigSister", elevenLabsId: "xlrHDSJYmvu4ydA3IFOx", name: "The Big Sister" },
  { id: "mrsM", elevenLabsId: "g4B4V29wdi6CYDDbtGQd", name: "Mrs. M" },
  { id: "coach", elevenLabsId: "QuoRXh4I3ZoFgOh88qQa", name: "The Coach" },
];

const BRIEF_IDS = [
  "oil-prices-strait-hormuz-2026",
  "russia-ukraine-war-2026",
  "measles-vaccines-federal-policy-2026",
  "new-food-pyramid-2026",
  "2026-midterm-elections",
];

// Load stories via esbuild
async function loadStories() {
  const srcFile = join(ROOT, "src", "data", "stories.ts");
  const tmpFile = join(ROOT, "scripts", "_stories_tmp.mjs");

  execSync(
    `npx esbuild "${srcFile}" --bundle --format=esm --outfile="${tmpFile}" --platform=node`,
    { cwd: ROOT, stdio: "pipe" }
  );

  const { stories } = await import(`file://${tmpFile.replace(/\\/g, "/")}`);

  try { const { unlinkSync } = await import("fs"); unlinkSync(tmpFile); } catch {}

  return stories;
}

async function generate(text, voiceId, outputPath, retries = 3) {
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
        throw new Error(`API error ${response.status}: ${await response.text()}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      writeFileSync(outputPath, buffer);
      return true;
    } catch (err) {
      if (attempt === retries) {
        console.error(`    FAILED: ${err.message}`);
        return false;
      }
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
  return false;
}

async function main() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  console.log("Loading stories...");
  const stories = await loadStories();

  const briefStories = BRIEF_IDS
    .map((id) => stories.find((s) => s.id === id))
    .filter((s) => s != null);

  const totalJobs = briefStories.length * VOICES.length;
  let completed = 0;
  let failed = 0;

  console.log(`\nDaily Brief Audio Generator`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Stories: ${briefStories.length}`);
  console.log(`Voices:  ${VOICES.length}`);
  console.log(`Total:   ${totalJobs} audio files\n`);

  for (const story of briefStories) {
    console.log(`\n-- ${story.headline} [${story.id}]`);
    console.log(`   Summary: "${story.summary.slice(0, 80)}..."\n`);

    for (const voice of VOICES) {
      const filename = `${story.id}_brief_${voice.id}.mp3`;
      const outputPath = join(AUDIO_DIR, filename);

      if (existsSync(outputPath)) {
        completed++;
        console.log(`  [cached] ${filename}`);
        continue;
      }

      process.stdout.write(`  ${voice.name} (${filename})...`);
      const ok = await generate(story.summary, voice.elevenLabsId, outputPath);
      completed++;

      if (ok) {
        process.stdout.write(" done\n");
      } else {
        failed++;
        process.stdout.write(" FAILED\n");
      }

      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Complete! ${completed - failed}/${totalJobs} succeeded, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch(console.error);

/**
 * Audio Generation Script for Lens
 *
 * Reads stories from the data file, generates TTS audio for each
 * story × reading level × voice combination using ElevenLabs API.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... node scripts/generate-audio.mjs
 *
 * Output: public/audio/{story-id}_{reading-level}_{voice-id}.mp3
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const AUDIO_DIR = join(ROOT, "public", "audio");

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Error: Set ELEVENLABS_API_KEY environment variable.");
  process.exit(1);
}

// Voice mapping
const VOICES = [
  { id: "anchor", elevenLabsId: "PaWOWJFejYVBnsSPvwPy", name: "The Anchor" },
  { id: "narrator", elevenLabsId: "c5NAV2A2awC8fZtelF9G", name: "The Narrator" },
  { id: "bigSister", elevenLabsId: "xlrHDSJYmvu4ydA3IFOx", name: "Big Sister" },
  { id: "mrsM", elevenLabsId: "g4B4V29wdi6CYDDbtGQd", name: "Mrs. M" },
  { id: "coach", elevenLabsId: "QuoRXh4I3ZoFgOh88qQa", name: "The Coach" },
];

const READING_LEVELS = ["young", "teen", "adult"];

// Extract stories from the TS source file (simple parse)
function loadStories() {
  // Use a dynamic import workaround — parse the TS file for story data
  const src = readFileSync(join(ROOT, "src", "data", "stories.ts"), "utf-8");

  // Extract story objects: find id and reading level texts
  const stories = [];
  const idMatches = [...src.matchAll(/id:\s*"([^"]+)"/g)];
  const storyBlocks = src.split(/\n  \{[\s]*\n/);

  // Simpler approach: use regex to extract what we need
  const storyRegex = /id:\s*"([^"]+)"[\s\S]*?readingLevels:\s*\{([\s\S]*?)\n    },\n    sources:/g;
  let match;
  while ((match = storyRegex.exec(src)) !== null) {
    const id = match[1];
    const levelsBlock = match[2];

    const levels = {};
    for (const level of READING_LEVELS) {
      const levelRegex = new RegExp(
        `${level}:\\s*\\{[\\s\\S]*?whatHappened:\\s*\\n?\\s*"([^"]*(?:"[^"]*)*)"`,
        ""
      );
      // Use a more robust extraction
      const whatHappenedRegex = new RegExp(
        `${level}:\\s*\\{[\\s\\S]*?whatHappened:[\\s\\S]*?"([^"]+(?:\\\\.[^"]*)*)"`,
      );
      const m = whatHappenedRegex.exec(levelsBlock);
      if (m) {
        levels[level] = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
      }
    }
    stories.push({ id, levels });
  }

  return stories;
}

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

async function main() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  const stories = loadStories();
  if (stories.length === 0) {
    console.error("No stories found. Check stories.ts parsing.");
    process.exit(1);
  }

  const totalJobs = stories.length * READING_LEVELS.length * VOICES.length;
  let completed = 0;
  let failed = 0;

  console.log(`\nLens Audio Generator`);
  console.log(`━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Stories: ${stories.length}`);
  console.log(`Levels:  ${READING_LEVELS.length}`);
  console.log(`Voices:  ${VOICES.length}`);
  console.log(`Total:   ${totalJobs} audio files\n`);

  for (const story of stories) {
    console.log(`\n📰 ${story.id}`);
    for (const level of READING_LEVELS) {
      const text = story.levels[level];
      if (!text) {
        console.log(`  ⚠ No text for ${level} level, skipping...`);
        continue;
      }

      for (const voice of VOICES) {
        const filename = `${story.id}_${level}_${voice.id}.mp3`;
        const outputPath = join(AUDIO_DIR, filename);

        // Skip if already exists
        if (existsSync(outputPath)) {
          completed++;
          console.log(`  ✓ ${filename} (cached)`);
          continue;
        }

        process.stdout.write(`  ⏳ ${filename}...`);
        const ok = await generateAudio(text, voice.elevenLabsId, outputPath);
        completed++;

        if (ok) {
          process.stdout.write(` ✓\n`);
        } else {
          failed++;
          process.stdout.write(` ✗\n`);
        }

        // Small delay between requests to avoid rate limits
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Done! ${completed - failed}/${totalJobs} succeeded, ${failed} failed.`);

  // Now update stories.ts audio paths
  if (failed === 0) {
    console.log(`\nUpdating stories.ts audio paths...`);
    updateStoryAudioPaths(stories);
    console.log(`✓ Audio paths updated.`);
  }
}

function updateStoryAudioPaths(stories) {
  const storiesPath = join(ROOT, "src", "data", "stories.ts");
  let content = readFileSync(storiesPath, "utf-8");

  for (const story of stories) {
    for (const level of READING_LEVELS) {
      for (const voice of VOICES) {
        const filename = `${story.id}_${level}_${voice.id}.mp3`;
        const filePath = `/audio/${filename}`;

        // Replace empty string audio paths with actual paths
        // This is a targeted replacement within each story's audio block
        const searchPattern = new RegExp(
          `(id:\\s*"${story.id}"[\\s\\S]*?audio:\\s*\\{[\\s\\S]*?${level}:\\s*\\{[\\s\\S]*?${voice.id}:\\s*)""`
        );
        content = content.replace(searchPattern, `$1"${filePath}"`);
      }
    }
  }

  writeFileSync(storiesPath, content);
}

main().catch(console.error);

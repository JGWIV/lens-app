/**
 * Generate Daily Brief intro audio for all 5 voices using ElevenLabs.
 *
 * Usage:
 *   set ELEVENLABS_API_KEY=sk_...
 *   node scripts/generate-intro.mjs
 *
 * Output: public/audio/daily-brief-intro_{voiceId}.mp3
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
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

const INTRO_TEXT = "Welcome to your Lens Daily Brief. Here are today's top stories.";

const VOICES = [
  { id: "anchor", elevenLabsId: "PaWOWJFejYVBnsSPvwPy", name: "The Anchor" },
  { id: "narrator", elevenLabsId: "c5NAV2A2awC8fZtelF9G", name: "The Narrator" },
  { id: "bigSister", elevenLabsId: "xlrHDSJYmvu4ydA3IFOx", name: "The Big Sister" },
  { id: "mrsM", elevenLabsId: "g4B4V29wdi6CYDDbtGQd", name: "Mrs. M" },
  { id: "coach", elevenLabsId: "QuoRXh4I3ZoFgOh88qQa", name: "The Coach" },
];

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
        console.log(`  Rate limited. Waiting ${wait / 1000}s...`);
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
        console.error(`  FAILED: ${err.message}`);
        return false;
      }
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
  return false;
}

async function main() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  console.log("Generating Daily Brief intro audio...");
  console.log(`Text: "${INTRO_TEXT}"\n`);

  let failed = 0;
  for (const voice of VOICES) {
    const filename = `daily-brief-intro_${voice.id}.mp3`;
    const outputPath = join(AUDIO_DIR, filename);

    if (existsSync(outputPath)) {
      console.log(`  [cached] ${filename}`);
      continue;
    }

    process.stdout.write(`  ${voice.name} (${filename})...`);
    const ok = await generate(INTRO_TEXT, voice.elevenLabsId, outputPath);
    console.log(ok ? " done" : " FAILED");
    if (!ok) failed++;

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone! ${failed === 0 ? "All files generated." : `${failed} failed.`}`);
  if (failed > 0) process.exit(1);
}

main().catch(console.error);

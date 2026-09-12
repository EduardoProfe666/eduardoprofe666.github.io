/**
 * Builds `public/og.png`, the 1200x630 social card, from the site screenshot in
 * `public/portfolio.png`.
 *
 *   node scripts/generate-og-image.mjs
 *
 * The metadata used to point straight at `portfolio.png` while declaring it as
 * 1200x630; the file is actually 2301x1588, so every preview was cropping it
 * unpredictably. The screenshot is letterboxed rather than cropped so the hero
 * stays visible, and the declared dimensions are finally true.
 *
 * Uses macOS `sips`, so it adds no npm dependency. Re-run it after replacing
 * the screenshot.
 */
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

const root = fileURLToPath(new URL("..", import.meta.url));
const source = join(root, "public/portfolio.png");
const target = join(root, "public/og.png");

/** The 1.91:1 ratio Open Graph, Twitter, LinkedIn and Slack all expect. */
const WIDTH = 1200;
const HEIGHT = 630;

const work = await mkdtemp(join(tmpdir(), "og-"));

try {
  const fitted = join(work, "fitted.png");
  await run("sips", ["--resampleHeight", `${HEIGHT}`, source, "--out", fitted]);
  await run("sips", [
    "-p",
    `${HEIGHT}`,
    `${WIDTH}`,
    "--padColor",
    "FFFFFF",
    fitted,
    "--out",
    target,
  ]);
  console.log(`Generated public/og.png (${WIDTH}x${HEIGHT}).`);
} finally {
  await rm(work, { recursive: true, force: true });
}

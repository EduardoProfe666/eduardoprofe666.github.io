/**
 * Builds `public/og.png`, the 1200x630 social card, from `public/portfolio.png`.
 *
 *   node scripts/generate-og-image.mjs
 *
 * The source has to be captured at the card's own 1.91:1, which is the ratio
 * Open Graph, Twitter, LinkedIn and Slack all expect:
 *
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless --hide-scrollbars --force-device-scale-factor=2 \
 *     --window-size=1200,630 --virtual-time-budget=12000 \
 *     --screenshot=public/portfolio.png http://localhost:4321/
 *
 * Captured that way the resample below lands exactly on 1200x630 and the pad is
 * a no-op, so the card is full bleed. Give it a taller screenshot and it still
 * works — it letterboxes onto white rather than cropping, so the hero survives
 * — but you lose a quarter of the card to empty margins, which is what the
 * previous 2301x1588 source did.
 *
 * `portfolio.png` is also the banner at the top of README.md, so one capture
 * serves both.
 *
 * Uses macOS `sips`, so it adds no npm dependency. Re-run it whenever the page
 * changes enough that the card would be lying.
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

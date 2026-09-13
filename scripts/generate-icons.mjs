/**
 * Derives every icon size the browsers, the OS and Google Search expect from
 * the single 256x256 top-hat mark in `src/app/favicon.ico`.
 *
 *   node scripts/generate-icons.mjs
 *
 * Uses macOS `sips` plus a hand-rolled ICO container, so it adds no npm
 * dependency. The mark itself is unchanged — this only fixes the packaging:
 * the site used to point every `rel="icon"` and the web manifest at
 * `portfolio.png`, which is a screenshot of the page. Google Search only
 * accepts a square
 * favicon, so it was showing the default globe.
 */
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

const root = fileURLToPath(new URL("..", import.meta.url));
const source = join(root, "src/app/favicon.ico");
const publicDir = join(root, "public");

/** Sizes packed into favicon.ico. Google Search reads the 48px entry. */
const ICO_SIZES = [16, 32, 48, 256];

const PNG_TARGETS = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  // Android masks icons to arbitrary shapes, so the mark is inset to the
  // central 80% safe zone.
  { file: "icon-maskable-512.png", size: 512, safeZone: true },
  { file: "apple-icon.png", size: 180 },
];

const work = await mkdtemp(join(tmpdir(), "icons-"));

try {
  const master = join(work, "master.png");
  await run("sips", ["-s", "format", "png", source, "--out", master]);

  async function render(size, safeZone = false) {
    const out = join(work, `out-${size}-${safeZone}.png`);
    if (safeZone) {
      const inner = join(work, `inner-${size}.png`);
      const glyph = Math.round(size * 0.8);
      await run("sips", ["-z", `${glyph}`, `${glyph}`, master, "--out", inner]);
      await run("sips", ["-p", `${size}`, `${size}`, inner, "--out", out]);
    } else {
      await run("sips", ["-z", `${size}`, `${size}`, master, "--out", out]);
    }
    return readFile(out);
  }

  /**
   * Minimal ICO writer: a 6-byte header, one 16-byte directory entry per
   * image, then the PNG payloads. PNG inside ICO is supported everywhere that
   * still matters.
   */
  function buildIco(images) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // type: icon
    header.writeUInt16LE(images.length, 4);

    let offset = 6 + images.length * 16;
    const entries = images.map(({ size, data }) => {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
      entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
      entry.writeUInt8(0, 2); // palette size
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // colour planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(data.length, 8);
      entry.writeUInt32LE(offset, 12);
      offset += data.length;
      return entry;
    });

    return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
  }

  const icoImages = [];
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await render(size) });
  }
  await writeFile(source, buildIco(icoImages));

  for (const { file, size, safeZone } of PNG_TARGETS) {
    await writeFile(join(publicDir, file), await render(size, safeZone));
  }

  console.log(
    `favicon.ico now holds ${ICO_SIZES.join(", ")}px; wrote ${PNG_TARGETS.length} PNG icons.`
  );
} finally {
  await rm(work, { recursive: true, force: true });
}

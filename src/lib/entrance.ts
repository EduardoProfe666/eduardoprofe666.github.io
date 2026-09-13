/**
 * Timing for the opening sequence.
 *
 * The delays used to be written by hand at each call site, which drifted until
 * the page assembled itself out of order: the first job card (`index * 0.03`
 * with `index === 0`, so no delay at all) landed before the hero title, and the
 * portrait arrived after the About paragraph.
 *
 * Positions are declared once, in document order, so the sequence cannot drift
 * again. Everything below the fold is revealed on scroll instead and is not
 * part of this.
 */

/** Seconds between one element and the next. */
const STEP = 0.07;

/** Order of the elements that are on screen when the page loads. */
export const ENTRANCE = {
  heroTitle: 0,
  heroAvatar: 1,
  heroDescription: 2,
  aboutHeading: 3,
  aboutBody: 4,
  workHeading: 5,
  workFirstCard: 6,
} as const;

/** Delay in seconds for a position in the opening sequence. */
export function entrance(position: number): number {
  return Number((position * STEP).toFixed(3));
}

/**
 * Stagger between siblings revealed together on scroll (job cards, projects,
 * events). One constant so every list moves at the same cadence.
 */
export const SIBLING_STEP = 0.05;

/** Delay for the nth sibling, capped so long lists do not crawl. */
export function sibling(index: number, max = 5): number {
  return Number((Math.min(index, max) * SIBLING_STEP).toFixed(3));
}

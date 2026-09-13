/**
 * The motion vocabulary, for the JavaScript side.
 *
 * These are the same three curves as `--ease-glide`, `--ease-spring` and
 * `--ease-soft` in globals.css. framer-motion takes numbers, not custom
 * properties, so the values have to exist twice — but they exist twice *here*,
 * in one place, instead of being retyped as a magic array at every call site.
 *
 * That retyping is not hypothetical. The opening sequence and the scroll
 * reveals were meant to be the same animation; the stylesheet was switched to
 * the glide curve and the components were not, and the top of the page quietly
 * lost its blur while everything below it kept it. One list is how that stops
 * happening again.
 *
 *   glide  — deceleration, for anything travelling a distance.
 *   spring — a small overshoot, for anything that should feel like an object.
 *   state  — hover, focus, anything the pointer toggles. Reciprocal, so it
 *            behaves the same arriving and leaving.
 *   soft   — symmetrical, for properties with no direction: colour, opacity,
 *            and above all blur, where a front-loaded curve destroys the very
 *            states the animation exists to show.
 */
type Bezier = [number, number, number, number];

export const EASE: Record<"glide" | "spring" | "soft" | "state", Bezier> = {
  glide: [0.32, 0.72, 0, 1],
  spring: [0.34, 1.56, 0.64, 1],
  soft: [0.25, 0.4, 0.25, 1],
  state: [0.28, 0.11, 0.32, 1],
};

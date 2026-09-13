import { useMemo } from "react";

/**
 * The two pieces of Markdown this site actually uses.
 *
 * `react-markdown` was rendering exactly `**bold**` and `[text](url)` — the
 * only syntax that appears anywhere in `src/i18n/*` — and charging 75 KB gzip
 * for it, because it pulls in remark, micromark, mdast and hast to do it. That
 * was a quarter of the page's JavaScript spent parsing one About paragraph and
 * six project blurbs.
 *
 * This produces the same DOM (`<p>`, `<strong>`, `<a>`) from the same strings.
 * Anything outside that vocabulary is left as literal text rather than quietly
 * mangled, so an unsupported construct shows up the moment it is written
 * instead of failing silently in production.
 */

/** Escaped first and always, so no string from the copy can open a tag. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Only schemes that cannot execute. Every link in the copy today is an
 * in-page `/#hash`; this keeps a future `javascript:` from ever becoming one,
 * regardless of how the string got there.
 */
function safeHref(href: string): string | null {
  const trimmed = href.trim();
  if (/^(?:https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (/^[/#]/.test(trimmed)) return trimmed;
  return null;
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BOLD = /\*\*([^*]+)\*\*/g;

function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(LINK, (whole, label: string, href: string) => {
      const safe = safeHref(href);
      if (!safe) return whole;
      const external = /^https?:/i.test(safe);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${safe}"${attrs}>${label}</a>`;
    })
    .replace(BOLD, "<strong>$1</strong>");
}

/** Blank-line separated blocks become paragraphs, as in the original. */
export function renderMarkdown(source: string): string[] {
  return source
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => renderInline(block.replace(/\n/g, " ")));
}

/**
 * Paragraphs are emitted as siblings, not wrapped in a container.
 *
 * `@tailwindcss/typography` zeroes the outer margins with `prose > :first-child`
 * and `prose > :last-child` — direct-child selectors. One wrapping `<div>` puts
 * the paragraph out of their reach, and the About section grew 28px of margin
 * that was never in the design. This renders `prose > p`, which is exactly the
 * shape `react-markdown` produced.
 */
export default function Markdown({ children }: { children: string }) {
  const blocks = useMemo(() => renderMarkdown(children), [children]);
  return (
    <>
      {blocks.map((html, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </>
  );
}

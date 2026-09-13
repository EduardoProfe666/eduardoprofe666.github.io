import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import astro from "eslint-plugin-astro";

/**
 * Replaces `eslint-config-next`, which went with the framework.
 *
 * The rules worth keeping from it were never the Next-specific ones — those
 * were about `next/image` and the app router. It was `react-hooks`, and in
 * particular the React 19 additions (`set-state-in-effect`, `immutability`,
 * `preserve-manual-memoization`) that caught real bugs in the i18n store and
 * the skills grid. Those come from the plugin directly now, so they are not
 * tied to any framework.
 */
export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "public/**", "out/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...reactHooks.configs.flat["recommended-latest"],
  },
  {
    files: ["**/*.{ts,tsx,astro}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: { globals: globals.node },
  }
);

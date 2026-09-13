"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUp,
  Check,
  Download,
  Keyboard,
  Languages,
  Mail,
  Moon,
  Search,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { DATA } from "@/data/resume";
import { locales } from "@/i18n/index";
import { useTranslation } from "@/i18n/provider";
import type { Locale } from "@/i18n/types";
import {
  feedbackHover,
  feedbackPop,
  feedbackSweep,
  feedbackTap,
  getServerSoundPrefs,
  getSoundPrefs,
  setMuted,
  subscribeToSound,
} from "@/lib/feedback";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "spotlight:open";

/** Lets the dock button reach the palette without a store between them. */
export function openSpotlight(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Mode = "closed" | "search" | "keys";

/** The platform is a fact about the device, not state to keep in sync. */
const neverChanges = () => () => {};
const readIsMac = () => /mac|iphone|ipad/i.test(navigator.userAgent);
const assumeMac = () => true;

interface Item {
  id: string;
  group: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hint?: string;
  /** Extra text to match against, never shown. */
  keywords?: string;
  run: () => void;
}

/** Section order is also the order `G` numbers them. */
const SECTIONS = [
  { id: "hero", key: "cmd.top" },
  { id: "about", key: "about.title" },
  { id: "work", key: "work.title" },
  { id: "education", key: "education.title" },
  { id: "skills", key: "skills.title" },
  { id: "projects", key: "projects.title" },
  { id: "events", key: "events.title" },
  { id: "contact", key: "contact.chip" },
] as const;

/**
 * Folds accents away so "buscame" finds "Búscame". Matching that only works
 * when you type the diacritic is matching that only works for people who
 * already know the answer.
 */
function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function scrollToSection(id: string): void {
  // `behavior: "auto"` defers to `scroll-behavior` in the stylesheet, which is
  // smooth normally and instant under `prefers-reduced-motion`. Asking for
  // "smooth" here would override the preference — JS wins over CSS — and drag
  // someone who asked for stillness through six thousand pixels of it.
  document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
}

/**
 * Spotlight, more or less.
 *
 * A portfolio is a page you scroll, which means everything below the fold is
 * two seconds of scrolling away. macOS solved that a long time ago: one key,
 * type three letters, done. It doubles as the place every setting lives, so
 * the dock does not have to grow an icon per feature.
 */
export function Spotlight() {
  const { t, setLocale } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const sound = useSyncExternalStore(
    subscribeToSound,
    getSoundPrefs,
    getServerSoundPrefs
  );

  const [mode, setMode] = useState<Mode>("closed");
  const [query, setQuery] = useState("");
  const [onlyLanguages, setOnlyLanguages] = useState(false);
  const [active, setActive] = useState(0);
  const isMac = useSyncExternalStore(neverChanges, readIsMac, assumeMac);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<Element | null>(null);
  const pendingGoto = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setMode((current) => {
      if (current !== "closed") feedbackSweep(false);
      return "closed";
    });
    setQuery("");
    setOnlyLanguages(false);
    setActive(0);
    if (restoreFocus.current instanceof HTMLElement) restoreFocus.current.focus();
  }, []);

  const open = useCallback((next: Exclude<Mode, "closed">, languages = false) => {
    setMode((current) => {
      if (current === "closed") restoreFocus.current = document.activeElement;
      if (current !== next) feedbackSweep(true);
      return next;
    });
    setQuery("");
    setOnlyLanguages(languages);
    setActive(0);
  }, []);

  const toggleTheme = useCallback(() => {
    feedbackPop();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const toggleMute = useCallback(() => {
    const next = !sound.muted;
    setMuted(next);
    if (!next) feedbackPop();
  }, [sound.muted]);

  // ── The commands ──────────────────────────────────────────────────────────
  const items = useMemo<Item[]>(() => {
    const goto = t("cmd.goto");
    const actions = t("cmd.actions");
    const settings = t("cmd.settings");

    const list: Item[] = SECTIONS.map((section, index) => ({
      id: `go-${section.id}`,
      group: goto,
      label: t(section.key),
      icon: ArrowUp,
      hint: `G ${index + 1}`,
      keywords: section.id,
      run: () => scrollToSection(section.id),
    }));

    list.push(
      {
        id: "cv",
        group: actions,
        label: t("cmd.downloadCv"),
        icon: Download,
        keywords: "resume cv pdf",
        run: () => window.open("/resume.pdf", "_blank", "noopener"),
      },
      {
        id: "email",
        group: actions,
        label: t("cmd.copyEmail"),
        icon: Mail,
        keywords: `${DATA.contact.email} mail correo`,
        run: () => {
          void navigator.clipboard?.writeText(DATA.contact.email);
        },
      }
    );

    for (const [name, social] of Object.entries(DATA.contact.social)) {
      if (name === "Email") continue;
      list.push({
        id: `social-${name}`,
        group: actions,
        label: name,
        icon: social.icon,
        run: () => window.open(social.url, "_blank", "noopener"),
      });
    }

    list.push(
      {
        id: "theme",
        group: settings,
        label: t("nav.theme"),
        icon: resolvedTheme === "dark" ? Sun : Moon,
        hint: "T",
        keywords: "dark light tema oscuro claro",
        run: toggleTheme,
      },
      {
        id: "sound",
        group: settings,
        label: sound.muted ? t("nav.soundOn") : t("nav.soundOff"),
        icon: sound.muted ? VolumeX : Volume2,
        hint: "M",
        keywords: "sound audio volumen silencio mute",
        run: toggleMute,
      },
      {
        id: "shortcuts",
        group: settings,
        label: t("cmd.shortcuts"),
        icon: Keyboard,
        hint: "?",
        keywords: "keyboard teclado atajos",
        run: () => open("keys"),
      }
    );

    for (const entry of locales) {
      list.push({
        id: `lang-${entry.code}`,
        group: settings,
        label: `${entry.nativeName} (${entry.name})`,
        icon: Languages,
        keywords: `language idioma ${entry.code} ${entry.name}`,
        run: () => setLocale(entry.code as Locale),
      });
    }

    return list;
  }, [open, resolvedTheme, setLocale, sound.muted, t, toggleMute, toggleTheme]);

  const results = useMemo(() => {
    const pool = onlyLanguages
      ? items.filter((item) => item.id.startsWith("lang-"))
      : items;
    const needle = fold(query.trim());
    if (!needle) return pool;
    return pool.filter((item) =>
      fold(`${item.label} ${item.keywords ?? ""}`).includes(needle)
    );
  }, [items, onlyLanguages, query]);

  // Derived, not stored: when a keystroke shrinks the list under the cursor
  // the selection simply reads as the last row, with no second render to
  // correct itself.
  const activeIndex = results.length > 0 ? Math.min(active, results.length - 1) : 0;

  const move = useCallback(
    (delta: number) => {
      if (results.length === 0) return;
      feedbackHover();
      setActive((activeIndex + delta + results.length) % results.length);
    },
    [activeIndex, results.length]
  );

  const run = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      feedbackTap();
      // `keys` opens another panel, so it closes itself rather than the world.
      if (item.id !== "shortcuts") close();
      item.run();
    },
    [close]
  );

  // ── Global keys ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          /^(input|textarea|select)$/i.test(target.tagName));

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (mode === "search") close();
        else open("search");
        return;
      }

      if (event.key === "Escape" && mode !== "closed") {
        event.preventDefault();
        close();
        return;
      }

      // A pending `G` swallows the next digit wherever it lands.
      if (pendingGoto.current && /^[1-8]$/.test(event.key)) {
        clearTimeout(pendingGoto.current);
        pendingGoto.current = null;
        event.preventDefault();
        feedbackTap();
        scrollToSection(SECTIONS[Number(event.key) - 1].id);
        return;
      }

      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;

      switch (event.key) {
        case "/":
          event.preventDefault();
          open("search");
          break;
        case "?":
          event.preventDefault();
          open("keys");
          break;
        case "l":
        case "L":
          event.preventDefault();
          open("search", true);
          break;
        case "t":
        case "T":
          toggleTheme();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "g":
        case "G":
          if (pendingGoto.current) clearTimeout(pendingGoto.current);
          // Long enough to find the number, short enough that a stray G does
          // not sit there waiting to hijack something you type later.
          pendingGoto.current = setTimeout(() => {
            pendingGoto.current = null;
          }, 1400);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, mode, open, toggleMute, toggleTheme]);

  useEffect(() => {
    const onOpen = () => open("search");
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [open]);

  // Lock the page behind the panel. `scrollbar-gutter: stable` on <html> means
  // taking the scrollbar away costs no reflow.
  useEffect(() => {
    if (mode === "closed") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [mode]);

  useEffect(() => {
    if (mode === "search") inputRef.current?.focus();
  }, [mode]);

  // Keep the highlighted row in view when the arrows walk past the edge.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results.length]);

  useEffect(
    () => () => {
      if (pendingGoto.current) clearTimeout(pendingGoto.current);
    },
    []
  );

  const meta = isMac ? "⌘" : "Ctrl";
  const SHORTCUTS = [
    { keys: [meta, "K"], label: t("keys.spotlight") },
    { keys: ["T"], label: t("nav.theme") },
    { keys: ["M"], label: t("keys.sound") },
    { keys: ["L"], label: t("nav.language") },
    { keys: ["G", "1–8"], label: t("cmd.goto") },
    { keys: ["?"], label: t("keys.help") },
    { keys: ["↑", "↓"], label: t("keys.move") },
    { keys: ["↵"], label: t("keys.run") },
    { keys: ["esc"], label: t("keys.close") },
  ];

  const rows = results.map((item, index) => ({
    item,
    header: index === 0 || results[index - 1].group !== item.group ? item.group : null,
  }));

  return (
    <AnimatePresence>
      {mode !== "closed" && (
        <m.div
          key="overlay"
          data-sfx="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-foreground/10 px-4 pt-[14vh] backdrop-blur-[3px]"
        >
          <m.div
            key={mode}
            initial={{ opacity: 0, scale: 0.94, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 460, damping: 30, mass: 0.7 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={mode === "search" ? t("cmd.open") : t("cmd.shortcuts")}
            className="material material-dense w-full max-w-[34rem] overflow-hidden rounded-2xl"
          >
            {mode === "search" ? (
              <>
                <div className="flex items-center gap-3 border-b border-border/60 px-4">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActive(0);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        move(1);
                      } else if (event.key === "ArrowUp") {
                        event.preventDefault();
                        move(-1);
                      } else if (event.key === "Enter") {
                        event.preventDefault();
                        run(results[activeIndex]);
                      }
                    }}
                    placeholder={t("cmd.placeholder")}
                    aria-label={t("cmd.placeholder")}
                    className="h-13 w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <kbd className="hidden shrink-0 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
                    esc
                  </kbd>
                </div>

                <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-1.5">
                  {results.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                      {t("cmd.empty")}
                    </p>
                  )}
                  {rows.map(({ item, header }, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id}>
                        {header && (
                          <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                            {header}
                          </p>
                        )}
                        <button
                          type="button"
                          data-active={index === activeIndex}
                          onPointerEnter={() => setActive(index)}
                          onClick={() => run(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ease-soft",
                            index === activeIndex
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80"
                          )}
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.hint && (
                            <kbd className="shrink-0 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {item.hint}
                            </kbd>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="p-5">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Keyboard className="size-4" />
                  {t("cmd.shortcuts")}
                </h2>
                <ul className="grid gap-1.5">
                  {SHORTCUTS.map((row) => (
                    <li
                      key={row.keys.join("+")}
                      className="flex items-center justify-between gap-4 rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 ease-soft hover:bg-accent/50"
                    >
                      <span className="text-foreground/80">{row.label}</span>
                      <span className="flex shrink-0 items-center gap-1">
                        {row.keys.map((key) => (
                          <kbd
                            key={key}
                            className="min-w-6 rounded-md border border-border/70 bg-background/60 px-1.5 py-0.5 text-center text-[11px] font-medium text-muted-foreground"
                          >
                            {key}
                          </kbd>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check className="size-3" />
                  {t("keys.close")}
                  <kbd className="rounded-md border border-border/70 px-1 py-0.5 text-[10px]">
                    esc
                  </kbd>
                </p>
              </div>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/main/mode-toggle";
import { SoundToggle } from "@/components/main/sound-toggle";
import { buttonVariants } from "@/components/common/button";
import { Separator } from "@/components/common/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/common/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LanguageSwitcher } from "@/components/main/language-switcher";
import { feedbackTick } from "@/lib/feedback";
import { useTranslation } from "@/i18n/provider";
import { useSyncExternalStore } from "react";

/** `false` during SSR and the hydration pass, `true` afterwards. */
const noopSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

export default function Navbar() {
  // The dock reads the theme and the selected locale, neither of which the
  // server knows, so it renders only after hydration.
  const mounted = useSyncExternalStore(noopSubscribe, onClient, onServer);
  const { t } = useTranslation();

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      {/* Content scrolling out of the viewport fades rather than sliding under a
          hard edge. It stops short of the dock on purpose: the glass needs
          something real behind it to blur, which is the whole point of a
          vibrant material. Masked rather than a gradient so it works from the
          background colour alone, in either theme. No blur of its own — that
          would be a full-width blurred band beside a narrow pill. */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 inset-x-0 h-24 w-full bg-background [-webkit-mask-image:linear-gradient(to_top,black_0%,black_18%,transparent_65%)] [mask-image:linear-gradient(to_top,black_0%,black_18%,transparent_65%)]"
      />
      {/* The dock can only render once the theme and locale are known, so it
          arrives after the page does. Sliding it up turns that into an entrance
          instead of a pop. */}
      <Dock className="material z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 transform-gpu animate-in fade-in slide-in-from-bottom-6 duration-500 ease-glide">
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* A plain <a>, not next/link: the router prefetched this static
                  PDF as if it were a route and requested
                  `/resume.pdf/__next._tree.txt`, which 404s in the console. */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label={t("nav.resume")}
                onClick={feedbackTick}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <FileText className="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("nav.resume")}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://github.com/EduardoProfe666"
                aria-label={t("nav.github")}
                onClick={feedbackTick}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <GitHubLogoIcon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("nav.github")}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <Separator orientation="vertical" className="mx-0.5 h-6 self-center bg-border/70" />
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  aria-label={name}
                  onClick={feedbackTick}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="mx-0.5 h-6 self-center bg-border/70" />
        <DockIcon>
          <ModeToggle />
        </DockIcon>
        <DockIcon>
          <SoundToggle />
        </DockIcon>
        <DockIcon>
          <LanguageSwitcher />
        </DockIcon>
      </Dock>
    </div>
  );
}

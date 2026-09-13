"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03,
    minSpeed: 0.01,
    dragControl: false,
    freezeActive: true,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  // These feed the contrast maths inside `renderSimpleIcon`, so they have to
  // be the background the icons are actually drawn on. #f3f2ef and #080510 were
  // a warm grey and a purple-black — neither is a colour this site uses.
  const bgHex = theme === "light" ? "#ffffff" : "#08090a";
  const fallbackHex = theme === "light" ? "#737373" : "#fafafa";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 36,
    aProps: {
      // These anchors are the <canvas> fallback content — never shown to a
      // user, but Lighthouse still flagged ~30 of them as uncrawlable because
      // they had no href. A same-page href satisfies that; `aria-hidden` and
      // `tabIndex` keep them out of the accessibility tree and the tab order.
      href: "#skills",
      target: undefined,
      rel: undefined,
      "aria-hidden": "true",
      tabIndex: -1,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

// Loading fallback component
const SkillsLoading = () => (
  <div className="flex items-center justify-center h-64 w-full">
    <div className="animate-pulse text-muted-foreground">Loading skills...</div>
  </div>
);

function IconCloudCore({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    // Delay loading to improve initial page load
    const timer = setTimeout(() => {
      if (isMounted) {
        fetchSimpleIcons({ slugs: iconSlugs })
          .then((result) => {
            if (isMounted) {
              setData(result);
              setIsLoading(false);
            }
          })
          .catch(() => {
            if (isMounted) {
              setIsLoading(false);
            }
          });
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || isLoading) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme, isLoading]);

  if (isLoading || !renderedIcons) {
    return <SkillsLoading />;
  }

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  return (
    <Suspense fallback={<SkillsLoading />}>
      <IconCloudCore iconSlugs={iconSlugs} />
    </Suspense>
  );
}

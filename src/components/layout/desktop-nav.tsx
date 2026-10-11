"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string; external?: boolean };

type DesktopNavProps = {
  links: NavLink[];
  label: string;
};

/** True for page-level links (no hash, not external) that match the URL. */
export function isCurrentPage(pathname: string, link: NavLink) {
  return !link.external && !link.href.includes("#") && pathname === link.href;
}

export function DesktopNav({ links, label }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="ml-auto hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {links.map((link) => {
          const current = isCurrentPage(pathname, link);
          const Anchor = link.external ? "a" : Link;
          return (
            <li key={link.href}>
              <Anchor
                href={link.href}
                aria-current={current ? "page" : undefined}
                {...(link.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 text-[0.95rem] font-bold transition-colors hover:bg-accent hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none",
                  current ? "bg-accent text-primary" : "text-primary/80",
                )}
              >
                {link.label}
              </Anchor>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

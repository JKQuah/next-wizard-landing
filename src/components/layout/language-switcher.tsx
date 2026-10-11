"use client";

import { CheckIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // `/en/some/path` -> `/<next>/some/path`
  const hrefFor = (next: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${next}${rest ? `/${rest}` : ""}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${localeLabels[locale].short}, ${label}`}
        className={cn(buttonVariants({ variant: "ghost", size: "default" }), "px-3")}
      >
        <GlobeIcon aria-hidden="true" />
        <span>{localeLabels[locale].short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-2xl p-1.5">
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            className="min-h-11 cursor-pointer rounded-xl px-3 text-base font-semibold"
            render={<Link href={hrefFor(code)} hrefLang={code} lang={code} />}
          >
            <span className="flex-1">{localeLabels[code].name}</span>
            {code === locale && <CheckIcon aria-hidden="true" className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

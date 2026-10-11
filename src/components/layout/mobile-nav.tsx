"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isCurrentPage } from "@/components/layout/desktop-nav";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  links: { href: string; label: string; external?: boolean }[];
  signUp: { href: string; label: string };
  labels: { open: string; close: string; navigation: string };
};

export function MobileNav({ links, signUp, labels }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" aria-label={labels.open} />}
        className="xl:hidden"
      >
        <MenuIcon aria-hidden="true" className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-4/5 max-w-sm gap-2 rounded-l-3xl p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-xl font-extrabold">Singapore Math Wizard</SheetTitle>
        </SheetHeader>
        <nav aria-label={labels.navigation} className="flex flex-col gap-1 px-4">
          {links.map((link) => {
            const current = isCurrentPage(pathname, link);
            return (
              <SheetClose
                key={link.href}
                render={
                  link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" />
                  ) : (
                    <Link href={link.href} aria-current={current ? "page" : undefined} />
                  )
                }
                className={cn(
                  "flex min-h-12 items-center rounded-2xl px-4 text-lg font-bold text-primary transition-colors hover:bg-accent focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none",
                  current && "bg-accent",
                )}
              >
                {link.label}
              </SheetClose>
            );
          })}
        </nav>
        <div className="mt-auto p-6">
          <a
            href={signUp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "cta", size: "lg" }), "w-full")}
          >
            {signUp.label}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

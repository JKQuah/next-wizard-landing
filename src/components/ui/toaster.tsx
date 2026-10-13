"use client";

import { Toast } from "@base-ui/react/toast";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToastLink = { href: string; label: string; icon?: ReactNode };
type ToastData = { links?: ToastLink[] };

/** Module-level so any client code can call `toastManager.add(...)`. */
export const toastManager = Toast.createToastManager<ToastData>();

/**
 * Look per toast `type`; anything else gets the info look. Card tints are
 * opaque (mixed with white) so page content never shows through.
 */
const TONES: Record<
  string,
  { Icon: typeof InfoIcon; card: string; tile: string }
> = {
  error: {
    Icon: CircleAlertIcon,
    card: "bg-[color-mix(in_oklab,var(--destructive)_12%,white)] ring-destructive/30",
    tile: "bg-white/80 text-destructive",
  },
  success: {
    Icon: CircleCheckIcon,
    card: "bg-[color-mix(in_oklab,var(--color-secondary-300)_32%,white)] ring-secondary-500/40",
    tile: "bg-white/80 text-primary",
  },
  info: {
    Icon: InfoIcon,
    card: "bg-accent ring-primary-300/50",
    tile: "bg-white/80 text-primary",
  },
};

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = Toast.useToastManager<ToastData>();

  return toasts.map((toast) => {
    const { Icon, card, tile } = TONES[toast.type ?? "info"] ?? TONES.info;
    const links = toast.data?.links;

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        swipeDirection="right"
        className={cn(
          "pointer-events-auto relative translate-x-(--toast-swipe-movement-x) overflow-hidden rounded-3xl p-4 text-primary shadow-clay-hover ring-1 transition duration-300 ease-out-soft data-ending-style:translate-x-10 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:translate-x-10 data-starting-style:scale-95 data-starting-style:opacity-0 data-swiping:transition-none",
          card,
        )}
      >
        <Toast.Content className="flex flex-col gap-3.5">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", tile)}
            >
              <Icon className="size-6" />
            </span>

            <div className="min-w-0 flex-1 pr-8">
              {toast.title && (
                <Toast.Title className="text-sm leading-tight font-extrabold" />
              )}
              <Toast.Description
                render={<p />}
                className="mt-1 text-sm leading-relaxed text-muted-foreground"
              />
            </div>
          </div>

          {/* One row, whatever the width: the buttons share it equally. */}
          {links && links.length > 0 && (
            <div className="flex gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "min-w-0 flex-1 border-primary-300/60 text-sm font-extrabold",
                  )}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <Toast.Close
            aria-label={closeLabel}
            className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full text-primary/70 outline-none transition-colors hover:bg-accent hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/40"
          >
            <XIcon aria-hidden="true" className="size-5" />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

/**
 * Top-right toast stack, parked just under the sticky header (4.5rem, 5rem at
 * lg) so the nav stays reachable. Render once next to whatever calls `toastManager`.
 */
export function Toaster({ closeLabel }: { closeLabel: string }) {
  return (
    <Toast.Provider toastManager={toastManager}>
      <Toast.Portal>
        <Toast.Viewport className="pointer-events-none fixed top-22 right-4 z-60 flex w-[calc(100vw-2rem)] max-w-md flex-col gap-3 sm:right-6 lg:top-24">
          <ToastList closeLabel={closeLabel} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

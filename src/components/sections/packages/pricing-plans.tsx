"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  GiftIcon,
  SparklesIcon,
  StarIcon,
  UserRoundIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { interpolate } from "@/i18n/format";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";
type Pricing = Dictionary["pricingMediaPage"]["pricing"];

const billings: Billing[] = ["monthly", "yearly"];

const planIcons: Record<string, { Icon: LucideIcon; tone: string }> = {
  free: { Icon: GiftIcon, tone: "bg-secondary-300/55" },
  "one-to-one": { Icon: UserRoundIcon, tone: "bg-secondary-500" },
  peer: { Icon: UsersRoundIcon, tone: "bg-primary-300/55" },
};

/** 2640 -> "2,640"; the free plan keeps its "0.00". */
const money = (value: string, recurring: boolean) =>
  recurring ? Number(value).toLocaleString("en-US") : value;

type PricingPlansProps = {
  pricing: Pricing;
  signUpHref: string;
  /** Screen-reader note appended to links that open in a new tab. */
  externalNote: string;
};

export function PricingPlans({ pricing, signUpHref, externalNote }: PricingPlansProps) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { billing: labels } = pricing;
  const period = billing === "monthly" ? labels.monthlyPeriod : labels.yearlyPeriod;
  // A plan with no price for the chosen period (Peer Learning has no yearly) is hidden.
  const visiblePlans = pricing.plans.filter((plan) => plan.price[billing] !== null);

  return (
    <>
      <Reveal delay={0.12} className="mt-8 flex justify-center">
        <div
          role="group"
          aria-label={labels.label}
          className="inline-grid grid-cols-2 gap-1 rounded-full bg-white p-1.5 shadow-clay ring-1 ring-primary-300/50"
        >
          {billings.map((key) => {
            const active = billing === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setBilling(key)}
                className={cn(
                  "relative min-h-11 cursor-pointer rounded-full px-6 text-base font-extrabold transition-[background-color,color,transform] duration-200 ease-out focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none active:scale-[0.97] sm:px-8",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-primary hover:bg-accent",
                )}
              >
                {labels[key]}
                {key === "yearly" && (
                  // Pinned to the button's top-right corner, lifted above the pill.
                  <span className="pointer-events-none absolute -top-3 -right-2 rounded-full bg-secondary-500 px-2 py-0.5 text-xs font-extrabold text-primary tabular-nums shadow-sm ring-2 ring-white">
                    {labels.yearlyTag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* 6 columns of 2: three cards fill the row, two sit centred at the same width. */}
      <ul className="mt-10 grid gap-6 md:grid-cols-6 md:items-stretch md:gap-5 lg:gap-8">
        {visiblePlans.map((plan, i) => {
          const { Icon, tone } = planIcons[plan.id] ?? planIcons.free;
          const price = plan.price[billing] ?? "";
          const upgrades: { feature: number; was: string; now: string }[] = plan.upgrades;
          const saving =
            plan.recurring && plan.price.yearly !== null
              ? Number(plan.price.monthly) * 12 - Number(plan.price.yearly)
              : 0;

          return (
            <Reveal
              as="li"
              // Re-keyed with the billing period so a plan that appears fades in.
              key={`${plan.id}-${billing}`}
              delay={0.08 * i}
              className={cn(
                "flex md:col-span-2",
                visiblePlans.length === 2 && i === 0 && "md:col-start-2",
              )}
            >
              <article
                className={cn(
                  "relative flex w-full flex-col rounded-3xl p-7 sm:p-8",
                  plan.popular
                    ? "bg-primary-500 text-white shadow-clay-hover md:-translate-y-3"
                    : "clay-card text-primary",
                )}
              >
                {plan.popular && (
                  <p className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-secondary-500 px-3 py-1 text-xs font-extrabold tracking-wide text-primary uppercase">
                    <StarIcon aria-hidden="true" className="size-3.5 fill-current" />
                    {pricing.popular}
                  </p>
                )}

                <span
                  aria-hidden="true"
                  className={cn("grid size-14 place-items-center rounded-2xl text-primary", tone)}
                >
                  <Icon className="size-7" />
                </span>

                <h2 className="mt-5 text-xl font-extrabold">{plan.name}</h2>

                {/* Re-keyed on the billing period so the new price fades in. */}
                <div key={billing} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
                  <p className="mt-3 flex items-end gap-1.5">
                    <span className="mb-2 text-base font-bold opacity-80">{pricing.currency}</span>
                    <span className="text-5xl leading-none font-black tracking-tight">
                      {money(price, plan.recurring)}
                    </span>
                    {plan.recurring && (
                      <span className="mb-1.5 text-base font-bold opacity-80">{period}</span>
                    )}
                  </p>
                  {plan.recurring && (
                    // Always rendered so the card doesn't jump when switching.
                    <p
                      aria-hidden={billing !== "yearly"}
                      className={cn(
                        "mt-2 text-sm font-bold",
                        plan.popular ? "text-secondary-300" : "text-primary/80",
                        billing !== "yearly" && "invisible",
                      )}
                    >
                      {interpolate(labels.save, { amount: saving.toLocaleString("en-US") })}
                    </p>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((text, index) => {
                    const upgrade = upgrades.find((item) => item.feature === index);
                    const tick = (
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-secondary-500 text-primary"
                      >
                        <CheckIcon className="size-3.5 stroke-[3]" />
                      </span>
                    );
                    const textClass = plan.popular ? "text-white" : "text-primary/90";

                    // An improved feature gets its own highlighted panel.
                    if (upgrade) {
                      return (
                        <li
                          key={text}
                          className="relative mt-4 rounded-2xl bg-secondary-300/30 p-3.5 ring-1 ring-secondary-500/50"
                        >
                          <span className="absolute -top-3 right-3 rounded-full bg-secondary-500 px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-primary uppercase shadow-sm">
                            {pricing.upgradedLabel}
                          </span>
                          <div className="flex items-start gap-3">
                            {tick}
                            <div className="min-w-0 space-y-2">
                              <p className="text-base leading-snug font-extrabold text-primary">{text}</p>
                              <p className="flex flex-wrap items-center gap-2 text-sm font-bold">
                                <del className="text-primary/55 decoration-primary/60 decoration-2">
                                  {upgrade.was}
                                </del>
                                <ArrowRightIcon aria-hidden="true" className="size-4 text-secondary-500" strokeWidth={3} />
                                <span className="rounded-full bg-primary px-2.5 py-0.5 text-primary-foreground">
                                  {upgrade.now}
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li key={text} className="flex items-start gap-3">
                        {tick}
                        <span className={cn("text-base leading-snug", textClass)}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                {plan.extras.length > 0 && (
                  <ul
                    className={cn(
                      "mt-5 space-y-3 border-t-2 border-dashed pt-5",
                      plan.popular ? "border-white/25" : "border-primary-300/60",
                    )}
                  >
                    {plan.extras.map((text) => (
                      <li key={text} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                            plan.popular ? "bg-white/15 text-white" : "bg-primary-300/50 text-primary",
                          )}
                        >
                          <SparklesIcon className="size-3.5" />
                        </span>
                        <span
                          className={cn(
                            "text-base leading-snug font-semibold",
                            plan.popular ? "text-white" : "text-primary",
                          )}
                        >
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-8">
                  <a
                    href={signUpHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: plan.popular ? "cta" : "default", size: "lg" }),
                      "w-full",
                    )}
                  >
                    {plan.cta}
                    <span className="sr-only">{externalNote}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </>
  );
}

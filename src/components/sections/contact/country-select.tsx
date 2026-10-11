"use client";

import { Select } from "@base-ui/react/select";
import { AE, AU, CN, GB, HK, ID, MY, SG, US } from "country-flag-icons/react/3x2";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Country = { code: string; name: string };

type CountrySelectProps = {
  id: string;
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  countries: readonly Country[];
  placeholder: string;
  /** Marks the field mandatory (native form validation + aria-required). */
  required?: boolean;
  /** Shows the error state; `describedBy` should point at the message. */
  invalid?: boolean;
  describedBy?: string;
  /** Same look as the text inputs next to it. */
  className?: string;
};

const FLAGS: Record<string, typeof MY> = {
  MY,
  SG,
  HK,
  ID,
  AU,
  CN,
  AE,
  US,
  GB,
};

/** SVG flag for a country code; anything without one gets a globe. */
function CountryFlag({ code }: { code: string }) {
  const Flag = FLAGS[code];

  return (
    <span aria-hidden="true" className="grid h-4 w-6 shrink-0 place-items-center">
      {Flag ? (
        <Flag className="block h-4 w-6 rounded-[3px] ring-1 ring-black/10" />
      ) : (
        <GlobeIcon className="size-5 text-primary" />
      )}
    </span>
  );
}

/**
 * A styled replacement for the native <select>. Base UI renders a hidden input
 * with `name`, so the value still posts with the surrounding <form>.
 */
export function CountrySelect({
  id,
  name,
  value,
  onValueChange,
  countries,
  placeholder,
  required,
  invalid,
  describedBy,
  className,
}: CountrySelectProps) {
  const items = countries.map((country) => ({
    value: country.code,
    label: (
      <span className="flex items-center gap-2.5">
        <CountryFlag code={country.code} />
        {country.name}
      </span>
    ),
  }));

  return (
    <Select.Root
      name={name}
      items={items}
      // null (not "") is Base UI's "nothing selected", which shows the placeholder.
      value={value || null}
      onValueChange={(next) => onValueChange(next ?? "")}
    >
      <Select.Trigger
        id={id}
        aria-required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          className,
          "flex cursor-pointer items-center justify-between gap-3 text-left",
          value === "" && "text-muted-foreground/85",
          invalid && "border-destructive focus-visible:border-destructive",
        )}
      >
        <Select.Value placeholder={placeholder} className="min-w-0 truncate" />
        <Select.Icon className="shrink-0 text-primary">
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner sideOffset={8} alignItemWithTrigger={false} className="z-50">
          <Select.Popup className="max-h-[min(300px,var(--available-height))] min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border-2 border-primary-300/60 bg-white p-2 shadow-clay-hover outline-none transition duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Select.List>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-base font-semibold text-primary outline-none select-none",
                    "data-highlighted:bg-accent data-selected:font-extrabold",
                  )}
                >
                  <Select.ItemText className="min-w-0 truncate">
                    {item.label}
                  </Select.ItemText>
                  <Select.ItemIndicator className="shrink-0 text-primary">
                    <CheckIcon aria-hidden="true" className="size-4" strokeWidth={3} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

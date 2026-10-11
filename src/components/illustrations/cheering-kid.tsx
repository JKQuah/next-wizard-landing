type CheeringKidProps = {
  alt: string;
  className?: string;
};

/** Girl with both fists raised, used in the languages section. */
export function CheeringKid({ alt, className }: CheeringKidProps) {
  return (
    <svg
      viewBox="0 0 360 430"
      role="img"
      aria-label={alt}
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* back hair */}
      <path
        d="M100 150C92 70 140 36 180 36s88 34 82 114c0 60 14 100 0 140H98c-14-40 2-80 2-140Z"
        className="fill-hair-auburn"
      />
      {/* arms raised (behind the tee sleeves) */}
      <path
        d="M92 322C38 322 34 238 64 184"
        className="stroke-skin"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M268 322c54 0 58-84 28-138"
        className="stroke-skin"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="64" cy="178" r="21" className="fill-skin" />
      <circle cx="296" cy="178" r="21" className="fill-skin" />
      {/* tee */}
      <path
        d="M66 430V346c0-48 46-78 114-78s114 30 114 78v84Z"
        className="fill-secondary-300"
      />
      <circle cx="92" cy="320" r="28" className="fill-secondary-300" />
      <circle cx="268" cy="320" r="28" className="fill-secondary-300" />
      {/* neck + head */}
      <rect x="164" y="212" width="32" height="64" rx="14" className="fill-skin-shade" />
      <circle cx="118" cy="164" r="12" className="fill-skin" />
      <circle cx="242" cy="164" r="12" className="fill-skin" />
      <circle cx="180" cy="160" r="62" className="fill-skin" />
      {/* fringe */}
      <path
        d="M118 150c6-52 40-70 66-66 40 4 62 32 58 66-18-28-62-40-124 0Z"
        className="fill-hair-auburn"
      />
      {/* face: happy closed eyes, open mouth */}
      <path
        d="M150 164q10-14 20 0M190 164q10-14 20 0"
        className="stroke-primary-500"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="146" cy="188" r="9" className="fill-blush" opacity=".5" />
      <circle cx="214" cy="188" r="9" className="fill-blush" opacity=".5" />
      <path d="M148 184q32 56 64 0Z" className="fill-primary-500" />
      <path d="M164 204q16-10 32 0q-16 16-32 0Z" className="fill-blush" />
    </svg>
  );
}

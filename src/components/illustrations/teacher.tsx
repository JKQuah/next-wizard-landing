type TeacherProps = {
  alt: string;
  className?: string;
};

/** Smiling teacher with glasses holding a book; sits in an arch frame. */
export function Teacher({ alt, className }: TeacherProps) {
  return (
    <svg
      viewBox="0 0 320 440"
      role="img"
      aria-label={alt}
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* back hair */}
      <path
        d="M82 176C76 84 118 42 160 42s84 42 78 134c-2 42 10 76 4 108H78c-6-32 6-66 4-108Z"
        className="fill-primary-500"
      />
      {/* blazer + shirt */}
      <path
        d="M24 440v-82c0-54 54-86 136-86s136 32 136 86v82Z"
        className="fill-primary-300"
      />
      <path d="M128 274l32 66 32-66Z" className="fill-white" />
      <path
        d="M128 274 104 330M192 274l24 56"
        className="stroke-primary-500"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* neck, ears, head */}
      <rect x="142" y="224" width="36" height="58" rx="16" className="fill-skin-shade" />
      <circle cx="98" cy="176" r="12" className="fill-skin" />
      <circle cx="222" cy="176" r="12" className="fill-skin" />
      <circle cx="160" cy="172" r="64" className="fill-skin" />
      {/* fringe */}
      <path
        d="M96 164c4-58 44-80 80-72 34 8 56 34 50 72-20-34-82-50-130 0Z"
        className="fill-primary-500"
      />
      {/* glasses + face */}
      <circle cx="134" cy="180" r="18" className="fill-white/40 stroke-primary-500" strokeWidth="5" />
      <circle cx="186" cy="180" r="18" className="fill-white/40 stroke-primary-500" strokeWidth="5" />
      <line x1="152" y1="180" x2="168" y2="180" className="stroke-primary-500" strokeWidth="5" />
      <circle cx="134" cy="180" r="4.5" className="fill-primary-500" />
      <circle cx="186" cy="180" r="4.5" className="fill-primary-500" />
      <circle cx="116" cy="202" r="9" className="fill-blush" opacity=".45" />
      <circle cx="204" cy="202" r="9" className="fill-blush" opacity=".45" />
      <path
        d="M140 206q20 22 40 0"
        className="stroke-primary-500"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* arm + book */}
      <path
        d="M52 336c-22 50 6 88 66 76"
        className="stroke-primary-300"
        strokeWidth="44"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="rotate(-8 170 400)">
        <rect x="100" y="352" width="140" height="92" rx="10" className="fill-secondary-500" />
        <rect x="222" y="360" width="12" height="76" rx="4" className="fill-white" />
        <rect x="116" y="368" width="84" height="10" rx="5" className="fill-secondary-300" />
      </g>
      <circle cx="116" cy="404" r="18" className="fill-skin" />
    </svg>
  );
}

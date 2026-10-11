type JoinTeamProps = {
  alt: string;
  className?: string;
};

/**
 * Teacher in a headset waving hello, a tablet with a bar model in hand and
 * math symbols floating around. Drawn for a dark background (no frame).
 */
export function JoinTeam({ alt, className }: JoinTeamProps) {
  return (
    <svg
      viewBox="0 0 320 440"
      role="img"
      aria-label={alt}
      className={`join-team overflow-visible ${className ?? ""}`}
      preserveAspectRatio="xMidYMax meet"
    >

      {/* Slow float: one smooth rise and fall. Offsets are in viewBox units. */}
      <style>{`
        @keyframes join-team-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .join-team-float {
          animation: join-team-float 5s ease-in-out infinite;
        }
        @keyframes join-team-wave {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-20deg); }
          75%      { transform: rotate(16deg); }
        }
        .join-team-hand { transform-origin: 274px 246px; }
        .join-team:hover .join-team-hand {
          animation: join-team-wave 0.5s ease-in-out 4;
        }
        @media (prefers-reduced-motion: reduce) {
          .join-team-float,
          .join-team:hover .join-team-hand { animation: none; }
        }
      `}</style>

      {/* floating math symbols; each wrapper floats, the inner group keeps its tilt */}
      <g className="join-team-float" style={{ animationDuration: "5s" }}>
        <g transform="rotate(-12 58 118)">
          <rect x="34" y="94" width="48" height="48" rx="14" className="fill-white" />
          <path
            d="M58 106v24M46 118h24"
            className="stroke-primary-500"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g className="join-team-float" style={{ animationDuration: "6s", animationDelay: "-2s" }}>
        <circle cx="262" cy="100" r="26" className="fill-primary-300" />
        <path
          d="M250 100h24"
          className="stroke-primary-500"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="262" cy="88" r="4" className="fill-primary-500" />
        <circle cx="262" cy="112" r="4" className="fill-primary-500" />
      </g>
      <g className="join-team-float" style={{ animationDuration: "5.5s", animationDelay: "-3.5s" }}>
        <path d="M38.0 228.0L43.3 242.7L58.9 243.2L46.6 252.8L50.9 267.8L38.0 259.0L25.1 267.8L29.4 252.8L17.1 243.2L32.7 242.7Z" className="fill-secondary-300" />
      </g>

      {/* shirt, collar, lanyard */}
      <path
        d="M28 440v-70c0-58 50-92 132-92s132 34 132 92v70Z"
        className="fill-secondary-400"
      />
      <path d="M126 278l34 40 34-40Z" className="fill-white" />
      <path
        d="M122 284l38 84 38-84"
        className="stroke-primary-500"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="142" y="362" width="36" height="46" rx="8" className="fill-white" />
      <path d="M160.0 374.0L162.7 381.3L170.5 381.6L164.4 386.4L166.5 393.9L160.0 389.6L153.5 393.9L155.6 386.4L149.5 381.6L157.3 381.3Z" className="fill-secondary-500" />

      {/* neck, ears, head */}
      <rect x="142" y="226" width="36" height="58" rx="16" className="fill-skin-shade" />
      <circle cx="98" cy="178" r="12" className="fill-skin" />
      <circle cx="222" cy="178" r="12" className="fill-skin" />
      <circle cx="160" cy="174" r="64" className="fill-skin" />

      {/* hair */}
      <path
        d="M96 168C92 108 128 84 164 84c40 0 68 28 60 84-10-28-34-42-62-40-28 2-54 14-66 40Z"
        className="fill-hair-brown"
      />

      {/* headset */}
      <path
        d="M100 166c0-70 120-70 120 0"
        className="stroke-secondary-300"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="86" y="162" width="22" height="48" rx="10" className="fill-secondary-300 stroke-primary-500" strokeWidth="4" />
      <rect x="212" y="162" width="22" height="48" rx="10" className="fill-secondary-300 stroke-primary-500" strokeWidth="4" />
      <path
        d="M224 206c8 30-16 40-40 34"
        className="stroke-primary-500"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="182" cy="240" r="8" className="fill-secondary-300 stroke-primary-500" strokeWidth="4" />

      {/* face */}
      <path
        d="M122 160q12-9 24 0M174 160q12-9 24 0"
        className="stroke-primary-500"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="134" cy="178" r="5" className="fill-primary-500" />
      <circle cx="186" cy="178" r="5" className="fill-primary-500" />
      <circle cx="116" cy="200" r="9" className="fill-blush" opacity=".45" />
      <circle cx="204" cy="200" r="9" className="fill-blush" opacity=".45" />
      <path
        d="M138 204q22 26 44 0Z"
        className="fill-white stroke-primary-500"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* waving arm + hand */}
      <path
        d="M236 340c34-10 46-48 38-100"
        className="stroke-secondary-400"
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
      />
      <g className="join-team-hand">
        <path
          d="M262 210l-6-24M273 208l-1-28M285 210l4-26M295 218l11-18M253 228l-16-12"
          className="stroke-skin"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="274" cy="226" r="23" className="fill-skin" />
        <path
          d="M302 200q8 12 0 26M309 192q11 20 0 42"
          className="stroke-white"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* other arm + tablet with a bar model */}
      <path
        d="M58 342c-16 46 12 82 64 72"
        className="stroke-secondary-400"
        strokeWidth="44"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="rotate(-8 150 392)">
        <rect x="84" y="346" width="132" height="90" rx="12" className="fill-white stroke-primary-500" strokeWidth="4" />
        <rect x="100" y="366" width="88" height="16" rx="4" className="fill-secondary-500" />
        <rect x="100" y="390" width="56" height="16" rx="4" className="fill-primary-300" />
        <rect
          x="158"
          y="390"
          width="30"
          height="16"
          rx="4"
          className="stroke-primary-500"
          strokeWidth="3"
          strokeDasharray="5 4"
          fill="none"
        />
      </g>
      <circle cx="116" cy="414" r="18" className="fill-skin" />
    </svg>
  );
}

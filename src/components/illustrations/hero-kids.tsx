type HeroKidsProps = {
  alt: string;
  className?: string;
};

/** Flat illustration of a girl and a boy; fills the hero's right column. */
export function HeroKids({ alt, className }: HeroKidsProps) {
  return (
    <svg
      viewBox="0 0 520 500"
      role="img"
      aria-label={alt}
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Happy-on-landing: the smile grows (with a little overshoot), the eyes
          squint and the cheeks flush. Plays once; the boy starts a beat later. */}
      <style>{`
        @keyframes hero-kids-smile {
          0%   { transform: scale(0.45, 0.15); }
          50%  { transform: scale(1.2, 1.3); }
          75%  { transform: scale(0.97, 0.95); }
          100% { transform: scale(1, 1); }
        }
        @keyframes hero-kids-eyes {
          0%, 100% { transform: scaleY(1); }
          40%, 60% { transform: scaleY(0.12); }
        }
        @keyframes hero-kids-cheeks {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50%      { transform: scale(1.35); opacity: 0.85; }
        }
        .hero-kids-smile  { animation: hero-kids-smile 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both; }
        .hero-kids-eyes   { animation: hero-kids-eyes 0.8s ease-in-out 1.1s both; }
        .hero-kids-cheeks { animation: hero-kids-cheeks 1.3s ease-in-out 0.9s both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-kids-smile, .hero-kids-eyes, .hero-kids-cheeks { animation: none; }
        }
      `}</style>

      {/* ---- Girl ---- */}
      <g>
        {/* back hair */}
        <path
          d="M118 160C112 78 160 44 200 44s86 34 80 116c-2 55 12 102-10 140H130c-22-38-8-85-12-140Z"
          className="fill-hair-brown"
        />
        {/* neck: behind the shirt so it comes out of the collar, under the head */}
        <rect
          x="184"
          y="212"
          width="32"
          height="80"
          rx="14"
          className="fill-skin-shade"
        />
        {/* torso */}
        <path
          d="M100 500V348c0-56 46-90 100-90s100 34 100 90v152Z"
          className="fill-primary-500"
        />
        {/* backpack straps */}
        <path d="M151 268l-9 232h30l4.5-224Z" className="fill-secondary-500" />
        <path d="M249 268l9 232h-30l-4.5-224Z" className="fill-secondary-500" />
        {/* ears + head */}
        <circle cx="134" cy="172" r="12" className="fill-skin" />
        <circle cx="266" cy="172" r="12" className="fill-skin" />
        <circle cx="200" cy="168" r="66" className="fill-skin" />
        {/* fringe */}
        <path
          d="M136 160c4-56 44-74 78-66 36 8 56 36 50 66-16-30-68-42-128 0Z"
          className="fill-hair-brown"
        />
        {/* face */}
        <circle cx="178" cy="172" r="5" className="hero-kids-eyes fill-primary-500" style={{ transformOrigin: "178px 172px" }} />
        <circle cx="222" cy="172" r="5" className="hero-kids-eyes fill-primary-500" style={{ transformOrigin: "222px 172px" }} />
        <circle cx="164" cy="192" r="9" className="hero-kids-cheeks fill-blush" opacity=".45" style={{ transformOrigin: "164px 192px" }} />
        <circle cx="236" cy="192" r="9" className="hero-kids-cheeks fill-blush" opacity=".45" style={{ transformOrigin: "236px 192px" }} />
        <path
          d="M180 194q20 30 40 0Z"
          className="hero-kids-smile fill-white stroke-primary-500"
          strokeWidth="4"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ transformOrigin: "200px 194px" }}
        />
        {/* raised arm + pencil */}
        <path
          d="M276 336c54 0 46-86-30-114"
          className="stroke-primary-500"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="244"
          y1="218"
          x2="284"
          y2="126"
          className="stroke-secondary-300"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="284"
          y1="126"
          x2="289"
          y2="114"
          className="stroke-blush"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="244" cy="218" r="17" className="fill-skin" />
        {/* notebook + holding arm */}
        <path
          d="M128 338c-32 22-40 54-30 76"
          className="stroke-primary-500"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />
        <g transform="rotate(-14 170 420)">
          <rect
            x="94"
            y="372"
            width="150"
            height="104"
            rx="10"
            className="fill-secondary-400"
          />
          <rect
            x="228"
            y="378"
            width="12"
            height="92"
            rx="4"
            className="fill-white"
          />
          <rect
            x="108"
            y="386"
            width="100"
            height="10"
            rx="5"
            className="fill-secondary-300"
          />
        </g>
        <circle cx="98" cy="420" r="16" className="fill-skin" />
      </g>

      {/* ---- Boy ---- */}
      <g transform="translate(388 96)">
        {/* torso (jacket + tee) */}
        <path
          d="M-96 404V266c0-56 46-88 96-88s96 32 96 88v138Z"
          className="fill-primary-300"
        />
        <path d="M-26 180 0 236l26-56Z" className="fill-white" />
        {/* hanging arm */}
        <path
          d="M86 254c26 46 24 90 12 128"
          className="stroke-primary-300"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="98" cy="386" r="15" className="fill-skin" />
        {/* neck, ears, head */}
        <rect
          x="-14"
          y="146"
          width="28"
          height="40"
          rx="12"
          className="fill-skin-shade"
        />
        <circle cx="-54" cy="106" r="10" className="fill-skin" />
        <circle cx="54" cy="106" r="10" className="fill-skin" />
        <circle cx="0" cy="104" r="54" className="fill-skin" />
        {/* curly hair */}
        <g className="fill-hair-brown">
          <circle cx="-40" cy="66" r="22" />
          <circle cx="-14" cy="50" r="26" />
          <circle cx="18" cy="50" r="26" />
          <circle cx="44" cy="66" r="22" />
          <circle cx="0" cy="62" r="28" />
        </g>
        {/* glasses + face */}
        <circle
          cx="-20"
          cy="108"
          r="16"
          className="fill-white/40 stroke-primary-500"
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="108"
          r="16"
          className="fill-white/40 stroke-primary-500"
          strokeWidth="4"
        />
        <line
          x1="-4"
          y1="108"
          x2="4"
          y2="108"
          className="stroke-primary-500"
          strokeWidth="4"
        />
        <circle cx="-20" cy="108" r="4" className="hero-kids-eyes fill-primary-500" style={{ transformOrigin: "-20px 108px", animationDelay: "1.3s" }} />
        <circle cx="20" cy="108" r="4" className="hero-kids-eyes fill-primary-500" style={{ transformOrigin: "20px 108px", animationDelay: "1.3s" }} />
        <path
          d="M-14 132q14 14 28 0"
          className="hero-kids-smile stroke-primary-500"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ transformOrigin: "0px 132px", animationDelay: "0.7s" }}
        />
        <circle cx="-36" cy="126" r="7" className="hero-kids-cheeks fill-blush" opacity=".45" style={{ transformOrigin: "-36px 126px", animationDelay: "1.1s" }} />
        <circle cx="36" cy="126" r="7" className="hero-kids-cheeks fill-blush" opacity=".45" style={{ transformOrigin: "36px 126px", animationDelay: "1.1s" }} />
        {/* book on head + steadying arm */}
        <path
          d="M-84 254c-48-52-20-168 30-232"
          className="stroke-primary-300"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
        <g transform="rotate(-10 0 20)">
          <path
            d="M-54 2 0-12v46l-54 14Z"
            className="fill-white stroke-primary-500"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M0-12 54 2v46L0 34Z"
            className="fill-secondary-300 stroke-primary-500"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>
        <circle cx="-54" cy="18" r="15" className="fill-skin" />
      </g>
    </svg>
  );
}

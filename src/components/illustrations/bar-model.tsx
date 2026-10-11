type BarModelProps = {
  alt: string;
  className?: string;
};

const UNIT = 40;
const X = 56;

/** Language-neutral bar model: two bars and a "how many more?" gap. */
export function BarModel({ alt, className }: BarModelProps) {
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label={alt} className={className}>

      {/* bar A: 5 units */}
      <circle cx="26" cy="62" r="11" className="fill-secondary-500" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect
          key={`a-${i}`}
          x={X + i * UNIT}
          y="40"
          width={UNIT}
          height="44"
          className="fill-secondary-400 stroke-primary-500"
          strokeWidth="3"
        />
      ))}

      {/* bar B: 3 units + dashed gap */}
      <circle cx="26" cy="128" r="11" className="fill-primary-500" />
      {Array.from({ length: 3 }, (_, i) => (
        <rect
          key={`b-${i}`}
          x={X + i * UNIT}
          y="106"
          width={UNIT}
          height="44"
          className="fill-primary-300 stroke-primary-500"
          strokeWidth="3"
        />
      ))}
      <rect
        x={X + 3 * UNIT}
        y="106"
        width={2 * UNIT}
        height="44"
        rx="6"
        fill="none"
        className="stroke-primary-500"
        strokeWidth="3"
        strokeDasharray="6 6"
      />
      <text
        x={X + 4 * UNIT}
        y="136"
        textAnchor="middle"
        className="fill-primary-500"
        fontSize="28"
        fontWeight="900"
      >
        ?
      </text>
    </svg>
  );
}

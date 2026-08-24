import { type ReactNode, useState } from "react";

interface HintSeksjonProps {
  hint: ReactNode[];
}

export const HintSeksjon = ({ hint }: HintSeksjonProps) => {
  const [synligeHint, setSynligeHint] = useState<number[]>([]);

  return (
    <div className="hint-seksjon">
      <div className="hint-button-container">
        {hint.map((_, i) => (
          <button
            key={i}
            disabled={synligeHint.includes(i)}
            onClick={() =>
              setSynligeHint((prev) => (prev.includes(i) ? prev : [...prev, i]))
            }
          >
            Hint {i + 1}
          </button>
        ))}
      </div>

      {synligeHint.length > 0 && (
        <div className="hint-container">
          {hint.map(
            (innhold, i) =>
              synligeHint.includes(i) && (
                <span key={i}>
                  Hint {i + 1}: {innhold}
                </span>
              ),
          )}
        </div>
      )}
    </div>
  );
};

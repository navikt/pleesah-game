import { type ReactNode, useState } from "react";

interface HintSeksjonProps {
  hint: ReactNode[];
}

export const HintSeksjon = ({ hint }: HintSeksjonProps) => {
  const [synligeHint, setSynligeHint] = useState<boolean[]>(
    new Array(hint.length).fill(false),
  );

  const visHint = (index: number) => {
    setSynligeHint((prev) => {
      const ny = [...prev];
      ny[index] = true;
      return ny;
    });
  };

  const minstEttSynlig = synligeHint.some(Boolean);

  return (
    <>
      <div className="hint-button-container">
        {hint.map((_, i) => (
          <button key={i} onClick={() => visHint(i)}>
            Hint {i + 1}
          </button>
        ))}
      </div>

      {minstEttSynlig && (
        <div className="hint-container">
          {hint.map(
            (innhold, i) =>
              synligeHint[i] && (
                <span key={i}>
                  Hint {i + 1}: {innhold}
                </span>
              ),
          )}
        </div>
      )}
    </>
  );
};

import { type ReactNode, useRef, useState } from "react";
import "./KodeBlokk.css";

interface KodeBlokkProps {
  children: ReactNode;
  kopierbar?: boolean;
}

export const KodeBlokk = ({ children, kopierbar = true }: KodeBlokkProps) => {
  const [kopiert, setKopiert] = useState(false);
  const kodeRef = useRef<HTMLElement>(null);

  const kopierTekst = async () => {
    const tekst = kodeRef.current?.innerText ?? "";
    await navigator.clipboard.writeText(tekst);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  };

  return (
    <div className="kodeblokk-container">
      <pre>
        <code ref={kodeRef}>{children}</code>
      </pre>
      {kopierbar && (
        <button
          className="kodeblokk-kopier-knapp"
          onClick={kopierTekst}
          aria-label="Kopier kode"
        >
          {kopiert ? "✓ Kopiert!" : "Kopier"}
        </button>
      )}
    </div>
  );
};

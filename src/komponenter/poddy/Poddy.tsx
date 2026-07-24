import { useEffect, useState } from "react";
import type { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import { PoddyKommandoer } from "./PoddyKommandoer.tsx";
import { PoddyNokkelbegreper } from "./PoddyNokkelbegreper.tsx";
import PoddyImage from "./poddy.png";
import "./Poddy.css";

type Fane = "begreper" | "kommandoer";

interface PoddyProps {
  kommandoIder?: KubectlKommandoId[];
  autoHover?: boolean;
}

export const Poddy = ({ kommandoIder = [], autoHover = false }: PoddyProps) => {
  const [erApen, setErApen] = useState(false);
  const [aktivFane, setAktivFane] = useState<Fane>("begreper");
  const [erAutoHovering, setErAutoHovering] = useState(false);
  const [harKlikketPoddy, setHarKlikketPoddy] = useState(false);

  useEffect(() => {
    if (!autoHover || harKlikketPoddy) {
      setErAutoHovering(false);
      return;
    }

    let intervallId: number | undefined;
    let skjulTimeoutId: number | undefined;

    const startAutoHover = () => {
      setErAutoHovering(true);
      skjulTimeoutId = window.setTimeout(() => {
        setErAutoHovering(false);
      }, 3000);
    };

    const førsteTriggerId = window.setTimeout(() => {
      startAutoHover();
      intervallId = window.setInterval(startAutoHover, 10000);
    }, 2000);

    return () => {
      window.clearTimeout(førsteTriggerId);
      if (intervallId) {
        window.clearInterval(intervallId);
      }
      if (skjulTimeoutId) {
        window.clearTimeout(skjulTimeoutId);
      }
      setErAutoHovering(false);
    };
  }, [autoHover, harKlikketPoddy]);

  const handterKlikkPaPoddy = () => {
    setHarKlikketPoddy(true);
    setErApen(true);
  };

  return (
    <>
      <button
        type="button"
        className={`poddy-knapp ${erAutoHovering && !erApen ? "poddy-knapp--autohover" : ""}`}
        onClick={handterKlikkPaPoddy}
        aria-expanded={erApen}
        aria-label="Åpne nøkkelbegreper"
      >
        <img src={PoddyImage} alt="Poddy" />
      </button>
      <span className="poddy-snakkeboble" aria-hidden="true">
        Qwaa! Klikk på meg for litt hjelp!
      </span>

      {erApen && (
        <div className="poddy-bakgrunn" onClick={() => setErApen(false)} />
      )}

      <aside
        className={`poddy ${erApen ? "poddy--apen" : ""}`}
        aria-hidden={!erApen}
      >
        <button
          type="button"
          className="poddy-lukk-knapp"
          onClick={() => setErApen(false)}
          aria-label="Lukk nøkkelbegreper"
        >
          ✕
        </button>
        <h2>Oppslag</h2>
        <div className="poddy-faner">
          <button
            type="button"
            className={`poddy-fane ${aktivFane === "begreper" ? "poddy-fane--aktiv" : ""}`}
            onClick={() => setAktivFane("begreper")}
          >
            Nøkkelbegreper
          </button>
          <button
            type="button"
            className={`poddy-fane ${aktivFane === "kommandoer" ? "poddy-fane--aktiv" : ""}`}
            onClick={() => setAktivFane("kommandoer")}
          >
            kubectl-kommandoer
          </button>
        </div>
        {aktivFane === "begreper" && <PoddyNokkelbegreper />}
        {aktivFane === "kommandoer" && (
          <PoddyKommandoer kommandoIder={kommandoIder} />
        )}
      </aside>
    </>
  );
};

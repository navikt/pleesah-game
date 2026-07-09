import { useState } from "react";
import type { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import { PoddyKommandoer } from "./PoddyKommandoer.tsx";
import { PoddyNokkelbegreper } from "./PoddyNokkelbegreper.tsx";
import "./Poddy.css";

type Fane = "begreper" | "kommandoer";

interface PoddyProps {
  kommandoIder?: KubectlKommandoId[];
}

export const Poddy = ({ kommandoIder = [] }: PoddyProps) => {
  const [erApen, setErApen] = useState(false);
  const [aktivFane, setAktivFane] = useState<Fane>("begreper");

  return (
    <>
      <button
        type="button"
        className="poddy-knapp"
        onClick={() => setErApen(true)}
        aria-expanded={erApen}
        aria-label="Åpne nøkkelbegreper"
      >
        🦜
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
            className={`poddy-fane ${
              aktivFane === "begreper" ? "poddy-fane--aktiv" : ""
            }`}
            onClick={() => setAktivFane("begreper")}
          >
            Nøkkelbegreper
          </button>
          <button
            type="button"
            className={`poddy-fane ${
              aktivFane === "kommandoer" ? "poddy-fane--aktiv" : ""
            }`}
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

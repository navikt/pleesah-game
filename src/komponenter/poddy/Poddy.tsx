import { useState } from "react";
import { NOKKELBEGREPER } from "../../data/nokkelbegreper.ts";
import "./Poddy.css";

export const Poddy = () => {
  const [erApen, setErApen] = useState(false);

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
        Qwaa! Her er noen nøkkelbegreper!
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
        <h2>Nøkkelbegreper</h2>
        <dl className="poddy-liste">
          {NOKKELBEGREPER.map(({ begrep, forklaring }) => (
            <div className="poddy-begrep" key={begrep}>
              <dt>
                <code>{begrep}</code>
              </dt>
              <dd>{forklaring}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </>
  );
};

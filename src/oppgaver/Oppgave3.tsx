import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";

export const Oppgave3 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);

  return (
    <main>
      <Poddy />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 3 - Sjekke logger</h1>

        <article>
          <p>
            For pirater og andre sjøfarere er en loggbok essensielt, det samme
            gjelder for Kubernetes. Nå som skuta er sjøsatt er det nyttig å
            sjekke loggboken for å se at alt er som det skal.
          </p>

          <p>
            Fra forrige oppgave så vi at ikke alt stod helt bra til med{" "}
            <code>poden</code> vår, fordi <code>readiness probe failed</code>.
            Kubernetes bruker en <code>readiness probe</code> per{" "}
            <code>container</code> i en <code>pod</code> for å sjekke om den er
            klar for å ta imot trafikk. Med andre ord, når en{" "}
            <code>container</code> ikke er klar, vil den ikke motta trafikk.
          </p>

          <p>
            Neste steg er å se på loggene til <code>containeren</code> vår ved
            bruk av kommandoen <code>logs</code>. Når du kjører kommandoen vil
            det komme mange logglinjer, da vår <code>container</code> logger
            neste oppgave hver gang Kubernetes sjekker om <code>container</code>{" "}
            er klar. Ut av boksen sjekker Kubernetes hvert tiende sekund.
          </p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
            <button onClick={() => setVisHint3(true)}>Hint 3</button>
          </div>

          {(visHint1 || visHint2 || visHint3) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1:{" "}
                  <a
                    href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2:{" "}
                  <a
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/
                  </a>
                </span>
              )}
              {visHint3 && (
                <span>
                  Hint 3:{" "}
                  <code>kubectl logs {localStorage.getItem("team")} \n</code>
                </span>
              )}
            </div>
          )}

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/2/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              onClick={() => {
                void varsleNesteOppgave(3);
                navigate("/oppgaver/4/");
              }}
            >
              {"Neste oppgave! -->"}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

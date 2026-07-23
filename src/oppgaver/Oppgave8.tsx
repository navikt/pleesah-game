import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave8 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Poddy
        kommandoIder={[
          KubectlKommandoId.Help,
          KubectlKommandoId.Describe,
          KubectlKommandoId.GetPods,
          KubectlKommandoId.Apply,
          KubectlKommandoId.Logs,
          KubectlKommandoId.DeletePod,
        ]}
      />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 8 - Sett kurs</h1>

        <article>
          <Historiecontainer>
            Hurra! Dere er endelig klare til å plyndre! Men hvor skal vi,
            egentlig? Koordinatene finner dere i en hemmelighet!
          </Historiecontainer>

          <p>
            I Kubernetes kan hemmeligheter lagres i ressurstypen{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Secrets)}>
              secrets
            </Tooltip>
            . Disse kan inneholde forskjellig typer data, men i dette tilfellet
            skal dere lage én nøkkel skuta trenger for å sette kurs mot riktig
            destinasjon.
          </p>

          <p>
            Dere kan også lage ressurstyper uten å lage en egen{" "}
            <code>.yaml</code>-fil, som dere skal gjøre nå.
          </p>

          <pre>
            <code>
              kubectl create secret generic koordinatene-mine
              --from-literal=KOORDINATER="hemmelig melding"
            </code>
          </pre>

          <p>
            Legg til følgende i deres <code>deployment.yaml</code>-fil.
          </p>

          <pre>
            <code>{`spec:
      ...
      template:
        ...
        spec:
            containers:
                - name: lasterommet
                ...
                env:
                  - name: HAR_SATT_KURS
                    valueFrom:
                      secretKeyRef:
                        name: koordinatene-mine
                        key: KOORDINATER`}</code>
          </pre>
          <p>
            Kursen er satt, og dere er endelig på vei til deres destinasjon!
            Skip o’hoi!
          </p>
          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
          </div>
          {(visHint1 || visHint2) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1:{" "}
                  <a
                    href="https://kubernetes.io/docs/concepts/configuration/secret/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/configuration/secret/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>kubectl apply -f FILNAVN</code>
                </span>
              )}
            </div>
          )}
          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/5/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              onClick={() => {
                void varsleNesteOppgave(9);
                navigate("/ferdig/");
              }}
            >
              {`Ferdig!`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

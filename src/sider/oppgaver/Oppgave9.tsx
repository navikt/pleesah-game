import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave9 = () => {
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(9, "Sett kurs")}
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
        <article>
          <Historiecontainer>
            Hurra! Dere er endelig klare til å plyndre! Koordinatene vil dere
            ikke vise til noen, derfor vil dere legge de i en hemmelig melding!
          </Historiecontainer>

          <p>
            I Kubernetes kan hemmeligheter lagres i ressurstypen{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Secrets)}>
              secrets
            </Tooltip>
            . Disse kan inneholde forskjellig typer data, men i dette tilfellet
            skal dere lage en nøkkel som skuta trenger for å sette kurs mot
            riktig destinasjon.
          </p>

          <p>
            Dere kan også lage ressurstyper uten å lage en egen{" "}
            <code>.yaml</code>-fil, som dere skal gjøre nå.
          </p>

          <KodeBlokk>
            kubectl create secret generic koordinatene-mine
            --from-literal=KOORDINATER="hemmelig melding"
          </KodeBlokk>

          <p>
            Legg til følgende i deres <code>deployment.yaml</code>-fil.
          </p>

          <KodeBlokk>
            {`spec:
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
                        key: KOORDINATER`}
          </KodeBlokk>

          <p>
            Kan dere se hemmeligheten deres ved bruk av <code>kubectl</code>?
          </p>

          <p>
            Kursen er satt, og dere er endelig på vei til deres destinasjon!
            Skip o’hoi!
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
                    href="https://kubernetes.io/docs/concepts/configuration/secret/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/configuration/secret/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>kubectl apply -f &lt;FILNAVN&gt;</code>
                </span>
              )}
              {visHint3 && (
                <span>
                  Hint 3: <code>kubectl get &lt;RESSURS&gt;</code>
                </span>
              )}
            </div>
          )}

          <Navigasjonsknapper oppgaveNummer={9} forrigeKnapp ferdig />
        </article>
      </div>
    </main>
  );
};

import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave3 = () => {
  const OPPGAVENUMMER = 3;
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Sjekke logger")}
        kommandoIder={[
          KubectlKommandoId.Help,
          KubectlKommandoId.Describe,
          KubectlKommandoId.GetPods,
          KubectlKommandoId.Apply,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            For pirater og andre sjøfarere er en loggbok essensielt, det samme
            gjelder for Kubernetes. Nå som skuta er sjøsatt er det nyttig å
            sjekke loggboken for å se at alt er som det skal.
          </Historiecontainer>

          <p>
            Fra forrige oppgave så vi at ikke alt stod helt bra til med{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>podden</Tooltip>{" "}
            vår, fordi <code>Liveness probe failed</code>. Kubernetes bruker en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.LivenessProbe)}>
              liveness probe
            </Tooltip>{" "}
            per{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Container)}>
              container
            </Tooltip>{" "}
            i en pod for å sjekke om den er i live. Hvis liveness proben feiler,
            vil Kubernetes prøve å starte containeren på nytt.
          </p>

          <p>
            Neste steg er å se på loggene til containeren vår ved bruk av
            kommandoen <code>logs</code>. Når dere kjører kommandoen vil det
            komme mange logglinjer. Dette er fordi hver gang Kubernetes sjekker
            om containeren er klar, og den ikke er klar, logger containeren
            neste oppgave. Kubernetes sjekker som regel hvert tiende sekund, som
            dere kan se at dere har definert i specen deres.
          </p>

          <p>
            Hvis dere kan lese neste oppgave i loggen, kan dere trykke dere
            videre til neste oppgave.
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
                  <code>kubectl logs {localStorage.getItem("team")}</code>
                </span>
              )}
            </div>
          )}
          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

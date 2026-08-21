import { useState } from "react";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
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
        begreper={[
          Begrep.ReadinessProbe,
          Begrep.LivenessProbe,
          Begrep.Pod,
          Begrep.Container,
        ]}
        kommandoer={[
          KubectlKommando.Logs,
          KubectlKommando.Describe,
          KubectlKommando.Get,
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
            I forrige oppgave lærte vi at ikke alt stod helt bra til med{" "}
            <Tooltip begrep={Begrep.Pod} value="podden" /> vår, fordi begge
            probene som var satt opp feilet. Kubernetes bruker en probes for å
            se om en <Tooltip begrep={Begrep.Container} /> for eksempel er i
            live, eller klar for å ta imot trafikk. Når en probe feiler, så kan
            Kubernetes reagere på det, for eksempel når en{" "}
            <Tooltip begrep={Begrep.LivenessProbe} /> feiler så vil Kubernetes
            restarte podden for å se om det løser saken. Når en{" "}
            <Tooltip begrep={Begrep.ReadinessProbe} /> feiler, så vil den slutte
            å sende trafikk til den spesifikke podden, til den er klar igjen. I
            første omgang skal vi finne ut hvorfor liveness proben feiler, og
            hva vi kan gjøre for å fikse det.
          </p>

          <p>
            Et godt sted for å se etter feil er loggen til appen, så la oss
            kjøre kommandoen <Tooltip begrep={KubectlKommando.Logs} /> for å se
            om vi finner noe snusk. Denne kommandoen kan produsere ganske mange
            linjer, avhengig av hvor snakkesalig appen din er, derfor finnes det
            en del nyttige argumenter man kan utforske. Akkurat i vårt case vil
            det for det meste bare være en linje, skrevet mange ganger. Dette er
            fordi hver gang Kubernetes sjekker en probe, så logger appen vår.
            Kubernetes sjekker som regel hvert tiende sekund, som dere kan se på
            default-verdiene ved å bruke{" "}
            <Tooltip begrep={KubectlKommando.Describe} />. Disse verdiene er
            ikke satt i filen deres, men noe dere kan utforske selv.
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

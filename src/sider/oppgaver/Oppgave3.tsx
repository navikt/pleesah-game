import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave3 = () => {
  const OPPGAVENUMMER = 3;

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Sjekke logger")}
        oppgaveNummer={OPPGAVENUMMER}
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
            <Tooltip begrep={Begrep.Pod} verdi="podden" /> vår, fordi begge
            <i>probene</i> som var satt opp feilet. Kubernetes bruker en{" "}
            <i>probe</i> for å se om en <Tooltip begrep={Begrep.Container} /> er
            i live eller klar for å ta imot trafikk. Når en <i>probe</i> feiler
            kan Kubernetes reagere på det. For eksempel; når en{" "}
            <Tooltip begrep={Begrep.LivenessProbe} /> feiler, vil Kubernetes
            restarte <i>podden</i> for å se om det løser saken. Når en{" "}
            <Tooltip begrep={Begrep.ReadinessProbe} /> feiler, vil den slutte å
            sende trafikk til den spesifikke <i>podden</i> til den er klar
            igjen. I første omgang skal vi finne ut hvorfor{" "}
            <i>liveness proben</i> feiler, og hva vi kan gjøre for å fikse det.
          </p>

          <p>
            Et godt sted vi kan se etter feil er i loggene til appen. La oss
            kjøre kommandoen <Tooltip begrep={KubectlKommando.Logs} /> for å se
            om vi finner noe. Denne kommandoen kan produsere ganske mange
            linjer, og derfor finnes det en del nyttige argumenter man kan
            utforske. Akkurat i dette spillet vil det for det meste bare være én
            linje skrevet mange ganger. Dette er fordi hver gang Kubernetes
            sjekker en <i>probe</i>, logger appen det. Kubernetes sjekker som
            regel dette hvert tiende sekund, som dere også kan se på
            default-verdiene ved å bruke{" "}
            <Tooltip begrep={KubectlKommando.Describe} />. Disse verdiene er
            ikke satt i filen deres, men det er noe dere kan utforske selv.
          </p>

          <p>
            Hvis dere kan lese neste oppgave i loggene, kan dere trykke dere
            videre til neste oppgave.
          </p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
              </a>,
              <a
                key="hint-2"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/"
                target="_blank"
              >
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/
              </a>,
              <code key="hint-3">
                kubectl logs {localStorage.getItem("team")}
              </code>,
            ]}
          />
          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

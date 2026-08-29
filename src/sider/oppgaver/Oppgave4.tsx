import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave4 = () => {
  const OPPGAVENUMMER = 4;

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Kast loss")}
        begreper={[Begrep.LivenessProbe, Begrep.Container, Begrep.Pod]}
        kommandoer={[
          KubectlKommando.Apply,
          KubectlKommando.Logs,
          KubectlKommando.Delete,
        ]}
      />

      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Skuta deres er ikke helt klar enda, fordi den fortsatt er bundet til
            havna.
          </Historiecontainer>

          <p>
            Som vi så i loggene trenger vi en miljøvariabel for at{" "}
            <Tooltip begrep={Begrep.LivenessProbe} verdi="liveness proben" />{" "}
            skal bli fornøyd. I dette tilfellet krever sjekken at
            miljøvariabelen <code>HAR_KASTET_LOSS</code> er satt til{" "}
            <code>true</code>.
          </p>

          <p>
            I den virkelige verden vil det være forskjellige behov som bestemmer
            om en <Tooltip begrep={Begrep.Container} /> sin{" "}
            <i>liveness probe</i> er klar. For eksempel kan man sjekke om man
            har kontakt med en database, eller eksterne tjenester man er
            avhengig av for at tjenesten skal fungere.
          </p>

          <p>
            Legg til følgende i deres <code>pod.yaml</code>-fil under{" "}
            <code>spec.containers</code>
          </p>

          <KodeBlokk>
            {`spec:
  containers:
  - name: lasterommet
    env:
      - name: HAR_KASTET_LOSS
        value: "true"`}
          </KodeBlokk>

          <p>
            Det er ikke alle ressurser som kan oppdateres, og{" "}
            <Tooltip begrep={Begrep.Pod} /> er en av disse. Derfor vil dere få
            en feilmelding hvis dere prøver å kjøre{" "}
            <code>
              <Tooltip begrep={KubectlKommando.Apply} />
            </code>
            . Så for å oppdatere <i>podden</i> med <code>apply</code>, må dere
            først slette ressursen før dere kan rulle den ut på nytt.
          </p>

          <p>
            Ved sletting bruker man <code>kubectl</code>-kommandoen{" "}
            <code>
              <Tooltip begrep={KubectlKommando.Delete} />
            </code>
            .
          </p>

          <p>
            Det kan ta noen sekunder før <i>podden</i> er slettet. Når den er
            slettet vil dere få opp en beskjed{" "}
            <code>pod {localStorage.getItem("team")} deleted</code>.
          </p>

          <p>Hvordan ser loggene deres ut nå?</p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/"
                target="_blank"
              >
                https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
              </a>,
              <a
                key="hint-2"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/"
                target="_blank"
              >
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/
              </a>,
              <code key="hint-3">kubectl delete -f &lt;FILNAVN&gt;</code>,
            ]}
          />

          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

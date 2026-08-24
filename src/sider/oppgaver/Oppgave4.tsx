import { useState } from "react";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave4 = () => {
  const OPPGAVENUMMER = 4;
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);

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
            Som vi lærte i loggen så trenger vi en miljøvariabel for at{" "}
            <Tooltip begrep={Begrep.LivenessProbe} value="Liveness proben" />{" "}
            skal bli fornøyd. I dette tilfellet krever sjekken at
            miljøvariabelen <code>HAR_KASTET_LOSS</code> er satt til{" "}
            <code>true</code>.
          </p>

          <p>
            I den virkelige verden vil det være forskjellige behov som bestemmer
            om en <Tooltip begrep={Begrep.Container} /> sin{" "}
            <i>Liveness probe</i> er klar. For eksempel kan man sjekke om man
            har kontakt med en database, eller eksterne tjenester man er
            avhengig for at tjenesten skal fungere.
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
            <Tooltip begrep={Begrep.Pod} /> er en av disse. Derfor vil du få en
            feilmelding hvis du prøver å kjøre{" "}
            <Tooltip begrep={KubectlKommando.Apply} />. Så for å oppdatere{" "}
            <i>podden</i> med <i>apply</i>, må dere først slette ressursen før
            dere kan rulle den ut på nytt.
          </p>

          <p>
            Ved sletting bruker man kubectl-kommandoen{" "}
            <Tooltip begrep={KubectlKommando.Delete} />.
          </p>

          <p>
            Det kan ta noen sekunder før podden er slettet. Når den er slettet
            vil dere få opp en beskjed{" "}
            <code>pod {localStorage.getItem("team")} deleted</code>.
          </p>

          <p>Hvordan ser loggene deres ut nå?</p>

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
                    href="https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2:{" "}
                  <a
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/
                  </a>
                </span>
              )}
              {visHint3 && (
                <span>
                  Hint 3: <code>kubectl delete -f &lt;FILNAVN&gt;</code>
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

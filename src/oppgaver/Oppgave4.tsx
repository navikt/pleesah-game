import { useState } from "react";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Header } from "../komponenter/header/Header.tsx";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave4 = () => {
  const [visHint1, setVisHint1] = useState(false);

  return (
    <main>
      <Header
        overskrift={"Oppgave 4/8 - Kast loss"}
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
            Skuta deres er ikke helt klar enda, fordi den fortsatt er bundet til
            havna.
          </Historiecontainer>

          <p>
            Som dere så i forrige oppgave, er ikke appen deres er i live. Som
            nevnt bruker Kubernetes en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.LivenessProbe)}>
              Liveness probe
            </Tooltip>{" "}
            for å sjekke dette. For denne appen, forutsetter Liveness proben at
            en miljøvariabel er satt for at appen skal kunne fortelle Kubernetes
            at den er i live. I dette tilfellet krever sjekken at
            miljøvariabelen <code>HAR_KASTET_LOSS</code> er satt til{" "}
            <code>true</code>.
          </p>

          <p>
            Dere må oppdatere <code>.yaml</code>-filen deres til å sette
            miljøvariabelen <code>HAR_KASTET_LOSS</code> til <code>true</code>.
            I den virkelige verden vil det være forskjellige behov som bestemmer
            om en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Container)}>
              container
            </Tooltip>{" "}
            er klar. For eksempel vil man sikre seg at man har kontakt med en
            database.
          </p>

          <p>
            Legg til følgende i deres <code>.yaml</code>-fil under{" "}
            <code>spec.containers</code>
          </p>

          <pre>
            <code>{`spec:
    containers:
    - name: lasterommet
      ...
      env:
        - name: HAR_KASTET_LOSS
          value: "true"`}</code>
          </pre>

          <p>
            Det er ikke alle ressurser som kan oppdateres, og{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pod</Tooltip> er en
            av disse. For å oppdatere poden med <code>apply</code>, må dere
            først slette den før dere kan kjøre <code>apply</code> på nytt.
          </p>

          <code>kubectl delete pod {localStorage.getItem("team")}</code>

          <p>
            Det kan ta noen sekunder før poden er slettet. Når den er slettet
            vil dere få opp en beskjed{" "}
            <code>pod {localStorage.getItem("team")} deleted</code>.
          </p>

          <p>Hvordan ser loggene deres ut nå?</p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
          </div>

          {visHint1 && (
            <div className="hint-container">
              <span>
                Hint 1:{" "}
                <a
                  href="https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/"
                  target="_blank"
                >
                  https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
                </a>
              </span>
            </div>
          )}

          <Navigasjonsknapper nesteOppgaveNummer={4} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

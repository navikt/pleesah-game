import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave4 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);

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
        <h1 className="header">Oppgave 4 - Kast loss</h1>

        <article>
          <p>
            Applikasjonen din er ikke helt klar enda. For denne oppgaven har vi
            laget en forenklet sjekk som ser etter en spesifikk miljøvariabel
            før den rapporterer at den er klar til Kubernetes. I dette tilfellet
            krever sjekken at miljøvariabelen <code>HAR_KASTET_LOSS</code> er
            satt til <code>true</code>, slik at skipet kan seile.
          </p>

          <p>
            Du må oppdatere <code>.yaml</code>-filen din til å sette
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
            Legg til følgende i din <code>.yaml</code> -fil under{" "}
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
            av disse. For å oppdatere poden med <code>apply</code>, må du først
            slette den før du kan kjøre <code>apply</code> på nytt.
          </p>

          <code>kubectl delete pod {localStorage.getItem("team")}</code>

          <p>
            Det kan ta noen sekunder før poden er slettet. Når den er slettet
            vil du få opp en beskjed{" "}
            <code>pod {localStorage.getItem("team")} deleted</code>.
          </p>

          <p>
            Kubernetes har flere forskjellige probes, og en annen som er mye
            brukt er{" "}
            <Tooltip forklaring={finnForklaring(Begrep.LivenessProbe)}>
              liveness probe
            </Tooltip>{" "}
            for å sjekke om containeren er i live. (Er denne setningen litt
            malplassert?)
          </p>

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

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/2/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              onClick={() => {
                void varsleNesteOppgave(4);
                navigate("/oppgaver/5/");
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

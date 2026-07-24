import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { fetcher } from "../../fetcher.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import type { Status } from "../../types.ts";

export const Oppgave1 = () => {
  const OPPGAVENUMMER = 1;
  const { data } = useSWR<Status>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status/pod?name=${localStorage.getItem("team")}`,
    fetcher,
    { refreshInterval: 5000 },
  );

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Sjøsette skuta")}
        kommandoIder={[
          KubectlKommandoId.Help,
          KubectlKommandoId.Describe,
          KubectlKommandoId.GetPods,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <p>
            For å starte applikasjonen deres, eller sjøsette skuta, må dere
            først opprette en <code>.yaml</code>-fil. Deretter må dere kjøre en
            kommando for å lage{" "}
            <Tooltip forklaring={Begrep.Ressurs}>ressursen</Tooltip> som er
            spesifisert i specen under. Dette gjør dere ved å bruke{" "}
            <code>kubectl apply</code>.
          </p>
          <p>
            Tommelfingerregelen er at <code>apply</code> oppretter en ny ressurs
            dersom den ikke allerede finnes, og oppdaterer kun det som har
            endret seg dersom den finnes.
          </p>

          <KodeBlokk>
            {`apiVersion: v1
kind: Pod
metadata:
  name: ${localStorage.getItem("team")}
spec:
  containers:
  - name: lasterommet
    image: ghcr.io/navikt/pleesah-skute:latest
    ports:
    - containerPort: 8080
    livenessProbe:
      httpGet:
        port: 8080
        path: /isAlive
      periodSeconds: 10
    readinessProbe:
      httpGet:
        port: 8080
        path: /isReady
      periodSeconds: 10`}
          </KodeBlokk>

          <p>
            Hvis dere får samme respons som under har gjort alt riktig, og dere
            har nå sjøsatt skuta di! Gå videre til neste oppgave.
          </p>

          <pre>
            <code>pod/{localStorage.getItem("team")} created</code>
          </pre>

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
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>kubectl apply -f &lt;FILNAVN&gt;</code>
                </span>
              )}
            </div>
          )}

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            knappetekstNeste={`Neste oppgave! --> ${data?.isRunning ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

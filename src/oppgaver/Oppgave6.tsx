import { useState } from "react";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { fetcher } from "../fetcher.ts";
import { Header } from "../komponenter/header/Header.tsx";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { KodeBlokk } from "../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";
import type { Status } from "../types.ts";

export const Oppgave6 = () => {
  const { data } = useSWR<Status>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status/deployment?name=kaptein-sabeltann`,
    fetcher,
    { refreshInterval: 5000 },
  );

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Header
        overskrift="Oppgave 6/8 - Bruk deployment"
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
            En erfaren pirat vet at en skute som seiler alene, sjelden holder
            seg flytende lenge
          </Historiecontainer>
          <p>
            Flere{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pods</Tooltip> er
            bedre enn én pod, men med flere pods trenger vi noe som passer på at
            de alltid kjører. En{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Deployment)}>
              deployment
            </Tooltip>{" "}
            gjør nettopp dette.
          </p>

          <p>
            Hittil i spillet har dere måttet slette podden deres og kjørt den
            opp igjen for å kunne gjøre endringene. Det er jo ikke ideelt! Det
            er jo ønskelig å holde applikasjonen kjørende selv om man gjør
            endringer underveis! Her kommer deployment-ressurstypen inn. Likt
            som i første oppgave må dere også her bruke <code>apply</code> for å
            lage ressursen deres.
          </p>

          <KodeBlokk>
            {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: kaptein-sabeltann
spec:
  replicas: 3
  selector:
    matchLabels:
      seilskip: brigg
  template:
    metadata:
      labels:
        seilskip: brigg
    spec:
      containers:
        - name: lasterommet
          image: ghcr.io/navikt/pleesah-skute:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              port: 8080
              path: /isReady
          env:
            - name: HAR_KASTET_LOSS
              value: "true"
            `}
          </KodeBlokk>

          <p>
            For å se se informasjon om deploymenten, kan dere bruke kommandoen{" "}
            <code>describe</code> som dere også har brukt tidligere.{" "}
            <code>describe</code> viser en detaljert oversikt over den ressursen
            dere ønsker å beskrive.
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
                    href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
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
            oppgaveNummer={6}
            forrigeKnapp
            knappetekstNeste={`Neste oppgave! --> ${data?.isRunning ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

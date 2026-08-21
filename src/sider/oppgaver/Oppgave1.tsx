import { useState } from "react";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
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
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Deres første pod")}
        begreper={[Begrep.Ressurs, Begrep.Image, Begrep.Spec, Begrep.Pod]}
        kommandoer={[KubectlKommando.Apply]}
      />
      <div className="flex-column-container">
        <article>
          <p>
            I denne oppgaven skal dere starte deres første applikasjonen, ved å
            rulle ut en <Tooltip begrep={Begrep.Pod} />. Start med å opprette en{" "}
            <code>pod.yaml</code>-fil. Deretter må dere kjøre en
            kubectl-kommando som lager en Kubernetes{" "}
            <Tooltip begrep={Begrep.Ressurs} /> i deres{" "}
            <Tooltip begrep={Begrep.Namespace} />. I filen skal dere lime inn{" "}
            <Tooltip begrep={Begrep.Spec} value="Yaml-specen" /> som er
            spesifisert under. Når filen er lagret, skal dere kjøre
            Kubectl-kommandoen <Tooltip begrep={KubectlKommando.Apply} />.
          </p>
          <p>
            Tommelfingerregelen er at <i>apply</i> oppretter en ny ressurs
            dersom den ikke allerede finnes, og oppdaterer kun det som har
            endret seg dersom den finnes.
          </p>

          <p>
            En pod-spesifikkasjon er en ganske omfattende Yaml-fil, men veldig
            mange felter. Ikke alle er nyttige for oss i starten, men vi skal
            prøve å dekke de mest brukte.
          </p>
          <p>
            I <i>spec</i>-en under kan vi første se på feltet{" "}
            <Tooltip begrep={Begrep.Image} />. Her spesifiserer du hvilket
            Docker/OCI-image du vil at pod-en skal bruke. For å gjøre ting
            enklere har vi allerede bygget et image for dere,{" "}
            <code>ghcr.io/navikt/pleesah-skute:latest</code>, så dere slipper å
            bygge det selv, dere trenger bare å referere til det i spec-en.
          </p>
          <p>
            Neste felt er <i>ports</i> som spesifiserer hvilken port appen deres
            lytter på.
          </p>
          <p>
            Til slutt har vi to <i>probes</i> som vi kommer tilbake til i senere
            oppgaver
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
        path: /isAlive
    readinessProbe:
      httpGet:
        path: /isReady`}
          </KodeBlokk>

          <p>
            Hvis dere får samme respons som under etter å ha rullet ut appen
            deres, så har dere gjort alt riktig, og kan gå videre til neste
            oppgave.
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

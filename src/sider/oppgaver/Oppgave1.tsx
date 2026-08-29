import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import { useTeamStatus } from "../../teamStatus/TeamStatusContext.tsx";

export const Oppgave1 = () => {
  const OPPGAVENUMMER = 1;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Deres første pod")}
        oppgaveNummer={OPPGAVENUMMER}
      />
      <div className="flex-column-container">
        <article>
          <p>
            I denne oppgaven skal dere starte deres første applikasjon ved å
            rulle ut en <Tooltip begrep={Begrep.Pod} />. Start med å opprette en{" "}
            <code>pod.yaml</code>-fil. Deretter må dere kjøre en{" "}
            <code>kubectl</code>-kommando som lager en Kubernetes{" "}
            <Tooltip begrep={Begrep.Ressurs} /> i deres{" "}
            <Tooltip begrep={Begrep.Namespace} />. I filen skal dere lime inn{" "}
            <Tooltip begrep={Begrep.Spec} verdi="yaml-specen" /> som er
            spesifisert under. Når filen er lagret, skal dere kjøre
            <code>kubectl</code>-kommandoen{" "}
            <Tooltip begrep={KubectlKommando.Apply} />.
          </p>
          <p>
            Tommelfingerregelen er at <i>apply</i> oppretter en ny ressurs
            dersom den ikke allerede finnes, og oppdaterer kun det som har
            endret seg dersom den finnes.
          </p>

          <p>
            En <i>pod</i>-spesifikasjon er en ganske omfattende .yaml-fil, med
            veldig mange felter. Ikke alle er nyttige for oss i enda, men vi
            skal prøve å dekke de mest brukte.
          </p>
          <p>
            I <i>spec</i>-en under kan vi først se på feltet{" "}
            <Tooltip begrep={Begrep.Image} />. I <i>image</i> spesifiseres
            hvilket <i>Docker/OCI-image</i> dere vil at <i>podden</i> skal
            bruke. For å gjøre ting enklere har vi allerede bygget et{" "}
            <i>image</i> for dere,{" "}
            <code>ghcr.io/navikt/pleesah-skute:latest</code>, så dere slipper å
            bygge det selv. Dere trenger bare å referere til det i <i>spec</i>
            -en.
          </p>
          <p>
            Neste felt er <i>ports</i> som spesifiserer hvilken <i>port</i>{" "}
            appen deres lytter på.
          </p>
          <p>
            Til slutt har vi to <i>probes</i> som vi kommer tilbake til i senere
            oppgaver.
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
        port: 8080
    readinessProbe:
      httpGet:
        path: /isReady
        port: 8080`}
          </KodeBlokk>

          <p>
            Hvis dere får samme respons som under etter å ha rullet ut appen
            deres, så har dere gjort alt riktig, og kan gå videre til neste
            oppgave.
          </p>

          <KodeBlokk kopierbar={false}>
            pod/{localStorage.getItem("team")} created
          </KodeBlokk>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/"
                target="_blank"
              >
                {" "}
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/{" "}
              </a>,
              <code key="hint-2">kubectl apply -f &lt;FILNAVN&gt;</code>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={data.pods.length == 0}
            knappetekstNeste={`Neste oppgave! --> ${data.pods.length > 0 ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

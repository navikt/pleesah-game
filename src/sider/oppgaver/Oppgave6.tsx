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
import { useTeamStatus } from "../../teamStatus/TeamStatusContext.tsx";

export const Oppgave6 = () => {
  const OPPGAVENUMMER = 6;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(
          OPPGAVENUMMER,
          "Orkestrering av podder",
        )}
        begreper={[Begrep.Deployment, Begrep.Spec, Begrep.Pod]}
        kommandoer={[KubectlKommando.Apply, KubectlKommando.Delete]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En erfaren pirat vet at en skute som seiler alene, sjelden holder
            seg flytende lenge
          </Historiecontainer>

          <p>
            Hittil i spillet har dere måttet slette podden deres, før dere kunne
            rulle ut endringer. Det er jo ikke ideelt! Det man ønsker er å holde
            applikasjonen kjørende, samtidig som man ruller ut nye endringer.
            Det er her <Tooltip begrep={Begrep.Deployment} />
            -ressurstypen kommer inn.
          </p>

          <p>
            En <i>deployment</i> er en ressurs som orkestrer poddene deres. Så
            når dere gjør en endring på en deployment, så vil den ta ansvaret
            for å rulle ut en ny pod, vente på at den nye podden er klar, før
            den tar ned den gamle podden. Dette gjør at man kan unngå nedetid
            ved deploy, og gir oss muligheten til å skalere opp og ned ved
            behov.
          </p>

          <p>
            I <Tooltip begrep={Begrep.Spec} verdi="speccen" /> nedenfor vil dere
            se feltet <code>spec.template</code> som inneholder hele
            spesifikasjonen for podden vi har lagd. Dette fordi man trenger å
            spesifisere hvordan hver pod skal se ut i en deployment. Merk at den
            faktisk er helt lik som <code>pod.yaml</code> som vi har fra før av.
          </p>

          <p>
            Feltet <i>replicas</i> er antall podder dere vil ha kjørende, så 3
            betyr at vi skal ha tre instanser kjørende.
          </p>

          <p>
            Feltet <i>selector</i> brukes av en deployment for å holde oversikt
            over hvilke podder den eier, så her må{" "}
            <code>spec.selector.matchLabels</code> passe med{" "}
            <code>spec.template.metadata.labels</code>
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
          livenessProbe:
            httpGet:
              path: /isAlive
              port: 8080
          readinessProbe:
            httpGet:
              path: /isReady
              port: 8080
          env:
            - name: HAR_KASTET_LOSS
              value: "true"
`}
          </KodeBlokk>

          <p>
            Når dere har rullet ut den nye deploymenten, så skal dere se at tre
            nye podder har blitt opprettet.
          </p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
              </a>,
              <code key="hint-2">kubectl apply -f &lt;FILNAVN&gt;</code>,
            ]}
          />
          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={data.deployments.length === 0}
            knappetekstNeste={`Neste oppgave! --> ${data.deployments.length > 0 ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

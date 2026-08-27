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

export const Oppgave5 = () => {
  const OPPGAVENUMMER = 5;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Network Policy")}
        begreper={[
          Begrep.LivenessProbe,
          Begrep.ReadinessProbe,
          Begrep.ZeroTrustPolicy,
          Begrep.Pod,
          Begrep.Namespace,
          Begrep.NetworkPolicy,
        ]}
        kommandoer={[
          KubectlKommando.Describe,
          KubectlKommando.Get,
          KubectlKommando.Apply,
          KubectlKommando.Label,
          KubectlKommando.Logs,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Hvis dere vil kommunisere med andre skuter og havner, må det settes
            opp en Network Policy. Det kan jo hende dere må sende ut et
            nødvarsel!
          </Historiecontainer>
          <p>
            Nå som vi fikk <Tooltip begrep={Begrep.LivenessProbe} /> til å
            slutte å klage, er vi klar for å fikse neste problem. I Kubernetes
            har vi gått for en <Tooltip begrep={Begrep.ZeroTrustPolicy} /> hvor
            alle apper som kjører i clusteret kjører i hver sin lille "boble".
            Det vil si at dere ikke kan kommunisere med noen andre{" "}
            <Tooltip begrep={Begrep.Pod} /> i deres{" "}
            <Tooltip begrep={Begrep.Namespace} />, eller med noen andre pods i
            andre namespaces. Dette er en sikkerhetsmekanisme som hindrer at en
            infisert app enkelt kan angripe andre apper, eller sende data ut av
            clusteret til tjenester som man ikke eksplisitt har åpnet for.
          </p>
          <p>
            Vår{" "}
            <Tooltip begrep={Begrep.ReadinessProbe} value="Readiness proben" />{" "}
            er avhengig av å kunne kommunisere med en ekstern tjeneste for å gi
            beskjed til Kubernetes om at den er klar til å ta imot trafikk. For
            å kommunisere med denne eksterne tjenesten trenger dere derfor å
            lage en{" "}
            <Tooltip begrep={Begrep.NetworkPolicy} value="Network Policy" />. En
            Network Policy er en Kubernetes ressurs som lager dere spesificere
            hvem appen deres har lov til å snakke med (egress), og hvem som har
            lov til å snakke med deres app (ingress). Enkelt sagt, den styrer
            trafikken inn (ingress) og ut (egress) av podden.
          </p>
          <p>
            Start med å lage en ny <code>netpol.yaml</code>-fil for å lime inn
            Network Policy <Tooltip begrep={Begrep.Spec} value="Yaml-specen" />{" "}
            som er spesifisert under. Når filen er lagret, skal dere rulle den
            ut som dere har gjort tidligere.
          </p>
          <KodeBlokk>
            {`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${localStorage.getItem("team")}
spec:
  podSelector:
    matchLabels:
      seilskip: brigg
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 34.102.211.240/32
    ports:
      - port: 443
`}
          </KodeBlokk>
          <p>
            Network policyen vi nå har lagd nå bruker også{" "}
            <code>podSelector</code> for å kun treffe de instansene som faktisk
            skal ha åpning til den eksterne tjenesten. Man kan lage policies som
            treffer alle ved å fjerne <code>podSelector</code>, men vi skal i
            stedet legge til en <Tooltip begrep={Begrep.Label} /> på vår pod.{" "}
            <i>Labels</i> er en av de få feltene man kan endre uten å måtte
            slette podden først. Man kan endten oppdatere <code>pod.yaml</code>,
            slik at man ikke glemmer det til neste utrulling, ellers finnes det
            også en egen kubectl-kommando{" "}
            <Tooltip begrep={KubectlKommando.Label} />.{" "}
          </p>
          <p>
            Etter dere har rullet ut <i>network policyen</i> må dere legge til
            samme label på podden deres.
          </p>
          <p>
            Da gjenstår det å sjekke om podden har endret sin <i>ready</i>
            -status, og at Readiness probe er fornøyd. Når dette er i boks kan
            podden endelig ta i mot trafikk!
          </p>
          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/services-networking/network-policies"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/services-networking/network-policies
              </a>,
              <code key="hint-2">kubectl apply -f &lt;FILNAVN&gt;</code>,
              <span key="hint-3">
                Hvis dere ser følgende i terminalen er ressursen opprettet!
                <br />
                <code>
                  networkpolicy.networking.k8s.io/{localStorage.getItem("team")}{" "}
                  created{" "}
                </code>{" "}
              </span>,
              <a
                key="hint-4"
                href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
              </a>,
              <code key="hint-5">
                kubectl label &lt;RESSURSTYP&gt; &lt;RESSURSNAVN&gt; KEY=VALUE
              </code>,
              <span key="hint-6">
                Hvis dere ser <code>Ready True</code> ved bruk av{" "}
                <Tooltip begrep={KubectlKommando.Describe} /> for pod-ressursen,
                har dere gjort det riktig!
              </span>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={data.pods.length === 0 || !data.pods[0].ready}
            knappetekstNeste={`Neste oppgave! --> ${data.pods.length > 0 && data.pods[0]?.ready ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

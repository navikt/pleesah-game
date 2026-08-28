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
            slutte å klage, er vi klare for å fikse neste problem. I Kubernetes
            har vi gått for en <Tooltip begrep={Begrep.ZeroTrustPolicy} />, hvor
            alle apper som kjører i{" "}
            <Tooltip begrep={Begrep.Cluster} verdi="clusteret" /> kjører helt
            isolert. Det vil si at dere ikke kan kommunisere med noen andre{" "}
            <Tooltip begrep={Begrep.Pod} verdi="podder" /> i{" "}
            <Tooltip begrep={Begrep.Namespace} verdi="namespacet" /> deres,
            eller med noen andre podder i noen andre namespaces. Dette er en
            sikkerhetsmekanisme som hindrer at en infisert app enkelt kan
            angripe andre apper, eller sende data ut av clusteret til tjenester
            som man ikke eksplisitt har åpnet for.
          </p>
          <p>
            Vår <Tooltip begrep={Begrep.ReadinessProbe} /> er avhengig av å
            kunne kommunisere med en ekstern tjeneste for å gi beskjed til
            Kubernetes om at den er klar til å ta imot trafikk. For å
            kommunisere med denne eksterne tjenesten må dere derfor lage en{" "}
            <Tooltip begrep={Begrep.NetworkPolicy} verdi="Network Policy" />. En
            Network Policy er en ressurs som lar dere spesifisere hvem appen
            deres har lov til å snakke med (egress), og hvem som har lov til å
            snakke med deres app (ingress). Enklere sagt, den styrer trafikken
            inn (ingress) og ut (egress) av podden.
          </p>
          <p>
            Start med å lage en ny <code>netpol.yaml</code>-fil for å lime inn{" "}
            <Tooltip begrep={Begrep.Spec} verdi="Yaml-specen" /> som er
            spesifisert under. Når filen er lagret, skal dere rulle den ut som
            dere har gjort tidligere.
          </p>
          <KodeBlokk>
            {`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${localStorage.getItem("team")}
spec:
  podSelector:
    matchLabels:
      <KEY>: <VALUE> # Legg til en label på podden deres som matcher denne
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
            Network policyen vi nå har laget bruker <code>podSelector</code> for
            å sikre at kun de instansene som trenger tilgang til den eksterne
            tjenesten, får tilgang. Det er mulig å lage en policy som gjelder
            alle pods ved å fjerne <code>podSelector</code>, men det skal vi
            altså ikke gjøre her. Vi skal heller legge til en{" "}
            <Tooltip begrep={Begrep.Label} /> på den eksisterende poden vår, som{" "}
            <code>podSelector</code> i <code>netpol.yaml</code> ser etter.
          </p>
          <p>
            <i>Labels</i> er en av de få feltene man kan endre uten å måtte
            slette podden først. Man kan enten oppdatere <code>pod.yaml</code>,
            slik at man ikke glemmer det til neste utrulling, ellers finnes det
            også en egen kubectl-kommando for <i>label</i>.
          </p>
          <p>
            Da gjenstår det å sjekke om podden har endret sin <i>ready</i>
            -status til <i>True</i>, og at Readiness probe er fornøyd. Når dette
            er i boks kan podden endelig ta i mot trafikk!
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
              <span key="hint-2">
                Hvis dere ser følgende i terminalen er ressursen opprettet!
                <br />
                <code>
                  networkpolicy.networking.k8s.io/{localStorage.getItem("team")}{" "}
                  created{" "}
                </code>{" "}
              </span>,
              <a
                key="hint-3"
                href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
              </a>,
              <code key="hint-4">
                kubectl label &lt;RESSURSTYPE&gt; &lt;RESSURSNAVN&gt;
                &lt;KEY&gt;=&lt;VALUE&gt;
              </code>,
              <span key="hint-5">
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

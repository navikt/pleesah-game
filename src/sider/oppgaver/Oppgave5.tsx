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

export const Oppgave5 = () => {
  const OPPGAVENUMMER = 5;

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
            Network Policy er en Kubernetes ressurs som lager deg spesificere
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
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 34.102.211.240/32 // TODO denne må hentes fra Havnesjefen
    ports:
      - port: 443
`}
          </KodeBlokk>
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
                  networkpolicy.networking.k8s.io/{localStorage.getItem("team")} created{" "}
                </code>{" "}
              </span>,
              <span key="hint-4">
                Hvis dere ser <code>Ready True</code> ved bruk av{" "}
                <Tooltip begrep={KubectlKommando.Describe} /> for pod-ressursen,
                har dere gjort det riktig!
              </span>,
            ]}
          />
          TODO: Denne burde ha sjekk på om podden har endret status til Ready!
          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

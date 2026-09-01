import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import "./Oppgaver.css";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Sjekkliste } from "../../komponenter/sjekkliste/Sjekkliste.tsx";
import { useTeamStatus } from "../../teamStatus/TeamStatusContext.tsx";

export const Oppgave9 = () => {
  const OPPGAVENUMMER = 9;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Slå opp kartet")}
        oppgaveNummer={OPPGAVENUMMER}
      />

      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En skute uten kart seiler i blinde. Vi må finne kartet, slik at
            Kapteinen kan finne veien gjennom ukjent farvann.
          </Historiecontainer>

          <p>
            I denne oppgaven skal dere bruke det der har lært så langt i kurset
            til å sette opp en ny <Tooltip begrep={Begrep.Deployment} /> med et
            nytt <Tooltip begrep={Begrep.Image} />! Målet er å få appene i de to{" "}
            <i>deploymentene</i> til å kommunisere med hverandre via{" "}
            <Tooltip begrep={Begrep.Service} verdi="servicer" />, som en backend
            og en frontend. For å få til dette må dere opprette en ny{" "}
            <i>deployment</i> og en <i>service</i>, lage en ny{" "}
            <Tooltip begrep={Begrep.NetworkPolicy} /> og oppdatere den
            eksisterende <i>Network Policyen</i> slik at nødvendig trafikk
            mellom appene er tillatt.
          </p>

          <p>
            For å gi dere litt oversikt har vi en liten sjekkliste dere kan
            jobbe dere gjennom:
          </p>

          <Sjekkliste
            id="sjekkliste1"
            innhold={[
              <>
                Ny <i>Deployment</i>-ressurs
              </>,
              <>
                <i>Deploymenten</i> sin <i>port</i> må settes til{" "}
                <code>3000</code>
              </>,
              <>
                <i>Deploymenten</i> sitt <i>image</i> må settes til{" "}
                <code>ghcr.io/navikt/pleesah-skute-frontend:latest</code>
              </>,
              <>
                Frontenden trenger også å vite adressen til backenden{" "}
                <code>API_URL: http://navn-på-backend-service</code>
              </>,
						]} />
					<br />
          <Sjekkliste
            id="sjekkliste2"
            innhold={[
              <>
                Ny <i>service</i>-ressurs
              </>,
              <>
                Sett <code>spec.type</code> til å være av type{" "}
                <code>LoadBalancer</code> (default er <code>ClusterIP</code>)
              </>,
            ]}
          />

          <p>
            Som nevnt tidligere gir en <i>service</i> en felles inngang til én
            eller flere <Tooltip begrep={Begrep.Pod} verdi="podder" />, og
            brukes hovedsakelig til kommunikasjon internt i et{" "}
            <Tooltip begrep={Begrep.Cluster} />. Ved å opprette en{" "}
            <i>service</i> av typen <code>LoadBalancer</code> kan vi også gjøre
            en app tilgjengelig utenfra. <i>Servicen</i> får da en ekstern
            IP-adresse som kan brukes til å sende trafikk inn til appen. I vårt{" "}
            <i>cluster</i>, som kjører på <code>Google Cloud Platform</code>, er
            det Google som håndterer trafikken fra internett og inn til{" "}
            <i>servicen</i>.
          </p>

          <Sjekkliste
            id="sjekkliste3"
            innhold={[
              <>
                Ny <i>Network policy</i>-ressurs for egress og ingress (ip{" "}
                <code>0.0.0.0/0</code>) trafikk for frontenden
              </>,
              <>
                Oppdatere <i>Network policy</i>-ressursen for ingress trafikk
                for backend
              </>,
            ]}
          />

          <p>
            <i>Network policyen</i> som ble opprettet tidligere åpnet opp for
            trafikk til en ekstern tjeneste som kjører på{" "}
            <a href="https://nais.io" target="_blank" rel="noopener noreferrer">
              Nais-plattformen
            </a>
            . Siden tjenesten befinner seg utenfor <i>clusteret</i>, baserte vi
            åpningen på en IP-adresse. Denne gangen skal vi åpne for trafikk
            mellom <i>podder</i> internt i <i>clusteret</i>. Da kan vi bruke{" "}
            <code>podSelector.matchLabels</code> for å spesifisere hvilke{" "}
            <i>podder</i> det skal være tillatt å kommunisere med, basert på{" "}
            <i>labels</i>.
          </p>

          <p>Husk at alle ressurser av samme type må ha unike navn.</p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/services-networking/service/index.html#publishing-services-service-types"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/services-networking/service/index.html#publishing-services-service-types
              </a>,
              <a
                key="hint-2"
                href="https://kubernetes.io/docs/concepts/services-networking/network-policies"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/services-networking/network-policies
              </a>,
              <span key="hint-3">
                Har du husket å legge til <i>ingress</i> i din{" "}
                <i>Network policy</i>?
                <KodeBlokk>{`spec:
policyTypes:
  - Egress
  - Ingress
ingress:
  - from:
    - ipBlock:
        cidr: 0.0.0.0/0`}</KodeBlokk>
              </span>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={
              data.deployments.length < 2 ||
              data.services.length < 2 ||
              data.networkPolicies.length < 4
            }
            knappetekstNeste={`Fullfør! --> ${data.deployments.length > 2 && data.services.length > 2 && data.networkPolicies.length > 4 ? "✅" : "⏳"}`}
            ferdig
          />
        </article>
      </div>
    </main>
  );
};

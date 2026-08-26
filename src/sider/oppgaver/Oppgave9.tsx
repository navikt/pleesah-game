import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import "./Oppgaver.css";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";

export const Oppgave9 = () => {
  const OPPGAVENUMMER = 9;

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Slå opp kartet")}
        kommandoer={[KubectlKommando.Help]}
      />

      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En skute uten kart seiler i blinde. Vi må få kartet opp så kapteinen
            kan finne veien gjennom ukjente farvann.
          </Historiecontainer>

          <p>
            I denne oppgaven skal dere bruke de ferdighetene dere har lært frem
            til nå i kurset. Nå skal dere sette opp en helt ny{" "}
            <Tooltip begrep={Begrep.Deployment} /> med et nytt{" "}
            <Tooltip begrep={Begrep.Image} />! Målet er at appene i de to
            deploymentene deres skal kunne kommunisere seg i mellom via{" "}
            <Tooltip begrep={Begrep.Service} value="servicer" />, som en backend
            og frontend. Det betyr at vi ikke bare må lage en ny{" "}
            <i>deployment</i>, og en <i>service</i>, men også lage en ny{" "}
            <Tooltip begrep={Begrep.NetworkPolicy} /> og gjøre endringer på den
            eksisterende <i>Network Policyen</i> for å åpne opp for mer
            kommunikasjon.
          </p>

          <p>
            For at oppgaven ikke skal være helt abstrakt har vi lagd en liten
            sjekkliste dere kan jobbe igjennom:
          </p>

          <div>
            <input type="checkbox" id="deployment" name="deployment" />
            <label htmlFor="deployment">
              {" "}
              Ny <i>Deployment</i>-ressurs
            </label>
            <br />
            <input type="checkbox" id="port" name="port" />
            <label htmlFor="port">
              {" "}
              Deploymenten sin <i>port</i> må settes til <code>3000</code>
            </label>
            <br />
            <input type="checkbox" id="image" name="image" />
            <label htmlFor="image">
              {" "}
              Deploymenten sitt <i>image</i> må settes til{" "}
              <code>ghcr.io/navikt/pleesah-skute-frontend:latest</code>
            </label>
            <br />
            <input type="checkbox" id="env" name="env" />
            <label htmlFor="env">
              {" "}
              Frontenden trenger også å vite adressen til backenden
              <code>API_URL: http://navn-på-backend-service</code>
            </label>
            <br />
          </div>
          <br />
          <div>
            <input type="checkbox" id="service" name="service" />
            <label htmlFor="service">
              {" "}
              Ny <i>Service</i>-ressurs
            </label>
            <br />
            <input type="checkbox" id="service-type" name="service-type" />
            <label htmlFor="service-type">
              {" "}
              Sett <code>spec.type</code> til å være av type{" "}
              <code>LoadBalancer</code> (default er <i>ClusterIP</i>)
            </label>
          </div>
          <p>
            Som nevnt tidligere brukes en <Tooltip begrep={Begrep.Service} />{" "}
            for å ha en felles inngang til flere podder, og hovedsakelig brukes
            de for å kommunsiere internt i et cluster, men ved å lage en service
            av typen <code>LoadBalancer</code> kan vi enkelt åpne opp for
            trafikk utenfra, som en nettadresse, bare at man bruker den eksterne
            IP-en. I vårt cluster som kjører på Google Cloud Platform, så er det
            Google som tar seg av å styre trafikken fra internett til deres
            service.
          </p>
          <div>
            <input
              type="checkbox"
              id="netpol-frontend"
              name="netpol-frontend"
            />
            <label htmlFor="netpol-frontend">
              {" "}
              Ny <i>Network policy</i>-ressurs for egress trafikk for frontenden
            </label>
            <br />
            <input type="checkbox" id="netpol-backend" name="netpol-backend" />
            <label htmlFor="netpol-backend">
              {" "}
              Oppdatere <i>Network policy</i>-ressursen for ingress trafikk for
              backend
            </label>
          </div>
          <p>
            Network policyen som ble opprettet tidligere åpnet opp for trafikk
            til en ekstern tjeneste som kjører på Nais-plattformen. Derfor var
            åpningen basert på en IP-adresse. Denne gangen er det kun trafikk
            internt i clusteret, og vi kan da bruke{" "}
            <code>podSelector.matchLabels</code> for å åpne trafikk for for
            podder med spesifikke <i>labels</i>.
          </p>

          <p>Husk at alle ressurser av samme type må ha unike navn.</p>

          <HintSeksjon
            hint={[
              <span key="hint-1">
                <a
                  href="https://kubernetes.io/docs/concepts/services-networking/service/index.html#publishing-services-service-types"
                  target="_blank"
                >
                  https://kubernetes.io/docs/concepts/services-networking/service/index.html#publishing-services-service-types
                </a>
                <br />
                <a
                  href="https://kubernetes.io/docs/concepts/services-networking/network-policies"
                  target="_blank"
                >
                  https://kubernetes.io/docs/concepts/services-networking/network-policies
                </a>
              </span>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            knappetekstNeste="Fullfør"
            ferdig
          />
        </article>
      </div>
    </main>
  );
};

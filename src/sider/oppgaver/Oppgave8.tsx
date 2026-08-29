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

export const Oppgave8 = () => {
  const OPPGAVENUMMER = 8;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(
          OPPGAVENUMMER,
          "Kommunikasjon mellom podder",
        )}
        begreper={[
          Begrep.Deployment,
          Begrep.Pod,
          Begrep.Service,
          Begrep.Cluster,
        ]}
        kommandoer={[
          KubectlKommando.Describe,
          KubectlKommando.Get,
          KubectlKommando.Apply,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            På åpne hav hjelper det lite å rope navn i vinden. Vi trenger en
            fast havn å styre etter, så skutene finner hverandre selv når
            strømmen flytter dem.
          </Historiecontainer>
          <p>
            Vi har ikke snakket veldig mye om kommunikasjon i Kubernetes enda,
            men Kubernetes støtter altså to typer kommunikasjon; intern og
            ekstern. Ekstern kommunikasjon er som regel løst med{" "}
            <code>Ingress</code>-ressurser, som gir dere en nettadresse som
            peker på deres app. I denne oppgaven skal vi se på{" "}
            <Tooltip begrep={Begrep.Service} />, som lar apper enkelt
            kommunisere internt i{" "}
            <Tooltip begrep={Begrep.Cluster} verdi="clusteret" />, også kalt{" "}
            <i>service discovery</i>.
          </p>
          <p>
            Hver <Tooltip begrep={Begrep.Pod} /> som blir opprettet i et{" "}
            <i>cluster</i> vil få tildelt en unik IP-adresse. Når dere oppretter
            en <Tooltip begrep={Begrep.Deployment} />, vil hver <i>pod</i> også
            få sin egen IP-adresse. Problemet er at disse IP-adressene ikke er
            stabile. Hvis en <i>pod</i> blir slettet og opprettet på nytt, får
            den en ny IP-adresse, selv om den har det samme navnet. Det blir
            derfor upraktisk å bruke <i>poddenes</i> IP-adresser direkte når
            apper skal kommunisere med hverandre. Det er her service kommer inn
            i bildet.
          </p>

          <p>
            En <i>service</i> har, på samme måte som en <i>deployment</i>, en{" "}
            <code>selector</code> som bestemmer hvilke <i>podder</i>{" "}
            <i>servicen</i> skal representere. <i>Servicen</i> gir dere et
            stabilt endepunkt som peker mot <i>poddene</i>{" "}
            <code>selectoren</code> treffer. Ved hjelp av{" "}
            <i>service discovery</i> kan andre apper i <i>clusteret</i>{" "}
            kommunisere med <i>servicen</i> ved å bruke navnet på den, i stedet
            for å forholde seg til IP-adressene til de enkelte <i>poddene</i>.
            Nedenfor har vi har kalt <i>service</i>-ressursen{" "}
            <code>tobias</code>. Andre apper i samme <i>namespace</i> kan nå den
            på <code>https://tobias</code>, men hvis en app i et annet{" "}
            <i>namespace</i> skal kalle på <i>servicen</i>, må <i>namespacet</i>{" "}
            være med i adressen:{" "}
            <code>http://tobias.{localStorage.getItem("team")}</code>.
          </p>

          <p>
            Opprett en ny <code>service.yaml</code>-fil for å rulle ut servicen.
          </p>

          <KodeBlokk>
            {`apiVersion: v1
kind: Service
metadata:
  name: tobias
spec:
  selector:
    <KEY>: <VALUE> # Legg til labelen fra tidligere oppgave
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080`}
          </KodeBlokk>

          <p>
            Ta gjerne en titt på <i>servicen</i> for å se hvilken IP-adresse den
            har fått.
          </p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/services-networking/service/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/services-networking/service
              </a>,
              <code key="hint-2">kubectl apply -f &lt;FILNAVN&gt;</code>,
              <span key="hint-3">
                Hvis dere ser følgende i terminalen er ressursen opprettet!
                <br />
                <code>service/tobias created</code>
              </span>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={data.services.length === 0}
            knappetekstNeste={`Neste oppgave! --> ${data.services.length > 0 ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

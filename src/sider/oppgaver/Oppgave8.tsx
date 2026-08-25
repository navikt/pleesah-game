import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { fetcher } from "../../fetcher.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import type { Status } from "../../types.ts";

export const Oppgave8 = () => {
  const OPPGAVENUMMER = 8;
  const { data } = useSWR<Status>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status/service?name=tobias`,
    fetcher,
    { refreshInterval: 5000 },
  );

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
          <p>
            Vi har ikke snakket veldig mye om kommunikasjon i Kubernetes frem
            til nå, men Kubernetes støtter to typer kommunikasjon, intern, eller
            ekstern. Ekstern kommunikasjon er som regel løst med
            Ingress-ressurser, som gir deg en nettadresse som peker på deres app.
            I denne oppgaven skal vi se på <Tooltip begrep={Begrep.Service} />,
            som lar apper enkelt kommunisere internt i{" "}
            <Tooltip begrep={Begrep.Cluster} value="clusteret" />, også kalt{" "}
            <i>service discovery</i>.
          </p>
          <p>
            Hver <Tooltip begrep={Begrep.Pod} /> som blir opprettet i et cluster
            vil få tildelt en unik IP-adresse. Og denne adressen vil endres når
            dere sletter podden deres, og oppretter den på nytt, selv om den har det
            samme navnet. Når dere oppretter en{" "}
            <Tooltip begrep={Begrep.Deployment} value="Deployments" />, så får
            man en unik IP-adresse per pod. Så hvis dere har behov for å
            kommunisere med andre apper, så går det egentlig ikke an å bruke
            IP-adresser. Og det er her <Tooltip begrep={Begrep.Service} />{" "}
            kommer inn i bildet.
          </p>
          <p>
            En <i>service</i> vil, som en deployment, ha en{" "}
            <code>selector</code> som velger hvilke podder servicen skal
            representere. Det da en service gir deg er en IP som repesenterer
            alle poddene som <code>selectoren</code> treffer, og via{" "}
            <i>service discovery</i> vil man få en intern ingress som andre
            apper kan kalle på. Nedenfor ser dere at vi har kalt
            service-ressursen <i>tobias</i>, og da blir den tilgjengelig på{" "}
            <code>http://tobias.{localStorage.getItem("team")}</code>. Navnet på
            namespacet trenger man kun hvis man kaller på en app i et annet
            namespace.
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
    seilskip: brigg
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080`}
          </KodeBlokk>

          <p>Ta gjerne en titt på servicen for å se hvilken IP-adresse den har fått.</p>

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
            knappetekstNeste={`Neste oppgave! --> ${data?.isRunning ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { Begrep, finnForklaring } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { fetcher } from "../../fetcher.ts";
import { Header } from "../../komponenter/header/Header.tsx";
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
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Bruk service")}
        kommandoIder={[
          KubectlKommandoId.Help,
          KubectlKommandoId.Describe,
          KubectlKommandoId.GetPods,
          KubectlKommandoId.Apply,
          KubectlKommandoId.Logs,
          KubectlKommandoId.DeletePod,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <p>
            Frem til nå har vi bare laget{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>podder</Tooltip>{" "}
            med hver sin individuelle IP-adresse.{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Deployment)}>
              Deployments
            </Tooltip>{" "}
            oppretter tre nye podder istedenfor én, med tre individuelle
            IP-adresser. Dette er tungvindt om du skal kommunisere med andre
            tjenester i{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Cluster)}>
              clusteret
            </Tooltip>
            , fordi du da må dele IP-adressene til de andre du kommuniserer med.
            Hver gang en pod flyttes mellom noder, vil den også få en ny
            IP-adresse.
          </p>
          <p>
            For å gjøre dette enklere kan man ta i bruk noe som heter{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Service)}>
              service
            </Tooltip>
            , som vil gi dere én IP-adresse som et mellomledd mellom dere og
            poddene. Da kan bruke service sin IP-adresse for å kommunisere med
            andre, og servicen vil sørge for at du kommer frem til en av
            poddene.
          </p>

          <p>
            Opprett en ny <code>.yaml</code>-fil for å sette opp service.
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

          <p>Hvordan kan du se informasjon om servicen?</p>

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

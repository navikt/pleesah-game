import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { fetcher } from "../../fetcher.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import type { PodInfo, TeamStatus } from "../../types.ts";

export const finnpodderUtenDeployment = (data: TeamStatus): PodInfo[] => {
  return data.pods.filter(
    (pod) =>
      !data.deployments.some((deployment) =>
        pod.name.startsWith(`${deployment.name}-`),
      ),
  );
};

export const Oppgave7 = () => {
  const OPPGAVENUMMER = 7;
  const { data } = useSWR<TeamStatus>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status/`,
    fetcher,
    { refreshInterval: 5000 },
  );

  const podderUtenDeployment = data ? finnpodderUtenDeployment(data) : [];

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Rydd opp gammel moro")}
        begreper={[Begrep.Deployment, Begrep.Pod]}
        kommandoer={[KubectlKommando.Get, KubectlKommando.Delete]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En forlatt skute som driver alene, tiltrekker seg både farer og
            uønsket oppmerksomhet
          </Historiecontainer>
          <p>
            Det er viktig å rydde opp etter seg når dere er ferdig med ting. Nå
            som vi har oppgradert til å bruke deployments trenger vi ikke den
            enkeltstående podden lengre. Podder dere ikke skal bruke videre
            forsvinner ikke av seg selv, de blir stående og bruke opp CPU, minne
            og andre ressurser helt til noen sletter dem manuelt. I tillegg kan
            gamle podder skape forvirring når dere feilsøker.
          </p>

          <p>
            Sjekk om dere har frittstående podder som ikke er koblet til en
            deployment, og slett de før dere går videre.
          </p>

          <HintSeksjon
            hint={[
              <code key="hint-1">
                kubectl delete &lt;RESSURSTYPE&gt; &lt;RESSURSNAVN&gt;
              </code>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={podderUtenDeployment.length !== 0}
            knappetekstNeste={`Neste oppgave! --> ${podderUtenDeployment.length === 0 ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import useSWR from "swr";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { fetcher } from "../../fetcher.ts";
import { Header } from "../../komponenter/header/Header.tsx";
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

  const [visHint1, setVisHint1] = useState(false);

  const podderUtenDeployment = data ? finnpodderUtenDeployment(data) : [];

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Rydd opp gammel moro")}
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
          <Historiecontainer>
            En forlatt skute som driver alene, tiltrekker seg både farer og
            uønsket oppmerksomhet
          </Historiecontainer>
          <p>
            Det er viktig å rydde opp etter seg når dere er ferdig med ting. Til
            nå har dere opprettet podder uten en <code>deployment</code>. Nå som
            vi har oppgradert til å bruke deployments så trenger vi ikke den
            enkeltstående podden lengre. Podder du ikke skal bruke videre
            forsvinner ikke av seg selv, de blir stående og bruke opp CPU, minne
            og andre ressurser helt til noen sletter dem manuelt. I tillegg kan
            gamle podder kan skape forvirring når dere feilsøker.
          </p>

          <p>
            Sjekk om dere har podder som ikke er koblet til en deployment, og
            rydd opp før dere går videre.
          </p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
          </div>

          {visHint1 && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1: <code>kubectl delete pod &lt;NAVN&gt;</code>
                </span>
              )}
            </div>
          )}
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

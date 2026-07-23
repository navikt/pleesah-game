import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";
import useSWR from "swr";
import type { Status } from "../types.ts";
import { fetcher } from "../fetcher.ts";

export const Oppgave7 = () => {
  const navigate = useNavigate();

  const { data } = useSWR<Status>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status/service?name=tobias`,
    fetcher,
    { refreshInterval: 5000 },
  );

  return (
    <main>
      <Poddy
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
        <Logo />
        <h1 className="header">Oppgave 7 - Bruk service</h1>

        <article>
          <p>
            Frem til nå har vi bare laget{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>poder</Tooltip> med
            hver sin individuelle IP-adresse.{" "}
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
            podene. Da kan bruke service sin IP-adresse for å kommunisere med
            andre, og servicen vil sørge for at du kommer frem til en av podene.
          </p>

          <p>
            Opprett en ny <code>.yaml</code>-fil for å sette opp service.
          </p>

          <pre>
            <code>{`apiVersion: v1
kind: Service
metadata:
  name: tobias
spec:
  selector:
    seilskip: brigg
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer`}</code>
          </pre>

          <p>Hvordan kan du se informasjon om servicen?</p>

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/6/")}>
              {"<-- Forrige oppgave!"}
            </button>

            <button
              disabled={!data?.isRunning}
              onClick={() => {
                void varsleNesteOppgave(8);
                navigate("/oppgaver/8/");
              }}
            >
              {`Neste oppgave! -->${data?.isRunning ? "✅" : "⏳"}`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave8 = () => {
  const navigate = useNavigate();

  const [serviceRunning, setServiceRunning] = useState(false);

  useEffect(() => {
    const team = localStorage.getItem("team");
    if (!team) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `/kubernetes/api/havnesjef/status/running?team=${team}&name=tobias&resource=service`,
          {
            cache: "no-store",
          },
        );
        if (res.ok) {
          const data = await res.json();
          if (data.running !== "❌") {
            setServiceRunning(true);
          }
        }
      } catch {
        // ignore, will retry
      }
    };

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, []);

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
        <h1 className="header">Oppgave 8 - Bruk service</h1>

        <article>
          <p>
            For stabil og pålitelig kommunikasjon mellom{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Deployment)}>
              deployments
            </Tooltip>{" "}
            trenger vi en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Service)}>
              service
            </Tooltip>
            . En service gir en fast adresse og navn å nå deployments på, selv
            om <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pods</Tooltip>{" "}
            som ligger bak den byttes ut eller flyttes rundt.
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
      targetPort: 8080`}</code>
          </pre>

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/7/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              disabled={!serviceRunning}
              onClick={() => {
                void varsleNesteOppgave(8);
                navigate("/ferdig/");
              }}
            >
              {`Ferdig ${serviceRunning ? "✅" : "⏳"}`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

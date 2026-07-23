import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave6 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [deploymentRunning, setDeploymentRunning] = useState(false);

  useEffect(() => {
    const team = localStorage.getItem("team");
    if (!team) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `/kubernetes/api/havnesjef/status/running?team=${team}&name=kaptein-sabeltann&resource=deployment`,
          {
            cache: "no-store",
          },
        );
        if (res.ok) {
          const data = await res.json();
          if (data.running !== "❌") {
            setDeploymentRunning(true);
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
        <h1 className="header">Oppgave 6 - Bruk deployment</h1>

        <article>
          <p>
            Flere{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pods</Tooltip> er
            bedre enn én pod, men med flere pods trenger vi noe som passer på at
            de alltid kjører. En{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Deployment)}>
              deployment
            </Tooltip>{" "}
            gjør nettopp dette.
          </p>

          <p>
            Hittil i spillet har dere måttet slette podden deres og kjørt den
            opp igjen for å kunne gjøre endringene. Det er jo ikke ideelt! Det
            er jo ønskelig å holde applikasjonen kjørende selv om man gjør
            endringer underveis! Her kommer deployment-ressurstypen inn. Likt
            som i første oppgave må dere også her bruke <code>apply</code> for å
            lage ressursen deres.
          </p>

          <pre>
            <code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: kaptein-sabeltann
spec:
  replicas: 3
  selector:
    matchLabels:
      seilskip: brigg
  template:
    metadata:
      labels:
        seilskip: brigg
    spec:
      containers:
        - name: lasterommet
          image: ghcr.io/navikt/pleesah-skute:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              port: 8080
              path: /isReady
          env:
            - name: HAR_KASTET_LOSS
              value: "true"
            - name: HAR_SATT_KURS
              valueFrom:
                secretKeyRef:
                  name: koordinatene-mine
                  key: KOORDINATER`}</code>
          </pre>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
          </div>

          {(visHint1 || visHint2) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1:{" "}
                  <a
                    href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>kubectl apply -f FILNAVN</code>
                </span>
              )}
            </div>
          )}

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/6/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              disabled={!deploymentRunning}
              onClick={() => {
                void varsleNesteOppgave(7);
                navigate("/oppgaver/8/");
              }}
            >
              {`Neste oppgave! --> ${deploymentRunning ? "✅" : "⏳"}`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

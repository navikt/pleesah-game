import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";

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
      <Poddy />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 6 - Admiral</h1>

        <article>
          <p>
            Flere skuter er bedre enn én skute, men med flere skuter trenger vi
            en Admiral. Admiralen passer på at skutene alltid er klare for å
            plyndre videre.
          </p>

          <p>
            Hittil i spillet har du måttet slette <code>podden</code> din og
            kjørt den opp igjen for å kunne gjøre endringene. Det kan jo ikke
            være sånn? Det er jo ønskelig å holde skuta flytende selvom man gjør
            endringer underveis! Her kommer <code>deployment</code> ressurstypen
            inn. Likt som i første oppgave må du også her bruke{" "}
            <code>apply</code> for å lage ressursen din.
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
            <button onClick={() => navigate("/oppgaver/5/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              disabled={!deploymentRunning}
              onClick={() => {
                void varsleNesteOppgave(6);
                navigate("/oppgaver/7/");
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

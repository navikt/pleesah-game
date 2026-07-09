import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { erLokaltTestmiljo, varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";

export const Oppgave1 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [podRunning, setPodRunning] = useState(erLokaltTestmiljo);

  useEffect(() => {
    const team = localStorage.getItem("team");
    if (!team) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `/kubernetes/api/havnesjef/status/running?team=${team}&name=${team}&resource=pod`,
          {
            cache: "no-store",
          },
        );
        if (res.ok) {
          const data = await res.json();
          if (data.running !== "❌") {
            setPodRunning(true);
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
        ]}
      />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 1 - Sjøsette skuta</h1>

        <article>
          <p>
            For å starte applikasjonen din, eller sjøsette skuta, må du først
            opprette en <code>.yaml</code>-fil. Deretter må du kjøre en kommando
            for å lage ressursen som er spesifisert i specen under. Dette gjør
            du ved å bruke <code>kubectl apply</code>. Tommelfingerregelen er at{" "}
            <code>apply</code> oppretter en ny ressurs dersom den ikke allerede
            finnes, og oppdaterer kun det som har endret seg dersom den finnes.
          </p>

          <pre>
            <code>{`apiVersion: v1
kind: Pod
metadata:
  name: ${localStorage.getItem("team")}
spec:
  containers:
  - name: lasterommet
    image: ghcr.io/navikt/pleesah-skute:latest
    ports:
    - containerPort: 8080
    readinessProbe:
      httpGet:
        port: 8080
        path: /isReady`}</code>
          </pre>

          <p>
            Hvis du har gjort alt riktig så skal du ha fått følgende respons i
            terminalen, og du kan gå videre til neste oppgave.
          </p>

          <p>
            <code>pod/{localStorage.getItem("team")} created</code>
          </p>

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
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>{`kubectl apply -f <FILNAVN>`}</code>
                </span>
              )}
            </div>
          )}

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/0/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              disabled={!podRunning}
              onClick={() => {
                void varsleNesteOppgave(1);
                navigate("/oppgaver/2/");
              }}
            >
              {`Neste oppgave! --> ${podRunning ? "✅" : "⏳"}`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

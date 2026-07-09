import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";

export const Oppgave7 = () => {
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
      <Poddy />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 7 - Havnesjef</h1>

        <article>
          <p>
            Det er et stort hav, og for å navigere deg videre ønsker du bistand
            fra flere flåter under en annen Admiral, men med sterk tåke og mye
            sjø oppnår du ikke kontakt med andre flåter, og ingen får kontakt
            med deg heller! Hjelp! 📣
          </p>

          <p>
            For stabil og pålitelig kommunikasjon mellom{" "}
            <code>deployments</code> trenger vi en <code>service</code>. Vi
            liker å se på det som et radiotårn.
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
            <button onClick={() => navigate("/oppgaver/6/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              disabled={!serviceRunning}
              onClick={() => {
                void varsleNesteOppgave(7);
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

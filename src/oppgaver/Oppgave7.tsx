import { useEffect, useState } from "react";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";

export const Oppgave7 = () => {
    const navigate = useNavigate();

    const [serviceRunning, setServiceRunning] = useState(false);

    useEffect(() => {
        const team = localStorage.getItem("team");
        if (!team) return;

        const poll = async () => {
            try {
                const res = await fetch(`/kubernetes/api/havnesjef/serviceRunning?team=${team}&service=myserv`, {
                    cache: "no-store",
                });
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
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 7 - Havnesjef</h1>
                <article>
                    <p>
                        Det er et stort hav og for å navigere deg videre ønsker du bistand fra flere flåter under en
                        annen admiral, men med sterk tåke og mye sjø oppnår du ikke kontakt med andre flåter, og ingen
                        får kontakt med deg! Hjelp! 📣
                    </p>
                    <p>
                        For stabil og pålitelig kommunikasjon mellom deployments trenger vi en service. Vi liker å se på
                        det som et radiotårn.
                    </p>
                    <pre>
                        <code>{`apiVersion: v1
kind: Service
metadata:
  name: DITT RADIOTÅRN
spec:
  selector:
    app.kubernetes.io/name: NAVN PÅ ADMIRALEN?
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080`}</code>
                    </pre>
                    <div className="horizontal-button-container" style={{ marginTop: "2rem" }}>
                        <button onClick={() => navigate("/oppgaver/6/")}>{"<-- Forrige oppgave!"}</button>
                        <button disabled={!serviceRunning} onClick={() => navigate("/ferdig/")}>
                            {`Ferdig ${serviceRunning ? "✅" : "⏳"}`}
                        </button>
                    </div>
                </article>
            </div>
        </main>
    );
};

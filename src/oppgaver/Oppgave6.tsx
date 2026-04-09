import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Oppgave6 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 6 - Admiral</h1>
                <article>
                    <p>
                        Flere skuter er bedre enn én skute, men med flere skuter trenger vi en Admiral. Admiralen passer
                        på at skutene alltid er klar for å plyndre videre.
                    </p>
                    <p>
                        Til nå i spillet har du måttet slette <code>podden</code> dinog kjørt den opp igjen for å kunne
                        gjøre endringene. Det kan jo ikke være sånn? Det er jo ønskelig å holde skuta flytende selvom
                        man gjør endringer underveis. Her kommer <code>deployment</code> ressurstypen inn. Likt som i
                        første oppgave må du også her bruke <code>apply</code> for å lage ressursen din.
                    </p>
                    <pre>
                        <code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: DIN_ADMIRAL
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
                    <div className="hint-container">
                        {visHint1 && (
                            <a
                                href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
                            </a>
                        )}
                        {visHint2 && (
                            <div>
                                <code>kubectl apply -f FILNAVN</code>
                            </div>
                        )}
                    </div>
                    <div className="hint-container">
                        <div className="horizontal-button-container">
                            <button onClick={() => setVisHint1(true)}>Hint 1</button>
                            <button onClick={() => setVisHint2(true)}>Hint 2</button>
                        </div>
                    </div>
                    <div className="horizontal-button-container">
                        <button onClick={() => navigate("/oppgaver/5/")}>{"<-- Forrige oppgave!"}</button>
                        <button onClick={() => navigate("/oppgaver/7/")}>{"Neste oppgave! -->"}</button>
                    </div>
                </article>
            </div>
        </main>
    );
};

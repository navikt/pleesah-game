import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Oppgave5 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);
    const [visHint3, setVisHint3] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 5 - Sett kurs</h1>
                <article>
                    <p>Hurra! Du har kastet loss og er klar til å plyndre!</p>
                    <p>
                        Men hvor skal vi, egentlig? Koordinatene finner du i en hemmelighet! I Kubernetes kan
                        hemmeligheter lagres i ressurstypen <code>secrets</code>. Disse kan inneholde forskjellig typer
                        data, men i dette tilfellet finnes det kun én nøkkel skuta trenger for å sette kurs mot riktig
                        destinasjon.
                    </p>
                    <pre>
                        <code>{`spec:
    containers:
    env:
      - name: HAR_SATT_KURS
        valueFrom:
          secretKeyRef:
            name: koordinatene-mine
            key: KOORDINATER`}</code>
                    </pre>
                    <p>Kursen er satt, og du er endelig på vei til din destinasjon! Skip o’hoi!</p>
                    <div className="hint-container">
                        {visHint1 && (
                            <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank">
                                https://kubernetes.io/docs/concepts/configuration/secret/
                            </a>
                        )}
                        {visHint2 && (
                            <div>
                                <code>kubectl apply -f {localStorage.getItem("team")}</code>
                            </div>
                        )}
                        {visHint3 && (
                            <div>
                                <code>kubectl apply -f FILNAVN</code>
                            </div>
                        )}
                    </div>

                    <div className="hint-container">
                        <div className="horizontal-button-container">
                            <button onClick={() => setVisHint1(true)}>Hint 1</button>
                            <button onClick={() => setVisHint2(true)}>Hint 2</button>
                            <button onClick={() => setVisHint3(true)}>Hint 3</button>
                        </div>
                    </div>

                    <div className="horizontal-button-container">
                        <button onClick={() => navigate("/oppgaver/4/")}>{"<-- Forrige oppgave!"}</button>
                        <button onClick={() => navigate("/oppgaver/6/")}>{"Neste oppgave! -->"}</button>
                    </div>
                </article>
            </div>
        </main>
    );
};

import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Oppgave3 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);
    const [visHint3, setVisHint3] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 3 - Sjekke logger</h1>
                <article>
                    <p>
                        For pirater og andre sjøfarere er en loggbok essensielt, det samme gjelder for Kubernetes. Nå
                        som skuta er sjøsatt er det nyttig å sjekke loggboken for å se at alt er som det skal.
                    </p>
                    <p>
                        Fra forrige oppgave så vi at ikke alt stod helt bra til med <code>poden</code> vår, fordi en{" "}
                        <code>readiness probe failed</code>. Kubernetes bruker en <code>readniess probe</code> per{" "}
                        <code>container</code> i en <code>pod</code> for å sjekke om den er klar for å ta imot trafikk.
                        Med andre ord, når en <code>container</code> ikke er klar, vil den ikke motta trafikk.
                    </p>
                    <p>La oss undersøle litt videre.</p>
                    <p>
                        Neste steg er å se på loggene til <code>containeren</code> vår ved bruk av kommandoen{" "}
                        <code>logs</code>. Når du kjører kommandoen vil det komme mange logglinjer, da vår{" "}
                        <code>container</code> logger neste oppgave hver gang Kubernetes sjekker om{" "}
                        <code>container</code> er klar. Ut av boksen så sjekker Kubernetes hvert tiende sekund.
                    </p>

                    <div className="hint-container">
                        {visHint1 && (
                            <a
                                href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
                            </a>
                        )}
                        {visHint2 && (
                            <a
                                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/
                            </a>
                        )}
                        {visHint3 && (
                            <div>
                                <code>kubectl logs {localStorage.getItem("team")} \n</code>
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
                        <button onClick={() => navigate("/oppgaver/2/")}>{"<-- Forrige oppgave!"}</button>
                        <button onClick={() => navigate("/oppgaver/4/")}>{"Neste oppgave! -->"}</button>
                    </div>
                </article>
            </div>
        </main>
    );
};

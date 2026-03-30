import { Logo } from "../komponenter/logo/Logo.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Oppgave2 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);
    const [visHint3, setVisHint3] = useState(false);
    const [visHint4, setVisHint4] = useState(false);
    const [visHint5, setVisHint5] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 2 - Flyter skuta?</h1>
                <article>
                    <p>
                        Den beste måten å se på om <code>poden</code> din er oppe og kjører er ved å se på{" "}
                        <code>ready</code> og <code>status</code>-feltet. Vi har så vidt snakker om <code>get</code>,
                        men vi har ikke sett den i faktisk bruk. Så la os starte med å kjøre <code>get</code>-kommandoen
                        for å se hvordan skuta vår har det.
                    </p>
                    <p>Hvis du har gjort alt riktig skal det se tilsvarende ut.</p>
                    <pre>
                        <code>{`NAME          READY          STATUS          RESTARTS          AGE
${localStorage.getItem("team")}        0/1            Running         0                 12m`}</code>
                    </pre>
                    <p>Som du kanskje ser så er ikke båten vår helt klar til å kaste loss.</p>
                    <p>
                        <code>Name</code> og <code>age</code> vil være forskjellig, men den skal ha{" "}
                        <code>Status: Running</code> og <code>Ready: 0/1</code>. <code>Ready</code>.kolonnen viser
                        antall containere som er klare til å ta i mot trafikk.
                    </p>
                    <p>
                        Neste steg er å undersøke hvorfor <code>containeren</code> ikke er klar, da kan vi bruke
                        kommandoen <code>describe</code>. <code>describe</code> viser en detaljert oversikt over
                        ressursen vi ønsker å beskrive. Litt for mye til at vi limer inn teksten her, og den kan ofte
                        være overveldende de første gangene man bruker den. I korte trekk er beskrivelsen delt i to,
                        første delen er ressursdefinisjonen din (også kalt <code>spec</code>), mens den nederste delen
                        er <code>events</code>. <code>events</code> er hendelser tilknyttet til din <code>pod</code>.
                    </p>
                    <p>
                        Hvis alt har gått som det skal vil du finne en lignende linje nederst i <code>events</code>
                        -listen.
                    </p>
                    <pre>
                        <code>
                            Warning Unhealthy 4m7s (x64 over 13m) kubelet spec.containers{`{lasterommet}`}: Readiness
                            probe failed: HTTP probe failed with statuscode: 501
                        </code>
                    </pre>
                    <p>
                        Du kan også se at <code>Containers.lasterommet.Ready</code> er satt til <code>false</code>.
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
                                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
                            </a>
                        )}
                        {visHint3 && (
                            <div>
                                <code>kubectl get pods</code>
                            </div>
                        )}
                        {visHint4 && (
                            <a
                                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/
                            </a>
                        )}
                        {visHint5 && (
                            <div>
                                <code>kubectl describe pods {localStorage.getItem("team")}</code>
                            </div>
                        )}
                    </div>

                    <div className="hint-container">
                        <div className="horizontal-button-container">
                            <button onClick={() => setVisHint1(true)}>Hint 1</button>
                            <button onClick={() => setVisHint2(true)}>Hint 2</button>
                            <button onClick={() => setVisHint3(true)}>Hint 3</button>
                            <button onClick={() => setVisHint4(true)}>Hint 4</button>
                            <button onClick={() => setVisHint5(true)}>Hint 5</button>
                        </div>
                    </div>

                    <div className="horizontal-button-container">
                        <button onClick={() => navigate("/oppgaver/1/")}>{"<-- Forrige oppgave!"}</button>
                        <button onClick={() => navigate("/oppgaver/3/")}>{"Neste oppgave! -->"}</button>
                    </div>
                </article>
            </div>
        </main>
    );
};

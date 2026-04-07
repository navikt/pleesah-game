import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Oppgave4 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 4 - Kast loss</h1>
                <article>
                    <p>
                        Skuta er fortsatt fortøyd til havna og er ikke klar til å seile til sjøs. Du må kaste loss slik
                        at skuta er klar for å seile. Skuta krever at en miljøvariabel <code>HAR_KASTET_LOSS</code> er
                        satt til <code>true</code>.
                    </p>
                    <p>
                        For denne oppgaven har vi laget en forenklet sjekk som ser etter en spesifikk miljøvariabel før
                        den rapporterer at den er klar til Kubernetes. Derfor må du oppdatere yaml-filen din til å sette
                        miljøvariabelen <code>HAR_KASTET_LOSS</code> til <code>true</code>. I den virkelige verden vil
                        det være forskjellige behov som bestemmer om en container er klar. For eksempel vil man sikre
                        seg at man har kontakt med en database.
                    </p>
                    <p>
                        Legg til følgende i din yaml-fil under <code>spec.containers</code>
                    </p>
                    <pre>
                        <code>{`spec:
    containers:
    - name: lasterommet
      ...
      env:
        - name: HAR_KASTET_LOSS
          value: "true"`}</code>
                    </pre>
                    <p>
                        Det er ikke alle ressurser som kan oppdateres, og <code>pod</code> er en av disse. For å
                        oppdatere skuta med <code>apply</code>, må du først slette den (senke den, om du vil) før du kan
                        kjøre <code>apply</code> på nytt.
                    </p>
                    <p>
                        <code>kubectl delete pod {localStorage.getItem("team")}</code>
                    </p>
                    <p>
                        Det kan ta noen sekunder før poden er slettet. Når den er slettet vil du få opp en beskjed{" "}
                        <code>pod {localStorage.getItem("team")} deleted</code>.
                    </p>
                    <p>
                        Kubernetes har flere forskjellige <code>probes</code>, og en annen <code>probe</code> som er mye
                        brukt er <code>liveness probe</code> for å sjekke om <code>containeren</code> er i live.
                    </p>
                    <div className="hint-container">
                        {visHint1 && (
                            <a
                                href="https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
                            </a>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setVisHint1(true)}>Hint 1</button>
                    </div>
                    <div className="horizontal-button-container">
                        <button onClick={() => navigate("/oppgaver/2/")}>{"<-- Forrige oppgave!"}</button>
                        <button onClick={() => navigate("/oppgaver/5/")}>{"Neste oppgave! -->"}</button>
                    </div>
                </article>
            </div>
        </main>
    );
};

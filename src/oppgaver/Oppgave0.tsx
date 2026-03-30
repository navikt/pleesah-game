import { Logo } from "../komponenter/logo/Logo.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Oppgave0 = () => {
    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Oppgave 0 - Skue utover havna</h1>
                <article>
                    <p>Du rusler ned mot havna for å se om skipet du har stjålet kan sette seil på de syv hav!</p>
                    <p>
                        <code>kubectl</code> er hovedverktøyet når man jobber med Kubernetes. Den lar deg enkelt se og
                        interagere med alle ressursene som finnes. Derfor starter vi med en enkel oppgave hvor vi skal
                        se at det ikke finnes noen poder kjørende i vårt <code>namespace</code>. Som nevnt tidligere
                        brukes <code>namespace</code> for å holde ressurser adskilt. Dette gjør at man enkelt kan styre
                        rettigheter, tilganger, og kommunikasjon på tvers av avhengigheter. I Pleesah skiller vi mellom
                        de forskjellige teamene, slik at dere ikke går i beina på hverandre.
                    </p>
                    <p>
                        For å sikre oss at alt er riktig, så sjekker vi at det ikke allerede finnes en <code>pod</code>{" "}
                        i vårt <code>namespace</code>.
                    </p>
                    <code>No resources found in {localStorage.getItem("team")} namespace</code>
                    <p>Hvis du får responsen ovenfor, så er alt bra, og du kan gå videre til neste oppgave.</p>

                    <div className="hint-container">
                        {visHint1 && (
                            <a
                                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                                target="_blank"
                            >
                                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
                            </a>
                        )}
                        {visHint2 && (
                            <div>
                                <code>kubectl get pods</code>
                            </div>
                        )}
                    </div>

                    <div className="hint-container">
                        <div className="horizontal-button-container">
                            <button onClick={() => setVisHint1(true)}>Hint 1</button>
                            <button onClick={() => setVisHint2(true)}>Hint 2</button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/oppgaver/1/")}>{"Neste oppgave! -->"}</button>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

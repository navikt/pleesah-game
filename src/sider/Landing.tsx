import { Logo } from "../komponenter/logo/Logo.tsx";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">Piratlivet er en strøm av hendelser</h1>
                <article>
                    <h2>Velkommen til Pleesah Game!</h2>
                    <p>
                        Her skal du lære om Kubernetes. Målet med kurset er å gi et lite innblikk i hva Kubernetes er,
                        hva man kan gjøre med Kubernetes og hvordan. Her har du mulighet til å prøve deg frem, feile og
                        prøve på nytt!
                    </p>

                    <h3>Hva er kubernetes?</h3>

                    <p>
                        Du kan tenke på Kubernetes som en havnesjef, Havnesjefen har kontroll på mange armadaer med
                        skuter. Kubernetes passer på <code>deployments</code> som i vår analogi er admiraler. Hver{" "}
                        <code>deployment</code> består av <code>pods</code> som her er skuter. En admiral har altså
                        kontroll over flere skuter, og administrerer disse. En skute kan ha last som tilsvarer en eller
                        flere <code>containere</code> i en <code>pod</code>. Havnesjefen kan holde skuter flytende eller
                        senke de om hen ønsker, og holder styr på trafikken mellom skutene.
                    </p>

                    <h4>Oppsummert</h4>

                    <ul>
                        <li>Havnesjef - Kubernetes</li>
                        <li>Admiral - Deployment</li>
                        <li>Skute - Pod</li>
                        <li>Last - Container</li>
                        <li>Mannskap - Teamets deltakere</li>
                        <li>Armada - Mange skuter/En gruppe av flere pods</li>
                        <li>Radiotårn - Service</li>
                    </ul>

                    <button onClick={() => navigate("/forutsetninger")}>Skip o'hoi! Start eventyret her!</button>
                </article>
            </div>
        </main>
    );
};

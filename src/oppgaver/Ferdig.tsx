import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";

export const Ferdig = () => {
    const naviagte = useNavigate();

    return (
        <main>
            <div className="flex-column-container">
                <Logo />
                <h1 className="header">HURRA!!</h1>
                <article>
                    <p>
                        Tusen takk for at du har spilt Pleesah Game! Vi håper du har hatt det gøy og lært masse om
                        Kubernetes underveis. Hvis du har noen tilbakemeldinger eller forslag til forbedringer, ikke nøl
                        med å ta kontakt med oss. Vi setter stor pris på din innsats og engasjement!
                    </p>
                    <p>Lykke til videre på din reise med Kubernetes, og måtte vinden alltid være i ditt seil!</p>
                    <button onClick={() => naviagte("/")}>Tilbake til start</button>
                </article>
            </div>
        </main>
    );
};

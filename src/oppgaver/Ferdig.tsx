import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { TeamStatus } from "../teamStatus/TeamStatus.tsx";

export const Ferdig = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">HURRA!!</h1>
        <div className="flex-row-container">
          <article>
            <TeamStatus />
          </article>
          <article>
            <p>
              Tusen takk for at du har spilt Pleesah Game! Vi håper du har hatt
              det gøy og lært masse om Kubernetes underveis. Hvis du har noen
              tilbakemeldinger eller forslag til forbedringer, ikke nøl med å ta
              kontakt med oss. Vi setter stor pris på deres innsats og
              engasjement!
            </p>
            <p>
              Lykke til videre på deres reise med Kubernetes, og måtte vinden
              alltid være i deres seil!
            </p>
            <button onClick={() => navigate("/")}>Tilbake til start</button>
          </article>
        </div>
      </div>
    </main>
  );
};

import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { useTeamStatus } from "../TeamStatusContext.tsx";

export const Ferdig = () => {
  const navigate = useNavigate();

  const { data } = useTeamStatus();

  console.log(data);

  return (
    <main>
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">HURRA!!</h1>
        <div className="flex-row-container">
          <article>
            <p>sodipgjsiogdj</p>
          </article>
          <article>
            <p>
              Tusen takk for at du har spilt Pleesah Game! Vi håper du har hatt
              det gøy og lært masse om Kubernetes underveis. Hvis du har noen
              tilbakemeldinger eller forslag til forbedringer, ikke nøl med å ta
              kontakt med oss. Vi setter stor pris på din innsats og
              engasjement!
            </p>
            <p>
              Lykke til videre på din reise med Kubernetes, og måtte vinden
              alltid være i ditt seil!
            </p>
            <button onClick={() => navigate("/")}>Tilbake til start</button>
          </article>
        </div>
      </div>
    </main>
  );
};

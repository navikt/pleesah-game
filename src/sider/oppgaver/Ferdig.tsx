import { useNavigate } from "react-router-dom";
import { Header } from "../../komponenter/header/Header.tsx";

export const Ferdig = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex-column-container">
        <Header overskrift="HURRA!" poddySynlig={false} />
        <article>
          <h2>Tusen takk for at dere har spilt Pleesah Game!</h2>

          <p>
            Vi håper dere har hatt det gøy, lært masse om Kubernetes og kanskje
            blitt litt tryggere på veien.
          </p>

          <p>
            Før dere runder av, hadde vi satt stor pris på om dere kunne bruke
            et par minutter på å fortelle oss hva dere synes om kurset.
            Tilbakemeldingene deres hjelper oss med å gjøre Pleesah Game enda
            bedre!
          </p>

          <p>
            <a
              href="https://forms.cloud.microsoft/e/EhzrZFsKfz"
              target="_blank"
            >
              Gi tilbakemelding her
            </a>
          </p>

          <p>
            Lykke til videre på deres reise med Kubernetes, og måtte vinden
            alltid være i deres seil!
          </p>
          <button onClick={() => navigate("/")}>Tilbake til start</button>
        </article>
      </div>
    </main>
  );
};

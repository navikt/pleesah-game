import { useNavigate } from "react-router-dom";
import { Header } from "../../komponenter/header/Header.tsx";

export const Ferdig = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex-column-container">
        <Header overskrift="HURRA!" />
        <article>
          <p>
            Tusen takk for at dere har spilt Pleesah Game! Vi håper dere har
            hatt det gøy og lært masse om Kubernetes underveis. Hvis dere har
            noen tilbakemeldinger, idéer til oppgaver, eller forslag til
            forbedringer, ikke nøl med å ta kontakt med oss eller fyll ut
            skjemaet vi lenker til nedenfor. Vi setter stor pris på deres
            innsats og engasjement!
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

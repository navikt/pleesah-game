import { Header } from "../komponenter/header/Header.tsx";
import { ForutsetningerTekst } from "./forutsetninger/ForutsetningerTekst.tsx";
import { OpprettTeamSkjema } from "./forutsetninger/OpprettTeamSkjema.tsx";
import "./forutsetninger/Forutsetninger.css";

export const Landing = () => {
  return (
    <main>
      <div className="flex-column-container">
        <Header overskrift="Piratlivet Er En Strøm Av Hendelser" />
        <article>
          <h2>Velkommen til Pleesah Game!</h2>
          <p>
            Her skal du lære om Kubernetes. Målet med kurset er å gi et lite
            innblikk i hva Kubernetes er, hva man kan gjøre med Kubernetes og
            hvordan. Her har du mulighet til å prøve deg frem, feile og prøve på
            nytt!
          </p>

          <ForutsetningerTekst />
          <OpprettTeamSkjema />
        </article>
      </div>
    </main>
  );
};

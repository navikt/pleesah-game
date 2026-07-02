import { Logo } from "../komponenter/logo/Logo.tsx";
import { ForutsetningerTekst } from "./forutsetninger/ForutsetningerTekst.tsx";
import { OpprettTeamSkjema } from "./forutsetninger/OpprettTeamSkjema.tsx";
import "./forutsetninger/Forutsetninger.css";
import "../oppgaver/Oppgaver.css";

export const Forutsetninger = () => {
  return (
    <main>
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Forutsetninger</h1>

        <article>
          <ForutsetningerTekst />
          <OpprettTeamSkjema />
        </article>
      </div>
    </main>
  );
};

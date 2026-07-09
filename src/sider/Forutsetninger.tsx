import { Logo } from "../komponenter/logo/Logo.tsx";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import { ForutsetningerTekst } from "./forutsetninger/ForutsetningerTekst.tsx";
import { OpprettTeamSkjema } from "./forutsetninger/OpprettTeamSkjema.tsx";
import "./forutsetninger/Forutsetninger.css";
import "../oppgaver/Oppgaver.css";

export const Forutsetninger = () => {
  return (
    <main>
      <Poddy
        kommandoIder={[KubectlKommandoId.Help, KubectlKommandoId.Describe]}
      />
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

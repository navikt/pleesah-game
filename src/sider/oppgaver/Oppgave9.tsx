import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import "./Oppgaver.css";

export const Oppgave9 = () => {
  const OPPGAVENUMMER = 9; // Oppdater til riktig nummer

  const [visHint1, setVisHint1] = useState(false); //Legg til antall hint du vil ha med her

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Slå opp kartet")} // Legg til tittel på oppgaven
        kommandoIder={[KubectlKommandoId.Help]} // Legg til kommandoene som skal vises i kommandolisten fra de forrige
        // oppgavene, og spe på om du vil ha flere
      />

      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En skute uten kart seiler i blinde. Vi må få kartet opp så kapteinen kan finne veien gjennom ukjente farvann.
          </Historiecontainer>

          <p>
            I denne oppgaven skal du bruke de ferdighetene du har lært til nå å sette opp en helt ny <Tooltip forklaring={Begrep.Deployment}>deployment</Tooltip> {" "}
            med et nytt <Tooltip forklaring={Begrep.Image}>image</Tooltip>. Målet er at poddene i de to deploymentene dine skal kunne kommunisere seg i mellom. Det vil si at ikke bare skal
            dere sette opp en til deployment men også endre network policien.
          </p>


          <p>
            Dette er det du trenger for å gjøre denne oppgaven:
            image: <code>ghcr.io/navikt/pleesah-skute-frontend:latest</code>
            </p>
          <p>
            miljøvariabel:
            <code>API_URL=https://pleesah.intern.nav.no</code>
          </p>
          <p>
            <code>API_PATH=/api</code>

          </p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
          </div>

          {visHint1 && (
            <div className="hint-container">
              <span>Hint 1: Legg inn konkret hint her.</span>
            </div>
          )}

          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

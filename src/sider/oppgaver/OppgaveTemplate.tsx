import { useState } from "react";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import { Begrep, finnForklaring } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import "./Oppgaver.css";

export const OppgaveTemplate = () => {
  const OPPGAVENUMMER = 0; // Oppdater til riktig nummer

  const [visHint1, setVisHint1] = useState(false); //Legg til antall hint du vil ha med her

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Tittel på oppgaven")} // Legg til tittel på oppgaven
        kommandoIder={[KubectlKommandoId.Help]} // Legg til kommandoene som skal vises i kommandolisten fra de forrige
        // oppgavene, og spe på om du vil ha flere
      />

      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Kort intro/fortelling til oppgaven.
          </Historiecontainer>

          <p>
            Beskriv oppgaven her. Bruk gjerne{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>begreper</Tooltip>{" "}
            med tooltip.
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

import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";
import { useTeamStatus } from "../../teamStatus/TeamStatusContext.tsx";

export const Oppgave7 = () => {
  const OPPGAVENUMMER = 7;
  const { data } = useTeamStatus();

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Rydd opp gammel moro")}
        oppgaveNummer={OPPGAVENUMMER}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            En forlatt skute som driver alene, tiltrekker seg både farer og
            uønsket oppmerksomhet.
          </Historiecontainer>
          <p>
            Det er viktig å rydde opp etter seg når dere er ferdig med ting. Nå
            som vi har oppgradert til å bruke{" "}
            <Tooltip begrep={Begrep.Deployment} verdi="deployments" />, trenger
            vi ikke den enkeltstående{" "}
            <Tooltip begrep={Begrep.Pod} verdi="podden" /> lengre. <i>Podder</i>{" "}
            dere ikke skal bruke videre forsvinner ikke av seg selv, de blir
            stående og bruke opp CPU, minne og andre ressurser helt til noen
            sletter dem manuelt. I tillegg kan gamle <i>podder</i> skape
            forvirring når dere feilsøker.
          </p>

          <p>
            Sjekk om dere har frittstående <i>podder</i> som ikke er koblet til
            en <i>deployment</i>, og slett de før dere går videre.
          </p>

          <HintSeksjon
            hint={[
              <code key="hint-1">
                kubectl delete &lt;RESSURSTYPE&gt; &lt;RESSURSNAVN&gt;
              </code>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            forrigeKnapp
            disabled={data.pods.length !== 3}
            knappetekstNeste={`Neste oppgave! --> ${data.pods.length === 3 ? "✅" : "⏳"}`}
          />
        </article>
      </div>
    </main>
  );
};

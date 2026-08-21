import { useState } from "react";
import "./Oppgaver.css";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave0 = () => {
  const OPPGAVENUMMER = 0;
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Kubectl")}
        begreper={[Begrep.Namespace, Begrep.Pod]}
        kommandoer={[KubectlKommando.Help, KubectlKommando.Describe]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Dere er nå klar til å starte deres reise som pirat! Dere rusler ned
            mot havna for å se etter et skip. Der finner dere skipet Den Sorte
            Perle, og som de ekte piratene dere er, kaprer du dette skipet!
            Ombord på Den Sorte Perle må dere inspisere at den er klart til å
            sette seil på de syv hav!
          </Historiecontainer>

          <p>
            <code>kubectl</code> er et kommandolinjeverktøy, og er
            hovedverktøyet når man jobber med Kubernetes. Kubetctl lar dere
            enkelt se og interagere med alle ressursene som finnes i et cluster.
            Derfor starter vi med en enkel oppgave hvor dere skal se om dere får
            kontakt med deres <Tooltip begrep={Begrep.Namespace} />, og
            interagere med en av de mest brukte ressurstypene i Kubernetes,
            nemlig <Tooltip begrep={Begrep.Pod} />.
          </p>
          <p>
            Som nevnt tidligere brukes namespace for å holde ressurser adskilt.
            Dette gjør at man enkelt kan holde ressurser avskilt, og styre
            rettigheter, tilganger, og kommunikasjon på tvers av namespaces. I
            Pleesah skiller vi mellom de forskjellige teamene, slik at dere ikke
            går i beina på hverandre. Så derfor vil du ikke kunne se hva de
            andre holder på med.
          </p>

          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

          <p>
            <code>kubectl</code> er en samling med kommandoer/verb som kan
            interagere med de mange ressurstypene som finnes i Kubernetes. De to
            vanligste kommandoene er <Tooltip begrep={KubectlKommando.Get} /> og{" "}
            <Tooltip begrep={KubectlKommando.Describe} />. Hvor{" "}
            <Tooltip begrep={KubectlKommando.Get} /> lister opp en eller flere
            ressurser, mens <Tooltip begrep={KubectlKommando.Describe} /> viser
            en detaljert beskrivelse av en ressurs.
          </p>

          <p>
            Oppgaven går da ut på å liste opp alle{" "}
            <Tooltip begrep={Begrep.Pod} value="podder" />, siden spillet
            nettopp har begynt vil det ikke være noe å liste op, og dere vil få
            følgende melding i terminalen deres:
          </p>

          <pre>
            <code>
              No resources found in {localStorage.getItem("team")} namespace
            </code>
          </pre>

          <p>
            Hvis dere får samme respons som over, har dere gjort det riktig! Nå
            kan dere gå videre til neste oppgave.
          </p>

          <h2>Tips og triks</h2>
          <ul>
            <li>
              Hvis du er usikker på <code>kubectl</code> kommandoer under
              spillets gang kan du bruke <code>kubectl -h</code> for å få opp en
              liste over tilgjengelige kommandoer.
            </li>
            <li>
              For å se mer informasjon om en Kubernetes ressurs (f.eks en pod)
              kan du bruke <code>kubectl describe</code>
            </li>
          </ul>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
          </div>

          {(visHint1 || visHint2) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1:{" "}
                  <a
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: <code>kubectl get pods</code>
                </span>
              )}
            </div>
          )}

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            knappetekstNeste="Sjøsett skuta! -->"
          />
        </article>
      </div>
    </main>
  );
};

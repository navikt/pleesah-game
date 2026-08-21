import { useState } from "react";
import "./Oppgaver.css";
import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
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
        overskrift={lagOppgaveoverskrift(
          OPPGAVENUMMER,
          "Se podder i namespace",
        )}
        kommandoIder={[KubectlKommandoId.Help, KubectlKommandoId.Describe]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Ombord på Den Sorte Perle må dere inspisere at den er klart til å
            sette seil på de syv hav!
          </Historiecontainer>

          <p>
            <code>kubectl</code> er hovedverktøyet når man jobber med
            Kubernetes. Den lar dere enkelt se og interagere med alle ressursene
            som finnes. Derfor starter vi med en enkel oppgave hvor dere skal se
            at det ikke finnes noen podder kjørende i vårt{" "}
            <Tooltip begrep={Begrep.Namespace} />. Som nevnt tidligere brukes
            namespace for å holde ressurser adskilt. Dette gjør at man enkelt
            kan styre rettigheter, tilganger, og kommunikasjon på tvers av
            avhengigheter. I Pleesah skiller vi mellom de forskjellige teamene,
            slik at dere ikke går i beina på hverandre.
          </p>

          <p>
            <code>kubectl</code> er Kubernetes sitt eget kommandolinjeverktøy
            for å kommunisere med et Kubernetes cluster.
          </p>

          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

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

          <p>
            For å sikre at alt er riktig, så må dere sjekke at det ikke allerede
            finnes en <Tooltip begrep={Begrep.Pod} /> i deres namespace.
          </p>

          <pre>
            <code>
              No resources found in {localStorage.getItem("team")} namespace
            </code>
          </pre>

          <p>
            Hvis dere får samme respons som over har dere gjort det riktig! Nå
            er dere klare til å sjøsette skuta!
          </p>

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

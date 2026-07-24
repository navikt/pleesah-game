import { useState } from "react";
import "./Oppgaver.css";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Header } from "../komponenter/header/Header.tsx";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave0 = () => {
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Header
        overskrift="Oppgave 0/8 - Se poder i namespace"
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
            at det ikke finnes noen poder kjørende i vårt{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Namespace)}>
              namespace
            </Tooltip>
            . Som nevnt tidligere brukes namespace for å holde ressurser
            adskilt. Dette gjør at man enkelt kan styre rettigheter, tilganger,
            og kommunikasjon på tvers av avhengigheter. I Pleesah skiller vi
            mellom de forskjellige teamene, slik at dere ikke går i beina på
            hverandre.
          </p>

          <p>
            For å sikre at alt er riktig, så må dere sjekke at det ikke allerede
            finnes en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pod</Tooltip> i
            deres namespace.
          </p>
          <code>
            No resources found in {localStorage.getItem("team")} namespace
          </code>
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
            oppgaveNummer={0}
            knappetekstNeste="Sjøsett skuta! -->"
          />
        </article>
      </div>
    </main>
  );
};

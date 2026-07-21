import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave0 = () => {
  const navigate = useNavigate();

  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Poddy
        kommandoIder={[KubectlKommandoId.Help, KubectlKommandoId.Describe]}
      />
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Oppgave 0 - Se poder i namespace</h1>

        <article>
          <p>
            Ombord på Den Sorte Perle må du inspisere at den er klart til å
            sette seil på de syv hav!
          </p>

          <p>
            <code>kubectl</code> er hovedverktøyet når man jobber med
            Kubernetes. Den lar deg enkelt se og interagere med alle ressursene
            som finnes. Derfor starter vi med en enkel oppgave hvor vi skal se
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
            For å sikre oss at alt er riktig, så sjekker vi at det ikke allerede
            finnes en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.Pod)}>pod</Tooltip> i
            vårt namespace.
          </p>
          <code>
            No resources found in {localStorage.getItem("team")} namespace
          </code>
          <p>
            Hvis du får samme respons som over har du gjort det riktig! Nå er du
            klar til å sjøsette skuta!
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

          <div className="navigering-button-container">
            <button
              className="neste-oppgave-button"
              onClick={() => {
                void varsleNesteOppgave(0);
                navigate("/oppgaver/1/");
              }}
            >
              {"Sjøsett skuta! -->"}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

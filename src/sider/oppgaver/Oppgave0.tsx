import "./Oppgaver.css";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { Historiecontainer } from "../../komponenter/historiecontainer/Historiecontainer.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave0 = () => {
  const OPPGAVENUMMER = 0;

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
            Dere er nå klare til å starte reisen deres som pirater! Dere rusler
            ned mot havna for å se etter et skip. Der finner dere skipet Den
            Sorte Perle, og som de ekte piratene dere er, kaprer dere dette
            skipet! Ombord på Den Sorte Perle må dere inspisere at den er klar
            til å sette seil på de syv hav!
          </Historiecontainer>

          <p>
            <code>kubectl</code> er et kommandolinjeverktøy, og er
            hovedverktøyet når man jobber med Kubernetes. Kubectl lar dere
            enkelt se og interagere med alle ressursene som finnes i et{" "}
            <Tooltip begrep={Begrep.Cluster} />. Derfor starter vi med en enkel
            oppgave hvor dere skal se om dere får kontakt med{" "}
            <Tooltip begrep={Begrep.Namespace} verdi="namespacet" /> deres, og
            interagere med en av de mest brukte ressurstypene i Kubernetes,
            nemlig <Tooltip begrep={Begrep.Pod} />.
          </p>
          <p>
            Som nevnt tidligere brukes <i>namespace</i> for å holde ressurser
            adskilt. Dette gjør at man enkelt kan styre rettigheter, tilganger,
            og kommunikasjon på tvers av <i>namespaces</i> . I Pleesah skiller
            vi mellom de forskjellige teamene, slik at dere ikke går i beina på
            hverandre, så derfor vil dere ikke kunne se hva de andre holder på
            med.
          </p>

          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

          <p>
            <code>kubectl</code> er en samling med kommandoer/verb som kan
            interagere med de mange ressurstypene som finnes i Kubernetes. De to
            vanligste kommandoene er <Tooltip begrep={KubectlKommando.Get} /> og{" "}
            <Tooltip begrep={KubectlKommando.Describe} />, hvor <i>get</i>{" "}
            lister opp en eller flere ressurser, mens <i>describe</i> viser en
            detaljert beskrivelse av en ressurs.
          </p>

          <p>
            Oppgaven går ut på å liste opp alle <i>podder</i>, og siden spillet
            nettopp har begynt vil det ikke være noe å liste opp, og dere vil få
            følgende melding i terminalen deres:
          </p>

          <KodeBlokk kopierbar={false}>
            No resources found in {localStorage.getItem("team")} namespace
          </KodeBlokk>

          <p>
            Hvis dere får samme respons som over, har dere altså gjort det
            riktig! Nå kan dere gå videre til neste oppgave.
          </p>

          <h2>Tips og triks</h2>
          <ul>
            <li>
              Hvis dere er usikre på <code>kubectl</code>-kommandoer under
              spillets gang kan dere bruke <code>kubectl -h</code> i terminalen
              deres for å få opp en liste over tilgjengelige kommandoer.
            </li>
            <li>
              For å se mer informasjon om en Kubernetes ressurs (f.eks en{" "}
              <i>pod</i>) kan dere bruke{" "}
              <code>kubectl describe RESSURSTYPE</code>
            </li>
          </ul>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                target="_blank"
              >
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
              </a>,
              <code key="hint-2">kubectl get pods</code>,
            ]}
          />

          <Navigasjonsknapper
            oppgaveNummer={OPPGAVENUMMER}
            knappetekstNeste="Sjøsett skuta! -->"
          />
        </article>
      </div>
    </main>
  );
};

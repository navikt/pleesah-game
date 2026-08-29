import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
import { KodeBlokk } from "../../komponenter/kodeblokk/KodeBlokk.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave2 = () => {
  const OPPGAVENUMMER = 2;

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Kjører podden deres?")}
        begreper={[
          Begrep.Pod,
          Begrep.ReadinessProbe,
          Begrep.LivenessProbe,
          Begrep.Container,
          Begrep.Spec,
          Begrep.Events,
        ]}
        kommandoer={[KubectlKommando.Describe, KubectlKommando.Get]}
      />
      <div className="flex-column-container">
        <article>
          <p>
            Nå som dere har rullet ut en applikasjon, skal vi ta en titt på om
            den faktisk kjører og om den er klar for å ta i mot trafikk. Den
            beste måten å se på om{" "}
            <Tooltip begrep={Begrep.Pod} verdi="podden" /> deres er oppe og
            kjører er ved å se på <code>ready</code> og <code>status</code>
            -feltet for deres <i>pod</i>. Fra den aller første oppgaven brukte
            dere <Tooltip begrep={KubectlKommando.Get} /> for å se om dere fikk
            kontakt med Kubernetes, men vi har ikke brukt den skikkelig enda. La
            oss derfor starte med å kjøre <code>get</code>
            -kommandoen for å se hvordan <i>podden</i> vår har det.
          </p>

          <p>Hvis dere har gjort alt riktig skal det se omtrent slik ut.</p>
          <table className="pod-status-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>READY</th>
                <th>STATUS</th>
                <th>RESTARTS</th>
                <th>AGE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td title={localStorage.getItem("team") ?? ""}>
                  {(localStorage.getItem("team") ?? "").length > 25
                    ? `${localStorage.getItem("team")!.slice(0, 25)}…`
                    : localStorage.getItem("team")}
                </td>
                <td>0/1</td>
                <td>Running</td>
                <td>0</td>
                <td>13m</td>
              </tr>
            </tbody>
          </table>

          <p>
            Som dere ser er ikke <i>podden</i> helt klar enda.
          </p>

          <p>
            <code>Name</code> og <code>age</code> vil være forskjellig, men den
            skal ha <code>Status: Running</code> og <code>Ready: 0/1</code>.{" "}
            <br />
            <code>Ready</code>-kolonnen viser antall{" "}
            <Tooltip begrep={Begrep.Container} verdi="containere" /> som er
            klare til å ta i mot trafikk.
          </p>

          <p>
            Neste steg er å undersøke hvorfor <i>containeren</i> ikke er klar,
            og da kan vi bruke kommandoen{" "}
            <Tooltip begrep={KubectlKommando.Describe} />. <i>Describe</i> viser
            en detaljert oversikt over ressursen vi ønsker å beskrive. Denne
            gangen er det en ressurs av typen <i>pod</i> vi ønsker å se på.
            Beskrivelsen <i>describe</i> gir dere er delt i to: første del er
            ressursdefinisjonen deres (også kalt{" "}
            <Tooltip begrep={Begrep.Spec} />
            ), og den andre delen er <Tooltip begrep={Begrep.Events} />.
          </p>
          <p>
            <i>Events</i> er hendelser tilknyttet deres <i>pod</i>.{" "}
            <i>Events</i> vil også vise historiske hendelser, så husk å se
            nederst i listen for den nyeste informasjonen.
          </p>

          <p>
            Kjør kommandoen <i>describe</i> og se om dere får output som ligner
            på det dere ser nedenfor:
          </p>

          <KodeBlokk kopierbar={false}>
            Liveness probe failed: HTTP probe failed with statuscode: 501
          </KodeBlokk>
          <KodeBlokk kopierbar={false}>
            Readiness probe failed: HTTP probe failed with statuscode: 501
          </KodeBlokk>

          <p>
            Ut i fra disse hendelsene kan vi lese at{" "}
            <Tooltip begrep={Begrep.LivenessProbe} /> og{" "}
            <Tooltip begrep={Begrep.ReadinessProbe} /> feiler. Dere vil også se
            at <i>restarts</i> vil øke, og venter dere lenge nok vil{" "}
            <i>podden</i> bytte fra status <code>Running</code> til{" "}
            <code>CrashLoopBackOff</code>, som betyr at den feiler så mye at
            Kubernetes ikke får gjort noe mer. Dette må dere gjøre noe med, og
            vi starter med <i>Liveness proben</i>. Gå videre til neste oppgave
            for å lære mer!
          </p>

          <HintSeksjon
            hint={[
              <a
                key="hint-1"
                href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
                target="_blank"
              >
                https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
              </a>,
              <a
                key="hint-2"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                target="_blank"
              >
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
              </a>,
              <code key="hint-3">kubectl get &lt;RESSURSTYPE&gt;</code>,
              <a
                key="hint-4"
                href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/"
                target="_blank"
              >
                https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/
              </a>,
              <code key="hint-4">
                kubectl describe pods {localStorage.getItem("team")}
              </code>,
            ]}
          />

          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

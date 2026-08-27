import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { HintSeksjon } from "../../komponenter/hint/HintSeksjon.tsx";
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
            Nå som dere har rullet ut en applikasjon skal vi ta en titt på om
            den faktisk kjører, og er klar for å ta i mot trafikk. Den beste
            måten å se på om <Tooltip begrep={Begrep.Pod} value="podden" />{" "}
            deres er oppe og kjører er ved å se på <code>ready</code> og{" "}
            <code>status</code>-feltet for deres pod. Fra den aller første
            oppgaven så brukte dere <Tooltip begrep={KubectlKommando.Get} /> for
            å se om dere fikk kontakt med Kubernetes, men vi har ikke brukt den
            skikkelig enda, så la oss starte med å kjøre <code>get</code>
            -kommandoen for å se hvordan podden vår har det.
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

          <p>Som dere ser er ikke podden helt klar enda.</p>

          <p>
            <code>Name</code> og <code>age</code> vil være forskjellig, men den
            skal ha <code>Status: Running</code> og <code>Ready: 0/1</code>.{" "}
            <code>Ready</code>-kolonnen viser antall{" "}
            <Tooltip begrep={Begrep.Container} /> som er klare til å ta i mot
            trafikk.
          </p>

          <p>
            Neste steg er å undersøke hvorfor containeren ikke er klar, da kan
            vi bruke kommandoen <Tooltip begrep={KubectlKommando.Describe} />.{" "}
            <i>describe</i> viser en detaljert oversikt over ressursen vi ønsker
            å beskrive. Denne gangen er det ressurs av typen{" "}
            <Tooltip begrep={Begrep.Pod} /> vi ønsker å se på. Beskrivelsen
            describe gir dere er delt i to: første del er ressursdefinisjonen
            deres (også kalt <Tooltip begrep={Begrep.Spec} />
            ), mens den andre delen er <Tooltip begrep={Begrep.Events} />.
          </p>
          <p>
            Events er hendelser tilknyttet til deres pod. Events vil også vise
            historiske hendelser, så husk å se nederst i listen for den nyeste
            informasjonen.
          </p>

          <p>
            Kjør kommandoen <i>describe</i> og se om dere får output som ligner
            på det dere ser nedenfor
          </p>

          <pre>
            <code>
              Warning Unhealthy 4s (x4 over 34s) kubelet Liveness probe failed:
              HTTP probe failed with statuscode: 501
            </code>
            <code>
              Warning Unhealthy 4m7s (x64 over 13m) kubelet spec.containers
              {`{lasterommet}`}: Readiness probe failed: HTTP probe failed with
              statuscode: 501
            </code>
          </pre>

          <p>
            Ut i fra disse hendelsene kan vi lese at
            <Tooltip begrep={Begrep.LivenessProbe} value="Liveness probe" /> og{" "}
            <Tooltip begrep={Begrep.ReadinessProbe} value="Readiness probe" />{" "}
            feiler. Dere vil også se at <i>restarts</i> vil øke, og venter dere
            lenge nok så vil podden bytte fra status <i>Running</i> til{" "}
            <i>CrashLoopBackOff</i>, som betyr at den feiler så mye at
            Kubernetes ikke får gjort noe mer. Så dette må dere gjøre noe med,
            og vi starter med Liveness proben. Gå videre til neste oppgave for å
            lære mer!
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

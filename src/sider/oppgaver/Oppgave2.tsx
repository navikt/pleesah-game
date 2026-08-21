import { useState } from "react";
import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { lagOppgaveoverskrift } from "../../data/oppgaver.ts";
import { Header } from "../../komponenter/header/Header.tsx";
import { Navigasjonsknapper } from "../../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

export const Oppgave2 = () => {
  const OPPGAVENUMMER = 2;
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);
  const [visHint4, setVisHint4] = useState(false);
  const [visHint5, setVisHint5] = useState(false);

  return (
    <main>
      <Header
        overskrift={lagOppgaveoverskrift(OPPGAVENUMMER, "Kjører podden din?")}
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
            måten å se på om <Tooltip begrep={Begrep.Pod} value="podden" /> din
            er oppe og kjører er ved å se på <code>ready</code> og{" "}
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
            describe gir deg er delt i to: første del er ressursdefinisjonen
            deres (også kalt <Tooltip begrep={Begrep.Spec} />
            ), mens den andre delen er <Tooltip begrep={Begrep.Events} />.
          </p>
          <p>
            Events er hendelser tilknyttet til din pod. Events vil også vise
            historiske hendelser, så husk å se nederst i listen for den nyeste
            informasjonen.
          </p>

          <p>
            Kjør kommandoen describe og se om dere får output som ligner på det
            du ser nedenfor
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
            feiler. Dette må vi gjøre noe med, og vi starter med Liveness
            proben. Gå videre til neste oppgave for å lære mer!
          </p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
            <button onClick={() => setVisHint3(true)}>Hint 3</button>
            <button onClick={() => setVisHint4(true)}>Hint 4</button>
            <button onClick={() => setVisHint5(true)}>Hint 5</button>
          </div>

          {(visHint1 || visHint2 || visHint3 || visHint4 || visHint5) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1:{" "}
                  <a
                    href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
                  </a>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2:{" "}
                  <a
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
                  </a>
                </span>
              )}
              {visHint3 && (
                <span>
                  Hint 3: <code>kubectl get pods</code>
                </span>
              )}
              {visHint4 && (
                <span>
                  Hint 4:{" "}
                  <a
                    href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/"
                    target="_blank"
                  >
                    https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/
                  </a>
                </span>
              )}
              {visHint5 && (
                <span>
                  Hint 5:{" "}
                  <code>
                    kubectl describe pods {localStorage.getItem("team")}
                  </code>
                </span>
              )}
            </div>
          )}

          <Navigasjonsknapper oppgaveNummer={OPPGAVENUMMER} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

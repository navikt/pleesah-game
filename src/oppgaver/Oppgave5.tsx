import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import "./Oppgaver.css";
import { useState } from "react";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Header } from "../komponenter/header/Header.tsx";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { Navigasjonsknapper } from "../komponenter/navigasjonsknapper/Navigasjonsknapper.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave5 = () => {
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);
  const [visHint3, setVisHint3] = useState(false);

  return (
    <main>
      <Header
        overskrift="Oppgave 5/8 - Network Policy"
        kommandoIder={[
          KubectlKommandoId.Help,
          KubectlKommandoId.Describe,
          KubectlKommandoId.GetPods,
          KubectlKommandoId.Apply,
          KubectlKommandoId.Logs,
          KubectlKommandoId.DeletePod,
        ]}
      />
      <div className="flex-column-container">
        <article>
          <Historiecontainer>
            Hvis dere vil kommunisere med andre skuter og havner, må det settes
            opp en Network Policy. Det kan jo hende dere må sende ut et
            nødvarsel!
          </Historiecontainer>
          <p>
            Vi har spesifisert en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.ZeroTrustPolicy)}>
              zero trust policy
            </Tooltip>{" "}
            i deres namespace. Det vil si at dere ikke kan kommunisere med noen
            andre pods i deres namespace, eller med noen andre pods i andre
            namespaces. Dette er en sikkerhetsmekanisme som hindrer uautorisert
            tilgang til ressurser i Kubernetes.
          </p>

          <p>
            <Tooltip forklaring={finnForklaring(Begrep.ReadinessProbe)}>
              Readiness proben
            </Tooltip>{" "}
            er avhengig av å kunne kommunisere med en ekstern tjeneste for å gi
            beskjed til Kubernetes om at den er klar til å ta imot trafikk. For
            å kommunisere med denne eksterne tjenesten trenger dere å
            spesifisere en ny{" "}
            <Tooltip forklaring={finnForklaring(Begrep.NetworkPolicy)}>
              Network Policy
            </Tooltip>
            .
          </p>
          <p>
            Opprett en ny <code>.yaml</code>-fil for å sette opp Network Policy.
            I denne ressursen setter dere opp muligheten for kommunikasjon fra
            alle pods i deres namespace.
          </p>
          <pre>
            <code>
              {`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: network-policy-${localStorage.getItem("team")}
spec:
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 34.102.211.240/32
    ports:
      - port: 443
`}
            </code>
          </pre>

          <p>Hvor kan dere se at poden deres er klar til å ta imot trafikk?</p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
            <button onClick={() => setVisHint3(true)}>Hint 3</button>
          </div>
          {(visHint1 || visHint2 || visHint3) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1: <code>kubectl apply -f FILNAVN</code>
                </span>
              )}
              {visHint2 && (
                <span>
                  Hint 2: Hvis du ser <br />
                  <code>
                    networkpolicy.networking.k8s.io/network-policy-heihei
                    created
                  </code>{" "}
                  <br />i terminalen er du på rett spor!
                </span>
              )}
              {visHint3 && (
                <span>
                  Hint 3: Hvis du ser <code>Ready True</code> i loggene, er du
                  på rett spor!
                </span>
              )}
            </div>
          )}
          <Navigasjonsknapper nesteOppgaveNummer={6} forrigeKnapp />
        </article>
      </div>
    </main>
  );
};

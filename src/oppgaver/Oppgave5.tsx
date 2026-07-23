import { KubectlKommandoId } from "../data/kubectlKommandoer.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Poddy } from "../komponenter/poddy/Poddy.tsx";
import "./Oppgaver.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../api/havnesjef.ts";
import { Begrep, finnForklaring } from "../data/nokkelbegreper.ts";
import { Historiecontainer } from "../komponenter/historiecontainer/Historiecontainer.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Oppgave5 = () => {
  const navigate = useNavigate();
  const [visHint1, setVisHint1] = useState(false);
  const [visHint2, setVisHint2] = useState(false);

  return (
    <main>
      <Poddy
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
        <Logo />
        <h1 className="header">Oppgave 5 - Network Policy</h1>

        <article>
          <Historiecontainer>
            Hvis dere vil kommunisere med andre skuter og havner, må det settes
            opp en network policy. Det kan jo hende dere må sende ut et
            nødvarsel!
          </Historiecontainer>

          <p>
            <Tooltip forklaring={finnForklaring(Begrep.ReadinessProbe)}>
              Readiness proben
            </Tooltip>{" "}
            er avhengig av å kunne kommunisere med en ekstern tjeneste for å gi
            beskjed til Kubernetes om at den er klar til å ta imot trafikk.
          </p>

          <p>
            For å kommunisere med denne eksterne tjenesten trenger dere en{" "}
            <Tooltip forklaring={finnForklaring(Begrep.NetworkPolicy)}>
              network policy
            </Tooltip>
            . Kubernetes arbeider med zero trust, som betyr at all trafikk
            mellom pods er blokkert med mindre det er eksplisitt tillatt.
          </p>

          <p>
            Opprett en ny <code>.yaml</code>-fil for å sette opp network policy.
            I denne ressursen setter vi opp muligheten for kommunikasjon fra
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

          <p>
            Hvor kan dere se at poden deres er klar til å ta imot trafikk? Sier
            loggene noe nytt nå?
          </p>

          <div className="hint-button-container">
            <button onClick={() => setVisHint1(true)}>Hint 1</button>
            <button onClick={() => setVisHint2(true)}>Hint 2</button>
          </div>

          {(visHint1 || visHint2) && (
            <div className="hint-container">
              {visHint1 && (
                <span>
                  Hint 1: <code>{`kubectl apply -f <NAVN PÅ .YAML-FIL>`}</code>
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
            </div>
          )}

          <div className="navigering-button-container">
            <button onClick={() => navigate("/oppgaver/4/")}>
              {"<-- Forrige oppgave!"}
            </button>
            <button
              onClick={() => {
                void varsleNesteOppgave(6);
                navigate("/oppgaver/6/");
              }}
            >
              {`Neste oppgave! -->`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

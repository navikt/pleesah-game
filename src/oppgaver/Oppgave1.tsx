import {Logo} from "../komponenter/logo/Logo.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const Oppgave1 = () => {

    const navigate = useNavigate();

    const [visHint1, setVisHint1] = useState(false);
    const [visHint2, setVisHint2] = useState(false);

  return (
      <main>
          <div className="flex-column-container">
              <Logo />
              <h1 className="header">Oppgave 1 - Sjøsette skuta</h1>
              <article>
                  <p>For å kunne sjøsette skuta må du først opprette en .yaml-fil. Deretter må du kjøre en kommando for å lage ressursen som er spesifisert i specen under. Dette gjør du ved å bruke <code>kubectl apply</code>. Tommelfingerregelen er at apply oppretter en ny ressurs dersom den ikke allerede finnes, og oppdaterer kun det som har endret seg dersom den finnes.</p>
                  <pre><code>{`apiVersion: v1
kind: Pod
metadata:
  name: ${localStorage.getItem("team")}
spec:
  containers:
  - name: lasterommet
    image: ghcr.io/navikt/pleesah-skute:latest
    ports:
    - containerPort: 8080
    readinessProbe:
      httpGet:
        port: 8080
        path: /isReady`}</code></pre>
                  <p>Hvis du har gjort alt riktig så skal du ha fått følgende respons i terminalen, og du kan gå videre til neste oppgave.</p>
                  <p><code>pod/{localStorage.getItem("team")} created</code></p>

                  <div className="hint-container">
                      {visHint1 && <a href="https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/" target="_blank">https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/</a>}
                      {visHint2 && <div><code>{`kubectl apply -f <FILNAVN>`}</code></div>}
                  </div>

                  <div className="hint-container">
                      <div className="horizontal-button-container">
                          <button onClick={() => setVisHint1(true)}>Hint 1</button>
                          <button onClick={() => setVisHint2(true)}>Hint 2</button>
                      </div>

                      <div className="horizontal-button-container">
                          <button onClick={() => navigate("/oppgaver/0/")}>{"<-- Forrige oppgave!"}</button>
                          <button onClick={() => navigate("/oppgaver/2/")}>{"Neste oppgave! -->"}</button>
                      </div>
                  </div>
              </article>
          </div>
      </main>
  );
};

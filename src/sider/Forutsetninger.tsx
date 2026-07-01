import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";

export const Forutsetninger = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(() => localStorage.getItem("team") ?? "");
  const [feilmelding, setFeilmelding] = useState("");

  const håndterTeamEndring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
  };

  const [kjørStatus, setKjørStatus] = useState<
    "idle" | "laster" | "suksess" | "feil"
  >("idle");
  const [kjørOutput, setKjørOutput] = useState("");

  const kjørTeam = async () => {
    if (team.trim() === "") {
      setFeilmelding("Yarrg! Du må gi mannskapet et teamnavn!");
      return;
    }
    setFeilmelding("");
    setKjørStatus("laster");
    setKjørOutput("");

    try {
      const response = await fetch(
        `/kubernetes/api/havnesjef/team?team=${team}`,
        {
          method: "POST",
        },
      );
      const body = await response.text();
      const json = JSON.parse(body);
      const kubeconfig = json.kubeconfig;
      const tokenMatch = kubeconfig.match(/token:\s*(\S+)/);
      setKjørOutput(tokenMatch ? tokenMatch[1] : kubeconfig);
      setKjørStatus(response.ok ? "suksess" : "feil");
    } catch {
      setKjørStatus("feil");
    }
  };

  const gåTilFørsteOppgave = async () => {
    setFeilmelding("");

    if (team.trim() === "") {
      setFeilmelding("Yarrg! Du må gi mannskapet et teamnavn!");
      return;
    }

    navigate("/oppgaver/0/");
  };

  return (
    <main>
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Forutsetninger</h1>

        <article>
          <h3>Før du spiller må du ha:</h3>
          <ul>
            <li>Din favoritt IDE</li>
            <li>
              Ha noe kjennskap til <code>.yaml</code>-filer
            </li>
            <li>
              Kubectl, kan installeres med <code>brew install kubectl</code>
            </li>
          </ul>

          <p>
            <code>kubectl</code> er Kubernetes sin egen kommandolinjeverktøy for
            å snakke med et Kubernetes cluster.
          </p>

          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

          <h3>Tips og triks</h3>
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

          <h3>For å komme igang</h3>
          <ul>
            <li>Skriv inn teamnavnet deres og trykk "Hent output"</li>
          </ul>

          <div className="team-container">
            <label htmlFor="team-input">Teamnavn</label>
            <div className="team-input-container">
              <input
                id="team-input"
                type="text"
                value={team}
                onChange={håndterTeamEndring}
              />
              <button
                onClick={kjørTeam}
                className="teamname-button"
                disabled={kjørStatus === "laster"}
              >
                {kjørStatus === "laster" ? "Henter..." : "Hent token"}
              </button>
            </div>

            {kjørStatus === "suksess" && (
              <div className="team-output-container">
                <p>Token hentet! ✅</p>
                <p>
                  Kopier tokenet under, lag en fil som heter <code>config</code>{" "}
                  og lim inn. Kjør deretter kommandoen{" "}
                  <code>export KUBECONFIG=./config</code> i terminalen din.
                </p>

                {kjørOutput && (
                  <div className="output-container">
                    <div className="output-container__header">
                      <button
                        className="copy-button"
                        onClick={() =>
                          navigator.clipboard.writeText(kjørOutput)
                        }
                      >
                        Kopier
                      </button>
                    </div>
                    <pre className="output">{kjørOutput}</pre>
                  </div>
                )}

                <div>
                  <button onClick={gåTilFørsteOppgave}>
                    Gå til første oppgave!
                  </button>
                </div>
              </div>
            )}
            {kjørStatus === "feil" && (
              <p className="feilmelding">Noe gikk galt ved kjøring av team.</p>
            )}

            {!!feilmelding && <p className="feilmelding">{feilmelding}</p>}
          </div>
        </article>
      </div>
    </main>
  );
};

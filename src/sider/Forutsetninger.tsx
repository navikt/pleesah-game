import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";
import "./Forutsetninger.css";

export const Forutsetninger = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [feilmelding, setFeilmelding] = useState("");

  const håndterTeamEndring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
  };

  const [kjørStatus, setKjørStatus] = useState<
    "idle" | "laster" | "suksess" | "feil"
  >("idle");
  const [kjørOutput, setKjørOutput] = useState("");
  const [kopiert, setKopiert] = useState(false);

  const kopier = () => {
    navigator.clipboard.writeText(kjørOutput);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  };

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
      setKjørOutput(JSON.stringify(JSON.parse(body), null, 4));

      if (response.ok) {
        setKjørStatus("suksess");
      } else {
        console.error("Feil ved oppretting av team:", body);
        setKjørStatus("feil");
      }
    } catch (error) {
      console.error("Feil ved oppretting av team:", error);
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
          <h2>Før du spiller må du ha:</h2>
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

          <h2>Tips og triks</h2>
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

          <h2>Opprett team</h2>
          <p>
            Teamnavn kan kun inneholde små bokstaver, tall og bindestrek. Ingen
            mellomrom eller andre tegn er tillatt.
            <br />
            Eksempel: team-pleesah
          </p>

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
                {kjørStatus === "laster" ? "Oppretter..." : "Opprett team"}
              </button>
            </div>

            {kjørStatus === "suksess" && (
              <div className="team-output-container">
                <p>Team opprettet! ✅</p>
                <p>
                  Kopier outputen under, lag en fil som heter{" "}
                  <code>config</code> og lim inn. Kjør deretter kommandoen{" "}
                  <code>export KUBECONFIG=./config</code> i terminalen din.
                </p>

                {kjørOutput && (
                  <div className="output-container">
                    <div className="output-container__header">
                      <button className="copy-button" onClick={kopier}>
                        {kopiert ? "✓ Kopiert!" : "Kopier"}
                      </button>
                    </div>
                    <pre className="output">{kjørOutput}</pre>
                  </div>
                )}

                <button
                  onClick={gåTilFørsteOppgave}
                  className={"oppgave-button"}
                >
                  Gå til første oppgave!
                </button>
              </div>
            )}
            {kjørStatus === "feil" && (
              <p className="feilmelding">
                Noe gikk galt ved oppretting av team.
              </p>
            )}

            {!!feilmelding && <p className="feilmelding">{feilmelding}</p>}
          </div>
        </article>
      </div>
    </main>
  );
};

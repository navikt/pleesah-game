import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../komponenter/logo/Logo.tsx";
import "./Forutsetninger.css";

// Gyldig hex-fargekode, med eller uten "#" og med kort (3) eller langt (6)
// format, f.eks. "abc", "#abc", "aabbcc" eller "#aabbcc".
const HEX_FARGE_REGEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const Forutsetninger = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [farge, setFarge] = useState("");
  const [feilmelding, setFeilmelding] = useState("");

  const håndterTeamendring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
  };

  const håndterFargeendring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarge(e.target.value);
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

    const hex = farge.trim();
    if (hex === "") {
      setFeilmelding("Yarrg! Du må velge en skutefarge!");
      return;
    }
    if (!HEX_FARGE_REGEX.test(hex)) {
      setFeilmelding("Skutefargen må være en gyldig hex-verdi, f.eks. #3399ff");
      return;
    }
    const hexUtenHashtag = hex.replace(/^#/, "");

    setFeilmelding("");
    setKjørStatus("laster");
    setKjørOutput("");

    try {
      const response = await fetch(
        `/kubernetes/api/havnesjef/team?team=${team}&hex=${encodeURIComponent(hexUtenHashtag)}`,
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
            mellomrom, æ, ø, å eller andre tegn er tillatt. Eksempel:{" "}
            team-pleesah.
            <br />I tillegg må skuta deres få en flott farge! Velg en hex-verdi
            dere liker. Eksempel: #FF8DA1
          </p>

          <div className="team-container">
            <div className="team-inputs">
              <div className="team-input-container">
                <label htmlFor="team-input">
                  Teamnavn (f.eks team-pleesah)
                </label>
                <input
                  id="team-input"
                  type="text"
                  value={team}
                  onChange={håndterTeamendring}
                />
              </div>

              <div className="team-input-container">
                <label htmlFor="farge-input">Skutefarge (f.eks #FF8DA1)</label>
                <input
                  id="farge-input"
                  type="text"
                  value={farge}
                  onChange={håndterFargeendring}
                />
              </div>
            </div>
            <button
              onClick={kjørTeam}
              className="teamname-button"
              disabled={kjørStatus === "laster"}
            >
              {kjørStatus === "laster" ? "Oppretter..." : "Opprett team"}
            </button>

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

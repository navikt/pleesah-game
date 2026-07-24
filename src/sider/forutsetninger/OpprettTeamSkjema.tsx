import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { opprettTeam } from "../../api/havnesjef.ts";
import { erGyldigHex, fjernHashtag } from "./hex.ts";

const STANDARD_TEAMNAVN = "";

export const OpprettTeamSkjema = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(STANDARD_TEAMNAVN);
  const [farge, setFarge] = useState("#C30000");
  const [feilmelding, setFeilmelding] = useState("");

  const [kjørStatus, setKjørStatus] = useState<
    "idle" | "laster" | "suksess" | "feil"
  >("idle");
  const [kjørOutput, setKjørOutput] = useState("");
  const [kopiert, setKopiert] = useState(false);
  const visFargevelger = false;

  useEffect(() => {
    if (STANDARD_TEAMNAVN) {
      localStorage.setItem("team", STANDARD_TEAMNAVN);
    }
  }, []);

  const håndterTeamendring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
  };

  const håndterFargeendring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarge(e.target.value);
  };

  const kopier = () => {
    navigator.clipboard.writeText(kjørOutput);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  };

  const kjørTeam = async () => {
    if (team.trim() === "") {
      setFeilmelding("Yarrg! Dere må gi mannskapet et teamnavn!");
      return;
    }

    if (team.includes("æ") || team.includes("ø") || team.includes("å")) {
      setFeilmelding("Yarrg! Dere kan ikke bruke æøå i teamnavnet deres!");
      return;
    }

    const hex = farge.trim();
    if (hex === "") {
      setFeilmelding("Yarrg! Dere må velge en skutefarge!");
      return;
    }
    if (!erGyldigHex(hex)) {
      setFeilmelding("Skutefargen må være en gyldig hex-verdi, f.eks. #3399ff");
      return;
    }

    setFeilmelding("");
    setKjørStatus("laster");
    setKjørOutput("");

    try {
      const { ok, body } = await opprettTeam(team, fjernHashtag(hex));
      setKjørOutput(JSON.stringify(JSON.parse(body), null, 4));

      if (ok) {
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
    <>
      <h2>Opprett team</h2>
      <p>
        Teamnavn kan kun inneholde små bokstaver, tall og bindestrek. Ingen
        mellomrom, æ, ø, å eller andre tegn er tillatt. Eksempel: team-pleesah.
        {/*<br />I tillegg må skuta deres få en flott farge!*/}
        {/*Velg en hex-verdi dere*/}
        {/*liker. Eksempel: #FF8DA1*/}
      </p>

      <div className="team-container">
        <div className="team-inputs">
          <div className="team-input-container">
            <label htmlFor="team-input">Teamnavn (f.eks team-pleesah)</label>
            <input
              id="team-input"
              type="text"
              value={team}
              onChange={håndterTeamendring}
            />
          </div>

          {/* skjuler skutefarge frem til den blir brukt */}
          {visFargevelger && (
            <div className="team-input-container">
              <label htmlFor="farge-input">Skutefarge (f.eks #FF8DA1)</label>
              <span className="team-input-container-fargevelger">
                <input
                  id="farge-input"
                  type="text"
                  value={farge}
                  onChange={håndterFargeendring}
                />
                <input
                  className="team-input-container-fargevelger_color-input"
                  type="color"
                  onChange={håndterFargeendring}
                  value={farge}
                />
              </span>
            </div>
          )}
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
              Kopier outputen under, lag en fil som heter <code>config</code> og
              lim inn. Kjør deretter kommandoen{" "}
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

            <p>
              Du er nå klar til å starte deres reise som pirat! Du rusler ned
              mot havna for å se etter et skip. Der finner du skipet Den Sorte
              Perle, og som den ekte piraten du er, kaprer du dette skipet.
            </p>
            <div className="navigering-button-container">
              <button
                onClick={gåTilFørsteOppgave}
                className="neste-oppgave-button"
              >
                Gå til havna!
              </button>
            </div>
          </div>
        )}

        {kjørStatus === "feil" && (
          <p className="feilmelding">Noe gikk galt ved oppretting av team.</p>
        )}

        {!!feilmelding && <p className="feilmelding">{feilmelding}</p>}
      </div>
    </>
  );
};

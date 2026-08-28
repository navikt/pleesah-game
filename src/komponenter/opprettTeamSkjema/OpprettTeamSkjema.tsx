import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { opprettTeam } from "../../api/havnesjef.ts";
import { Begrep } from "../../data/nokkelbegreper.ts";
import { Tooltip } from "../../komponenter/tooltip/Tooltip.tsx";

const STANDARD_TEAMNAVN = "";

export const OpprettTeamSkjema = () => {
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [team, setTeam] = useState(STANDARD_TEAMNAVN);
  const [feilmelding, setFeilmelding] = useState("");

  const [kjørStatus, setKjørStatus] = useState<
    "idle" | "laster" | "suksess" | "feil"
  >("idle");
  const [kjørOutput, setKjørOutput] = useState("");
  const [kopiert, setKopiert] = useState(false);

  useEffect(() => {
    if (STANDARD_TEAMNAVN) {
      localStorage.setItem("team", STANDARD_TEAMNAVN);
    }
  }, []);

  useEffect(() => {
    if (kjørStatus === "suksess" || kjørStatus === "feil" || feilmelding) {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [kjørStatus, feilmelding]);

  const håndterTeamendring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
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

    setFeilmelding("");
    setKjørStatus("laster");
    setKjørOutput("");

    try {
      const { ok, body } = await opprettTeam(team, "#C30000");
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
      setFeilmelding("Yarrg! Dere må gi mannskapet et teamnavn!");
      return;
    }

    navigate("/oppgaver/0/");
  };

  return (
    <>
      <h2>Kom i gang</h2>
      <p>
        For å komme i gang må man lage sitt eget team, og når dere opprettet et
        team, vil vi på baksiden også opprette et{" "}
        <Tooltip begrep={Begrep.Namespace} /> for dere. Et namespace er
        Kubernetes sin måte å isolere en gruppe av ressurser, på godt norsk
        kalles det navnerom.
      </p>
      <p>
        Siden teamnavn da også er namespaces blir det noen ekstra krav til
        hvilke tegn man kan bruke. Så kun små bokstaver, tall og bindestrek, og
        ingen mellomrom, æ, ø, å, eller andre tegn er tillatt.
      </p>
      <p>Eksempel: team-pleesah.</p>

      <div className="team-container">
        <div className="team-inputs">
          <div className="team-input-container">
            <label htmlFor="team-input">Teamnavn</label>
            <input
              id="team-input"
              type="text"
              value={team}
              onChange={håndterTeamendring}
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
          <div className="team-output-container" ref={outputRef}>
            <p>Team opprettet! ✅</p>
            <p>
              Da har teamet, og enda viktigere, namespacet deres blitt
              opprettet! Neste steg er å koble seg til Kubernetes{" "}
              <Tooltip begrep={Begrep.Cluster} value="clusteret" /> ved hjelp av
              en konfigurasjonsfil.
            </p>
            <p>
              Nedenfor finner dere det som kalles en{" "}
              <Tooltip begrep={Begrep.Kubeconfig} />, og det er den som lar dere
              koble dere opp til spillets Kubernetes cluster.
            </p>
            <ol>
              <li>
                Lag en fil som heter <code>config</code>
              </li>
              <li>Lim inn konfigurasjonen nedenfor inn i filen</li>
              <li>
                Ekporter miljøvariablen <code>KUBECONFIG</code> som peker på
                filen i terminalen din
                <ul>
                  <li>
                    <code>export KUBECONFIG=./config</code>
                  </li>
                </ul>
              </li>
            </ol>

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
              Dere er nå klare til å lære mer om Kubernetes! Spillet er bygd opp
              slik at man gradvis blir introdusert til nye konsepter, og
              oppgavene vil bygge på hva dere har lært i tidligere oppgaver.
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
          <p className="feilmelding" ref={outputRef}>
            Noe gikk galt ved oppretting av team.
          </p>
        )}

        {!!feilmelding && (
          <p className="feilmelding" ref={outputRef}>
            {feilmelding}
          </p>
        )}
      </div>
    </>
  );
};

import { Logo } from "../komponenter/logo/Logo.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Forutsetninger = () => {
    const navigate = useNavigate();

    const [team, setTeam] = useState(() => localStorage.getItem("team") ?? "");
    const [feilmelding, setFeilmelding] = useState("");

    const håndterTeamEndring = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeam(e.target.value);
        localStorage.setItem("team", e.target.value);
    };

    const gåTilFørsteOppgave = () => {
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
                        <li>Ha noe kjennskap til .yaml-filer</li>
                        <li>
                            Kubectl, kan installeres med <code>brew install kubectl</code>
                        </li>
                    </ul>

                    <p>
                        <code>kubectl</code> er Kubernetes sin egen kommandolinjeverktøy for å snakke med et Kubernetes
                        cluster.
                    </p>

                    <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

                    <h3>For å komme igang</h3>
                    <ul>
                        <li>
                            <a href="https://pleesah.ansatt.dev.nav.no/" target="__blank">
                                Besøk nettsiden
                            </a>
                        </li>
                        <li>Lag en fil som heter config og lim inn</li>
                        <li>
                            Kjør kommandoen <code>export KUBECONFIG=./config</code> i terminalen din
                        </li>
                    </ul>

                    <h3>Tips og triks</h3>
                    <ul>
                        <li>
                            Hvis du er usikker på <code>kubectl</code> kommandoer uner spillets gang kan du bruke{" "}
                            <code>kubectl -h</code> for å få opp en liste over tilgjengelige kommandoer.
                        </li>
                        <li>
                            For å se mer informasjon om en Kubernetes ressurs (f.eks en pod) kan du bruke{" "}
                            <code>kubectl describe</code>
                        </li>
                    </ul>

                    <div className="team-container">
                        <div className="team-input-container">
                            <label htmlFor="team-input">Teamnavn</label>
                            <input id="team-input" type="text" value={team} onChange={håndterTeamEndring} />
                        </div>

                        {!!feilmelding && <p className="feilmelding">{feilmelding}</p>}

                        <div>
                            <button onClick={gåTilFørsteOppgave}>Gå til første oppgave!</button>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

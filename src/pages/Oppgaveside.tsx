import * as React from "react";
import { Link } from "react-router-dom";

interface OppgaveProps {
    overskrift: string;
    oppgavetekst: React.ReactNode;
    hint?: {
        hint1?: string;
        hint2?: string;
        hint3?: string;
        hint4?: string;
        hint5?: string;
    };
    oppgavenummer: number;
    nesteOppgaveDisabled?: boolean;
}

export const Oppgaveside = ({
    overskrift,
    oppgavetekst,
    hint,
    oppgavenummer,
    nesteOppgaveDisabled = false,
}: OppgaveProps) => {
    return (
        <>
            <Link to={"/"}>Tilbake til forsiden</Link>
            <h1>
                Oppgave {oppgavenummer} - {overskrift}
            </h1>

            {oppgavetekst}

            {hint && (
                <div className="hint_container">
                    {hint.hint1 && <button onClick={() => alert(hint.hint1)}>Hint 1</button>}
                    {hint.hint2 && <button onClick={() => alert(hint.hint2)}>Hint 2</button>}
                    {hint.hint3 && <button onClick={() => alert(hint.hint3)}>Hint 3</button>}
                    {hint.hint4 && <button onClick={() => alert(hint.hint4)}>Hint 4</button>}
                    {hint.hint5 && <button onClick={() => alert(hint.hint5)}>Hint 5</button>}
                </div>
            )}

            <div className="lenke">
                {oppgavenummer > 0 && (
                    <Link
                        to={`/oppgaver/${oppgavenummer - 1}/`}
                        className="lenke_forrige"
                    >{`<- Forrige oppgave!`}</Link>
                )}

                {oppgavenummer < 7 && !nesteOppgaveDisabled && (
                    <Link to={`/oppgaver/${oppgavenummer + 1}/`} className="lenke_neste">{`Neste oppgave! ->`}</Link>
                )}

                {oppgavenummer === 7 && !nesteOppgaveDisabled && (
                    <Link to={`/ferdig/`} className="lenke_neste">{`Ferdig!`}</Link>
                )}

                {nesteOppgaveDisabled && (
                    <span className="lenke_neste lenke_disabled">
                        {oppgavenummer === 7 ? "Ferdig!" : `Neste oppgave! ->`} ⏳
                    </span>
                )}
            </div>
        </>
    );
};

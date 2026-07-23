import { useNavigate } from "react-router-dom";
import { varsleNesteOppgave } from "../../api/havnesjef.ts";
import "./Navigasjonsknapper.css";

interface Props {
  nesteOppgaveNummer: number;
  forrigeKnapp?: boolean;
  knappetekstNeste?: string;
  disabled?: boolean;
  ferdig?: boolean;
}

export const Navigasjonsknapper = ({
  nesteOppgaveNummer,
  forrigeKnapp,
  knappetekstNeste = "Neste oppgave! -->",
  disabled = false,
  ferdig = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="navigering-button-container">
      {forrigeKnapp && (
        <button
          onClick={() => navigate(`/oppgaver/${nesteOppgaveNummer - 1}/`)}
        >
          {"<-- Forrige oppgave!"}
        </button>
      )}

      <button
        className="neste-oppgave-button"
        disabled={disabled}
        onClick={() => {
          void varsleNesteOppgave(nesteOppgaveNummer);
          navigate(
            ferdig ? "/ferdig/" : `/oppgaver/${nesteOppgaveNummer + 1}/`,
          );
        }}
      >
        {knappetekstNeste}
      </button>
    </div>
  );
};

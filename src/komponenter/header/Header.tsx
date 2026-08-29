import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import type { Begrep } from "../../data/nokkelbegreper.ts";
import { finnHeaderInnholdForOppgave } from "../../data/oppgaver.ts";
import { Logo } from "../logo/Logo.tsx";
import { Poddy } from "../poddy/Poddy.tsx";

export const Header = ({
  overskrift,
  begreper,
  kommandoer,
  oppgaveNummer,
  poddyAutoHover = false,
}: {
  overskrift: string;
  begreper?: Begrep[];
  kommandoer?: KubectlKommando[];
  oppgaveNummer?: number;
  poddyAutoHover?: boolean;
}) => {
  const arvetHeaderInnhold =
    oppgaveNummer === undefined
      ? undefined
      : finnHeaderInnholdForOppgave(oppgaveNummer);

  const begreperMedArv = begreper ?? arvetHeaderInnhold?.begreper;
  const kommandoerMedArv = kommandoer ?? arvetHeaderInnhold?.kommandoer;

  return (
    <div className="flex-column-container">
      <a
        href={`${window.location.origin}${import.meta.env.BASE_URL}`}
        aria-label="Gå til forsiden"
      >
        <Logo />
      </a>
      <Poddy
        begreper={begreperMedArv}
        kommandoer={kommandoerMedArv}
        autoHover={poddyAutoHover}
      />
      <h1 className="header">{overskrift}</h1>
    </div>
  );
};

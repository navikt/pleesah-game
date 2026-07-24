const oppgavefiler = import.meta.glob("../sider/oppgaver/Oppgave*.tsx", {
  eager: true,
});

export const ANTALL_OPPGAVER = Object.keys(oppgavefiler).length;
export const SISTE_OPPGAVE_NUMMER = ANTALL_OPPGAVER - 1;

export const lagOppgaveoverskrift = (oppgaveNummer: number, tittel: string) =>
  `Oppgave ${oppgaveNummer}/${SISTE_OPPGAVE_NUMMER} - ${tittel}`;

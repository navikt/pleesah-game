const oppgavefiler = import.meta.glob("../sider/oppgaver/Oppgave[0-9]*.tsx", {
  eager: true,
});

export const ANTALL_OPPGAVER = Object.keys(oppgavefiler).length;
export const SISTE_OPPGAVENUMMER = ANTALL_OPPGAVER - 1;

export const lagOppgaveoverskrift = (oppgaveNummer: number, tittel: string) =>
  `Oppgave ${oppgaveNummer}/${SISTE_OPPGAVENUMMER} - ${tittel}`;

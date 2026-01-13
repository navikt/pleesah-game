import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import ReactMarkdown from "react-markdown";
import oppgave4Tekst from "./oppgavetekster/oppgave4Tekst.md?raw";

export const Oppgave4 = () => {
  return (
    <Oppgaveside
      overskrift="Oppgave 4 - Kast loss"
      oppgavetekst={<ReactMarkdown>{oppgave4Tekst}</ReactMarkdown>}
      hint={{
        hint1:
          "https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/",
      }}
      nesteOppgavenummer={5}
    />
  );
};

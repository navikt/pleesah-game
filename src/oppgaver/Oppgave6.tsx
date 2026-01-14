import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import ReactMarkdown from "react-markdown";
import oppgave6Tekst from "./oppgavetekster/oppgave5Tekst.md?raw";

export const Oppgave6 = () => {
  return (
    <Oppgaveside
      overskrift="Admiral"
      oppgavetekst={<ReactMarkdown>{oppgave6Tekst}</ReactMarkdown>}
      hint={{
        hint1:
          "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
        hint2: "kubectl apply -f <FILNAVN>",
      }}
      oppgavenummer={6}
    />
  );
};

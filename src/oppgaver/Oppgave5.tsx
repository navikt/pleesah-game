import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import ReactMarkdown from "react-markdown";
import oppgave5Tekst from "./oppgavetekster/oppgave5Tekst.md?raw";

export const Oppgave5 = () => {
  return (
    <Oppgaveside
      overskrift="Sett kurs"
      oppgavetekst={<ReactMarkdown>{oppgave5Tekst}</ReactMarkdown>}
      hint={{
        hint1: "https://kubernetes.io/docs/concepts/configuration/secret/",
        hint2: "kubectl delete pod <DIN SKUTE>\n",
        hint3: "kubectl apply -f <FILNAVN>\n",
      }}
      oppgavenummer={5}
    />
  );
};

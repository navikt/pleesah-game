import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import oppgave1Tekst from "./oppgavetekster/oppgave1Tekst.md?raw";
import ReactMarkdown from "react-markdown";

export const Oppgave1 = () => {
  return (
    <Oppgaveside
      overskrift="Sjøsette skuta"
      oppgavetekst={<ReactMarkdown>{oppgave1Tekst}</ReactMarkdown>}
      hint={{
        hint1:
          "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/",
        hint2: "kubectl apply -f <FILNAVN>",
      }}
      oppgavenummer={1}
    />
  );
};

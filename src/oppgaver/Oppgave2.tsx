import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import oppgave2Tekst from "./oppgavetekster/oppgave2Tekst.md?raw";
import ReactMarkdown from "react-markdown";

export const Oppgave2 = () => {
  return (
    <Oppgaveside
      overskrift="Flyter skuta?"
      oppgavetekst={<ReactMarkdown>{oppgave2Tekst}</ReactMarkdown>}
      hint={{
        hint1:
          "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/",
        hint2:
          "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
        hint3: "kubectl get pods <DIN SKUTE>",
        hint4:
          "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/",
        hint5: "kubectl describe pods <DIN SKUTE>",
      }}
      oppgavenummer={2}
    />
  );
};

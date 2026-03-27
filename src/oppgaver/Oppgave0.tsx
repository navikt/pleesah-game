import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import ReactMarkdown from "react-markdown";
import oppgave0Tekst from "./oppgavetekster/oppgave0Tekst.md?raw";
import {Logo} from "../komponenter/logo/Logo.tsx";

export const Oppgave0 = () => {
  return (
      <main>
        <div className="flex-column-container">
            <Logo />
            <h1 className="header">Oppgave 0 - Skue utover havna</h1>
            <article>
                <p>Du rusler ned mot havna for å se om skipet du har stjålet kan sette seil på de syv hav!</p>
                <p><code>kubectl</code> er hovedverktøyet når man jobber med Kubernetes. Den lar deg enkelt se og interagere med alle ressursene som finnes. Derfor starter vi med en enkel oppgave hvor vi skal se at det ikke finnes noen poder kjørende i vårt <code>namespace</code>. Som nevnt tidligere brukes <code>namespace</code> for å holde ressurser adskilt. Dette gjør at man enkelt kan styre rettigheter, tilganger, og kommunikasjon på tvers av avhengigheter. I Pleesah skiller vi mellom de forskjellige teamene, slik at dere ikke går i beina på hverandre.</p>
                <p>For å sikre oss at alt er riktig, så sjekker vi at det ikke allerede finnes en <code>pod</code> i vårt <code>namespace</code>.</p>
                <code>No resources found in {localStorage.getItem("team")} namespace</code>
                <p>Hvis du får responsen ovenfor, så er alt bra, og du kan gå videre til neste oppgave.</p>
            </article>
        </div>
    <Oppgaveside
      overskrift="Skue utover havna"
      oppgavetekst={<ReactMarkdown>{oppgave0Tekst}</ReactMarkdown>}
      hint={{
        hint1:
          "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
        hint2: "kubectl get pods",
      }}
      oppgavenummer={0}
    />
      </main>
  );
};

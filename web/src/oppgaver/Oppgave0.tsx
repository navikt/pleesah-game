import { Link } from "react-router-dom";

export const Oppgave0 = () => {
  return (
    <>
      <h1>Oppgave 0 - Skue utover havna</h1>
      <p>
        Du rusler ned mot havna for å se om skipet du har stjålet kan sette seil
        på de syv hav!
      </p>

      <p>
        <code>kubectl</code> er hovedverktøyet når man jobber med Kubernetes.
        Den lar deg enkelt se og interagere med alle ressursene som finnes.
        Derfor starter vi med en enkel oppgave hvor vi skal se at det ikke
        finnes noen <code>poder</code> kjørende i vårt <code>namespace</code>.
        Som nevnt tidligere så brukes <code>namespace</code> for å holde
        ressurser avskilt. Dette gjør at man enkelt kan styre rettigheter,
        tilganger, og kommunikasjon på tvers av avhengigheter. I Pleesah skiller
        vi mellom de forskjellige teamene, slik at dere ikke går i beina på
        hverandre. For å sikre oss at alt er riktig, så sjekker vi at det ikke
        allerede finnes en <code>pod</code> i vårt <code>namespace</code>. For å
        liste opp ressurser bruker vi kommandoen <code>get</code> og navnet på
        ressurstypen vi vil liste opp, som i vår oppgave er <code>pod</code>.
      </p>

      <code>No resources found in &lt;DITT LAGNAVN&gt; namespace.</code>

      <p>
        Hvis du får responsen ovenfor, så er alt bra, og du kan gå videre til
        neste oppgave.
      </p>

      <div className={"hint_container"}>
        <button
          onClick={() =>
            alert(
              "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
            )
          }
        >
          Hint 1
        </button>

        <button onClick={() => alert("kubectl get pods <DIN SKUTE>")}>
          Hint 2
        </button>
      </div>

      <div className="startlink">
        <Link to="/oppgaver/1/">Neste oppgave!</Link>
      </div>
    </>
  );
};

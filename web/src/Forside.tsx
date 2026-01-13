import { Link } from "react-router-dom";

export const Forside = () => {
  return (
    <>
      <h1>Pleesah Game</h1>
      <p>
        Hei og velkommen til Pleesah Game! Piratversjonen av Livet Er En Strøm
        Av Hendelser.
        <br />
        Her skal du lære om Kubernetes. Målet med kurset er å gi et lite
        innblikk i hva Kubernetes er, hva man kan gjøre med Kubernetes og
        hvordan. Her har du mulighet til å prøve deg frem, feile og prøve på
        nytt!
      </p>
      <h2>Hva er Kubernetes?</h2>
      <p>
        Du kan tenke på Kubernetes som en havnesjef, Havnesjefen har kontroll på
        mange armadaer med skuter. Kubernetes passer på <code>deployments</code>{" "}
        som i vår analogi er admiraler. Hver <code>deployment</code> består av{" "}
        <code>pods</code> som i vår analogi er skuter. En admiral har altså
        kontroll over flere skuter, og administrerer disse. En skute kan ha last
        som tilsvarer en eller flere <code>containere</code> i en{" "}
        <code>pod</code>. Havnesjefen kan holde skuter flytende eller senke de
        om hen ønsker, og holder styr på trafikken mellom skutene.
      </p>

      <h2>Oppsummert:</h2>
      <ul>
        <li>Havnesjef - Kubernetes</li>
        <li>Admiral - Deployment</li>
        <li>Skute - Pod</li>
        <li>Last - Container</li>
        <li>Mannskap - Teamets deltakere</li>
        <li>Armada - Mange skuter/En gruppe av flere pods</li>
        <li>Radiotårn - Service</li>
      </ul>

      <h2>Før spillet må du ha:</h2>
      <ul>
        <li>
          Colima installert - <code>brew install colima</code>
        </li>
        <li>IDE (Velg hva du liker)</li>
        <li>Ha noe kjennskap til .yaml-filer</li>
        <li>
          Kubectl - <code>brew install kubectl</code>
          <br />
          Kubectl er Kubernetes sin egen kommandolinjeverktøy for å snakke med
          et Kubernetes cluster.
          <br />
          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>
        </li>
      </ul>

      <h2>Før spillet kan du kjøre disse kommandoene for å komme igang</h2>
      <ul>
        <li>
          Sette opp ditt lokale Kubernetes <code>cluster</code>:
          <br />
          <code>colima kubernetes start</code>
        </li>

        <li>
          Sette opp ditt lokale <code>namespace</code>:
          <br />
          <code>kubectl create namespace &lt;DITT LAGNAVN&gt;</code>
        </li>

        <li>
          Lag en hemmelighet
          <br />
          <code>
            kubectl create secret generic koordinatene-mine
            --from-literal=KOORDINATER="59.9124° N, 10.7962° E"
          </code>
        </li>

        <li>
          Bytt til riktig context
          <br />
          <code>kubectl config set-context pleesah</code>
        </li>

        <li>
          Bytt til ditt <code>namespace</code>
          kubectl config set-context —current —namespace=&lt;DITT LAGNAVN&gt;
        </li>
      </ul>

      <h2>Tips og triks</h2>
      <ul>
        <li>
          Hvis du er usikker på kubectl kommandoer under spillets gang kan du
          bruke kubeclt -h for å få opp en liste over kommandoer.
        </li>

        <li>
          For å lese mer informasjon om noe (f.eks poden din) kan du bruke
          kubectl describe
        </li>
      </ul>

      <div className="startlink">
        <Link to="/oppgaver/0/">Start spillet!</Link>
      </div>
    </>
  );
};

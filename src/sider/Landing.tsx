import { Header } from "../komponenter/header/Header.tsx";
import { OpprettTeamSkjema } from "../komponenter/opprettTeamSkjema/OpprettTeamSkjema.tsx";
import "./Landing.css";
import { Begrep } from "../data/nokkelbegreper.ts";

export const Landing = () => {
  return (
    <main>
      <div className="flex-column-container">
        <Header
          overskrift="Pleesah, lær meg mer om Kubernetes!"
					begreper={[Begrep.Namespace, Begrep.Cluster, Begrep.Kubeconfig]}
          poddyAutoHover
        />
        <article>
          <h2>Velkommen til Pleesah Game!</h2>
          <p>
            Her skal du lære om Kubernetes. Målet med kurset er å gi et lite
            innblikk i hva Kubernetes er, og hvordan du som utvikler kan bruke
            Kubernete. Her har du mulighet til å prøve deg frem, feile og prøve
            på nytt!
          </p>

          <h2>Før du spiller må du ha:</h2>
          <ul>
            <li>Deres favoritt IDE</li>
            <li>
              Ha noe kjennskap til <code>.yaml</code>-filer
            </li>
            <li>
              Kubectl, kan installeres med <code>brew install kubectl</code>
            </li>
          </ul>

          <h2>Tips og triks</h2>
          <ul>
            <li>
              Ta dere tid til å bli kjent med{" "}
              <a href="https://kubernetes.io/docs/home/">Kubernetes</a> sin
              dokumentasjon.
            </li>
            <li>
              Kubernetes har mange ressurser, og det er ikke alltid like lett å
              holde oversikten over hvordan spesifikasjonen ser ut. Derfor
              anbefaler vi <a href="https://kubespec.dev/">Kubespec.dev</a>.
            </li>
            <li>
              Den irriterende, men høyt elskede papegøyen vår Poddy kan gi deg
              hjelp underveis. 🦜
            </li>
            <li>Ta kontakt med oss hvis dere sitter fast.</li>
          </ul>
          <OpprettTeamSkjema />
        </article>
      </div>
    </main>
  );
};

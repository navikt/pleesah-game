import { Header } from "../komponenter/header/Header.tsx";
import { OpprettTeamSkjema } from "../komponenter/opprettTeamSkjema/OpprettTeamSkjema.tsx";
import "./Landing.css";

export const Landing = () => {
  return (
    <main>
      <div className="flex-column-container">
        <Header overskrift="Piratlivet Er En Strøm Av Hendelser" />
        <article>
          <h2>Velkommen til Pleesah Game!</h2>
          <p>
            Her skal du lære om Kubernetes. Målet med kurset er å gi et lite
            innblikk i hva Kubernetes er, hva man kan gjøre med Kubernetes og
            hvordan. Her har du mulighet til å prøve deg frem, feile og prøve på
            nytt!
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

          <p>
            <code>kubectl</code> er Kubernetes sin egen kommandolinjeverktøy for
            å snakke med et Kubernetes cluster.
          </p>

          <code>kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]</code>

          <h2>Tips og triks</h2>
          <ul>
            <li>
              Hvis du er usikker på <code>kubectl</code> kommandoer under
              spillets gang kan du bruke <code>kubectl -h</code> for å få opp en
              liste over tilgjengelige kommandoer.
            </li>
            <li>
              For å se mer informasjon om en Kubernetes ressurs (f.eks en pod)
              kan du bruke <code>kubectl describe</code>
            </li>
            <li>
              Den irriterende, men høyt elskede papegøyen vår Poddy kan gi deg
              hjelp underveis.🦜
            </li>
          </ul>
          <OpprettTeamSkjema />
        </article>
      </div>
    </main>
  );
};

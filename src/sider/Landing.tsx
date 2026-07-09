import { useNavigate } from "react-router-dom";
import { finnForklaring } from "../data/nokkelbegreper.ts";
import { Logo } from "../komponenter/logo/Logo.tsx";
import { Tooltip } from "../komponenter/tooltip/Tooltip.tsx";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex-column-container">
        <Logo />
        <h1 className="header">Piratlivet Er En Strøm Av Hendelser</h1>
        <article>
          <h2>Velkommen til Pleesah Game!</h2>
          <p>
            Her skal du lære om Kubernetes. Målet med kurset er å gi et lite
            innblikk i hva Kubernetes er, hva man kan gjøre med Kubernetes og
            hvordan. Her har du mulighet til å prøve deg frem, feile og prøve på
            nytt!
          </p>
          <h3>Hva er Kubernetes?</h3>
          <p>
            Kubernetes er et system som kjører, overvåker og administrerer
            applikasjoner i{" "}
            <Tooltip forklaring={finnForklaring("container")}>
              containere
            </Tooltip>
            , som er pakket sammen i en{" "}
            <Tooltip forklaring={finnForklaring("pod")}>
              pod
            </Tooltip>
            . Kubernetes sin jobb er å sørge for at riktig antall pods kjører
            til enhver tid, og at de blir startet på nytt hvis noe krasjer.
          </p>
          <p>
            Podene må selvfølgelig kjøre et sted, og det gjør de på en{" "}
            <Tooltip forklaring={finnForklaring("node")}>
              node
            </Tooltip>
            . En enkelt node har begrenset med CPU og minne, og hvis den skulle
            slutte å virke ville alle podene på den også forsvinne. Derfor har
            man sjelden bare én node, men heller flere som til sammen utgjør et{" "}
            <Tooltip forklaring={finnForklaring("cluster")}>
              cluster
            </Tooltip>
            . Da får man mer kapasitet totalt sett, og applikasjonene tåler at
            en enkelt node faller ut. Kubernetes bestemmer selv hvilken node
            hver pod skal kjøre på, og kan flytte pods mellom noder i clusteret
            dersom en node blir full eller slutter å virke.
          </p>
          <p>
            Uten Kubernetes:
            <ul>
              <li>Du starter containeren selv.</li>
              <li>Hvis den krasjer, må du starte den på nytt.</li>
              <li>
                Hvis serveren går ned, må du flytte den til en annen server.
              </li>
              <li>Hvis du trenger flere kopier, må du starte dem manuelt.</li>
            </ul>
            Med Kubernetes:
            <ul>
              <li>Du beskriver hvordan applikasjonen skal kjøre.</li>
              <li>
                Kubernetes sørger for at den faktisk kjører slik hele tiden.
              </li>
            </ul>
          </p>

          <p>
            Man oppretter sjelden pods direkte selv. I stedet beskriver man i en{" "}
            <Tooltip forklaring={finnForklaring("deployment")}>
              deployment
            </Tooltip>{" "}
            hvordan applikasjonen skal se ut, hvilket image som skal brukes, og
            hvor mange pods man vil ha kjørende samtidig. Kubernetes sørger
            deretter for å opprette, erstatte og skalere podene i tråd med det
            som er beskrevet.
          </p>
          <p>
            Siden pods stadig byttes ut eller flyttes til andre noder, får de
            også nye adresser underveis. Da kan man ikke bare snakke direkte til
            én bestemt pod. En{" "}
            <Tooltip forklaring={finnForklaring("service")}>
              service
            </Tooltip>{" "}
            løser dette ved å gi en fast adresse som alltid peker til de podene
            som faktisk kjører akkurat nå, slik at andre applikasjoner kan nå
            dem uten å bry seg om hvilke pods som finnes eller hvor de kjører.
          </p>
          <p>
            Til slutt har man{" "}
            <Tooltip forklaring={finnForklaring("namespace")}>
              namespace
            </Tooltip>
            , som er en måte å dele et cluster opp i mindre rom. I stedet for at
            alle deployments, services og pods ligger om hverandre i samme
            cluster, kan hvert team eller prosjekt få sitt eget namespace (litt
            som en egen mappe) slik at ressursene holdes adskilt.
          </p>
          <button onClick={() => navigate("/forutsetninger")}>
            Skip o'hoi! Start eventyret her!
          </button>
        </article>
      </div>
    </main>
  );
};

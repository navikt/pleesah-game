import { Link } from "react-router-dom";

export const Ferdig = () => {
  return (
    <>
      <h1>HURRA!!</h1>
      <p>
        Tusen takk for at du har spilt Pleesah Game! Vi håper du har hatt det
        gøy og lært masse om Kubernetes underveis. Hvis du har noen
        tilbakemeldinger eller forslag til forbedringer, ikke nøl med å ta
        kontakt med oss. Vi setter stor pris på din innsats og engasjement!
      </p>
      <p>
        Lykke til videre på din reise med Kubernetes, og måtte vinden alltid
        være i ditt seil!
      </p>

      <Link to={"/"}>Tilbake til forsiden</Link>
    </>
  );
};

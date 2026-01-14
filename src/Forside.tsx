import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import forside from "./oppgaver/oppgavetekster/forside.md?raw";
import PleesahLogo from "./assets/PleesahLogo.png";

export const Forside = () => {
  return (
    <>
      <h1>Pleesah Game</h1>
      <img
        className="pleesah_logo"
        src={PleesahLogo}
        alt="Et bilde av en pirat og logoen til Pleesah"
      />
      <ReactMarkdown>{forside}</ReactMarkdown>

      <Link to="/oppgaver/0/" className="lenke_container">
        Start spillet!
      </Link>
    </>
  );
};

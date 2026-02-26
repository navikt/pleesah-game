import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import prerequisites from "./tekster/prerequisites.md?raw";

export const Prerequisites = () => {
  const [team, setTeam] = useState(
    () => localStorage.getItem("team") ?? "",
  );

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
    localStorage.setItem("team", e.target.value);
  };

  return (
    <>
      <Link to={"/"}>Tilbake til forsiden</Link>
      <ReactMarkdown>{prerequisites}</ReactMarkdown>

      <label htmlFor="team-input">Teamnavn: </label>
      <input
        id="team-input"
        type="text"
        value={team}
        onChange={handleTeamChange}
        placeholder="Skriv inn teamnavnet ditt"
      />

      <Link to="/oppgaver/0/" className="lenke lenke_neste">
        Gå til første oppgave!
      </Link>
    </>
  );
};

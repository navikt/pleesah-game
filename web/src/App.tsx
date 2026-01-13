import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Forside } from "./Forside.tsx";
import { Oppgave0 } from "./oppgaver/Oppgave0.tsx";
import { Oppgave1 } from "./oppgaver/Oppgave1.tsx";
import { Oppgave2 } from "./oppgaver/Oppgave2.tsx";
import { Oppgave3 } from "./oppgaver/Oppgave3.tsx";
import { Oppgave4 } from "./oppgaver/Oppgave4.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/oppgaver/0/" element={<Oppgave0 />} />
        <Route path="/oppgaver/1/" element={<Oppgave1 />} />
        <Route path="/oppgaver/2/" element={<Oppgave2 />} />
        <Route path="/oppgaver/3/" element={<Oppgave3 />} />
        <Route path="/oppgaver/4/" element={<Oppgave4 />} />
      </Routes>
    </>
  );
};

export default App;

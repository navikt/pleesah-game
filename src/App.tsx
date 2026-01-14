import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Forside } from "./Forside.tsx";
import { Oppgave0 } from "./oppgaver/Oppgave0.tsx";
import { Oppgave1 } from "./oppgaver/Oppgave1.tsx";
import { Oppgave2 } from "./oppgaver/Oppgave2.tsx";
import { Oppgave3 } from "./oppgaver/Oppgave3.tsx";
import { Oppgave4 } from "./oppgaver/Oppgave4.tsx";
import { Oppgave5 } from "./oppgaver/Oppgave5.tsx";
import { Oppgave6 } from "./oppgaver/Oppgave6.tsx";
import { Ferdig } from "./oppgaver/Ferdig.tsx";

const App = () => {
  return (
    <BrowserRouter basename="/pleesah">
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/oppgaver/0/" element={<Oppgave0 />} />
        <Route path="/oppgaver/1/" element={<Oppgave1 />} />
        <Route path="/oppgaver/2/" element={<Oppgave2 />} />
        <Route path="/oppgaver/3/" element={<Oppgave3 />} />
        <Route path="/oppgaver/4/" element={<Oppgave4 />} />
        <Route path="/oppgaver/5/" element={<Oppgave5 />} />
        <Route path="/oppgaver/6/" element={<Oppgave6 />} />
        <Route path="/ferdig/" element={<Ferdig />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

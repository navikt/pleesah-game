import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Ferdig } from "./oppgaver/Ferdig.tsx";
import { Oppgave0 } from "./oppgaver/Oppgave0.tsx";
import { Oppgave1 } from "./oppgaver/Oppgave1.tsx";
import { Oppgave2 } from "./oppgaver/Oppgave2.tsx";
import { Oppgave3 } from "./oppgaver/Oppgave3.tsx";
import { Oppgave4 } from "./oppgaver/Oppgave4.tsx";
import { Oppgave5 } from "./oppgaver/Oppgave5.tsx";
import { Oppgave6 } from "./oppgaver/Oppgave6.tsx";
import { Oppgave8 } from "./oppgaver/Oppgave8.tsx";
import { Landing } from "./sider/Landing.tsx";
import { TeamStatusProvider } from "./teamStatus/TeamStatusContext.tsx";
import {Oppgave7} from "./oppgaver/Oppgave7.tsx";
import {Oppgave9} from "./oppgaver/Oppgave9.tsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter basename="/kubernetes">
      <TeamStatusProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/oppgaver/0/" element={<Oppgave0 />} />
          <Route path="/oppgaver/1/" element={<Oppgave1 />} />
          <Route path="/oppgaver/2/" element={<Oppgave2 />} />
          <Route path="/oppgaver/3/" element={<Oppgave3 />} />
          <Route path="/oppgaver/4/" element={<Oppgave4 />} />
          <Route path="/oppgaver/5/" element={<Oppgave5 />} />
          <Route path="/oppgaver/6/" element={<Oppgave6 />} />
          <Route path="/oppgaver/7/" element={<Oppgave7 />} />
          <Route path="/oppgaver/8/" element={<Oppgave8 />} />
          <Route path="/oppgaver/9/" element={<Oppgave9 />} />
          <Route path="/ferdig/" element={<Ferdig />} />
        </Routes>
      </TeamStatusProvider>
    </BrowserRouter>
  );
};

export default App;

import './App.css'
import {Route, Routes} from 'react-router-dom'
import {Oppgave0} from './oppgaver/Oppgave0.tsx'
import {Forside} from "./Forside.tsx";

const App =() => {
    return (<>
        <Routes>
            <Route path="/" element={<Forside/>}/>
            <Route path="/oppgaver/0/" element={<Oppgave0/>}/>
        </Routes>
    </>)
}


export default App

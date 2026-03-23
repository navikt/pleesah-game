import {Logo} from "../komponenter/logo/Logo.tsx";
import "./landing.css"

export const Landing = () => {
    return <main>
        <div className="logo">
            <Logo />
            <h1>Pirat livet er en strøm av hendelser</h1>
            <div className="box">
                <h2>Velkommen til Pleesah Game!</h2>
                <p>Pleesah står for “Piratlivet er en strøm av hendelser” og nå skal du lære masse om Kubernetes.  bla bla bla ukebla</p>
                <button>Sett seil!</button>
            </div>
        </div>
    </main>
}
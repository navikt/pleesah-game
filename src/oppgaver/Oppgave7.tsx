import { useEffect, useState } from "react";
import { Oppgaveside } from "../pages/Oppgaveside.tsx";
import ReactMarkdown from "react-markdown";
import oppgave7Tekst from "./oppgavetekster/oppgave7Tekst.md?raw";

export const Oppgave7 = () => {
    const [serviceRunning, setServiceRunning] = useState(false);

    useEffect(() => {
        const team = localStorage.getItem("team");
        if (!team) return;

        const poll = async () => {
            try {
                const res = await fetch(`/kubernetes/api/havnesjef/serviceRunning?team=${team}&service=myserv`, {
                    cache: "no-store",
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.running !== "❌") {
                        setServiceRunning(true);
                    }
                }
            } catch {
                // ignore, will retry
            }
        };

        poll();
        const interval = setInterval(poll, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Oppgaveside
            overskrift="Havnesjef"
            oppgavetekst={<ReactMarkdown>{oppgave7Tekst}</ReactMarkdown>}
            oppgavenummer={7}
            nesteOppgaveDisabled={!serviceRunning}
        />
    );
};

// Når appen kjøres lokalt med `pnpm dev` er det ikke sikkert vi har en ekte
// Havnesjef-backend å polle mot. Da skal sjekkene på "Neste oppgave!"-knappene
// regnes som bestått fra start, slik at man kan klikke seg gjennom kurset.
export const erLokaltTestmiljo = import.meta.env.DEV;

export const opprettTeam = async (team: string, hex: string) => {
  const response = await fetch(
    `/api/team/${team}/create?hex=${encodeURIComponent(hex)}`,
    { method: "POST" },
  );
  const body = await response.text();
  return { ok: response.ok, body };
};

export const varsleNesteOppgave = async (task: number) => {
  const team = localStorage.getItem("team");
  if (!team) {
    return;
  }

  try {
    await fetch(
      `/kubernetes/api/havnesjef/next-task?team=${team}&task=${task}`,
      { method: "POST" },
    );
  } catch (error) {
    console.error("Feil ved varsling om neste oppgave:", error);
  }
};

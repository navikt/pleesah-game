export const opprettTeam = async (team: string, hex: string) => {
  const response = await fetch(
    `/kubernetes/api/team/${team}/create?hex=${hex}`,
    {
      method: "POST",
    },
  );
  return { ok: response.ok, body: await response.text() };
};

export const varsleNesteOppgave = async (task: number) => {
  const team = localStorage.getItem("team");
  if (!team) {
    return;
  }

  try {
    await fetch(`/kubernetes/api/team/${team}/next-task?task=${task}`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Feil ved varsling om neste oppgave:", error);
  }
};

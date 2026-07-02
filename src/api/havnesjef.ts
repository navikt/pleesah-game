export const opprettTeam = async (team: string, hex: string) => {
  const response = await fetch(
    `/kubernetes/api/havnesjef/team?team=${team}&hex=${encodeURIComponent(hex)}`,
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

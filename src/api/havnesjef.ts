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

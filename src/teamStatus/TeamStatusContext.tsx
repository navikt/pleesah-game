import { createContext, type ReactNode, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher.ts";
import type { TeamStatus } from "../types.ts";

interface TeamStatusContextType {
  data: TeamStatus;
  isLoading: boolean;
  error: unknown;
}

const tomTeamStatus: TeamStatus = {
  pods: [],
  deployments: [],
  networkPolicies: [],
  services: [],
};

const loggedeUgyldigeResponser = new Set<string>();

const loggUgyldigRespons = (felt: string, verdi: unknown) => {
  const key = `${felt}:${typeof verdi}`;
  if (loggedeUgyldigeResponser.has(key)) {
    return;
  }

  loggedeUgyldigeResponser.add(key);
  console.error(
    `Ugyldig API-respons: team status feltet "${felt}" er ikke en liste.`,
  );
};

const normaliserListe = <T,>(verdi: unknown, felt: string): T[] => {
  if (Array.isArray(verdi)) {
    return verdi as T[];
  }

  loggUgyldigRespons(felt, verdi);
  return [];
};

const normaliserTeamStatus = (verdi: unknown): TeamStatus => {
  if (!verdi || typeof verdi !== "object") {
    loggUgyldigRespons("root", verdi);
    return tomTeamStatus;
  }

  const rawData = verdi as Record<string, unknown>;

  return {
    pods: normaliserListe(rawData.pods, "pods"),
    deployments: normaliserListe(rawData.deployments, "deployments"),
    networkPolicies: normaliserListe(
      rawData.networkPolicies,
      "networkPolicies",
    ),
    services: normaliserListe(rawData.services, "services"),
  };
};

const TeamStatusContext = createContext<TeamStatusContextType>({
  data: tomTeamStatus,
  isLoading: false,
  error: undefined,
});

export const TeamStatusProvider = ({
  children,
}: {
  children: ReactNode | Array<ReactNode>;
}) => {
  const { data, isLoading, error } = useSWR<unknown>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status`,
    fetcher,
    { refreshInterval: 1000 },
  );

  const normalisertData = normaliserTeamStatus(data);

  return (
    <TeamStatusContext.Provider
      value={{ data: normalisertData, isLoading, error }}
    >
      {children}
    </TeamStatusContext.Provider>
  );
};

export const useTeamStatus = () => useContext(TeamStatusContext);

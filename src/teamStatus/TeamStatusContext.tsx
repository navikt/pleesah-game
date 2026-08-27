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
  const { data, isLoading, error } = useSWR<TeamStatus>(
    `/kubernetes/api/team/${localStorage.getItem("team")}/status`,
    fetcher,
    { refreshInterval: 1000 },
  );

  return (
    <TeamStatusContext.Provider
      value={{ data: data ?? tomTeamStatus, isLoading, error }}
    >
      {children}
    </TeamStatusContext.Provider>
  );
};

export const useTeamStatus = () => useContext(TeamStatusContext);

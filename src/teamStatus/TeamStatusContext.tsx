import type { TeamStatus } from "../types.ts";
import { createContext, type ReactNode, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher.ts";

interface TeamStatusContextType {
  data: TeamStatus | undefined;
  isLoading: boolean;
  error: unknown;
}

const TeamStatusContext = createContext<TeamStatusContextType>({
  data: undefined,
  isLoading: false,
  error: undefined,
});

export const TeamStatusProvider = ({
  children,
}: {
  children: ReactNode | Array<ReactNode>;
}) => {
  const { data, isLoading, error } = useSWR<TeamStatus>(
    `/kubernetes/api/api/v1/team/${localStorage.getItem("team")}/status`,
    fetcher,
    { refreshInterval: 1000 },
  );

  return (
    <TeamStatusContext.Provider value={{ data, isLoading, error }}>
      {children}
    </TeamStatusContext.Provider>
  );
};

export const useTeamStatus = () => useContext(TeamStatusContext);

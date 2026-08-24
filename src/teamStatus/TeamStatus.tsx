import { DeploymentsTabell } from "./DeploymentsTabell.tsx";
import { PodsTabell } from "./PodsTabell.tsx";
import { ServicesTabell } from "./ServicesTabell.tsx";
import { useTeamStatus } from "./TeamStatusContext.tsx";

export const TeamStatus = () => {
  const { data } = useTeamStatus();

  return (
    <>
      <PodsTabell pods={data?.pods ?? []} />
      <DeploymentsTabell deployments={data?.deployments ?? []} />
      <ServicesTabell services={data?.services ?? []} />
    </>
  );
};

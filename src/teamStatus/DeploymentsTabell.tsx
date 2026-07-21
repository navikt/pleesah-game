import type { DeploymentInfo } from "../types.ts";

export const DeploymentsTabell = ({
  deployments,
}: {
  deployments: DeploymentInfo[];
}) => {
  return deployments?.length ? (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>desired</th>
          <th>ready</th>
          <th>available</th>
          <th>updated</th>
        </tr>
      </thead>
      <tbody>
        {deployments.map((deployment) => (
          <tr key={deployment.name}>
            <td>{deployment.name}</td>
            <td>{deployment.desired}</td>
            <td>{deployment.ready}</td>
            <td>{deployment.available}</td>
            <td>{deployment.updated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Ingen deployments enda</p>
  );
};

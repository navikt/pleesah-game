import type { PodInfo } from "../types.ts";

export const PodsTabell = ({ pods }: { pods: PodInfo[] }) => {
  return pods?.length ? (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>phase</th>
          <th>restarts</th>
          <th>ready</th>
        </tr>
      </thead>
      <tbody>
        {pods.map((pod) => (
          <tr key={pod.name}>
            <td>{pod.name}</td>
            <td>{pod.phase}</td>
            <td>{pod.restarts}</td>
            <td>{pod.ready}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Ingen podder enda</p>
  );
};

import { useTeamStatus } from "./TeamStatusContext.tsx";

export const TeamStatus = () => {
  const { data, isLoading, error } = useTeamStatus();

  return data?.pods?.length ? (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>phase</th>
          <th>restarts</th>
          <th>node</th>
          <th>age</th>
        </tr>
      </thead>
      <tbody>
        {data.pods.map((pod) => (
          <tr key={pod.name}>
            <td>{pod.name}</td>
            <td>{pod.phase}</td>
            <td>{pod.restarts}</td>
            <td>{pod.node}</td>
            <td>{pod.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Ingen podder enda</p>
  );
};

import type { ServiceInfo } from "../types.ts";

export const ServicesTabell = ({ services }: { services: ServiceInfo[] }) => {
  return services?.length ? (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>clusterIP</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr key={service.name}>
            <td>{service.name}</td>
            <td>{service.type}</td>
            <td>{service.clusterIP}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Ingen servicer enda</p>
  );
};

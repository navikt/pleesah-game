import { http, HttpResponse } from "msw";
import type { TeamStatus } from "../types.ts";

const teamStatusMock: TeamStatus = {
  deployments: [
    {
      name: "kaptein-sabeltann",
      desired: 3,
      ready: 3,
      available: 3,
      updated: 3,
    },
  ],
  pods: [
    {
      name: "kaptein-sabeltann-9f765bccc-5p2km",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-5g9d",
      age: 5210812579632,
    },
    {
      name: "kaptein-sabeltann-9f765bccc-88rm7",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-c8jd",
      age: 5210812581402,
    },
    {
      name: "kaptein-sabeltann-9f765bccc-d9xzr",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-t7t4",
      age: 5210812581732,
    },
    {
      name: "lalala",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-t7t4",
      age: 5449812582062,
    },
  ],
  services: [
    {
      name: "tobias",
      type: "ClusterIP",
      clusterIP: "34.118.232.149",
      ports: [
        {
          protocol: "TCP",
          port: 80,
          targetPort: 8080,
        },
      ],
    },
  ],
};

export const handlers = [
  http.get("/kubernetes/api/api/v1/team/:team/status", () => {
    return HttpResponse.json(teamStatusMock);
  }),
];

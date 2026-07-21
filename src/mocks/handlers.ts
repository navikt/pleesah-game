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
      age: "2h 5m 59s",
    },
    {
      name: "kaptein-sabeltann-9f765bccc-88rm7",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-c8jd",
      age: "2h 5m 59s",
    },
    {
      name: "kaptein-sabeltann-9f765bccc-d9xzr",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-t7t4",
      age: "2h 5m 59s",
    },
    {
      name: "lalala",
      phase: "Running",
      restarts: 0,
      node: "gke-pleesah-default-pool-b735fc6e-t7t4",
      age: "2h 9m 58s",
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

const createTeamMock = {
  apiVersion: "v1",
  clusters: [
    {
      cluster: {
        "certificate-authority-data":
          "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVMRENDQXBTZ0F3SUJBZ0lRQmRyR3pWdjJsMWZ1T054ZHZZdVIxekFOQmdrcWhraUc5dzBCQVFzRkFEQXYKTVMwd0t3WURWUVFERXlReE5qSXdaREJsTWkwMk1HSTBMVFF5WldRdE9EZzNNaTFoTldNeFpUVTBOR0UyWlRFdwpJQmNOTWpZd056QTVNVEl5TXpFMFdoZ1BNakExTmpBM01ERXhNekl6TVRSYU1DOHhMVEFyQmdOVkJBTVRKREUyCk1qQmtNR1V5TFRZd1lqUXROREpsWkMwNE9EY3lMV0UxWXpGbE5UUTBZVFpsTVRDQ0FhSXdEUVlKS29aSWh2Y04KQVFFQkJRQURnZ0dQQURDQ0FZb0NnZ0dCQU5PeWg3YW5GS1Y5YjdYRGpuN2RRQk9IUmNUUlFOV25HYUg1Q3p2WApSY0ZLUGhHdHI3U1JZZTdzOVZLY2FLRjZpM3pKK0JjWWkxSmczWThFVkZOaDBYcnV0WnFxVW92ckp6SWdqVURlCmhZRUhrekFGSE55RzlOSjdZV3dmUklycU81R0FnZmlPbnhYdEpFMmNNQU9tY20yUGRhOTJVY3FtcElqL0dDeTkKYUxzUGtKendjSEpWcVEwNVFydW1MR1JkdXFlelRyS2wwUTlrYWpyZzBadjV2YlUxTFdsaExRZkNhd2svdHIwRApUYTVpckV0MVluYzI5eVRmT1lxRFZFdG9OcS91UkgxWXlIRStXTktLcW1ZaWZPQXFxSzJWQmNkT1RCOFhpK1JDClpOQ2QyakFFb3l1SGVhaDVlN3VDM1hpSGgrQ0ZaSE43N3hWR3N6YVZ1dnM0Zk5wRXc4aXArT0V3SVBnaUZ0RC8KUDZvMFcwdXNpRW0rUW10QlZOVkJITmF3SG5XYTFvMk5Fbi93L3BaQmxIYldMcGcxMGlxWURHUUZvTmtEUXJZSwppOUtKdm90WjFtQ0x5RVZ5NFZIcldxOWh5MzRldEpaTktseUs4WWtiQnZpVzdYLzNOZXZTOEVWbWUxSlF4MlBsClNtRUFia1NWcVcwdkdnTUxsVE5DcFNSbWl3SURBUUFCbzBJd1FEQU9CZ05WSFE4QkFmOEVCQU1DQWdRd0R3WUQKVlIwVEFRSC9CQVV3QXdFQi96QWRCZ05WSFE0RUZnUVVsVVZiR00yYmxUZWNJRXg0T0RiTm1paVUrTGt3RFFZSgpLb1pJaHZjTkFRRUxCUUFEZ2dHQkFFbDVZZ2VUd0l0c0VSVHp1OHF1d3k1WW4yTG5iUXQ2MThuNzl2cDg0WU9ICmFYbndNMzRFdy9Gb3RJcytSVmkwVXlhUzdCQnJ5c09FVWJKLzhSdmxWbzc0VjU1TU9Va3cyRTNwZGloRlh4SkUKMnNlSjZqakJjRDJ4T3hwNytXeGpZR1JYTE1QUDluTEVIRWxFVVQ4K1hzUUNtUzYxTjUxcDNPeWNJM05BZkZEbwpXMTEwbGRaTUl5RW1KSzVRelM2R1ZabU1kZTVDbmNEV1FvZCtDcWFsWHdKNlFSVUtOZ0RXSkNNRnVvbDhxdnltCnhmUG8vWWpyNC9ZVVpGUnlPYXUxb0Q5Q0cxMUFYQXBETXArNnpmakpzWkcwajRwNHhzMTU0UzZiVFlDbmlMOUYKaFRqWElkbTJWUkFWdzhvL2VPODg3ZEIzRmdMbFVGNnJER2lrdzk4dkgyVHFyZzJ0MnowdFNnREc1d1M4NXZtWgozSlhhOGpVeDhYN08wYzlZSjZaQ2NYQ3JJLzFuR2NTekNmYUREY21FRmRKRTgrYkpJYjVVaDJBd3d1dVRDUHRUCnhIV1dMMjZLODBZdVY5QVlJaHE3TzFCL2lyMkhxbnRyVThnMS83YnVVeU1PTzE2Wm9mSTBYVmZWRTF1Mm9SdnAKakNqbHQ2b1A0bkRlcmpYdWk5bm1Udz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",
        server: "https://35.228.51.70",
      },
      name: "pleesah",
    },
  ],
  contexts: [
    {
      context: {
        cluster: "pleesah",
        namespace: "lalala",
        user: "pirat",
      },
      name: "pleesah",
    },
  ],
  "current-context": "pleesah",
  kind: "Config",
  preferences: {},
  users: [
    {
      name: "pirat",
      user: {
        token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVMRFV3SGNLOFhZQk5IQzJMNkJOZG1DUGZYSWw2U19VaDhZWkhlcUNnemMifQ.eyJhdWQiOlsiaHR0cHM6Ly9jb250YWluZXIuZ29vZ2xlYXBpcy5jb20vdjEvcHJvamVjdHMvbGVlc2FoLXByb2QtM2QyNC9sb2NhdGlvbnMvZXVyb3BlLW5vcnRoMS1hL2NsdXN0ZXJzL3BsZWVzYWgiXSwiZXhwIjoxNzg0NzAwOTk2LCJpYXQiOjE3ODQ2MTQ1OTYsImlzcyI6Imh0dHBzOi8vY29udGFpbmVyLmdvb2dsZWFwaXMuY29tL3YxL3Byb2plY3RzL2xlZXNhaC1wcm9kLTNkMjQvbG9jYXRpb25zL2V1cm9wZS1ub3J0aDEtYS9jbHVzdGVycy9wbGVlc2FoIiwianRpIjoiNDFiNGEzZjYtZDU3Mi00YTcyLWJiNWYtYTQ2MDlhYzQyNzcyIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJsYWxhbGEiLCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoibGFsYWxhIiwidWlkIjoiYzIzMTNjYWQtZmY4MS00ZGExLTkxY2ItNzQyYWZhY2Y4YWRjIn19LCJuYmYiOjE3ODQ2MTQ1OTYsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpsYWxhbGE6bGFsYWxhIn0.Y3c1TIBQRK5_nY71CakqsMZ9PGyN6B44Tbx0snE87R9u4xHt7fX_zl9aE8TxkMLeKRs0pOskmRkco4TFzzasBcM9TEN5DpY6EsLVfcsciClMYCWL7JoI0gFjNRJ4_9kUaLRRRs3ubnDZeUaennrmWOLbjBbOmQ5JXB8VfJy5xeQwhjNFCylz3v3FxEz6edAlxKhjWhuIwl0H-834UCnvAPhy1DMK4TszS2i09F2HhHXdxeJX85_FBOwXcyVafAnmQP37ffy-eaxiuzPJw6zO8h0qsXBpxCNbT_Ft6P0TyRdLoFNvQ89N3OPBHX_wNG9jcuxs2dxeLkePdyDT1g7a5Q",
      },
    },
  ],
};

export const handlers = [
  http.get("/api/team/:team/status", () => {
    return HttpResponse.json(teamStatusMock);
  }),
  http.post("/api/team/:team/create?hex=:hex", () => {
    return HttpResponse.json(createTeamMock, { status: 200 });
  }),
  http.get("/api/team/:team/status/:resource?name=:team", (req) => {
    let statusMock;

    switch (req.params.resource) {
      case "pod":
        statusMock = {
          isRunning: true,
          resource: "pod",
          name: req.params.team,
        };
        break;
      case "deployment":
        statusMock = {
          isRunning: true,
          resource: "deployment",
          name: req.params.team,
        };
        break;
      case "service":
        statusMock = {
          isRunning: true,
          resource: "service",
          name: req.params.team,
        };
        break;
      default:
        statusMock = {
          isRunning: false,
          resource: req.params.resource || "",
          name: req.params.team,
        };
    }

    return HttpResponse.json(statusMock);
  }),
];

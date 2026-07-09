interface TeamStatus {
  pods: PodInfo[];
  deployments: DeploymentInfo[];
  services: ServiceInfo[];
}

interface PodInfo {
  name: string;
  phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
  restarts: number;
  node: string;
  age: string;
}

interface DeploymentInfo {
  name: string;
  desired: number;
  ready: number;
  available: number;
  updated: number;
}

interface ServiceInfo {
  name: string;
  type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
  clusterIP: string;
  ports: string[];
}

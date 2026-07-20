export interface TeamStatus {
  pods: PodInfo[];
  deployments: DeploymentInfo[];
  services: ServiceInfo[];
}

interface PodInfo {
  Name: string;
  Phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
  Restarts: number;
  Node: string;
  Age: string;
}

interface DeploymentInfo {
  Name: string;
  Desired: number;
  Ready: number;
  Available: number;
  Updated: number;
}

interface ServiceInfo {
  Name: string;
  Type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
  ClusterIP: string;
  Ports: string[];
}

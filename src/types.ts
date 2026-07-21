export interface TeamStatus {
  pods: PodInfo[];
  deployments: DeploymentInfo[];
  services: ServiceInfo[];
}

export interface PodInfo {
  name: string;
  phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
  restarts: number;
  node: string;
  age: string;
}

export interface DeploymentInfo {
  name: string;
  desired: number;
  ready: number;
  available: number;
  updated: number;
}

export interface ServiceInfo {
  name: string;
  type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
  clusterIP: string;
  ports: Port[];
}

interface Port {
  protocol: string;
  port: number;
  targetPort: number;
}

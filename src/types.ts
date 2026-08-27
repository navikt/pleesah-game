export interface TeamStatus {
  pods: PodInfo[];
  deployments: DeploymentInfo[];
  networkPolicies: NetworkPolicyInfo[];
  services: ServiceInfo[];
}

export interface PodInfo {
  name: string;
  phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
  restarts: number;
  ready: boolean;
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

export interface NetworkPolicyInfo {
  name: string;
}

interface Port {
  protocol: string;
  port: number;
  targetPort: number;
}

export interface Status {
  isRunning: boolean;
  resource: string;
  name: string;
}

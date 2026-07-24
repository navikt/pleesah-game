export const KubectlKommandoId = {
  Help: "help",
  Describe: "describe",
  GetPods: "get-pods",
  Apply: "apply",
  DescribePod: "describe-pod",
  Logs: "logs",
  DeletePod: "delete-pod",
} as const;

export type KubectlKommandoId =
  (typeof KubectlKommandoId)[keyof typeof KubectlKommandoId];

export interface KubectlKommando {
  id: KubectlKommandoId;
  kommando: string;
  forklaring: string;
}

export const KUBECTL_KOMMANDOER: KubectlKommando[] = [
  {
    id: KubectlKommandoId.Help,
    kommando: "kubectl -h",
    forklaring: "Få opp en liste over tilgjengelige kommandoer.",
  },
  {
    id: KubectlKommandoId.Describe,
    kommando: "kubectl describe",
    forklaring:
      "For å se mer informasjon om en Kubernetes ressurs (f.eks en pod).",
  },
  {
    id: KubectlKommandoId.GetPods,
    kommando: "kubectl get pods",
    forklaring: "Lister opp poddene som kjører i namespacet ditt.",
  },
  {
    id: KubectlKommandoId.Apply,
    kommando: "kubectl apply -f <FILNAVN>",
    forklaring:
      "Oppretter ressursen beskrevet i filen, eller oppdaterer den hvis den allerede finnes.",
  },
  {
    id: KubectlKommandoId.DescribePod,
    kommando: "kubectl describe pod <NAVN>",
    forklaring:
      "Viser detaljert informasjon om en pod, blant annet status og hendelser.",
  },
  {
    id: KubectlKommandoId.Logs,
    kommando: "kubectl logs <NAVN>",
    forklaring: "Viser loggene til en pod.",
  },
  {
    id: KubectlKommandoId.DeletePod,
    kommando: "kubectl delete pod <NAVN>",
    forklaring: "Sletter en pod.",
  },
];

export const KubectlKommando = {
  Apply: "apply",
  Delete: "delete",
  Describe: "describe",
  Get: "get",
  Help: "help",
  Label: "label",
  Logs: "logs",
} as const;

export type KubectlKommando =
  (typeof KubectlKommando)[keyof typeof KubectlKommando];

export interface KubectlBeskrivelse {
  tittel: string;
  kommando: string;
  forklaring: string;
}

export const KUBECTL_KOMMANDOER = new Map<KubectlKommando, KubectlBeskrivelse>([
  [
    KubectlKommando.Help,
    {
      tittel: "Help",
      kommando: "kubectl -h",
      forklaring: "Lister opp tilgjengelige kommandoer.",
    },
  ],
  [
    KubectlKommando.Describe,
    {
      tittel: "Describe",
      kommando: "kubectl describe <RESSURSTYPE> <RESSURSNAVN>",
      forklaring:
        "For å se detaljert informasjon om en ressurs av en spesifikk ressurstype (f.eks en pod).",
    },
  ],
  [
    KubectlKommando.Get,
    {
      tittel: "Get",
      kommando: "kubectl get <RESSURSTYPE>",
      forklaring: "Lister opp ressurser som kjører i ditt namespace.",
    },
  ],
  [
    KubectlKommando.Apply,
    {
      tittel: "Apply",
      kommando: "kubectl apply -f <FILNAVN>",
      forklaring:
        "Oppretter ressursen beskrevet i filen, eller oppdaterer den hvis den allerede finnes.",
    },
  ],
  [
    KubectlKommando.Label,
    {
      tittel: "Label",
      kommando: "kubectl label <RESSURSTYPE> <RESSURSNAVN> KEY=VALUE",
      forklaring: "",
    },
  ],
  [
    KubectlKommando.Logs,
    {
      tittel: "Logs",
      kommando: "kubectl logs <PODNAVN>",
      forklaring: "Viser loggene til en pod.",
    },
  ],
  [
    KubectlKommando.Delete,
    {
      tittel: "Delete",
      kommando: "kubectl delete <RESSURSTYPE> <RESSURSNAVN>",
      forklaring: "Sletter en ressurs av en spesifikk ressurstype.",
    },
  ],
]);

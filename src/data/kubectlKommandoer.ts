export const KubectlKommandoId = {
	Help: "help",
	Describe: "describe",
	Get: "get",
	Apply: "apply",
	Logs: "logs",
	Delete: "delete",
} as const;

export type KubectlKommandoId =
	(typeof KubectlKommandoId)[keyof typeof KubectlKommandoId];

export interface KubectlKommando {
	kommando: string;
	forklaring: string;
}

export const KUBECTL_KOMMANDOER = new Map<KubectlKommandoId, KubectlKommando>([
	[
		KubectlKommandoId.Help,
		{
			kommando: "kubectl -h",
			forklaring: "Lister opp tilgjengelige kommandoer.",
		},
	],
	[
		KubectlKommandoId.Describe,
		{
			kommando: "kubectl describe <RESSURSTYPE> <RESSURSNAVN>",
			forklaring:
				"For å se detaljert informasjon om en ressurs av en spesifikk ressurstype (f.eks en pod).",
		},
	],
	[
		KubectlKommandoId.Get,
		{
			kommando: "kubectl get <RESSURSTYPE>",
			forklaring: "Lister opp ressurser som kjører i ditt namespace.",
		},
	],
	[
		KubectlKommandoId.Apply,
		{
			kommando: "kubectl apply -f <FILNAVN>",
			forklaring:
				"Oppretter ressursen beskrevet i filen, eller oppdaterer den hvis den allerede finnes.",
		},
	],
	[
		KubectlKommandoId.Describe,
		{
			kommando: "kubectl describe <RESSURSTYPE> <RESSURSNAVN>",
			forklaring:
				"Viser detaljert informasjon om en pod, blant annet status og hendelser.",
		},
	],
	[
		KubectlKommandoId.Logs,
		{
			kommando: "kubectl logs <PODNAVN>",
			forklaring: "Viser loggene til en pod.",
		},
	],
	[
		KubectlKommandoId.Delete,
		{
			kommando: "kubectl delete <RESSURSTYPE> <RESSURSNAVN>",
			forklaring: "Sletter en ressurs av en spesifikk ressurstype.",
		},
	],
]);

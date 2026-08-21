export const KubectlKommando = {
	Help: "help",
	Describe: "describe",
	Get: "get",
	Apply: "apply",
	Logs: "logs",
	Delete: "delete",
} as const;

export type KubectlKommando =
	(typeof KubectlKommando)[keyof typeof KubectlKommando];

export interface KubectlBeskrivelse {
	kommando: string;
	forklaring: string;
}

export const KUBECTL_KOMMANDOER = new Map<KubectlKommando, KubectlBeskrivelse>([
	[
		KubectlKommando.Help,
		{
			kommando: "kubectl -h",
			forklaring: "Lister opp tilgjengelige kommandoer.",
		},
	],
	[
		KubectlKommando.Describe,
		{
			kommando: "kubectl describe <RESSURSTYPE> <RESSURSNAVN>",
			forklaring:
				"For å se detaljert informasjon om en ressurs av en spesifikk ressurstype (f.eks en pod).",
		},
	],
	[
		KubectlKommando.Get,
		{
			kommando: "kubectl get <RESSURSTYPE>",
			forklaring: "Lister opp ressurser som kjører i ditt namespace.",
		},
	],
	[
		KubectlKommando.Apply,
		{
			kommando: "kubectl apply -f <FILNAVN>",
			forklaring:
				"Oppretter ressursen beskrevet i filen, eller oppdaterer den hvis den allerede finnes.",
		},
	],
	[
		KubectlKommando.Logs,
		{
			kommando: "kubectl logs <PODNAVN>",
			forklaring: "Viser loggene til en pod.",
		},
	],
	[
		KubectlKommando.Delete,
		{
			kommando: "kubectl delete <RESSURSTYPE> <RESSURSNAVN>",
			forklaring: "Sletter en ressurs av en spesifikk ressurstype.",
		},
	],
]);

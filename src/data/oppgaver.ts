import { KubectlKommando } from "./kubectlKommandoer.ts";
import { Begrep } from "./nokkelbegreper.ts";

const oppgavefiler = import.meta.glob("../sider/oppgaver/Oppgave[0-9]*.tsx", {
  eager: true,
});

export const ANTALL_OPPGAVER = Object.keys(oppgavefiler).length;
export const SISTE_OPPGAVENUMMER = ANTALL_OPPGAVER - 1;

export const lagOppgaveoverskrift = (oppgaveNummer: number, tittel: string) =>
  `Oppgave ${oppgaveNummer}/${SISTE_OPPGAVENUMMER} - ${tittel}`;

export interface HeaderInnhold {
  begreper: Begrep[];
  kommandoer: KubectlKommando[];
}

const headerTilleggPerOppgave: Array<[number, HeaderInnhold]> = [
  [
    0,
    {
      begreper: [Begrep.Namespace, Begrep.Pod, Begrep.Cluster],
      kommandoer: [KubectlKommando.Help, KubectlKommando.Describe],
    },
  ],
  [
    1,
    {
      begreper: [Begrep.Ressurs, Begrep.Image, Begrep.Spec],
      kommandoer: [KubectlKommando.Apply],
    },
  ],
  [
    2,
    {
      begreper: [
        Begrep.ReadinessProbe,
        Begrep.LivenessProbe,
        Begrep.Container,
        Begrep.Events,
      ],
      kommandoer: [KubectlKommando.Get],
    },
  ],
  [3, { begreper: [], kommandoer: [KubectlKommando.Logs] }],
  [4, { begreper: [], kommandoer: [KubectlKommando.Delete] }],
  [
    5,
    {
      begreper: [Begrep.ZeroTrustPolicy, Begrep.NetworkPolicy, Begrep.Label],
      kommandoer: [KubectlKommando.Label],
    },
  ],
  [6, { begreper: [Begrep.Deployment], kommandoer: [] }],
  [8, { begreper: [Begrep.Service], kommandoer: [] }],
];

const tomtHeaderInnhold: HeaderInnhold = { begreper: [], kommandoer: [] };

export const finnHeaderInnholdForOppgave = (
  oppgaveNummer: number,
): HeaderInnhold => {
  const begreper = new Set<Begrep>();
  const kommandoer = new Set<KubectlKommando>();

  for (const [nr, tillegg] of headerTilleggPerOppgave) {
    if (nr > oppgaveNummer) break;

    for (const begrep of tillegg.begreper) {
      begreper.add(begrep);
    }

    for (const kommando of tillegg.kommandoer) {
      kommandoer.add(kommando);
    }
  }

  if (!begreper.size && !kommandoer.size) {
    return tomtHeaderInnhold;
  }

  return {
    begreper: [...begreper],
    kommandoer: [...kommandoer],
  };
};

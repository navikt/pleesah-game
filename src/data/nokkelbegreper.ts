export const Begrep = {
  Container: "container",
  Pod: "pod",
  Node: "node",
  Cluster: "cluster",
  Deployment: "deployment",
  Service: "service",
  Namespace: "namespace",
  Spec: "spec",
  Events: "events",
  ReadinessProbe: "readiness probe",
  Probe: "probe",
  LivenessProbe: "liveness probe",
  Secrets: "secrets",
} as const;

export type Begrep = (typeof Begrep)[keyof typeof Begrep];

export interface Nokkelbegrep {
  begrep: Begrep;
  forklaring: string;
}

export const finnForklaring = (begrep: Begrep): string => {
  const funnet = NOKKELBEGREPER.find((n) => n.begrep === begrep);
  return funnet ? funnet.forklaring : "";
};

export const NOKKELBEGREPER: Nokkelbegrep[] = [
  {
    begrep: Begrep.Container,
    forklaring:
      "Et isolert miljø som pakker sammen en applikasjon og alt den trenger for å kjøre.",
  },
  {
    begrep: Begrep.Pod,
    forklaring:
      "Den minste kjørende enheten i Kubernetes. Inneholder én eller flere containere.",
  },
  {
    begrep: Begrep.Node,
    forklaring:
      "En maskin (fysisk eller virtuell) som kjører pods. En node har ressurser som CPU og minne som podene deler på.",
  },
  {
    begrep: Begrep.Cluster,
    forklaring:
      "En samling noder som administreres av Kubernetes. Kubernetes fordeler pods utover nodene i clusteret etter hvor det er ledig plass.",
  },
  {
    begrep: Begrep.Deployment,
    forklaring:
      "Beskriver hvordan en applikasjon skal kjøre, blant annet hvilket image som skal brukes og hvor mange pods man ønsker.",
  },
  {
    begrep: Begrep.Service,
    forklaring:
      "Gjør at pods kan snakke med hverandre og motta trafikk, selv om podene byttes ut eller flyttes rundt.",
  },
  {
    begrep: Begrep.Namespace,
    forklaring:
      "Holder ressursene til ulike team eller prosjekter adskilt fra hverandre.",
  },
  {
    begrep: Begrep.Spec,
    forklaring:
      "Kort for «specification». Beskriver hvordan ressursen skal se ut og oppføre seg, for eksempel hvilket image en pod skal bruke.",
  },
  {
    begrep: Begrep.Events,
    forklaring:
      "En logg over hendelser som har skjedd med ressursen, for eksempel at et image ble hentet eller at en helsesjekk feilet.",
  },
  {
    begrep: Begrep.ReadinessProbe,
    forklaring:
      "En helsesjekk Kubernetes bruker for å avgjøre om en container er klar til å ta imot trafikk. Er sjekken ikke ok, sendes ingen trafikk til containeren.",
  },
  {
    begrep: Begrep.LivenessProbe,
    forklaring:
      "En helsesjekk Kubernetes bruker for å avgjøre om en container fortsatt lever. Feiler sjekken, starter Kubernetes containeren på nytt.",
  },
  {
    begrep: Begrep.Secrets,
    forklaring:
      "En ressurstype for å lagre sensitive data, som passord eller nøkler, adskilt fra resten av konfigurasjonen.",
  },
];

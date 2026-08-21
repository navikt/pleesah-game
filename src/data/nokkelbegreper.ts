export const Begrep = {
  Cluster: "cluster",
  Container: "container",
  Deployment: "deployment",
  Events: "events",
  Image: "image",
  Kubeconfig: "kubeconfig",
  LivenessProbe: "liveness probe",
  Namespace: "namespace",
  NetworkPolicy: "network policy",
  Node: "node",
  Pod: "pod",
  Probe: "probe",
  ReadinessProbe: "readiness probe",
  Ressurs: "ressurs",
  Secrets: "secrets",
  Service: "service",
  Spec: "spec",
  ZeroTrustPolicy: "zero trust policy",
} as const;

export type Begrep = (typeof Begrep)[keyof typeof Begrep];

export const finnForklaring = (begrep: Begrep): string => {
  return NOKKELBEGREPER.get(begrep) ?? "ukjent forklaring";
};

export const NOKKELBEGREPER = new Map<Begrep, string>([
  [
    Begrep.Cluster,
    "En samling noder som administreres av Kubernetes. Kubernetes fordeler pods utover nodene i clusteret etter hvor det er ledig plass.",
  ],
  [
    Begrep.Container,
    "Et isolert miljø som pakker sammen en applikasjon og alt den trenger for å kjøre.",
  ],
  [
    Begrep.Deployment,
    "Beskriver hvordan en applikasjon skal kjøre, blant annet hvilket image som skal brukes og hvor mange pods man ønsker.",
  ],
  [
    Begrep.Events,
    "En logg over hendelser som har skjedd med ressursen, for eksempel at et image ble hentet eller at en helsesjekk feilet.",
  ],
  [
    Begrep.Image,
    "En ferdigpakket «oppskrift» på en applikasjonen, med kode, avhengigheter og alt annet som trengs for å kjøre den.",
  ],
  [
    Begrep.Kubeconfig,
    "Konfigurasjonsfil for å kunne autentisere og kommunisere med et Kubernetes cluster.",
  ],
  [
    Begrep.LivenessProbe,
    "En helsesjekk Kubernetes bruker for å avgjøre om en container fortsatt lever. Feiler sjekken, starter Kubernetes containeren på nytt.",
  ],
  [
    Begrep.Namespace,
    "Holder ressursene til ulike team eller prosjekter adskilt fra hverandre.",
  ],
  [
    Begrep.NetworkPolicy,
    "En ressurs som definerer hvordan pods kan kommunisere med hverandre og med andre nettverksendepunkter.",
  ],
  [
    Begrep.Node,
    "En maskin (fysisk eller virtuell) som kjører pods. En node har ressurser som CPU og minne som poddene deler på.",
  ],
  [
    Begrep.Pod,
    "Den minste kjørende enheten i Kubernetes. Inneholder én eller flere containere.",
  ],
  [
    Begrep.ReadinessProbe,
    "En helsesjekk Kubernetes bruker for å avgjøre om en container er klar til å ta imot trafikk. Er sjekken ikke ok, sendes ingen trafikk til containeren.",
  ],
  [
    Begrep.Ressurs,
    "En generell betegnelse for en enhet som kan opprettes, oppdateres eller slettes i Kubernetes.",
  ],
  [
    Begrep.Secrets,
    "En ressurstype for å lagre sensitive data, som passord eller nøkler, adskilt fra resten av konfigurasjonen.",
  ],
  [
    Begrep.Service,
    "Gjør at pods kan snakke med hverandre og motta trafikk, selv om poddene byttes ut eller flyttes rundt.",
  ],
  [
    Begrep.Spec,
    "Kort for «specification». Beskriver hvordan ressursen skal se ut og oppføre seg, for eksempel hvilket image en pod skal bruke.",
  ],
  [
    Begrep.ZeroTrustPolicy,
    "En sikkerhetsmodell som antar at ingen enheter eller brukere er pålitelige, og krever streng autentisering og autorisasjon for å få tilgang til ressurser.",
  ],
]);

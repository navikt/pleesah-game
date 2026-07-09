export interface Nokkelbegrep {
  begrep: string;
  forklaring: string;
}

export const finnForklaring = (begrep: string): string => {
  const funnet = NOKKELBEGREPER.find((n) => n.begrep === begrep);
  return funnet ? funnet.forklaring : "";
};

export const NOKKELBEGREPER: Nokkelbegrep[] = [
  {
    begrep: "container",
    forklaring:
      "Et isolert miljø som pakker sammen en applikasjon og alt den trenger for å kjøre.",
  },
  {
    begrep: "pod",
    forklaring:
      "Den minste kjørende enheten i Kubernetes. Inneholder én eller flere containere.",
  },
  {
    begrep: "node",
    forklaring:
      "En maskin (fysisk eller virtuell) som kjører pods. En node har ressurser som CPU og minne som podene deler på.",
  },
  {
    begrep: "cluster",
    forklaring:
      "En samling noder som administreres av Kubernetes. Kubernetes fordeler pods utover nodene i clusteret etter hvor det er ledig plass.",
  },
  {
    begrep: "deployment",
    forklaring:
      "Beskriver hvordan en applikasjon skal kjøre, blant annet hvilket image som skal brukes og hvor mange pods man ønsker.",
  },
  {
    begrep: "service",
    forklaring:
      "Gjør at pods kan snakke med hverandre og motta trafikk, selv om podene byttes ut eller flyttes rundt.",
  },
  {
    begrep: "namespace",
    forklaring:
      "Holder ressursene til ulike team eller prosjekter adskilt fra hverandre.",
  },
];

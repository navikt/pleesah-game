Du rusler ned mot havna for å se om skipet du har stjålet kan sette seil på de syv hav!

`kubectl` er hovedverktøyet når man jobber med Kubernetes. Den lar deg enkelt se og interagere med alle ressursene
som finnes. Derfor starter vi med en enkel oppgave hvor vi skal se at det ikke finnes noen poder kjørende i vårt `namespace`.
Som nevnt tidligere brukes `namespace` for å holde ressurser adskilt. Dette gjør at man enkelt kan styre rettigheter,
tilganger, og kommunikasjon på tvers av avhengigheter. I Pleesah skiller vi mellom de forskjellige teamene, 
slik at dere ikke går i beina på hverandre.
For å sikre oss at alt er riktig, så sjekker vi at det ikke allerede finnes en `pod` i vårt `namespace`.
For å liste opp ressurser bruker vi kommandoen `get` og navnet på ressurstypen vi vil liste opp, som i vår oppgave er `pod`.

```
No resources found in <DITT LAGNAVN> namespace.
```

Hvis du får responsen ovenfor, så er alt bra, og du kan gå videre til neste oppgave.

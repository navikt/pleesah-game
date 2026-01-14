Den beste måten å se på om `poden` din er oppe å kjøre på er ved å se på `ready`- og `status`-feltet. Vi har så vidt snakket om `get`, men vi har ikke sett den i faktisk bruk. Så la oss starte med å kjøre `get`-kommandoen for å se hvordan skuta vår har det.

Hvis du har gjort alt riktig skal det se tilsvarende ut. Name og age vil være forskjellig, men den skal ha Status: Running og Ready: 0/1. Ready-kolonnen viser antall containere som er klare til å ta i mot trafikk. Som du kanskje ser så er ikke båten vår helt klar til å kaste loss.

```
NAME          READY          STATUS          RESTARTS          AGE
mcboat        0/1            Running         0                 12m
```

Neste steg er å undersøke hvorfor `containeren` ikke er klar, da kan vi bruke kommandoen `describe`. `describe` viser en 
detaljert oversikt over ressursen vi ønsker å beskrive. Litt for mye til at vi limer inn teksten her, og den kan ofte 
være overveldende de første gangene man bruker den. I korte trekk er beskrivelsen delt i to, første delen er 
ressursdefinisjonen din (også kalt `spec`), mens den nederste delen er `events`. `events` er hendelser tilknyttet til din `pod`.

Hvis alt har gått som det skal vil du finne en lignende linje nederst i `events`-listen.

```
Warning Unhealthy 4m7s (x64 over 13m) kubelet spec.containers{lasterommet}: Readiness probe failed: HTTP probe failed with statuscode: 501
```

Du kan også se at `Containers.lasterommet.Ready` er satt til `false`.

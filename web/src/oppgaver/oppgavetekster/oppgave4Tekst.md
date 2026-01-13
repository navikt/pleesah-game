Skuta er fortsatt fortøyd til havna og er ikke klar til å seile til sjøs. Du må kaste loss slik at skuta er klar for
å seile. Skuta krever at en miljøvariabel HAR_KASTET_LOSS er satt til 'true'. Gå tilbake til oppgavearket og følg
instruksjonene.

For denne oppgaven har vi laget en forenklet sjekk som ser etter en spesifikk miljøvariabel før den rapporterer at den
er klar til Kubernetes. Derfor må du oppdatere yaml-filen din til å sette miljøvariabelen `HAR_KASTET_LOSS` til `true`.
I den virkelige verden vil det være forskjellige behov som bestemmer om en container er klar. For eksempel vil man 
sikre seg at man har kontakt med en database.

Legg til følgende i din yaml-fil, under `spec.containers`.

```
spec:
  containers:
    env:
      - name: HAR_KASTET_LOSS
        value: "true"
```

Det er ikke alle ressurser som kan oppdateres, og `pod` er en av disse. For å oppdatere skuta med `apply`, må du først
slette den (senke den, om du vil) før du kan kjøre `apply` på nytt.

`kubectl delete pod <DIN SKUTE>`

Det kan ta noen sekunder før poden er slettet. Når den er slettet vil du få opp en beskjed `pod "<DIN SKUTE>" deleted` .

Kubernetes har flere forskjellige `probes`, og en annen `probe` som er mye brukt er `liveness probe` for å sjekke om
`containeren` er i live.

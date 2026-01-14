Hurra! Du har kastet loss og er klar til å plyndre! Men hvor skal vi, egentlig? Koordinatene finner du i en 
hemmelighet! I K8s kan hemmeligheter lagres i ressurstypen `secrets`. Disse kan inneholde forskjellig typer data, men
i dette tilfellet finnes det kun én nøkkel skuta trenger for å sette kurs mot riktig destinasjon. Skip o’hoi!


```
spec:
  containers:
    env:
      - name: HAR_SATT_KURS
        valueFrom:
          secretKeyRef:
            name: koordinatene-mine
            key: KOORDINATER
```

Kursen er satt, og du er endelig på vei til din destinasjon!

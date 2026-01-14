For pirater og andre sjøfarere er en loggbok essensielt, det samme gjelder for Kubernetes. 
Nå som skuta er sjøsatt er det nyttig å sjekke loggboken for å se at alt er som det skal.

Fra forrige oppgave så vi at ikke alt stod helt bra til med `poden` vår, fordi en `readiness probe failed`. Kubernetes
bruker en `readiness probe` per `container` i en `pod` for å sjekke om den er klar for å ta imot trafikk. 
Med andre ord, når en `container` ikke er klar, vil den ikke motta trafikk.

La oss undersøke litt videre.
Neste steg er å se på loggene til `containeren` vår ved bruk av kommandoen `logs`. Når du kjører kommandoen vil 
det komme mange logglinjer, da vår `container` logger neste oppgave hver gang Kubernetes sjekker om `containeren` 
er klar. Ut av boksen så sjekker Kubernetes hvert tiende sekund.

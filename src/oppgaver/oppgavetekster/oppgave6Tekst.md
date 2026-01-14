Flere skuter er bedre enn én skute, men med flere skuter trenger vi en Admiral. Admiralen passer på at skutene alltid 
er klar for å plyndre videre.

Til nå i spillet har du måttet slette `poden` din og kjørt den opp igjen for å kunne gjøre endringene. Det kan jo ikke
være sånn? Det er jo ønskelig å holde skuta flytende selvom man gjør endringer underveis. Her kommer `deployment` 
ressurstypen inn. Likt som i første oppgave må du også her bruke `apply` for å lage ressursen din.


```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: NAVN PÅ ADMIRAL
spec:
  replicas: 3
  selector:
    matchLabels:
      seilskip: brigg
  template:
    metadata:
      labels:
        seilskip:brigg
    spec:
      containers:
        - name: lasterommet
          image: ghcr.io/navikt/pleesah-skute:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              port: 8080
              path: /isReady
          env:
            - name: HAR_KASTET_LOSS
              value: "true"
            - name: HAR_SATT_KURS
              valueFrom:
                secretKeyRef:
                  name: koordinatene-mine
                  key: KOORDINATER
```
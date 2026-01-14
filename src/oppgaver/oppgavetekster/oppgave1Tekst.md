For å kunne sjøsette skuta må du først opprette en .yaml-fil. Deretter må du kjøre en kommando for å lage ressursen som er spesifisert i specen under. Dette gjør du ved å bruke kubectl apply . Tommelfingerregelen er at apply oppretter en ny ressurs dersom den ikke allerede finnes, og oppdaterer kun det som har endret seg dersom den finnes.
Husk å bytte navn der det trengs.

```
apiVersion: v1
kind: Pod
metadata:
  name: <DIN SKUTE>
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
```

Hvis du har gjort alt riktig så skal du ha fått følgende respons i terminalen, og du kan gå videre til neste oppgave.

`pod/<DIN SKUTE> created`


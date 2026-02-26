> Det er et stort hav og for å navigere deg videre ønsker du bistand fra flere flåter under en annen admiral, men med sterk tåke og mye sjø oppnår du ikke kontakt med andre flåter, og ingen får kontakt med deg! :help:

For stabil og pålitelig kommunikasjon mellom deployments trenger vi en service. Vi liker å se på det som et radiotårn.

```
apiVersion: v1
kind: Service
metadata:
  name: DITT RADIOTÅRN
spec:
  selector:
    app.kubernetes.io/name: NAVN PÅ ADMIRALEN?
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

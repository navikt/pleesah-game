Hei og velkommen til Pleesah Game! Piratversjonen av Livet Er En Strøm Av Hendelser.

Her skal du lære om Kubernetes. Målet med kurset er å gi et lite innblikk i hva Kubernetes er, hva man kan gjøre med Kubernetes og hvordan. Her har du mulighet til å prøve deg frem, feile og prøve på nytt!

## Hva er Kubernetes?
Du kan tenke på Kubernetes som en havnesjef, Havnesjefen har kontroll på mange armadaer med skuter.
Kubernetes passer på `deployments` som i vår analogi er admiraler. Hver `deployment` består av `pods` som her 
er skuter. En admiral har altså kontroll over flere skuter, og administrerer disse. 
En skute kan ha last som tilsvarer en eller flere `containere` i en `pod`.
Havnesjefen kan holde skuter flytende eller senke de om hen ønsker, og holder styr på trafikken mellom skutene.

### Oppsummert:
* Havnesjef - Kubernetes
* Admiral - Deployment
* Skute - Pod
* Last - Container
* Mannskap - Teamets deltakere
* Armada - Mange skuter/En gruppe av flere pods
* Radiotårn - Service


## Før du spiller må du ha:

* Colima installert : `brew install colima`
* IDE (Velg hva du liker)
* Ha noe kjennskap til .yaml-filer
* Kubectl : `brew install kubectl`

`kubectl` er Kubernetes sin egen kommandolinjeverktøy for å snakke med et Kubernetes cluster.

`kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]`

## Før spillet kan du kjøre disse kommandoene for å komme igang

1. Sette opp ditt lokale Kubernetes `cluster`:

   `colima kubernetes start`
2. Sette opp ditt lokale namespace:

   `kubectl create namespace <DITT LAGNAVN>`
3. Lag en hemmelighet

    `kubectl create secret generic koordinatene-mine --from-literal=KOORDINATER="59.9124° N, 10.7962° E"`
4. Bytt til riktig context

   `kubectl config set-context pleesah`
5. Bytt til ditt namespace

   `kubectl config set-context —current —namespace=<DITT LAGNAVN>`

## Tips og triks

* Hvis du er usikker på `kubectl` kommandoer under spillets gang kan du bruke `kubeclt -h` for å få opp en liste over 
  kommandoer.
* For å lese mer informasjon om noe (f.eks poden din) kan du bruke `kubectl describe`


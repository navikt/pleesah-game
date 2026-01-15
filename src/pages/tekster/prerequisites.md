## Før du spiller må du ha:

- IDE (Velg hva du liker)
- Ha noe kjennskap til .yaml-filer
- Kubectl : `brew install kubectl`

`kubectl` er Kubernetes sin egen kommandolinjeverktøy for å snakke med et Kubernetes cluster.

```kubectl [KOMMANDO] [RESSURSTYPE] [RESSURSNAVN] [FLAGG]```

## For å komme igang

- [Besøk nettsiden](https://pleesah.ansatt.dev.nav.no/)
- Lag en fil som heter config og lim inn
- kjør kommanoen ```export KUBECONFIG=./config``` i terminalen din


## Tips og triks

- Hvis du er usikker på `kubectl` kommandoer under spillets gang kan du bruke ```kubeclt -h``` for å få opp en liste over
  kommandoer.
- For å se mer informasjon om en Kubernetes ressurs (f.eks en pod) kan du bruke ```kubectl describe```

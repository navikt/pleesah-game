# Pleesah Game

Frontend for Kubernetes-oppgavene i Pleesah — en interaktiv opplæringsapp der deltakere oppretter team og løser en serie oppgaver knyttet til Kubernetes, containere og drift.

## Teknologi

- React 19 + TypeScript
- Vite (build/dev-server)
- React Router
- Express (produksjonsserver / proxy mot `pleesah-havnesjef`)
- Biome (lint/format)

## Kom i gang

Installer avhengigheter med [pnpm](https://pnpm.io/):

```bash
pnpm install
```

Start utviklingsserver:

```bash
pnpm dev
```

## Scripts

| Kommando | Beskrivelse |
| --- | --- |
| `pnpm dev` | Starter Vite i utviklingsmodus |
| `pnpm build` | Type-sjekker og bygger produksjonsversjon til `dist/` |
| `pnpm preview` | Forhåndsviser produksjonsbygget lokalt |
| `pnpm prod` | Bygger og starter Express-serveren (`server.mjs`) |
| `pnpm check` | Kjører Biome sjekk med autofiks |
| `pnpm lint` | Kjører Biome lint med autofiks |
| `pnpm format` | Formatterer kode med Biome |

## Struktur

```
src/
├── api/          # Kall mot backend (havnesjef)
├── komponenter/  # Delte UI-komponenter
├── oppgaver/     # De enkelte oppgavesidene (Oppgave0–7, Ferdig)
├── sider/        # Landingsside, forutsetninger og oppsett av team
└── App.tsx       # Ruteroppsett
```

## Miljøvariabler

Se `.env` for lokale variabler, bl.a. `HAVNESJEF_URL` som peker til backend-tjenesten `pleesah-havnesjef`.

## Drift

Appen bygges som et Docker-image (se `Dockerfile`) og kjøres på Nais. Nais-konfigurasjonen ligger i `.nais/app.yaml`, med ingress på `https://leesah.io/kubernetes`.

## Lisens

Se [LICENSE](./LICENSE).

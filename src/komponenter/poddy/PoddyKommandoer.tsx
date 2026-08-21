import {
  KUBECTL_KOMMANDOER,
  KubectlKommando,
} from "../../data/kubectlKommandoer.ts";

interface PoddyKommandoerProps {
  kommandoer: KubectlKommando[];
}

export const PoddyKommandoer = ({ kommandoer }: PoddyKommandoerProps) => {
  const beskrivelser = kommandoer
    .flatMap((id) => {
      const beskrivelse = KUBECTL_KOMMANDOER.get(id);
      return beskrivelse ? [{ id, ...beskrivelse }] : [];
    })
    .sort((a, b) => a.tittel.localeCompare(b.tittel, "nb"));

  return (
    <div className="poddy-innhold">
      <dl className="poddy-liste">
        {beskrivelser.map(({ id, tittel, kommando, forklaring }) => (
          <div className="poddy-begrep" key={id}>
            <dd className="poddy-tittel">{tittel}</dd>
            <code className="poddy-kommando">{kommando}</code>
            <dd>{forklaring}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

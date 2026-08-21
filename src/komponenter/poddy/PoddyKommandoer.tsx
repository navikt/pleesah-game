import {
  KUBECTL_KOMMANDOER,
  type KubectlKommandoId,
} from "../../data/kubectlKommandoer.ts";

interface PoddyKommandoerProps {
  kommandoIder: KubectlKommandoId[];
}

export const PoddyKommandoer = ({ kommandoIder }: PoddyKommandoerProps) => {
  const kommandoer = kommandoIder.flatMap((id) => {
    const kommando = KUBECTL_KOMMANDOER.get(id);
    return kommando ? [{ id, ...kommando }] : [];
  });

  return (
    <div className="poddy-innhold">
      <dl className="poddy-liste">
        {kommandoer.map(({ id, kommando, forklaring }) => (
          <div className="poddy-begrep" key={id}>
            <dt>
              <code>{kommando}</code>
            </dt>
            <dd>{forklaring}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

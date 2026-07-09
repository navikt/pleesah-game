import {
  KUBECTL_KOMMANDOER,
  type KubectlKommandoId,
} from "../../data/kubectlKommandoer.ts";

interface PoddyKommandoerProps {
  kommandoIder: KubectlKommandoId[];
}

export const PoddyKommandoer = ({ kommandoIder }: PoddyKommandoerProps) => {
  const kommandoer = KUBECTL_KOMMANDOER.filter((k) =>
    kommandoIder.includes(k.id),
  );

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

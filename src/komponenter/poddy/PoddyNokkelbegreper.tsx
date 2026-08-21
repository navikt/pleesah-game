import { Begrep, NOKKELBEGREPER } from "../../data/nokkelbegreper.ts";

interface PoddyNokkelbegreperProps {
  begreper: Begrep[];
}

export const PoddyNokkelbegreper = ({ begreper }: PoddyNokkelbegreperProps) => {
  const forklaringer = begreper
    .flatMap((begrep) => {
      const forklaring = NOKKELBEGREPER.get(begrep);
      return forklaring ? [{ begrep, forklaring }] : [];
    })
    .sort((a, b) => a.begrep.localeCompare(b.begrep, "nb"));

  return (
    <div className="poddy-innhold">
      <dl className="poddy-liste">
        {forklaringer.map(({ begrep, forklaring }) => (
          <div className="poddy-begrep" key={begrep}>
            <dt>
              <code>{begrep}</code>
            </dt>
            <dd>{forklaring}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

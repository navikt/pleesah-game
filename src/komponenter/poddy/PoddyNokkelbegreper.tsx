import { NOKKELBEGREPER } from "../../data/nokkelbegreper.ts";

export const PoddyNokkelbegreper = () => {
  return (
    <div className="poddy-innhold">
      <dl className="poddy-liste">
        {NOKKELBEGREPER.map(({ begrep, forklaring }) => (
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

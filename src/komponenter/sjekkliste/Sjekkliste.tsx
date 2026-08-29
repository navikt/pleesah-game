import React from "react";
import "./Sjekkliste.css";

interface Props {
  innhold: Array<React.ReactNode>;
  id: string;
}

export const Sjekkliste = ({ innhold, id }: Props) => {
  return (
    <>
      {innhold.map((item, index) => (
        <React.Fragment key={index}>
          <span key={index} className="sjekkliste-item">
            <input
              type="checkbox"
              id={`${id}-${index}`}
              name={`${id}-${index}`}
            />
            <label htmlFor={`${id}-${index}`}>{item}</label>
          </span>
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

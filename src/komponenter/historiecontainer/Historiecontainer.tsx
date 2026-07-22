import type { PropsWithChildren } from "react";
import "./Historiecontainer.css";

export const Historiecontainer = ({ children }: PropsWithChildren) => {
  return <p className="historiecontainer">{children}</p>;
};

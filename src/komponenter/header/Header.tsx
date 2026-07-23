import { KubectlKommandoId } from "../../data/kubectlKommandoer.ts";
import { Logo } from "../logo/Logo.tsx";
import { Poddy } from "../poddy/Poddy.tsx";

export const Header = ({
  overskrift,
  kommandoIder,
}: {
  overskrift: string;
  kommandoIder?: KubectlKommandoId[];
}) => {
  return (
    <div className="flex-column-container">
      <Logo />
      <Poddy kommandoIder={kommandoIder} />
      <h1 className="header">{overskrift}</h1>
    </div>
  );
};

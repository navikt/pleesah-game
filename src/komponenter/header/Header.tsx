import { KubectlKommando } from "../../data/kubectlKommandoer.ts";
import type { Begrep } from "../../data/nokkelbegreper.ts";
import { Logo } from "../logo/Logo.tsx";
import { Poddy } from "../poddy/Poddy.tsx";

export const Header = ({
  overskrift,
  begreper: begreper,
  kommandoer: kommandoer,
  poddyAutoHover = false,
}: {
  overskrift: string;
  begreper?: Begrep[];
  kommandoer?: KubectlKommando[];
  poddyAutoHover?: boolean;
}) => {
  return (
    <div className="flex-column-container">
      <a
        href={`${window.location.origin}${import.meta.env.BASE_URL}`}
        aria-label="Gå til forsiden"
      >
        <Logo />
      </a>
      <Poddy
        begreper={begreper}
        kommandoer={kommandoer}
        autoHover={poddyAutoHover}
      />
      <h1 className="header">{overskrift}</h1>
    </div>
  );
};

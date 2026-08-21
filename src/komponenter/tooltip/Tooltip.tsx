import { useLayoutEffect, useRef, useState } from "react";
import { Begrep, finnForklaring } from "../../data/nokkelbegreper.ts";
import "./Tooltip.css";

interface TooltipProps {
  begrep: Begrep;
  value?: string;
}

export const Tooltip = ({ begrep: begrep, value: value }: TooltipProps) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [erSynlig, setErSynlig] = useState(false);
  const [posisjon, setPosisjon] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!erSynlig || !triggerRef.current) {
      return;
    }

    const oppdaterPosisjon = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPosisjon({ top: rect.top, left: rect.left + rect.width / 2 });
    };

    oppdaterPosisjon();
    window.addEventListener("scroll", oppdaterPosisjon, true);
    window.addEventListener("resize", oppdaterPosisjon);
    return () => {
      window.removeEventListener("scroll", oppdaterPosisjon, true);
      window.removeEventListener("resize", oppdaterPosisjon);
    };
  }, [erSynlig]);

  return (
    <span
      ref={triggerRef}
      className="tooltip"
      tabIndex={0}
      onMouseEnter={() => setErSynlig(true)}
      onMouseLeave={() => setErSynlig(false)}
      onFocus={() => setErSynlig(true)}
      onBlur={() => setErSynlig(false)}
    >
      <span className="ord-tooltip">{value || begrep}</span>
      {erSynlig && (
        <span
          className="tooltip-boks"
          role="tooltip"
          style={{ top: posisjon.top, left: posisjon.left }}
        >
          {finnForklaring(begrep)}
        </span>
      )}
    </span>
  );
};

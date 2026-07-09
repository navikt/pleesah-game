import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.css";

interface TooltipProps {
  forklaring: string;
  children: ReactNode;
}

export const Tooltip = ({ forklaring, children }: TooltipProps) => {
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
      <span className="ord-tooltip">{children}</span>
      {erSynlig &&
        createPortal(
          <span
            className="tooltip-boks"
            role="tooltip"
            style={{ top: posisjon.top, left: posisjon.left }}
          >
            {forklaring}
          </span>,
          document.body,
        )}
    </span>
  );
};

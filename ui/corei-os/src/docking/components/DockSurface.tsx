import { PropsWithChildren } from "react";

import "./dock-ui.css";

import { DockRegion } from "./DockRegion";
import { DockPlaceholder } from "./DockPlaceholder";

export interface DockSurfaceProps extends PropsWithChildren {
  className?: string;
}

export function DockSurface({
  className,
  children,
}: DockSurfaceProps) {
  return (
    <section
      className={[
        "corei-dock-surface",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <DockRegion position="center">
        {children ?? <DockPlaceholder />}
      </DockRegion>
    </section>
  );
}

export default DockSurface;
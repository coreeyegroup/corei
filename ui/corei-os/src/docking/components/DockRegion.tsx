/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 06

Component:
DockRegion

Purpose:
Institutional Dock Region

Responsibilities

- Visual Dock Region
- Region Ownership
- Future Dock Host

Non Responsibilities

- Dock Runtime
- Window Runtime
- Split Runtime
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/dock-region.css";

export type DockRegionPosition =
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center";

export interface DockRegionProps
    extends PropsWithChildren {

    position: DockRegionPosition;

    className?: string;

}

export function DockRegion({

    position,

    className,

    children,

}: DockRegionProps): React.JSX.Element {

    return (

        <section

            className={[

                "corei-dock-region",

                `corei-dock-region--${position}`,

                className,

            ]
                .filter(Boolean)
                .join(" ")}

            data-region={position}

        >

            {children}

        </section>

    );

}

export default DockRegion;

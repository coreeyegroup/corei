/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-004
 * File       : WindowToolbar.tsx
 * Purpose    : Institutional Window Toolbar
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

export interface WindowToolbarProps
    extends PropsWithChildren {

    readonly className?: string;

}

export function WindowToolbar({

    className,

    children,

}: WindowToolbarProps): ReactElement {

    return (

        <div
            className={[
                "corei-window__toolbar",
                className ?? "",
            ].join(" ").trim()}
        >
            {children}
        </div>

    );

}

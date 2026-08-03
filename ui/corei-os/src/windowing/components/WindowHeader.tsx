/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-002
 * File       : WindowHeader.tsx
 * Purpose    : Institutional Window Header
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

export interface WindowHeaderProps
extends PropsWithChildren {

    readonly className?: string;

}

export function WindowHeader({

    className,

    children,

}: WindowHeaderProps): ReactElement {

    return (

        <header
            className={[
                "corei-window__header",
                className ?? "",
            ].join(" ").trim()}
        >
            {children}
        </header>

    );

}

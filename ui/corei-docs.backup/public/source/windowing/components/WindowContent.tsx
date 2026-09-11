/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-006
 * File       : WindowContent.tsx
 * Purpose    : Institutional Window Content Surface
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

export interface WindowContentProps
    extends PropsWithChildren {

    readonly className?: string;

}

export function WindowContent({

    className,

    children,

}: WindowContentProps): ReactElement {

    return (

        <main
            className={[
                "corei-window__content",
                className ?? "",
            ].join(" ").trim()}
        >
            {children}
        </main>

    );

}

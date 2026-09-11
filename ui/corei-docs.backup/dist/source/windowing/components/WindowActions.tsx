/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-005
 * File       : WindowActions.tsx
 * Purpose    : Institutional Window Action Controls
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface WindowActionsProps {

    readonly className?: string;

}

export function WindowActions({

    className,

}: WindowActionsProps): ReactElement {

    return (

        <div
            className={[
                "corei-window__actions",
                className ?? "",
            ].join(" ").trim()}
        >

            <button
                type="button"
                className="corei-window__action"
                aria-label="Minimize Window"
            >
                &minus;
            </button>

            <button
                type="button"
                className="corei-window__action"
                aria-label="Maximize Window"
            >
                □
            </button>

            <button
                type="button"
                className="corei-window__action corei-window__action--close"
                aria-label="Close Window"
            >
                ×
            </button>

        </div>

    );

}

/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-007
 * File       : WindowStatus.tsx
 * Purpose    : Institutional Window Status Bar
 * =============================================================================
 */

import type { ReactElement, ReactNode } from "react";

export interface WindowStatusProps {

    readonly className?: string;

    readonly left?: ReactNode;

    readonly center?: ReactNode;

    readonly right?: ReactNode;

}

export function WindowStatus({

    className,

    left,

    center,

    right,

}: WindowStatusProps): ReactElement {

    return (

        <footer
            className={[
                "corei-window__status",
                className ?? "",
            ].join(" ").trim()}
        >

            <div className="corei-window__status-left">
                {left}
            </div>

            <div className="corei-window__status-center">
                {center}
            </div>

            <div className="corei-window__status-right">
                {right}
            </div>

        </footer>

    );

}

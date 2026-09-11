/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-003
 * File       : WindowTitle.tsx
 * Purpose    : Institutional Window Title
 * =============================================================================
 */

import type { ReactElement, ReactNode } from "react";

export interface WindowTitleProps {

    readonly icon?: ReactNode;

    readonly title: string;

    readonly subtitle?: string;

    readonly className?: string;

}

export function WindowTitle({

    icon,

    title,

    subtitle,

    className,

}: WindowTitleProps): ReactElement {

    return (

        <div
            className={[
                "corei-window__title",
                className ?? "",
            ].join(" ").trim()}
        >

            <div className="corei-window__title-icon">
                {icon}
            </div>

            <div className="corei-window__title-content">

                <div className="corei-window__title-text">
                    {title}
                </div>

                {subtitle && (

                    <div className="corei-window__subtitle">
                        {subtitle}
                    </div>

                )}

            </div>

        </div>

    );

}

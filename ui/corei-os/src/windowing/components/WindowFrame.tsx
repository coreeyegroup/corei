/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-001
 * File       : WindowFrame.tsx
 * Purpose    : Institutional Window UI Frame
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

import "./window-ui.css";

export interface WindowFrameProps
extends PropsWithChildren {

    readonly active?: boolean;

    readonly className?: string;

}

export function WindowFrame(

    props: WindowFrameProps

): ReactElement {

    const {

        active = true,

        className,

        children

    } = props;

    return (

        <section
            className={[
                "corei-window",
                active
                    ? "corei-window--active"
                    : "corei-window--inactive",
                className ?? ""
            ].join(" ").trim()}
        >
            {children}
        </section>

    );

}

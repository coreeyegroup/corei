/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-009
 * File       : WindowHost.tsx
 * Purpose    : Institutional Window Host
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

import { Window } from "./Window";

export interface WindowHostProps
    extends PropsWithChildren {

    readonly title?: string;

    readonly subtitle?: string;

}

export function WindowHost({

    title = "COREI Workspace",

    subtitle = "Institutional Operating Environment",

    children,

}: WindowHostProps): ReactElement {

    return (

        <Window

            title={title}

            subtitle={subtitle}

            statusLeft="READY"

            statusCenter="Workspace Connected"

            statusRight="Phase-19"

        >

            {children}

        </Window>

    );

}

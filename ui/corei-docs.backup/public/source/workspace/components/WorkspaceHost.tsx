/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-010
 * File       : WorkspaceHost.tsx
 * Purpose    : Workspace Presentation Host
 * =============================================================================
 */

import type { PropsWithChildren, ReactElement } from "react";

import { WindowHost } from "@/windowing";

export interface WorkspaceHostProps
    extends PropsWithChildren {

    readonly title?: string;

    readonly subtitle?: string;

}

export function WorkspaceHost({

    title = "COREI Workspace",

    subtitle = "Institutional Operating Environment",

    children,

}: WorkspaceHostProps): ReactElement {

    return (

        <WindowHost

            title={title}

            subtitle={subtitle}

        >

            {children}

        </WindowHost>

    );

}

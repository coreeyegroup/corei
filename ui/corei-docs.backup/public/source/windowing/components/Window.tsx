/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-008
 * File       : Window.tsx
 * Purpose    : Institutional Window Composition
 * =============================================================================
 */

import type { ReactNode, ReactElement } from "react";

import { WindowFrame } from "./WindowFrame";
import { WindowHeader } from "./WindowHeader";
import { WindowTitle } from "./WindowTitle";
import { WindowToolbar } from "./WindowToolbar";
import { WindowActions } from "./WindowActions";
import { WindowContent } from "./WindowContent";
import { WindowStatus } from "./WindowStatus";

export interface WindowProps {

    readonly title: string;

    readonly subtitle?: string;

    readonly icon?: ReactNode;

    readonly toolbar?: ReactNode;

    readonly statusLeft?: ReactNode;

    readonly statusCenter?: ReactNode;

    readonly statusRight?: ReactNode;

    readonly active?: boolean;

    readonly children?: ReactNode;

}

export function Window({

    title,

    subtitle,

    icon,

    toolbar,

    statusLeft,

    statusCenter,

    statusRight,

    active = true,

    children,

}: WindowProps): ReactElement {

    return (

        <WindowFrame active={active}>

            <WindowHeader>

                <WindowTitle
                    icon={icon}
                    title={title}
                    subtitle={subtitle}
                />

                <WindowToolbar>
                    {toolbar}
                </WindowToolbar>

                <WindowActions />

            </WindowHeader>

            <WindowContent>

                {children}

            </WindowContent>

            <WindowStatus
                left={statusLeft}
                center={statusCenter}
                right={statusRight}
            />

        </WindowFrame>

    );

}

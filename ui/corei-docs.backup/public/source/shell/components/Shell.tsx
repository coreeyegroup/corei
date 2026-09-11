/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * Shell.tsx
 *
 * PURPOSE:
 * Institutional Shell Bootstrap
 *
 * DESCRIPTION:
 * Root UI component for the Institutional Shell.
 *
 * This component consumes the Shell Provider and delegates
 * all runtime responsibilities to the Shell Manager.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type { ReactElement } from "react";

import { ShellFrame } from "./ShellFrame";

import { ShellProvider } from "../providers/shell-provider";

import type {

    ShellKernelContract

} from "../contracts/shell-kernel-contract";

/*=============================================================================
    PROPERTIES
=============================================================================*/

export interface ShellProps {

    readonly kernel: ShellKernelContract;

}

/*=============================================================================
    COMPONENT
=============================================================================*/

export function Shell({

    kernel

}: ShellProps): ReactElement {

    return (

        <ShellProvider kernel={kernel}>

            <ShellFrame />

        </ShellProvider>

    );

}

export default Shell;

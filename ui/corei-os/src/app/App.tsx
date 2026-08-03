/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * App.tsx
 *
 * PURPOSE:
 * COREI Application Composition Root
 *
 * DESCRIPTION:
 * Connects the browser application to the Institutional Shell through the
 * authoritative Platform Kernel connection boundary.
 *
 * The application root does not construct Platform Kernel services.
 * The application root does not access Platform Kernel implementations.
 * The application root only composes the Institutional Shell.
 *
 * OWNERSHIP:
 * COREI Application Platform
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import Shell
from "../shell/components/Shell";

import {
    ShellBoundary
} from "../shell/components/ShellBoundary";

import {
    connectShellKernel
} from "../shell/runtime/connect-shell-kernel";

/*=============================================================================
    AUTHORITATIVE SHELL KERNEL CONNECTION
=============================================================================*/

const SHELL_KERNEL = connectShellKernel();

/*=============================================================================
    APPLICATION ROOT
=============================================================================*/

export function App(): ReactElement {

    return (

        <ShellBoundary>

            <Shell kernel={SHELL_KERNEL} />

        </ShellBoundary>

    );

}

export default App;

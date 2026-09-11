/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * connect-shell-kernel.ts
 *
 * PURPOSE:
 * Institutional Platform Kernel Connection Boundary
 *
 * DESCRIPTION:
 * Establishes the authoritative connection point between the COREI
 * application composition root and the Institutional Shell.
 *
 * The connection boundary intentionally preserves the current certified
 * bootstrap kernel contract until each Platform Kernel service can be
 * consumed through a verified public API.
 *
 * This file does not implement Platform Kernel services.
 * This file does not reconstruct certified Platform Kernel platforms.
 * This file does not bypass Platform Kernel public APIs.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ShellKernelContract
} from "../contracts/shell-kernel-contract";

import {
    DEFAULT_SHELL_KERNEL
} from "./default-shell-kernel";

/*=============================================================================
    SHELL KERNEL CONNECTION
=============================================================================*/

/**
 * Returns the authoritative Shell Kernel contract used by the
 * COREI application composition root.
 *
 * Current connection:
 *
 * Application
 *      ↓
 * connectShellKernel()
 *      ↓
 * DEFAULT_SHELL_KERNEL
 *      ↓
 * Shell
 *      ↓
 * ShellProvider
 *      ↓
 * ShellManager
 *      ↓
 * ShellLifecycle
 *      ↓
 * ShellRuntime
 *      ↓
 * ShellKernel
 *
 * Future certified Platform Kernel integrations are introduced behind this
 * connection boundary only after their concrete public APIs and contracts
 * have been repository-audited and validated.
 */
export function connectShellKernel(): ShellKernelContract {

    return DEFAULT_SHELL_KERNEL;

}

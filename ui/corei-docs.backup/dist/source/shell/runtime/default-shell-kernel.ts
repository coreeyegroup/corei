/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * default-shell-kernel.ts
 *
 * PURPOSE:
 * Default Platform Kernel Bootstrap
 *
 * DESCRIPTION:
 * Temporary bootstrap implementation used until all Platform
 * Kernel services are connected.
 *
 * IMPORTANT
 * ----------
 * This file MUST eventually consume the certified Platform
 * Kernel implementations.
 *
 ******************************************************************************/

import type {
    ShellKernelContract
} from "../contracts/shell-kernel-contract";

/*=============================================================================
    DEFAULT SHELL KERNEL
=============================================================================*/

export const DEFAULT_SHELL_KERNEL: ShellKernelContract = {

    providers: {
        registry: {},
        lifecycle: {}
    },

    capabilities: {
        registry: {},
        resolver: {}
    },

    cognition: {
        runtime: {}
    },

    workspace: {
        registry: {},
        runtime: {}
    },

    applications: {
        registry: {}
    },

    services: {
        registry: {}
    },

    modules: {
        registry: {}
    },

    engines: {
        registry: {}
    },

    domains: {
        registry: {}
    },

    events: {
        bus: {}
    },

    state: {
        state: {}
    },

    registry: {
        registry: {}
    }

};

/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-13
 * BUILD-02B
 *
 * FILE:
 * platform-kernel.ts
 *
 * PURPOSE:
 * Authoritative Platform Kernel Composition.
 *
 * DESCRIPTION:
 * Creates the fixed Platform Kernel topology with empty,
 * uncertified platform slots.
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {
    PlatformKernelContract,
    PlatformSlot
} from "../contracts/platform-kernel-contract";

/*=============================================================================
    SLOT FACTORY
=============================================================================*/

function slot(
    id: string,
    name: string
): PlatformSlot {

    return {

        id,

        name,

        certified: false,

        implementation: null

    };

}

/*=============================================================================
    PLATFORM KERNEL
=============================================================================*/

export const PLATFORM_KERNEL: PlatformKernelContract = {

    provider:     slot("provider",     "Provider Platform"),

    capability:   slot("capability",   "Capability Platform"),

    cognitive:    slot("cognitive",    "Cognitive Platform"),

    workspace:    slot("workspace",    "Workspace Platform"),

    experience:   slot("experience",   "Experience Platform"),

    application:  slot("application",  "Application Platform"),

    service:      slot("service",      "Service Platform"),

    module:       slot("module",       "Module Platform"),

    engine:       slot("engine",       "Engine Platform"),

    domain:       slot("domain",       "Domain Platform"),

    runtime:      slot("runtime",      "Runtime Platform"),

    registry:     slot("registry",     "Registry Platform"),

    state:        slot("state",        "State Platform"),

    event:        slot("event",        "Event Platform")

};

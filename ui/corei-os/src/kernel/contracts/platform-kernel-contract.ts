/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-13
 * BUILD-02A
 *
 * FILE:
 * platform-kernel-contract.ts
 *
 * PURPOSE:
 * Authoritative Platform Kernel Topology.
 *
 * DESCRIPTION:
 * Defines the fixed topology of the COREI Operating System.
 *
 * IMPORTANT
 * ----------
 * The topology never changes.
 * Only the implementation bound to each platform changes after
 * certification.
 *
 * OWNERSHIP:
 * Platform Kernel
 *
 ******************************************************************************/

/*=============================================================================
    PLATFORM SLOT
=============================================================================*/

export interface PlatformSlot<T = unknown> {

    /*
     * Fixed Platform Identity
     */

    readonly id: string;

    readonly name: string;

    /*
     * Certification Status
     */

    readonly certified: boolean;

    /*
     * Bound Platform Implementation
     */

    readonly implementation: T | null;

}

/*=============================================================================
    PLATFORM KERNEL CONTRACT
=============================================================================*/

export interface PlatformKernelContract {

    readonly provider: PlatformSlot;

    readonly capability: PlatformSlot;

    readonly cognitive: PlatformSlot;

    readonly workspace: PlatformSlot;

    readonly experience: PlatformSlot;

    readonly application: PlatformSlot;

    readonly service: PlatformSlot;

    readonly module: PlatformSlot;

    readonly engine: PlatformSlot;

    readonly domain: PlatformSlot;

    readonly runtime: PlatformSlot;

    readonly registry: PlatformSlot;

    readonly state: PlatformSlot;

    readonly event: PlatformSlot;

}

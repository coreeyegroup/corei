/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-13
 * BUILD-02C
 *
 * FILE:
 * platform-kernel-registry.ts
 *
 * PURPOSE:
 * Registry of Platform Kernel slots.
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {
    PlatformSlot
} from "../contracts/platform-kernel-contract";

/*=============================================================================
    REGISTRY
=============================================================================*/

export class PlatformKernelRegistry {

    private readonly platforms =
        new Map<string, PlatformSlot>();

    public register(
        platform: PlatformSlot
    ): void {

        this.platforms.set(
            platform.id,
            platform
        );

    }

    public get(
        id: string
    ): PlatformSlot | undefined {

        return this.platforms.get(id);

    }

    public has(
        id: string
    ): boolean {

        return this.platforms.has(id);

    }

    public list(): readonly PlatformSlot[] {

        return Array.from(
            this.platforms.values()
        );

    }

    public count(): number {

        return this.platforms.size;

    }

}

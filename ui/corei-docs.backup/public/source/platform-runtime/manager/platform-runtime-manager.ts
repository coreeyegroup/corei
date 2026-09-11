/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 01
 *
 * File        : platform-runtime-manager.ts
 * Purpose     : Platform Runtime Manager
 * =============================================================================
 */

import {
    PlatformRuntimeRegistry,
    registerPlatformRuntime
} from "../registry/platform-runtime-registry";

import type {
    PlatformRuntimeModel
} from "../models/platform-runtime-model";

export class PlatformRuntimeManager {

    register(
        runtime: PlatformRuntimeModel
    ): void {

        registerPlatformRuntime(
            runtime
        );

    }

    getAll():
    readonly PlatformRuntimeModel[] {

        return PlatformRuntimeRegistry;

    }

}

/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 01
 *
 * File        : platform-bootstrap-manager.ts
 * Purpose     : Platform Bootstrap Manager
 * =============================================================================
 */

import {
    PlatformBootstrapRegistry,
    registerPlatformBootstrap
} from "../registry/platform-bootstrap-registry";

import type {
    PlatformBootstrapModel
} from "../models/platform-bootstrap-model";

export class PlatformBootstrapManager {

    register(
        bootstrap: PlatformBootstrapModel
    ): void {

        registerPlatformBootstrap(
            bootstrap
        );

    }

    getAll():
    readonly PlatformBootstrapModel[] {

        return PlatformBootstrapRegistry;

    }

}

/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 01
 *
 * File        : platform-configuration-manager.ts
 * Purpose     : Platform Configuration Manager
 * =============================================================================
 */

import {
    PlatformConfigurationRegistry,
    registerPlatformConfiguration
} from "../registry";

import type {
    PlatformConfigurationModel
} from "../models";

export class PlatformConfigurationManager {

    register(
        configuration: PlatformConfigurationModel
    ): void {

        registerPlatformConfiguration(
            configuration
        );

    }

    getAll():
    readonly PlatformConfigurationModel[] {

        return PlatformConfigurationRegistry;

    }

}

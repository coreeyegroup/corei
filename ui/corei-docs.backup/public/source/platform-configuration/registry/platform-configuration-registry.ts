/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 01
 *
 * File        : platform-configuration-registry.ts
 * Purpose     : Platform Configuration Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationModel
} from "../models";

const registry:
PlatformConfigurationModel[] = [];

export const PlatformConfigurationRegistry:
readonly PlatformConfigurationModel[] = registry;

export function registerPlatformConfiguration(
    configuration: PlatformConfigurationModel
): void {

    registry.push(
        configuration
    );

}

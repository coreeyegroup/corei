/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 02.05
 *
 * File        : configuration-loader.ts
 * Purpose     : Loads and validates the platform configuration.
 * =============================================================================
 */

import { configurationRegistry } from "../registry/configuration-registry";
import { configurationService } from "../service/configuration-service";

/**
 * Loads the platform configuration.
 */
export function loadPlatformConfiguration(): void {

    const configuration =
        configurationService.getConfiguration();

    if (!configuration.applicationName) {
        throw new Error("Configuration Error: applicationName is required.");
    }

    if (!configuration.applicationVersion) {
        throw new Error("Configuration Error: applicationVersion is required.");
    }

    if (!configuration.environment) {
        throw new Error("Configuration Error: environment is required.");
    }

    configurationRegistry.initialize(
        configuration
    );

}

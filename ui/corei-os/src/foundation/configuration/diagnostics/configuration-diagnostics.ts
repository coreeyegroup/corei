/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 02.07
 *
 * File        : configuration-diagnostics.ts
 * Purpose     : Configuration diagnostics utilities.
 * =============================================================================
 */

import { configurationRegistry } from "../registry/configuration-registry";

export function logConfigurationDiagnostics(): void {

    const configuration =
        configurationRegistry.get();

    console.group("[COREI] Configuration");

    console.info("Application :", configuration.applicationName);
    console.info("Version     :", configuration.applicationVersion);
    console.info("Environment :", configuration.environment);

    console.groupEnd();

}

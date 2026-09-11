/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 02.01
 *
 * File        : platform-configuration.ts
 * Purpose     : Authoritative platform configuration model.
 * =============================================================================
 */

export interface PlatformConfiguration {

    applicationName: string;

    applicationVersion: string;

    environment: "development" | "production";

}

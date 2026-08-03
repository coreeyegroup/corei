/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 02.02
 *
 * File        : configuration-registry.ts
 * Purpose     : Authoritative platform configuration registry.
 * =============================================================================
 */

import type { PlatformConfiguration } from "../model/platform-configuration";

class ConfigurationRegistry {

    private configuration: PlatformConfiguration | null = null;

    public initialize(
        configuration: PlatformConfiguration
    ): void {

        this.configuration = configuration;

    }

    public get(): PlatformConfiguration {

        if (!this.configuration) {
            throw new Error("Platform configuration has not been initialized.");
        }

        return this.configuration;

    }

    public isInitialized(): boolean {

        return this.configuration !== null;

    }

}

export const configurationRegistry =
    new ConfigurationRegistry();

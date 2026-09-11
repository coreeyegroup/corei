/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 02.01
 *
 * File        : configuration-service.ts
 * Purpose     : Platform configuration service.
 * =============================================================================
 */

import type { PlatformConfiguration } from "../model/platform-configuration";

export class ConfigurationService {

    private readonly configuration: PlatformConfiguration = {

        applicationName: "COREI",

        applicationVersion: "25.0.0",

        environment: "development"

    };

    public getConfiguration(): PlatformConfiguration {

        return this.configuration;

    }

}

export const configurationService =
    new ConfigurationService();

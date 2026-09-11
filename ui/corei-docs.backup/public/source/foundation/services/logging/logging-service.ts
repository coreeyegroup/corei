/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.04
 *
 * File        : logging-service.ts
 * Purpose     : Authoritative platform logging service.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

export class LoggingService implements PlatformService {

    public readonly id = "logging-service";

    public initialize(): void {

        console.info("[COREI] Logging Service Initialized");

    }

    public dispose(): void {

        console.info("[COREI] Logging Service Disposed");

    }

}

export const loggingService =
    new LoggingService();

/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.07
 *
 * File        : diagnostics-service.ts
 * Purpose     : Authoritative platform diagnostics service.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

export interface DiagnosticRecord {

    service: string;

    status: "ONLINE" | "OFFLINE";

    timestamp: Date;

}

export class DiagnosticsService implements PlatformService {

    public readonly id = "diagnostics-service";

    private readonly records: DiagnosticRecord[] = [];

    public initialize(): void {

        console.info("[COREI] Diagnostics Service Initialized");

    }

    public dispose(): void {

        this.records.length = 0;

        console.info("[COREI] Diagnostics Service Disposed");

    }

    public report(

        service: string,

        status: "ONLINE" | "OFFLINE"

    ): void {

        this.records.push({

            service,

            status,

            timestamp: new Date()

        });

    }

    public list(): readonly DiagnosticRecord[] {

        return this.records;

    }

}

export const diagnosticsService =
    new DiagnosticsService();

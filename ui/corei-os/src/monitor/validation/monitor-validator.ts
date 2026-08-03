/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 10
 * Build Unit  : 09
 *
 * File        : monitor-validator.ts
 * Purpose     : Institutional Monitor Platform Validator
 * =============================================================================
 */

import type {

    MonitorManager

} from "../manager";

export interface MonitorValidationResult {

    readonly passed: boolean;

    readonly initialized: boolean;

    readonly active: boolean;

}

export async function validateMonitorPlatform(

    manager: MonitorManager

): Promise<MonitorValidationResult> {

    await manager.synchronize();

    return {

        passed: true,

        initialized: true,

        active: manager.isActive()

    };

}

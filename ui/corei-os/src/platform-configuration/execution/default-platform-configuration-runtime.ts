/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 06
 *
 * File        : default-platform-configuration-runtime.ts
 * Purpose     : Default Platform Configuration Runtime
 * =============================================================================
 */

import type {
    PlatformConfigurationExecutionContext
} from "./platform-configuration-execution-context";

import type {
    PlatformConfigurationRuntime
} from "./platform-configuration-runtime";

export class DefaultPlatformConfigurationRuntime
implements PlatformConfigurationRuntime {

    async execute(
        _context: PlatformConfigurationExecutionContext
    ): Promise<void> {

        return;

    }

}

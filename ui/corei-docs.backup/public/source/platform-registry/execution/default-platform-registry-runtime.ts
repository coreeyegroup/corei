/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 06
 *
 * File        : default-platform-registry-runtime.ts
 * Purpose     : Default Platform Registry Runtime
 * =============================================================================
 */

import type {
    PlatformRegistryExecutionContext
} from "./platform-registry-execution-context";

import type {
    PlatformRegistryRuntime
} from "./platform-registry-runtime";

export class DefaultPlatformRegistryRuntime
implements PlatformRegistryRuntime {

    async execute(
        _context: PlatformRegistryExecutionContext
    ): Promise<void> {

        return;

    }

}

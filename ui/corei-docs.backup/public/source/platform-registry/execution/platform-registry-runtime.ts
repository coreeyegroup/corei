/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 06
 *
 * File        : platform-registry-runtime.ts
 * Purpose     : Platform Registry Runtime
 * =============================================================================
 */

import type {
    PlatformRegistryExecutionContext
} from "./platform-registry-execution-context";

export interface PlatformRegistryRuntime {

    execute(
        context: PlatformRegistryExecutionContext
    ): Promise<void>;

}

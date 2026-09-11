/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 06
 *
 * File        : platform-configuration-runtime.ts
 * Purpose     : Platform Configuration Runtime
 * =============================================================================
 */

import type {
    PlatformConfigurationExecutionContext
} from "./platform-configuration-execution-context";

export interface PlatformConfigurationRuntime {

    execute(
        context: PlatformConfigurationExecutionContext
    ): Promise<void>;

}

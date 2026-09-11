/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 06
 *
 * File        : platform-bootstrap-runtime.ts
 * Purpose     : Platform Bootstrap Runtime
 * =============================================================================
 */

import type {
    PlatformBootstrapExecutionContext
} from "./platform-bootstrap-execution-context";

export interface PlatformBootstrapRuntime {

    execute(
        context: PlatformBootstrapExecutionContext
    ): Promise<void>;

}

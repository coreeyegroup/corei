/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 06
 *
 * File        : platform-bootstrap-executor.ts
 * Purpose     : Platform Bootstrap Executor
 * =============================================================================
 */

import type {
    PlatformBootstrapExecutionContext
} from "./platform-bootstrap-execution-context";

import type {
    PlatformBootstrapRuntime
} from "./platform-bootstrap-runtime";

export class PlatformBootstrapExecutor
implements PlatformBootstrapRuntime {

    async execute(
        _context: PlatformBootstrapExecutionContext
    ): Promise<void> {

        return;

    }

}

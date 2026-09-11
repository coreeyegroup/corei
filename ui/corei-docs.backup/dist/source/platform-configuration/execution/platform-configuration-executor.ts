/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 06
 *
 * File        : platform-configuration-executor.ts
 * Purpose     : Platform Configuration Executor
 * =============================================================================
 */

export interface PlatformConfigurationExecutor {

    execute(): Promise<void>;

}

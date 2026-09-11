/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 09
 *
 * File        : platform-runtime-shutdown-strategy.ts
 * Purpose     : Platform Runtime Shutdown Strategy
 * =============================================================================
 */

export interface PlatformRuntimeShutdownStrategy {

    stop(): Promise<void>;

}

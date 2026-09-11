/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 09
 *
 * File        : platform-runtime-startup-strategy.ts
 * Purpose     : Platform Runtime Startup Strategy
 * =============================================================================
 */

export interface PlatformRuntimeStartupStrategy {

    start(): Promise<void>;

}

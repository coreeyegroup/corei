/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 02
 *
 * File        : default-service-lifecycle.ts
 * Purpose     : Default Service Lifecycle
 * =============================================================================
 */

import type {
    ServiceLifecycle
} from "./service-lifecycle";

export const DefaultServiceLifecycle: ServiceLifecycle = {

    initialize(): void {},

    start(): void {},

    stop(): void {},

    shutdown(): void {}

};

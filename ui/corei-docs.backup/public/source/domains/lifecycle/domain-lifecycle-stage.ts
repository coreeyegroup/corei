/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 02
 *
 * File        : domain-lifecycle-stage.ts
 * Purpose     : Domain Lifecycle Stage
 * =============================================================================
 */

export type DomainLifecycleStage =

    | "CREATED"
    | "REGISTERED"
    | "INITIALIZED"
    | "READY"
    | "RUNNING"
    | "SUSPENDED"
    | "STOPPED"
    | "TERMINATED";

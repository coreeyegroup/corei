/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 04
 *
 * File        : capability-dependency.ts
 * Purpose     : Capability Dependency Definition
 * =============================================================================
 */

export interface CapabilityDependency {

    readonly capabilityId: string;

    readonly dependsOn: readonly string[];

}

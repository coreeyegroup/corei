/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 05
 *
 * File        : domain-dependency.ts
 * Purpose     : Domain Dependency
 * =============================================================================
 */

export interface DomainDependency {

    readonly domainId: string;

    readonly dependsOn:
        readonly string[];

}

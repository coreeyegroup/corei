/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 07
 *
 * File        : experience-capability-integration.ts
 * Purpose     : Experience Capability Integration
 * =============================================================================
 */

export interface ExperienceCapabilityIntegration {

    readonly experienceId: string;

    readonly capabilityId: string;

    readonly required: boolean;

    readonly enabled: boolean;

}

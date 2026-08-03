/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 08
 *
 * File        : experience-provider-integration.ts
 * Purpose     : Experience Provider Integration
 * =============================================================================
 */

export interface ExperienceProviderIntegration {

    readonly experienceId: string;

    readonly providerId: string;

    readonly required: boolean;

    readonly enabled: boolean;

}

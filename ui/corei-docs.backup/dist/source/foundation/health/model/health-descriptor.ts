/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.03
 *
 * File        : health-descriptor.ts
 * Purpose     : Platform Health Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform Health Descriptor
 * ============================================================================
 * Describes an institutional health provider.
 * ============================================================================
 */
export interface HealthDescriptor {

    /**
     * Unique health provider identifier.
     */
    id: string;

    /**
     * Human-readable health provider name.
     */
    name: string;

    /**
     * Health provider category.
     */
    category: string;

    /**
     * Health provider source.
     */
    source: string;

    /**
     * Health provider version.
     */
    version: string;

    /**
     * Health evaluation scope.
     */
    scope: string;

    /**
     * Health provider description.
     */
    description: string;

}

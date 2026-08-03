/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.03
 *
 * File        : registry-descriptor.ts
 * Purpose     : Registry metadata descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Registry Descriptor
 * ----------------------------------------------------------------------------
 * Describes a COREI Registry.
 * ============================================================================
 */
export interface RegistryDescriptor {

    /**
     * Unique registry identifier.
     */
    id: string;

    /**
     * Human-readable registry name.
     */
    name: string;

    /**
     * Registry category.
     */
    category: string;

    /**
     * Registry owner.
     */
    owner: string;

    /**
     * Registry version.
     */
    version: string;

    /**
     * Registry description.
     */
    description: string;

}

/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.03
 *
 * File        : extension-descriptor.ts
 * Purpose     : Platform Extension Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform Extension Descriptor
 * ============================================================================
 * Describes an institutional COREI extension.
 * ============================================================================
 */
export interface ExtensionDescriptor {

    /**
     * Unique extension identifier.
     */
    id: string;

    /**
     * Human-readable extension name.
     */
    name: string;

    /**
     * Extension category.
     */
    category: string;

    /**
     * Extension provider.
     */
    provider: string;

    /**
     * Extension version.
     */
    version: string;

    /**
     * Extension capabilities.
     */
    capabilities: readonly string[];

    /**
     * Extension description.
     */
    description: string;

}

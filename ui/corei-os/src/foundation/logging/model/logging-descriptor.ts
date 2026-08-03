/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.03
 *
 * File        : logging-descriptor.ts
 * Purpose     : Platform Logging Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform Logging Descriptor
 * ============================================================================
 * Describes an institutional platform logger.
 * ============================================================================
 */
export interface LoggingDescriptor {

    /**
     * Unique logger identifier.
     */
    id: string;

    /**
     * Human-readable logger name.
     */
    name: string;

    /**
     * Logger category.
     */
    category: string;

    /**
     * Logger source.
     */
    source: string;

    /**
     * Logger version.
     */
    version: string;

    /**
     * Output destination.
     */
    destination: string;

    /**
     * Logger description.
     */
    description: string;

}

/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.03
 *
 * File        : event-descriptor.ts
 * Purpose     : Platform Event Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform Event Descriptor
 * ============================================================================
 * Describes an institutional platform event.
 * ============================================================================
 */
export interface EventDescriptor {

    /**
     * Unique event identifier.
     */
    id: string;

    /**
     * Human-readable event name.
     */
    name: string;

    /**
     * Event category.
     */
    category: string;

    /**
     * Event source.
     */
    source: string;

    /**
     * Event version.
     */
    version: string;

    /**
     * Event description.
     */
    description: string;

}

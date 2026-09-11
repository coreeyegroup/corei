/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.03
 *
 * File        : state-descriptor.ts
 * Purpose     : Platform State Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform State Descriptor
 * ============================================================================
 * Describes an authoritative COREI platform state.
 * ============================================================================
 */
export interface StateDescriptor {

    /**
     * Unique state identifier.
     */
    id: string;

    /**
     * Human-readable state name.
     */
    name: string;

    /**
     * State category.
     */
    category: string;

    /**
     * State owner.
     */
    owner: string;

    /**
     * State version.
     */
    version: string;

    /**
     * State description.
     */
    description: string;

}

/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.03
 *
 * File        : diagnostics-descriptor.ts
 * Purpose     : Platform Diagnostics Descriptor.
 * =============================================================================
 */

/**
 * ============================================================================
 * Platform Diagnostics Descriptor
 * ============================================================================
 * Describes an institutional diagnostics provider.
 * ============================================================================
 */
export interface DiagnosticsDescriptor {

    /**
     * Unique diagnostics identifier.
     */
    id: string;

    /**
     * Human-readable diagnostics name.
     */
    name: string;

    /**
     * Diagnostics category.
     */
    category: string;

    /**
     * Diagnostics source.
     */
    source: string;

    /**
     * Diagnostics version.
     */
    version: string;

    /**
     * Diagnostics execution scope.
     */
    scope: string;

    /**
     * Diagnostics description.
     */
    description: string;

}

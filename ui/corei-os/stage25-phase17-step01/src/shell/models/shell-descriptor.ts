/**
 * ============================================================
 * COREI
 * Institutional Operating Environment
 * Stage-25 → Phase-03 → Step-01 → 01.01
 *
 * Shell Descriptor
 * ============================================================
 */

export interface ShellDescriptor {

    /**
     * Unique identifier.
     */
    readonly id: string;

    /**
     * Human readable name.
     */
    readonly name: string;

    /**
     * Platform version.
     */
    readonly version: string;

    /**
     * Runtime category.
     */
    readonly category: "shell";

    /**
     * Description.
     */
    readonly description: string;

}

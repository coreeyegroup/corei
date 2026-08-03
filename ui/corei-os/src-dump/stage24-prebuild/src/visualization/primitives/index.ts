/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Public Exports
 * ============================================================================
 *
 * Purpose
 * -------
 * Defines the public exports for visualization operator primitives.
 *
 * Responsibilities
 * ----------------
 * - Export visualization primitives.
 * - Maintain a stable package boundary.
 *
 * Does NOT
 * --------
 * - Implement primitives.
 * - Define tokens.
 * - Resolve themes.
 * - Contain business logic.
 *
 * Dependencies
 * ------------
 * - Surface
 * - Text
 * - Inline
 * - Divider
 *
 * Consumed By
 * -----------
 * - Visualization
 * - Institutional Components
 *
 * Lifecycle
 * ---------
 * Compile-time module.
 *
 * Architecture Position
 * ---------------------
 *
 * Operator Primitives
 *        ↓
 * Public Package
 *        ↓
 * Institutional Components
 *
 * ============================================================================
 */

export * from "./surface";
export * from "./text";
export * from "./inline";
export * from "./divider";

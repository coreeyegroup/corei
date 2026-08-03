/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Divider
 * Barrel Export
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides the public exports for the Divider operator primitive.
 *
 * Responsibilities
 * ----------------
 * - Export the Divider component.
 * - Export the Divider public type contract.
 * - Provide a single public entry point.
 *
 * Does NOT
 * --------
 * - Implement rendering.
 * - Implement layout.
 * - Define tokens.
 * - Contain business logic.
 *
 * Dependencies
 * ------------
 * - Divider
 * - Divider.types
 *
 * Consumed By
 * -----------
 * - Visualization Primitives
 * - Institutional Components
 *
 * Lifecycle
 * ---------
 * Compile-time module.
 *
 * Architecture Position
 * ---------------------
 *
 * Divider Primitive
 *        ↓
 * Barrel Export
 *        ↓
 * Visualization Package
 *
 * ============================================================================
 */

export * from "./Divider";
export * from "./Divider.types";

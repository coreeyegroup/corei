/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Inline
 * Barrel Export
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides the public exports for the Inline operator primitive.
 *
 * Responsibilities
 * ----------------
 * - Export the Inline component.
 * - Export the Inline public type contract.
 * - Provide a single public entry point.
 *
 * Does NOT
 * --------
 * - Implement layout behaviour.
 * - Own rendering logic.
 * - Define visualization tokens.
 * - Contain business logic.
 *
 * Dependencies
 * ------------
 * - Inline
 * - Inline.types
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
 * Inline Primitive
 *        ↓
 * Barrel Export
 *        ↓
 * Visualization Package
 *
 * ============================================================================
 */

export * from "./Inline";
export * from "./Inline.types";

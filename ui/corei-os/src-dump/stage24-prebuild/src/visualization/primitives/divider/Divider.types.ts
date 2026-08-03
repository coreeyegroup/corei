/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Divider
 * Type Contract
 * ============================================================================
 *
 * Purpose
 * -------
 * Defines the public contract for the Divider operator primitive.
 *
 * Responsibilities
 * ----------------
 * - Define the public API for Divider.
 * - Express institutional separation intent.
 * - Provide a stable contract for consumers.
 *
 * Does NOT
 * --------
 * - Render the divider.
 * - Resolve visualization tokens.
 * - Apply themes.
 * - Perform business logic.
 * - Own layout behaviour.
 *
 * Dependencies
 * ------------
 * - React Type Definitions
 *
 * Consumed By
 * -----------
 * - Divider.tsx
 * - Ribbon
 * - RibbonZone
 * - Panels
 * - Toolbars
 * - Future Institutional Components
 *
 * Lifecycle
 * ---------
 * Compile-time contract.
 * No runtime state.
 *
 * Architecture Position
 * ---------------------
 *
 * Layout
 *      ↓
 * Divider Type Contract
 *      ↓
 * Divider Primitive
 *      ↓
 * Institutional Components
 *      ↓
 * Experiences
 *
 * ============================================================================
 */

import type {
    CSSProperties,
    HTMLAttributes
} from "react";

/**
 * Divider orientation.
 */
export type DividerOrientation =
    | "horizontal"
    | "vertical";

/**
 * Divider thickness.
 */
export type DividerThickness =
    | "thin"
    | "regular"
    | "thick";

/**
 * Divider length behaviour.
 */
export type DividerLength =
    | "content"
    | "container";

/**
 * Public contract for the Divider primitive.
 */
export interface DividerProps
    extends HTMLAttributes<HTMLHRElement> {

    /**
     * Divider orientation.
     */
    orientation?: DividerOrientation;

    /**
     * Divider thickness.
     */
    thickness?: DividerThickness;

    /**
     * Divider length behaviour.
     */
    length?: DividerLength;

    /**
     * Optional inline style.
     * Used only when absolutely necessary.
     */
    style?: CSSProperties;

}

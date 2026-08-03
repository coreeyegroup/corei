/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Inline
 * Type Contract
 * ============================================================================
 *
 * Purpose
 * -------
 * Defines the public contract for the Inline operator primitive.
 *
 * Responsibilities
 * ----------------
 * - Define the public API for Inline.
 * - Define institutional layout intent.
 * - Provide a stable contract for consumers.
 *
 * Does NOT
 * --------
 * - Perform rendering.
 * - Implement layout logic.
 * - Resolve visualization tokens.
 * - Apply themes.
 * - Apply styling.
 * - Perform business logic.
 *
 * Dependencies
 * ------------
 * - React Type Definitions
 *
 * Consumed By
 * -----------
 * - Inline.tsx
 * - Ribbon
 * - RibbonZone
 * - Toolbar
 * - Future Layout Primitives
 *
 * Lifecycle
 * ---------
 * Compile-time contract.
 * No runtime state.
 *
 * Architecture Position
 * ---------------------
 *
 * Layout Intent
 *        ↓
 * Inline Type Contract
 *        ↓
 * Inline Primitive
 *        ↓
 * Institutional Components
 *        ↓
 * Experiences
 *
 * ============================================================================
 */

import type {
    CSSProperties,
    HTMLAttributes,
    PropsWithChildren
} from "react";

/**
 * Institutional spacing vocabulary.
 */
export type InlineSpacing =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl";

/**
 * Horizontal alignment vocabulary.
 */
export type HorizontalAlignment =
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";

/**
 * Vertical alignment vocabulary.
 */
export type VerticalAlignment =
    | "start"
    | "center"
    | "end"
    | "stretch";

/**
 * Wrapping behaviour.
 */
export type InlineBehavior =
    | "single-line"
    | "multi-line";

/**
 * Width behaviour.
 */
export type InlineWidth =
    | "content"
    | "container";

/**
 * Public contract for the Inline operator primitive.
 */
export interface InlineProps
    extends
        PropsWithChildren,
        HTMLAttributes<HTMLDivElement> {

    /**
     * Institutional spacing between child elements.
     */
    spacing?: InlineSpacing;

    /**
     * Horizontal distribution.
     */
    horizontalAlignment?: HorizontalAlignment;

    /**
     * Vertical alignment.
     */
    verticalAlignment?: VerticalAlignment;

    /**
     * Wrapping behaviour.
     */
    behavior?: InlineBehavior;

    /**
     * Width behaviour.
     */
    width?: InlineWidth;

    /**
     * Optional inline style.
     * Used only when absolutely necessary.
     */
    style?: CSSProperties;

}

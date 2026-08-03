/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Inline
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides the institutional horizontal layout primitive used throughout
 * COREI Operating System.
 *
 * Responsibilities
 * ----------------
 * - Arrange child elements horizontally.
 * - Resolve institutional layout intent into rendering behaviour.
 * - Apply spacing, alignment and wrapping behaviour.
 *
 * Does NOT
 * --------
 * - Render business logic.
 * - Apply business rules.
 * - Resolve themes.
 * - Resolve semantic meaning.
 * - Know about experiences.
 *
 * Dependencies
 * ------------
 * - React
 * - Visualization Tokens
 * - Inline Type Contract
 *
 * Consumed By
 * -----------
 * - Ribbon
 * - RibbonZone
 * - Toolbar
 * - Future Layout Primitives
 *
 * Lifecycle
 * ---------
 * Stateless React component.
 *
 * Architecture Position
 * ---------------------
 * Layout Intent
 *        ↓
 * Inline Primitive
 *        ↓
 * Institutional Components
 *        ↓
 * Experiences
 *
 * ============================================================================
 */

import type { CSSProperties } from "react";

import type {
    HorizontalAlignment,
    InlineBehavior,
    InlineProps,
    InlineSpacing,
    InlineWidth,
    VerticalAlignment
} from "./Inline.types";

import {
    Spacing
} from "../../tokens";

function resolveSpacing(
    spacing: InlineSpacing
): number {

    switch (spacing) {

        case "none":
            return 0;

        case "xs":
            return Spacing.xs;

        case "sm":
            return Spacing.sm;

        case "lg":
            return Spacing.lg;

        case "xl":
            return Spacing.xl;

        case "md":
        default:
            return Spacing.md;

    }

}

function resolveHorizontalAlignment(
    alignment: HorizontalAlignment
): CSSProperties["justifyContent"] {

    switch (alignment) {

        case "center":
            return "center";

        case "end":
            return "flex-end";

        case "space-between":
            return "space-between";

        case "space-around":
            return "space-around";

        case "space-evenly":
            return "space-evenly";

        case "start":
        default:
            return "flex-start";

    }

}

function resolveVerticalAlignment(
    alignment: VerticalAlignment
): CSSProperties["alignItems"] {

    switch (alignment) {

        case "center":
            return "center";

        case "end":
            return "flex-end";

        case "stretch":
            return "stretch";

        case "start":
        default:
            return "flex-start";

    }

}

function resolveBehavior(
    behavior: InlineBehavior
): CSSProperties["flexWrap"] {

    return behavior === "multi-line"
        ? "wrap"
        : "nowrap";

}

function resolveWidth(
    width: InlineWidth
): CSSProperties["width"] {

    return width === "container"
        ? "100%"
        : undefined;

}

export function Inline({

    children,

    spacing = "md",

    horizontalAlignment = "start",

    verticalAlignment = "center",

    behavior = "single-line",

    width = "content",

    style,

    ...properties

}: InlineProps) {

    return (

        <div

            {...properties}

            style={{

                display: "flex",

                flexDirection: "row",

                gap: resolveSpacing(spacing),

                justifyContent:
                    resolveHorizontalAlignment(horizontalAlignment),

                alignItems:
                    resolveVerticalAlignment(verticalAlignment),

                flexWrap:
                    resolveBehavior(behavior),

                width:
                    resolveWidth(width),

                ...style

            }}

        >

            {children}

        </div>

    );

}

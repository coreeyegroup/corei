/**
 * ============================================================================
 * COREI Operating System
 * Visualization
 * Operator Primitives
 * Divider
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides the institutional divider primitive used to visually separate
 * related operator interface elements.
 *
 * Responsibilities
 * ----------------
 * - Render horizontal and vertical dividers.
 * - Resolve semantic border definitions.
 * - Apply institutional border thickness.
 * - Remain presentation only.
 *
 * Does NOT
 * --------
 * - Render business data.
 * - Apply business logic.
 * - Resolve application state.
 * - Own themes.
 * - Know about experiences.
 *
 * Dependencies
 * ------------
 * - React
 * - Visualization Tokens
 * - Visualization Semantics
 * - Divider Type Contract
 *
 * Consumed By
 * -----------
 * - Ribbon
 * - RibbonZone
 * - Toolbars
 * - Panels
 * - Institutional Components
 *
 * Lifecycle
 * ---------
 * Stateless React component.
 *
 * Architecture Position
 * ---------------------
 *
 * Raw Tokens
 *      ↓
 * Semantic Borders
 *      ↓
 * Divider Primitive
 *      ↓
 * Institutional Components
 *      ↓
 * Experiences
 *
 * ============================================================================
 */

import type { CSSProperties } from "react";

import type {
    DividerProps
} from "./Divider.types";

import {
    Borders
} from "../../tokens";

import {
    SemanticBorders
} from "../../semantics";

function resolveThickness(
    thickness: NonNullable<DividerProps["thickness"]>
): number {

    switch (thickness) {

        case "thin":
            return Borders.thin;

        case "thick":
            return Borders.thick;

        case "regular":
        default:
            return Borders.normal;

    }

}

export function Divider({

    orientation = "horizontal",

    thickness = "regular",

    length = "container",

    style,

    ...properties

}: DividerProps) {

    const borderWidth = resolveThickness(thickness);

    const shared: CSSProperties = {

        flexShrink: 0,

        border: "none",

        opacity: 1,

        ...style

    };

    if (orientation === "horizontal") {

        return (

            <hr

                {...properties}

                style={{

                    ...shared,

                    width:
                        length === "container"
                            ? "100%"
                            : "auto",

                    borderTopStyle: "solid",

                    borderTopWidth: borderWidth,

                    borderTopColor: "currentColor"

                }}

            />

        );

    }

    return (

        <hr

            {...properties}

            style={{

                ...shared,

                alignSelf: "stretch",

                width: 0,

                height:
                    length === "container"
                        ? "100%"
                        : "auto",

                borderLeftStyle: "solid",

                borderLeftWidth: borderWidth,

                borderLeftColor: "currentColor"

            }}

        />

    );

}

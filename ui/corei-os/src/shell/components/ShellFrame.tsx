/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-12
 *
 * FILE:
 * ShellFrame.tsx
 *
 * PURPOSE:
 * Institutional Theme, Visual System and Responsive Shell Frame
 *
 * DESCRIPTION:
 * Defines the authoritative browser-visible frame of the Institutional Shell.
 *
 * The Shell Frame establishes the visual integration boundary between:
 *
 * - the existing COREI Theme Platform,
 * - the existing COREI visual token system,
 * - the browser viewport,
 * - and the Institutional Shell layout.
 *
 * The Shell Frame does not own theme state.
 * The Shell Frame does not construct a theme provider.
 * The Shell Frame does not duplicate Foundation design tokens.
 * The Shell Frame does not own subsystem-specific visual behavior.
 *
 * Theme ownership remains with the existing Foundation Theme Platform.
 *
 * Responsive behavior is expressed through deterministic Shell layout
 * contracts and CSS media queries.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {
    PropsWithChildren,
    ReactElement
} from "react";

import {
    ShellLayout
} from "../layout/components/ShellLayout";

import "../layout/styles/shell-layout.css";

import "../layout/styles/shell-viewport.css";
import "../layout/styles/shell-geometry.css";

import "../layout/styles/shell-regions.css";


/*=============================================================================
    PROPERTIES
=============================================================================*/

export interface ShellFrameProps
    extends PropsWithChildren {}

/*=============================================================================
    COMPONENT
=============================================================================*/

export function ShellFrame({

    children

}: ShellFrameProps): ReactElement {

    return (

        <div
            className="corei-shell-frame"
            data-shell-frame="institutional"
            data-shell-visual-system="foundation"
            data-shell-responsive="enabled"
        >

            {children ?? <ShellLayout />}

        </div>

    );

}

export default ShellFrame;

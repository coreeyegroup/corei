/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-11
 *
 * FILE:
 * StatusRegion.tsx
 *
 * PURPOSE:
 * Institutional Shell Status Region Integration
 *
 * DESCRIPTION:
 * Defines the authoritative boundary between the Institutional Shell status
 * region and the Shell operational status surface.
 *
 * The StatusRegion consumes only the Status public API.
 *
 * It does not directly consume Platform Runtime, System Integration Engine,
 * observability, health engines, service state, event state, or infrastructure
 * telemetry.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * ShellLayout
 *     ↓
 * StatusRegion
 *     ↓
 * Status Public API
 *     ↓
 * OperationalStatusBar
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    OperationalStatusBar
} from "../../../status";

export function StatusRegion(): ReactElement {

    return (

        <section
            className="corei-shell-region corei-shell-region-status"
            data-region="status"
            data-shell-integration="operational-status"
        >

            <OperationalStatusBar />

        </section>

    );

}

export default StatusRegion;

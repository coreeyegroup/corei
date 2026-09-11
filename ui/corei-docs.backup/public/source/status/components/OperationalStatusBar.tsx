/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-11
 *
 * FILE:
 * OperationalStatusBar.tsx
 *
 * PURPOSE:
 * Institutional Shell Operational Status Surface
 *
 * DESCRIPTION:
 * Presents deterministic Shell integration state.
 *
 * The component intentionally does not directly consume Platform Runtime,
 * observability infrastructure, health engines, System Integration Engine,
 * Event Platform, State Platform, or service internals.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    SHELL_OPERATIONAL_STATUS
} from "../models/operational-status-model";

export function OperationalStatusBar(): ReactElement {

    return (

        <div
            className="corei-operational-status-bar"
            role="status"
            aria-label="COREI shell operational status"
            data-status-scope="shell-integration"
        >

            {SHELL_OPERATIONAL_STATUS.map((item) => (

                <span
                    key={item.id}
                    className="corei-operational-status-item"
                    data-status-id={item.id}
                    data-status-state={item.state}
                >

                    <span
                        className="corei-operational-status-indicator"
                        aria-hidden="true"
                    />

                    <span className="corei-operational-status-label">

                        {item.label}

                    </span>

                </span>

            ))}

        </div>

    );

}

export default OperationalStatusBar;

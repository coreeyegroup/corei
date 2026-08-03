/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * RibbonStatusSurface.tsx
 *
 * PURPOSE:
 * Compact institutional Ribbon status presentation.
 *
 * IMPORTANT:
 * The component renders supplied presentation state only.
 * It does not discover or infer live runtime health.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    RibbonStatusSurfaceContract
} from "../contracts/ribbon-micro-contract";

export interface RibbonStatusSurfaceProps {

    readonly status: RibbonStatusSurfaceContract;

}

export function RibbonStatusSurface({
    status
}: RibbonStatusSurfaceProps): ReactElement {

    return (

        <div
            className="corei-ribbon-status-surface"
            data-ribbon-status={status.id}
            data-ribbon-status-tone={status.tone}
            role="status"
            aria-label={`${status.label}: ${status.value}`}
        >

            <span
                className="corei-ribbon-status-indicator"
                aria-hidden="true"
            />

            <span
                className="corei-ribbon-status-label"
            >
                {status.label}
            </span>

            <span
                className="corei-ribbon-status-value"
            >
                {status.value}
            </span>

        </div>

    );

}

export default RibbonStatusSurface;

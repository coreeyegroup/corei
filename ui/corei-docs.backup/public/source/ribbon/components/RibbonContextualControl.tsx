/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * RibbonContextualControl.tsx
 *
 * PURPOSE:
 * Institutional Ribbon contextual control presentation.
 *
 * IMPORTANT:
 * Step-16 establishes the interaction surface only.
 * Command routing and persistent Shell interaction are owned by later
 * Phase-17 steps.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    RibbonContextualControlContract
} from "../contracts/ribbon-micro-contract";

export interface RibbonContextualControlProps {

    readonly control: RibbonContextualControlContract;

}

export function RibbonContextualControl({
    control
}: RibbonContextualControlProps): ReactElement {

    return (

        <button
            type="button"
            className="corei-ribbon-contextual-control"
            data-ribbon-contextual-control={control.id}
            aria-expanded={control.expanded}
            aria-label={`${control.label}: ${control.value}`}
        >

            <span
                className="corei-ribbon-contextual-control-label"
            >
                {control.label}
            </span>

            <span
                className="corei-ribbon-contextual-control-value"
            >
                {control.value}
            </span>

            <span
                className="corei-ribbon-contextual-control-indicator"
                aria-hidden="true"
            >
                ▾
            </span>

        </button>

    );

}

export default RibbonContextualControl;

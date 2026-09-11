/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * RibbonAction.tsx
 *
 * PURPOSE:
 * Keyboard-accessible institutional Ribbon action presentation.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    RibbonActionContract
} from "../contracts/ribbon-micro-contract";

export interface RibbonActionProps {

    readonly action: RibbonActionContract;

}

export function RibbonAction({
    action
}: RibbonActionProps): ReactElement {

    const disabled =
        action.state === "disabled";

    return (

        <button
            type="button"
            className="corei-ribbon-action"
            data-ribbon-action={action.id}
            data-ribbon-action-state={action.state}
            disabled={disabled}
            aria-disabled={disabled}
            aria-pressed={
                action.state === "active"
            }
            title={
                action.keyboardHint
                    ? `${action.label} (${action.keyboardHint})`
                    : action.label
            }
        >

            <span
                className="corei-ribbon-action-label"
            >
                {action.label}
            </span>

            <span
                className="corei-ribbon-action-short-label"
                aria-hidden="true"
            >
                {action.shortLabel}
            </span>

            {
                action.keyboardHint
                    ? (
                        <kbd
                            className="corei-ribbon-action-keyboard-hint"
                        >
                            {action.keyboardHint}
                        </kbd>
                    )
                    : null
            }

        </button>

    );

}

export default RibbonAction;

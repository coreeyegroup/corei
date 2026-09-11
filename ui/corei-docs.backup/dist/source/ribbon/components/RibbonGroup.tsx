/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * RibbonGroup.tsx
 *
 * PURPOSE:
 * Institutional Ribbon action group presentation.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    RibbonGroupContract
} from "../contracts/ribbon-micro-contract";

import {
    RibbonAction
} from "./RibbonAction";

export interface RibbonGroupProps {

    readonly group: RibbonGroupContract;

}

export function RibbonGroup({
    group
}: RibbonGroupProps): ReactElement {

    return (

        <section
            className="corei-ribbon-group"
            data-ribbon-group={group.id}
            aria-label={group.label}
        >

            <span
                className="corei-ribbon-group-label"
            >
                {group.label}
            </span>

            <div
                className="corei-ribbon-group-actions"
                role="group"
                aria-label={`${group.label} actions`}
            >

                {
                    group.actions.map((action) => (

                        <RibbonAction
                            key={action.id}
                            action={action}
                        />

                    ))
                }

            </div>

        </section>

    );

}

export default RibbonGroup;

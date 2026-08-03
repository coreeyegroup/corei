/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * RibbonMicroSurface.tsx
 *
 * PURPOSE:
 * Institutional Ribbon micro interaction composition.
 *
 * COMPOSITION:
 *
 * Ribbon Groups
 *     +
 * Ribbon Status Surface
 *     +
 * Contextual Control
 *
 * The surface is horizontally overflow-safe and keyboard reachable through
 * native interactive controls.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    RibbonMicroModelContract
} from "../contracts/ribbon-micro-contract";

import {
    RibbonGroup
} from "./RibbonGroup";

import {
    RibbonStatusSurface
} from "./RibbonStatusSurface";

import {
    RibbonContextualControl
} from "./RibbonContextualControl";

export interface RibbonMicroSurfaceProps {

    readonly model: RibbonMicroModelContract;

}

export function RibbonMicroSurface({
    model
}: RibbonMicroSurfaceProps): ReactElement {

    return (

        <div
            className="corei-ribbon-micro-surface"
            data-ribbon-micro="enabled"
            data-ribbon-overflow="horizontal"
            aria-label="Ribbon controls"
        >

            <div
                className="corei-ribbon-micro-groups"
            >

                {
                    model.groups.map((group) => (

                        <RibbonGroup
                            key={group.id}
                            group={group}
                        />

                    ))
                }

            </div>

            <div
                className="corei-ribbon-micro-context"
            >

                <RibbonStatusSurface
                    status={model.status}
                />

                <RibbonContextualControl
                    control={model.contextualControl}
                />

            </div>

        </div>

    );

}

export default RibbonMicroSurface;

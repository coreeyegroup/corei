/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-15
 *
 * FILE:
 * RibbonShellHeaderDetail.tsx
 *
 * PURPOSE:
 * Institutional Shell header detail composition.
 *
 * COMPOSITION:
 *
 * Institution Identity
 *     +
 * Environment Identity
 *     +
 * Session Context
 *     +
 * Active Operating Context
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellHeaderContextContract
} from "../contracts/shell-header-context-contract";

import {
    RibbonInstitutionIdentity
} from "./RibbonInstitutionIdentity";

import {
    RibbonEnvironmentIdentity
} from "./RibbonEnvironmentIdentity";

import {
    RibbonSessionContext
} from "./RibbonSessionContext";

import {
    RibbonOperatingContext
} from "./RibbonOperatingContext";

export interface RibbonShellHeaderDetailProps {
    readonly context: ShellHeaderContextContract;
}

export function RibbonShellHeaderDetail({
    context
}: RibbonShellHeaderDetailProps): ReactElement {

    return (
        <div
            className="corei-ribbon-shell-header-detail"
            data-ribbon-detail="shell-header"
        >
            <RibbonInstitutionIdentity
                identity={context.institution}
            />

            <RibbonEnvironmentIdentity
                environment={context.environment}
            />

            <RibbonSessionContext
                session={context.session}
            />

            <RibbonOperatingContext
                context={context.operatingContext}
            />
        </div>
    );

}

export default RibbonShellHeaderDetail;

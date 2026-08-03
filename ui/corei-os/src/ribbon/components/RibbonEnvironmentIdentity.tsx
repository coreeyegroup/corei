/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-15
 *
 * FILE:
 * RibbonEnvironmentIdentity.tsx
 *
 * PURPOSE:
 * Environment and region identity presentation.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellEnvironmentIdentity
} from "../contracts/shell-header-context-contract";

export interface RibbonEnvironmentIdentityProps {
    readonly environment: ShellEnvironmentIdentity;
}

export function RibbonEnvironmentIdentity({
    environment
}: RibbonEnvironmentIdentityProps): ReactElement {

    return (
        <div
            className="corei-ribbon-context-chip"
            data-ribbon-detail="environment"
            data-environment={environment.environment}
            aria-label={`Environment ${environment.environment}, region ${environment.region}`}
        >
            <span className="corei-ribbon-context-label">
                ENV
            </span>

            <strong className="corei-ribbon-context-value">
                {environment.environment.toUpperCase()}
            </strong>

            <span className="corei-ribbon-context-separator">
                /
            </span>

            <span className="corei-ribbon-context-secondary">
                {environment.region}
            </span>
        </div>
    );

}

export default RibbonEnvironmentIdentity;

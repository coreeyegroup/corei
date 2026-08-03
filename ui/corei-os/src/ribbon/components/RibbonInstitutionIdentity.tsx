/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-15
 *
 * FILE:
 * RibbonInstitutionIdentity.tsx
 *
 * PURPOSE:
 * Institutional identity presentation for the active Shell header.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellInstitutionIdentity
} from "../contracts/shell-header-context-contract";

export interface RibbonInstitutionIdentityProps {
    readonly identity: ShellInstitutionIdentity;
}

export function RibbonInstitutionIdentity({
    identity
}: RibbonInstitutionIdentityProps): ReactElement {

    return (
        <div
            className="corei-ribbon-institution"
            data-ribbon-detail="institution"
            aria-label={`${identity.name} ${identity.product}`}
        >
            <span className="corei-ribbon-institution-mark">
                {identity.name}
            </span>

            <span className="corei-ribbon-institution-product">
                {identity.product}
            </span>
        </div>
    );

}

export default RibbonInstitutionIdentity;

/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-15
 *
 * FILE:
 * RibbonSessionContext.tsx
 *
 * PURPOSE:
 * Active operator and session context presentation.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellSessionContext
} from "../contracts/shell-header-context-contract";

export interface RibbonSessionContextProps {
    readonly session: ShellSessionContext;
}

export function RibbonSessionContext({
    session
}: RibbonSessionContextProps): ReactElement {

    return (
        <div
            className="corei-ribbon-context-chip"
            data-ribbon-detail="session"
            title={`Session ${session.sessionId}`}
        >
            <span className="corei-ribbon-context-label">
                SESSION
            </span>

            <strong className="corei-ribbon-context-value">
                {session.operatorLabel}
            </strong>
        </div>
    );

}

export default RibbonSessionContext;

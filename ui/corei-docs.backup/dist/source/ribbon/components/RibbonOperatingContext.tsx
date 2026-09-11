/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-15
 *
 * FILE:
 * RibbonOperatingContext.tsx
 *
 * PURPOSE:
 * Active institutional operating context presentation.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellOperatingContext
} from "../contracts/shell-header-context-contract";

export interface RibbonOperatingContextProps {
    readonly context: ShellOperatingContext;
}

export function RibbonOperatingContext({
    context
}: RibbonOperatingContextProps): ReactElement {

    return (
        <div
            className="corei-ribbon-operating-context"
            data-ribbon-detail="operating-context"
            data-operating-mode={context.mode}
            data-runtime-health={context.runtimeHealth}
        >
            <span
                className="corei-ribbon-runtime-indicator"
                aria-hidden="true"
            />

            <div className="corei-ribbon-operating-copy">
                <strong className="corei-ribbon-operating-workspace">
                    {context.workspace}
                </strong>

                <span className="corei-ribbon-operating-meta">
                    {context.mode.toUpperCase()}
                    {" · "}
                    {context.runtimeHealth.toUpperCase()}
                </span>
            </div>
        </div>
    );

}

export default RibbonOperatingContext;

/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-B
 *
 * FILE:
 * RibbonRuntime.tsx
 *
 * PURPOSE:
 * Runtime Identity Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellRuntimeIdentity
} from "../contracts/shell-header-context-contract";


export interface RibbonRuntimeProps {

    readonly runtime: ShellRuntimeIdentity;

}


export function RibbonRuntime({
    runtime
}: RibbonRuntimeProps): ReactElement {

    return (

        <div
            className="corei-ribbon-runtime"
            data-runtime-state={runtime.state}
            data-runtime-health={runtime.health}
        >

            <span>
                {runtime.state.toUpperCase()}
            </span>

            <span>
                {runtime.health.toUpperCase()}
            </span>

        </div>

    );

}


export default RibbonRuntime;

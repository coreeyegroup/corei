/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * ShellLayout.tsx
 *
 * PURPOSE:
 * Institutional Shell Region Composition
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TopRegion,
    LeftRegion,
    CenterRegion,
    RightRegion,
    BottomRegion,
    StatusRegion
} from "../regions";


export function ShellLayout(): ReactElement {

    return (

        <div
            className="corei-shell-layout"
            data-corei-shell-layout="institutional"
        >

            <div
                className="shell-top"
                data-shell-region="top"
            >
                <TopRegion />
            </div>


            <div
                className="shell-left"
                data-shell-region="left"
            >
                <LeftRegion />
            </div>


            <div
                className="shell-center"
                data-shell-region="center"
            >
                <CenterRegion />
            </div>


            <div
                className="shell-right"
                data-shell-region="right"
            >
                <RightRegion />
            </div>


            <div
                className="shell-bottom"
                data-shell-region="bottom"
            >
                <BottomRegion />
            </div>


            <div
                className="shell-status"
                data-shell-region="status"
            >
                <StatusRegion />
            </div>


        </div>

    );

}


export default ShellLayout;

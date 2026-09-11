/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-A
 *
 * FILE:
 * ribbon-contract.ts
 *
 * PURPOSE:
 * Institutional Ribbon Composition Contract
 *
 ******************************************************************************/

import type {

    ShellHeaderContextContract

} from "./shell-header-context-contract";


export interface RibbonContract {

    readonly id: string;

    readonly context:
        ShellHeaderContextContract;

    readonly visible: boolean;

    readonly enabled: boolean;

}

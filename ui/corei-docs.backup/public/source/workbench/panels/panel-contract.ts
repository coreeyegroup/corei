/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-13
 *
 * FILE
 * panel-contract.ts
 *
 * PURPOSE
 * Workbench Panel Contract
 * ============================================================================
 */

import type { ComponentType } from "react";

export interface WorkbenchPanel {

    id: string;

    title: string;

    component: ComponentType<any>;

}

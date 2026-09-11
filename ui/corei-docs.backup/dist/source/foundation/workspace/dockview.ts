/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-07
 *
 * FILE
 * dockview.ts
 *
 * PURPOSE
 * Global Dockview Authority
 * ============================================================================
 */

import type {

    DockviewApi

} from "dockview";

let api: DockviewApi | null = null;

export function setDockviewApi(

    value: DockviewApi

): void {

    api = value;

}

export function getDockviewApi():

DockviewApi | null {

    return api;

}

export function hasDockviewApi(): boolean {

    return api !== null;

}

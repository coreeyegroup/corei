/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 09
 *
 * File        : ui-provider-registry.ts
 * Purpose     : UI Provider Registry
 * =============================================================================
 */

import type {

    UIProviderModel

} from "../models/ui-provider";

import {

    MonacoProvider

} from "../../implementations/ui/monaco";

import {

    DockviewProvider

} from "../../implementations/ui/dockview";

import {

    XtermProvider

} from "../../implementations/ui/xterm";

import {

    AGGridProvider

} from "../../implementations/ui/ag-grid";

import {

    EChartsProvider

} from "../../implementations/ui/echarts";

import {

    ReactFlowProvider

} from "../../implementations/ui/react-flow";

export const UIProviderRegistry: readonly UIProviderModel[] = [

    MonacoProvider,

    DockviewProvider,

    XtermProvider,

    AGGridProvider,

    EChartsProvider,

    ReactFlowProvider

];

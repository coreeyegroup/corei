/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 10
 * Build Unit  : 04
 *
 * File        : monitor-runtime.ts
 * Purpose     : Institutional Monitor Runtime
 * =============================================================================
 */

import type {

    MonitorModel

} from "../models";

import type {

    ViewportRuntime

} from "../../viewport/runtime";

export class MonitorRuntime {

    constructor(

        private readonly monitor: MonitorModel,

        private readonly viewport: Readonly<ViewportRuntime>

    ) {}

    public getMonitor(): Readonly<MonitorModel> {

        return this.monitor;

    }

    public getViewport(): Readonly<ViewportRuntime> {

        return this.viewport;

    }

}

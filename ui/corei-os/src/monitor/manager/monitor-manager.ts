/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 10
 * Build Unit  : 06
 *
 * File        : monitor-manager.ts
 * Purpose     : Institutional Monitor Manager
 * =============================================================================
 */

import type {

    MonitorContract

} from "../contracts";

import type {

    MonitorModel

} from "../models";

import type {

    ViewportManager

} from "../../viewport/manager";

import {

    MonitorRuntime

} from "../runtime";

export class MonitorManager
implements MonitorContract {

    private readonly runtime: MonitorRuntime;

    private active = false;

    constructor(

        monitor: MonitorModel,

        private readonly viewport: ViewportManager

    ) {

        this.runtime =

            new MonitorRuntime(

                monitor,

                viewport.getRuntime()

            );

    }

    public async initialize(): Promise<void> {

        await this.viewport.initialize();

    }

    public async attach(): Promise<void> {

        await this.viewport.attach();

    }

    public async detach(): Promise<void> {

        await this.viewport.detach();

    }

    public async activate(): Promise<void> {

        this.active = true;

    }

    public async deactivate(): Promise<void> {

        this.active = false;

    }

    public async synchronize(): Promise<void> {

        await this.viewport.resize();

    }

    public isActive(): boolean {

        return this.active;

    }

    public getRuntime(): Readonly<MonitorRuntime> {

        return this.runtime;

    }

}

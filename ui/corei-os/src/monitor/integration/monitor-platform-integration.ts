/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 10
 * Build Unit  : 08
 *
 * File        : monitor-platform-integration.ts
 * Purpose     : Institutional Monitor Platform Integration
 * =============================================================================
 */

import type {

    MonitorManager

} from "../manager";

import type {

    ViewportManager

} from "../../viewport/manager";

import type {

    MultiWindowService

} from "../../windowing/services/multi-window-service";

export class MonitorPlatformIntegration {

    constructor(

        private readonly monitor: MonitorManager,

        private readonly viewport: ViewportManager,

        private readonly windows: MultiWindowService

    ) {}

    public async initialize(): Promise<void> {

        await this.monitor.initialize();

        await this.viewport.initialize();

    }

    public async synchronize(): Promise<void> {

        await this.monitor.synchronize();

    }

    public async shutdown(): Promise<void> {

        await this.monitor.detach();

    }

    public getMonitor(): Readonly<MonitorManager> {

        return this.monitor;

    }

    public getViewport(): Readonly<ViewportManager> {

        return this.viewport;

    }

    public getWindows(): Readonly<MultiWindowService> {

        return this.windows;

    }

}

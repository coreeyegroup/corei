/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.05
 *
 * File        : viewport-manager.ts
 * Purpose     : Institutional Viewport Manager
 * =============================================================================
 */

import type { ViewportContract } from "../contracts";
import type { ViewportModel } from "../models";

import { ViewportRuntime } from "../runtime";

export class ViewportManager
implements ViewportContract {

    private readonly runtime: ViewportRuntime;

    constructor(

        viewport: ViewportModel

    ) {

        this.runtime =

            new ViewportRuntime(

                viewport

            );

    }

    public async initialize(): Promise<void> {

        // Build Unit 02.07

    }

    public async attach(): Promise<void> {

        // Build Unit 02.07

    }

    public async detach(): Promise<void> {

        // Build Unit 02.07

    }

    public async resize(): Promise<void> {

        // Build Unit 02.07

    }

    public getRuntime(): Readonly<ViewportRuntime> {

        return this.runtime;

    }

}

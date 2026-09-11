/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.04
 *
 * File        : viewport-runtime.ts
 * Purpose     : Institutional Viewport Runtime
 * =============================================================================
 */

import type { ViewportModel } from "../models";

export class ViewportRuntime {

    constructor(

        private readonly viewport: ViewportModel

    ) {}

    public getModel(): Readonly<ViewportModel> {

        return this.viewport;

    }

}

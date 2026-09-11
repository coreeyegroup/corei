/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : bootstrap-controller.ts
 * Purpose     : Authoritative controller responsible for the platform bootstrap
 *               lifecycle.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

import { BootstrapLifecycle } from "../lifecycle/lifecycle";
import type { BootstrapContext } from "../context/bootstrap-context";

/**
 * Controls the COREI platform bootstrap lifecycle.
 */
export class BootstrapController {

    private context: BootstrapContext;

    constructor(context: BootstrapContext) {

        this.context = context;

    }

    /**
     * Start platform bootstrap.
     */
    public start(): void {

        this.context.lifecycle = BootstrapLifecycle.STARTING;

    }

    /**
     * Mark platform as initialized.
     */
    public ready(): void {

        this.context.lifecycle = BootstrapLifecycle.READY;

    }

    /**
     * Mark platform as running.
     */
    public run(): void {

        this.context.lifecycle = BootstrapLifecycle.RUNNING;

    }

    /**
     * Stop platform.
     */
    public stop(): void {

        this.context.lifecycle = BootstrapLifecycle.STOPPED;

    }

    /**
     * Fail platform startup.
     */
    public fail(): void {

        this.context.lifecycle = BootstrapLifecycle.FAILED;

    }

    /**
     * Returns current bootstrap context.
     */
    public getContext(): BootstrapContext {

        return this.context;

    }

}

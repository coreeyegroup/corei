/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 01
 * Build Unit  : 01.13
 *
 * File        : shell-lifecycle.ts
 * Purpose     : Institutional Shell Lifecycle
 * =============================================================================
 */

import type { PlatformFoundationContext } from "../../foundation";

import type { ShellEvent } from "../events/shell-events";
import type { ShellModel } from "../models/shell";

import { ShellRuntime } from "../runtime/shell-runtime";

export class ShellLifecycle {

    constructor(

        private readonly runtime: ShellRuntime,

        private readonly foundation:

        PlatformFoundationContext<
            ShellRuntime,
            ShellModel,
            ShellEvent
        >

    ) {}

    public async initialize(): Promise<void> {

        this.foundation.logging.info(

            "Initializing COREI Shell."

        );

        this.foundation.registry.initialize();

        this.foundation.state.initialize();

        this.foundation.diagnostics.execute();

        this.foundation.health.evaluate();

    }

    public async start(): Promise<void> {

        this.foundation.extension.load();

        this.foundation.extension.initialize();

        this.foundation.extension.activate();

    }

    public async suspend(): Promise<void> {

        this.foundation.logging.info(

            "Suspending COREI Shell."

        );

    }

    public async resume(): Promise<void> {

        this.foundation.logging.info(

            "Resuming COREI Shell."

        );

    }

    public async stop(): Promise<void> {

        this.foundation.extension.deactivate();

        this.foundation.extension.unload();

        this.foundation.logging.info(

            "Stopping COREI Shell."

        );

    }

}

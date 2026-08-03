/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 01
 * Build Unit  : 01.13
 *
 * File        : shell-manager.ts
 * Purpose     : Institutional Shell Manager
 * =============================================================================
 */

import type { ShellContract } from "../contracts/shell-contract";
import type { ShellContext } from "../context/shell-context";
import type { ShellEvent } from "../events/shell-events";
import type { ShellModel } from "../models/shell";

import type { PlatformFoundationContext } from "../../foundation";

import { ShellRuntime } from "../runtime/shell-runtime";
import { ShellLifecycle } from "../lifecycle/shell-lifecycle";

export class ShellManager
implements ShellContract {

    private readonly runtime: ShellRuntime;

    private readonly lifecycle: ShellLifecycle;

    constructor(

        context: ShellContext,

        private readonly foundation:

        PlatformFoundationContext<
            ShellRuntime,
            ShellModel,
            ShellEvent
        >

    ) {

        this.runtime =

            new ShellRuntime(

                context

            );

        this.lifecycle =

            new ShellLifecycle(

                this.runtime,

                foundation

            );

    }

    public async initialize(): Promise<void> {

        await this.lifecycle.initialize();

    }

    public async start(): Promise<void> {

        await this.lifecycle.start();

    }

    public async suspend(): Promise<void> {

        await this.lifecycle.suspend();

    }

    public async resume(): Promise<void> {

        await this.lifecycle.resume();

    }

    public async stop(): Promise<void> {

        await this.lifecycle.stop();

    }

    public getRuntime(): Readonly<ShellRuntime> {

        return this.runtime;

    }

}

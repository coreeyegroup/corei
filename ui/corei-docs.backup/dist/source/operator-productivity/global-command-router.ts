/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    global-command-router.ts

Purpose:
    Institutional Global Command Router.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-08 — Global Command Routing Operationalization
===============================================================================
*/

import type {
    GlobalCommandRouterContract
} from "./global-command-router-contract";

import {
    KeyboardShortcut
} from "./keyboard-shortcut";

export class GlobalCommandRouter
implements GlobalCommandRouterContract {

    private readonly routes =
        new Set<string>();

    private initialized = false;

    constructor(
        private readonly shortcuts =
            new KeyboardShortcut()
    ) {}

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.shortcuts.initialize();

        this.initialized = true;
    }

    async route(
        commandId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "GlobalCommandRouter has not been initialized."
            );
        }

        if (!this.routes.has(commandId)) {
            throw new Error(
                `Route '${commandId}' is not registered.`
            );
        }

        /*
         * Routing coordination only.
         * Command execution is delegated to later platform steps.
         */
    }

    async registerRoute(
        commandId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "GlobalCommandRouter has not been initialized."
            );
        }

        const id = commandId.trim();

        if (!id) {
            throw new Error(
                "Command identifier cannot be empty."
            );
        }

        this.routes.add(id);
    }

    async unregisterRoute(
        commandId: string
    ): Promise<void> {

        this.routes.delete(commandId);
    }

    async shutdown(): Promise<void> {

        this.routes.clear();

        await this.shortcuts.shutdown();

        this.initialized = false;
    }
}

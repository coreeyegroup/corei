/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-palette.ts

Purpose:
    Institutional Command Palette coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-09 — Command Palette Operationalization
===============================================================================
*/

import type {
    CommandPaletteContract
} from "./command-palette-contract";

import {
    GlobalCommandRouter
} from "./global-command-router";

export class CommandPalette
implements CommandPaletteContract {

    private readonly router =
        new GlobalCommandRouter();

    private initialized = false;

    private opened = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.router.initialize();

        this.initialized = true;
    }

    async open(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "CommandPalette has not been initialized."
            );
        }

        if (this.opened) {
            return;
        }

        this.opened = true;
    }

    async close(): Promise<void> {

        if (!this.opened) {
            return;
        }

        this.opened = false;
    }

    async toggle(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "CommandPalette has not been initialized."
            );
        }

        if (this.opened) {
            await this.close();
            return;
        }

        await this.open();
    }

    async shutdown(): Promise<void> {

        this.opened = false;

        await this.router.shutdown();

        this.initialized = false;
    }
}

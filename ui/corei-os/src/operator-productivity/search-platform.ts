/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    search-platform.ts

Purpose:
    Institutional Search Platform coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-10 — Search Platform Operationalization
===============================================================================
*/

import type {
    SearchPlatformContract
} from "./search-platform-contract";

import {
    CommandPalette
} from "./command-palette";

export class SearchPlatform
implements SearchPlatformContract {

    private readonly palette =
        new CommandPalette();

    private initialized = false;

    private currentQuery = "";

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.palette.initialize();

        this.initialized = true;
    }

    async search(
        query: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "SearchPlatform has not been initialized."
            );
        }

        this.currentQuery = query.trim();

        /*
         * Search coordination only.
         * Search execution is consumed from the
         * existing search infrastructure.
         */
    }

    async clear(): Promise<void> {

        this.currentQuery = "";
    }

    async shutdown(): Promise<void> {

        this.currentQuery = "";

        await this.palette.shutdown();

        this.initialized = false;
    }
}

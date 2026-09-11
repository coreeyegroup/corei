/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-multiplicity.ts

Purpose:
    Institutional Productivity Multiplicity coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-17 — Institutional Productivity Multiplicity Operationalization
===============================================================================
*/

import type {
    ProductivityMultiplicityContract
} from "./productivity-multiplicity-contract";

import {
    ProductivityDiagnostics
} from "./productivity-diagnostics";

export class ProductivityMultiplicity
implements ProductivityMultiplicityContract {

    private readonly diagnostics =
        new ProductivityDiagnostics();

    private initialized = false;

    private commandsValidated = false;

    private editorsValidated = false;

    private terminalsValidated = false;

    private searchValidated = false;

    private commandPaletteValidated = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.diagnostics.initialize();

        this.initialized = true;
    }

    async validateCommands(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityMultiplicity has not been initialized."
            );
        }

        this.commandsValidated = true;
    }

    async validateEditors(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityMultiplicity has not been initialized."
            );
        }

        this.editorsValidated = true;
    }

    async validateTerminals(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityMultiplicity has not been initialized."
            );
        }

        this.terminalsValidated = true;
    }

    async validateSearch(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityMultiplicity has not been initialized."
            );
        }

        this.searchValidated = true;
    }

    async validateCommandPalette(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityMultiplicity has not been initialized."
            );
        }

        this.commandPaletteValidated = true;
    }

    async shutdown(): Promise<void> {

        this.commandsValidated = false;
        this.editorsValidated = false;
        this.terminalsValidated = false;
        this.searchValidated = false;
        this.commandPaletteValidated = false;

        await this.diagnostics.shutdown();

        this.initialized = false;
    }
}

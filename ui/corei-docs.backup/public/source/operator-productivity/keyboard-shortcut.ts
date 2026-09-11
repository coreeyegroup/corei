/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    keyboard-shortcut.ts

Purpose:
    Institutional Keyboard Shortcut Platform.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-07 — Keyboard Shortcut Platform Operationalization
===============================================================================
*/

import type {
    KeyboardShortcutContract
} from "./keyboard-shortcut-contract";

export class KeyboardShortcut
implements KeyboardShortcutContract {

    private readonly registry =
        new Map<string, string>();

    private initialized = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        this.registry.clear();

        this.initialized = true;
    }

    async register(
        shortcut: string,
        commandId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "KeyboardShortcut has not been initialized."
            );
        }

        const key = shortcut.trim();
        const command = commandId.trim();

        if (!key) {
            throw new Error(
                "Shortcut cannot be empty."
            );
        }

        if (!command) {
            throw new Error(
                "Command identifier cannot be empty."
            );
        }

        if (this.registry.has(key)) {
            throw new Error(
                `Shortcut '${key}' is already registered.`
            );
        }

        this.registry.set(key, command);
    }

    async unregister(
        shortcut: string
    ): Promise<void> {

        this.registry.delete(shortcut);
    }

    exists(
        shortcut: string
    ): boolean {

        return this.registry.has(shortcut);
    }

    async shutdown(): Promise<void> {

        this.registry.clear();

        this.initialized = false;
    }
}

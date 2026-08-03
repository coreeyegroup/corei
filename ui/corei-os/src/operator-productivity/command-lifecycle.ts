/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-lifecycle.ts

Purpose:
    Institutional Command Lifecycle.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-06 — Command Lifecycle Operationalization
===============================================================================
*/

import type { CommandLifecycleContract } from "./command-lifecycle-contract";
import { CommandRegistry } from "./command-registry";

export class CommandLifecycle implements CommandLifecycleContract {

    private readonly registry = new CommandRegistry();

    private readonly activeCommands = new Set<string>();

    async create(commandId: string): Promise<void> {

        if (!commandId.trim()) {
            throw new Error("Command identifier cannot be empty.");
        }
    }

    async register(commandId: string): Promise<void> {

        await this.registry.register(commandId);
    }

    async activate(commandId: string): Promise<void> {

        if (!this.registry.exists(commandId)) {
            throw new Error(
                `Command '${commandId}' is not registered.`
            );
        }

        this.activeCommands.add(commandId);
    }

    async deactivate(commandId: string): Promise<void> {

        this.activeCommands.delete(commandId);
    }

    async unregister(commandId: string): Promise<void> {

        this.activeCommands.delete(commandId);

        await this.registry.unregister(commandId);
    }

    async dispose(commandId: string): Promise<void> {

        await this.unregister(commandId);
    }
}

/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Stage-25 → Phase-21
Step-04 — Command Registry Operationalization
===============================================================================
*/

import type { CommandRegistryContract } from "./command-registry-contract";

export class CommandRegistry implements CommandRegistryContract {

    private readonly registry = new Set<string>();

    async register(commandId: string): Promise<void> {

        const id = commandId.trim();

        if (!id) {
            throw new Error("Command identifier cannot be empty.");
        }

        if (this.registry.has(id)) {
            throw new Error(`Command '${id}' is already registered.`);
        }

        this.registry.add(id);
    }

    async unregister(commandId: string): Promise<void> {
        this.registry.delete(commandId);
    }

    exists(commandId: string): boolean {
        return this.registry.has(commandId);
    }

    get(commandId: string): string | null {
        return this.registry.has(commandId)
            ? commandId
            : null;
    }

    getAll(): readonly string[] {
        return Array.from(this.registry);
    }
}

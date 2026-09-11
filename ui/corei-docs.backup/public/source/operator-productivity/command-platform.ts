/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 * ----------------------------------------------------------------------------
 * Component:    Operator Productivity Platform
 * File:         command-platform.ts
 * Stage:        Stage-25
 * Phase:        Phase-21
 * Step:         Step-03 – Command Platform Operationalization
 * Purpose:      Institutional Command Platform coordinator.
 * Ownership:    COREI Platform Architecture
 * ============================================================================
 */

import type { CommandPlatformContract } from "./command-platform-contract";
import type { OperatorProductivityPlatformContract } from "./contracts";

export class CommandPlatform implements CommandPlatformContract {
    private readonly commands = new Set<string>();
    private initialized = false;

    constructor(
        private readonly platform?: OperatorProductivityPlatformContract
    ) {}

    async initialize(): Promise<void> {
        if (this.initialized) return;
        await this.platform?.initialize();
        this.initialized = true;
    }

    async register(commandId: string): Promise<void> {
        if (!this.initialized) throw new Error("CommandPlatform has not been initialized.");
        if (!commandId.trim()) throw new Error("Command identifier cannot be empty.");
        if (this.commands.has(commandId)) return;
        this.commands.add(commandId);
    }

    async unregister(commandId: string): Promise<void> {
        this.commands.delete(commandId);
    }

    async execute(commandId: string): Promise<void> {
        if (!this.initialized) throw new Error("CommandPlatform has not been initialized.");
        if (!this.commands.has(commandId)) {
            throw new Error(`Command '${commandId}' is not registered.`);
        }
        // Execution delegation to be implemented in later steps (e.g., Global Command Router)
        // For now, just log or no-op.
        console.log(`[CommandPlatform] Executing command: ${commandId}`);
    }

    async shutdown(): Promise<void> {
        this.commands.clear();
        this.initialized = false;
        await this.platform?.shutdown();
    }
}

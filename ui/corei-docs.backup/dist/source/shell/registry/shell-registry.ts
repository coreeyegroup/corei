/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-registry.ts
 *
 * PURPOSE:
 * Institutional Shell Registry
 *
 ******************************************************************************/

import type { Shell } from "../models/shell";

export class ShellRegistry {

    private readonly registry = new Map<string, Shell>();

    public register(shell: Shell): void {

        this.registry.set(shell.contract.metadata.id, shell);

    }

    public unregister(id: string): void {

        this.registry.delete(id);

    }

    public find(id: string): Shell | undefined {

        return this.registry.get(id);

    }

    public list(): readonly Shell[] {

        return [...this.registry.values()];

    }

    public clear(): void {

        this.registry.clear();

    }

    public size(): number {

        return this.registry.size;

    }

}

/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage-25
 * Phase-03
 * Step-01
 * Build Unit : 01.06
 *
 * Institutional Shell Runtime
 * =============================================================================
 */

import type { ShellContext } from "../context/shell-context";

export class ShellRuntime {

    private readonly context: ShellContext;

    constructor(context: ShellContext) {

        this.context = context;

    }

    public getContext(): Readonly<ShellContext> {

        return this.context;

    }

}

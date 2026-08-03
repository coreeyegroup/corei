/**
 * ============================================================
 * COREI
 * Institutional Operating Environment
 *
 * Stage-25
 * Phase-03
 * Step-01
 * Build Unit 01.02
 *
 * Institutional Shell Events
 * ============================================================
 */

export const SHELL_EVENTS = {

    INITIALIZING: "shell.initializing",

    INITIALIZED: "shell.initialized",

    STARTING: "shell.starting",

    READY: "shell.ready",

    RUNNING: "shell.running",

    SUSPENDING: "shell.suspending",

    SUSPENDED: "shell.suspended",

    RESUMING: "shell.resuming",

    STOPPING: "shell.stopping",

    STOPPED: "shell.stopped",

    FAILED: "shell.failed"

} as const;

export type ShellEventType =
    typeof SHELL_EVENTS[keyof typeof SHELL_EVENTS];

export interface ShellEvent {

    readonly type: ShellEventType;

    readonly shellId: string;

    readonly timestamp: Date;

    readonly payload?: unknown;

}

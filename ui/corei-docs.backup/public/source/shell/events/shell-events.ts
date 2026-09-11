/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 ******************************************************************************/

export enum ShellEvent {

    INITIALIZING = "shell.initializing",

    STARTING = "shell.starting",

    STARTED = "shell.started",

    STOPPING = "shell.stopping",

    STOPPED = "shell.stopped",

    FAILED = "shell.failed",

    COMMAND_EXECUTED = "shell.command.executed",

    REGION_FOCUSED = "shell.region.focused",

    REGION_VISIBILITY_CHANGED =
        "shell.region.visibility.changed"

}

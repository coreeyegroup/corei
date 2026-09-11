/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-lifecycle-contract.ts

Purpose:
    Institutional Command Lifecycle contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-06 — Command Lifecycle Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Command Registry
    Command Runtime

Remarks:
    Contract only.
===============================================================================
*/

export interface CommandLifecycleContract {

    create(commandId: string): Promise<void>;

    register(commandId: string): Promise<void>;

    activate(commandId: string): Promise<void>;

    deactivate(commandId: string): Promise<void>;

    unregister(commandId: string): Promise<void>;

    dispose(commandId: string): Promise<void>;
}

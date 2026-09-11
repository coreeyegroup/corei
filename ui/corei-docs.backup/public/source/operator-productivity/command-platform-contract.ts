/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-platform-contract.ts

Purpose:
    Institutional Command Platform contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-03 — Command Platform Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform

Remarks:
    Contract only.
===============================================================================
*/

export interface CommandPlatformContract {

    initialize(): Promise<void>;

    register(commandId: string): Promise<void>;

    unregister(commandId: string): Promise<void>;

    execute(commandId: string): Promise<void>;

    shutdown(): Promise<void>;
}

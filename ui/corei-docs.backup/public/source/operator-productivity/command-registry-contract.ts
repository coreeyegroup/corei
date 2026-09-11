/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-registry-contract.ts

Purpose:
    Institutional Command Registry contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-04 — Command Registry Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Command Platform

Remarks:
    Contract only.
===============================================================================
*/

export interface CommandRegistryContract {

    register(commandId: string): Promise<void>;

    unregister(commandId: string): Promise<void>;

    exists(commandId: string): boolean;

    get(commandId: string): string | null;

    getAll(): readonly string[];
}

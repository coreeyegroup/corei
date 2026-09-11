/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-palette-contract.ts

Purpose:
    Institutional Command Palette contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-09 — Command Palette Integration Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Global Command Router

Remarks:
    Contract only.
===============================================================================
*/

export interface CommandPaletteContract {

    initialize(): Promise<void>;

    open(): Promise<void>;

    close(): Promise<void>;

    toggle(): Promise<void>;

    shutdown(): Promise<void>;
}

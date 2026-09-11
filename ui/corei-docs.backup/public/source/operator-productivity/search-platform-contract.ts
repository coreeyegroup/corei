/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    search-platform-contract.ts

Purpose:
    Institutional Search Platform contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-10 — Search Platform Integration Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Command Palette

Remarks:
    Contract only.
===============================================================================
*/

export interface SearchPlatformContract {

    initialize(): Promise<void>;

    search(query: string): Promise<void>;

    clear(): Promise<void>;

    shutdown(): Promise<void>;
}

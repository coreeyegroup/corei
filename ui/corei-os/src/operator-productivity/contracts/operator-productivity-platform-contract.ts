/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-productivity-platform-contract.ts

Purpose:
    Institutional contract boundary for the Operator Productivity Platform.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-02 — Operator Productivity Platform Contract Boundary

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Capability Provider Platform
    Window & Workspace Platform
    Panel Platform

Remarks:
    Contract only.
===============================================================================
*/

export interface OperatorProductivityPlatformContract {

    initialize(): Promise<void>;

    start(): Promise<void>;

    stop(): Promise<void>;

    shutdown(): Promise<void>;
}

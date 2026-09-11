/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-viewport-contract.ts

Purpose:
    Institutional Productivity Viewport contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-18 — Cross Browser & Viewport Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Productivity Multiplicity

Remarks:
    Contract only.
    Consumes existing viewport capabilities.
===============================================================================
*/

export interface ProductivityViewportContract {

    initialize(): Promise<void>;

    synchronize(): Promise<void>;

    validateViewport(): Promise<void>;

    validateBrowser(): Promise<void>;

    shutdown(): Promise<void>;
}

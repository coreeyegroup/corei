/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-multiplicity-contract.ts

Purpose:
    Institutional Productivity Multiplicity contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-17 — Institutional Productivity Multiplicity Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Productivity Diagnostics

Remarks:
    Contract only.
    Consumes existing multiplicity capabilities.
===============================================================================
*/

export interface ProductivityMultiplicityContract {

    initialize(): Promise<void>;

    validateCommands(): Promise<void>;

    validateEditors(): Promise<void>;

    validateTerminals(): Promise<void>;

    validateSearch(): Promise<void>;

    validateCommandPalette(): Promise<void>;

    shutdown(): Promise<void>;
}

/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-diagnostics-contract.ts

Purpose:
    Institutional Productivity Diagnostics contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-16 — Productivity Diagnostics & Observability Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Observability Platform
    Productivity Event & State

Remarks:
    Contract only.
    Consumes existing Observability Platform.
===============================================================================
*/

export interface ProductivityDiagnosticsContract {

    initialize(): Promise<void>;

    collect(): Promise<void>;

    health(): Promise<boolean>;

    metrics(): Promise<void>;

    shutdown(): Promise<void>;
}

/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-diagnostics-contract.ts

Purpose:
    Institutional Panel Diagnostics contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-17 — Panel Diagnostics & Observability Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Observability Platform
    Panel Event & State

Remarks:
    Contract only.
    Consumes existing Observability Platform.
===============================================================================
*/

export interface PanelDiagnosticsContract {

    initialize(): Promise<void>;

    collect(): Promise<void>;

    health(): Promise<boolean>;

    metrics(): Promise<void>;

    shutdown(): Promise<void>;
}

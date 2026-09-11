/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    workbench-visual-composition-contract.ts

Purpose:
    Institutional Workbench Visual Composition contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-15 — Workbench Visual Composition Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Visualization Integration

Remarks:
    Contract only.
===============================================================================
*/

export interface WorkbenchVisualCompositionContract {

    initialize(): Promise<void>;

    compose(): Promise<void>;

    decompose(): Promise<void>;

    shutdown(): Promise<void>;
}

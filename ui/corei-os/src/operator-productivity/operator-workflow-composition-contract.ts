/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-workflow-composition-contract.ts

Purpose:
    Institutional Operator Workflow Composition contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-14 — Operator Workflow Composition Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Capability Provider Platform
    Window & Workspace Platform
    Panel Platform
    Productivity Provider

Remarks:
    Contract only.
===============================================================================
*/

export interface OperatorWorkflowCompositionContract {

    initialize(): Promise<void>;

    compose(): Promise<void>;

    decompose(): Promise<void>;

    shutdown(): Promise<void>;
}

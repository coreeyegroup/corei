/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-layout-contract.ts

Purpose:
    Institutional Panel Layout contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-08 — Panel Layout Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Composition

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelLayoutContract {

    initialize(): Promise<void>;

    arrange(): Promise<void>;

    reset(): Promise<void>;

    shutdown(): Promise<void>;
}

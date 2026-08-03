/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-composition-contract.ts

Purpose:
    Institutional Panel Composition contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-07 — Panel Composition Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Host

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelCompositionContract {

    initialize(): Promise<void>;

    compose(): Promise<void>;

    decompose(): Promise<void>;

    shutdown(): Promise<void>;
}

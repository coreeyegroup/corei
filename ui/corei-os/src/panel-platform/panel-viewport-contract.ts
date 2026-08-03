/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-viewport-contract.ts

Purpose:
    Institutional Viewport contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-19 — Cross Browser & Viewport Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Multiplicity

Remarks:
    Contract only.
    Consumes existing viewport capabilities.
===============================================================================
*/

export interface PanelViewportContract {

    initialize(): Promise<void>;

    synchronize(): Promise<void>;

    validateViewport(): Promise<void>;

    validateBrowser(): Promise<void>;

    shutdown(): Promise<void>;
}

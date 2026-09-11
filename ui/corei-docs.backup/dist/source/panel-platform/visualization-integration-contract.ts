/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    visualization-integration-contract.ts

Purpose:
    Institutional Visualization Integration Boundary contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-14 — Visualization Integration Boundary Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Provider Platform
    Visualization Platform
    Panel Provider

Remarks:
    Contract only.
    Consumes existing Visualization Platform.
===============================================================================
*/

export interface VisualizationIntegrationContract {

    initialize(): Promise<void>;

    attach(providerId: string): Promise<void>;

    detach(providerId: string): Promise<void>;

    isAttached(providerId: string): boolean;

    shutdown(): Promise<void>;
}

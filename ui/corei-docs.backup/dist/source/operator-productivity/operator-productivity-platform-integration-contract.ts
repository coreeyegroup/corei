/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-productivity-platform-integration-contract.ts

Purpose:
    Institutional Operator Productivity Platform Integration contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-19 — Final Integration Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Capability Provider Platform
    Window & Workspace Platform
    Panel Platform

Remarks:
    Contract only.
    Final integration boundary.
===============================================================================
*/

export interface OperatorProductivityPlatformIntegrationContract {

    initialize(): Promise<void>;

    integrate(): Promise<void>;

    validate(): Promise<void>;

    shutdown(): Promise<void>;
}

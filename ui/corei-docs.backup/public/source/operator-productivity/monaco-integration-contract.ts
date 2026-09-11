/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    monaco-integration-contract.ts

Purpose:
    Institutional Monaco Editor Integration contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-11 — Monaco Editor Integration Boundary Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Search Platform

Remarks:
    Contract only.
    Consumes existing Monaco integration.
===============================================================================
*/

export interface MonacoIntegrationContract {

    initialize(): Promise<void>;

    attach(editorId: string): Promise<void>;

    detach(editorId: string): Promise<void>;

    isAttached(editorId: string): boolean;

    shutdown(): Promise<void>;
}

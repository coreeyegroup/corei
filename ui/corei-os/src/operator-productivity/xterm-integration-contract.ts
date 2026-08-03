/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    xterm-integration-contract.ts

Purpose:
    Institutional xterm.js Terminal Integration contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-12 — xterm.js Terminal Integration Boundary Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Monaco Integration

Remarks:
    Contract only.
    Consumes existing xterm.js integration.
===============================================================================
*/

export interface XtermIntegrationContract {

    initialize(): Promise<void>;

    attach(terminalId: string): Promise<void>;

    detach(terminalId: string): Promise<void>;

    isAttached(terminalId: string): boolean;

    shutdown(): Promise<void>;
}

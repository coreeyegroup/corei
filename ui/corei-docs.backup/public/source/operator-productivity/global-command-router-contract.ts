/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    global-command-router-contract.ts

Purpose:
    Institutional Global Command Router contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-08 — Global Command Routing Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Keyboard Shortcut Platform

Remarks:
    Contract only.
===============================================================================
*/

export interface GlobalCommandRouterContract {

    initialize(): Promise<void>;

    route(commandId: string): Promise<void>;

    registerRoute(commandId: string): Promise<void>;

    unregisterRoute(commandId: string): Promise<void>;

    shutdown(): Promise<void>;
}

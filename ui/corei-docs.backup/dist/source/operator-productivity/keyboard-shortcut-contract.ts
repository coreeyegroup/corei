/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    keyboard-shortcut-contract.ts

Purpose:
    Institutional Keyboard Shortcut contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-07 — Keyboard Shortcut Platform Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Command Lifecycle

Remarks:
    Contract only.
===============================================================================
*/

export interface KeyboardShortcutContract {

    initialize(): Promise<void>;

    register(shortcut: string, commandId: string): Promise<void>;

    unregister(shortcut: string): Promise<void>;

    exists(shortcut: string): boolean;

    shutdown(): Promise<void>;
}
